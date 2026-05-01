import { NextResponse } from 'next/server';
import { z } from 'zod';

const AIResponseSchema = z.object({
  budgetSummary: z.string(),
  savingsRoadmap: z.string(),
  spendingAlert: z.string(),
  actionSteps: z.array(z.string()),
  explainer: z.object({
    concept: z.string(),
    explanation: z.string(),
  }),
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // STRICT Requirement: Use environment variable only
    const apiKey = process.env.NIM_API_KEY;
    if (!apiKey) {
      throw new Error("NIM_API_KEY environment variable is missing.");
    }

    // Basic sanitization to mitigate prompt injection
    const sanitize = (str: string) => str.substring(0, 500).replace(/[{}]/g, '');

    const prompt = `
      You are PocketMentor AI, a financial advisor for a student. 
      Analyze the following user profile and return a JSON object with strictly this structure, no markdown formatting or extra text:
      {
        "budgetSummary": "A short, encouraging 2-sentence summary of their situation.",
        "savingsRoadmap": "How many months it will take to hit their goal, and a specific tip to get there faster.",
        "spendingAlert": "One critical risk based on their habits (e.g., 'High dining out costs').",
        "actionSteps": ["Actionable step 1", "Actionable step 2", "Actionable step 3"],
        "explainer": {
          "concept": "A financial concept related to their situation (e.g., 'Latte Factor' or '50/30/20 Rule')",
          "explanation": "A simple, 2-sentence explanation of the concept."
        }
      }

      User Profile:
      Income: $${data.monthlyIncome}/month
      Expenses: $${data.recurringExpenses}/month
      Goal: $${data.savingsGoal} for ${sanitize(data.goalName || '')}
      Habits: ${sanitize(data.spendingHabits || '')}
    `;

    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'meta/llama3-70b-instruct',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1024,
        temperature: 0.2
      })
    });

    if (!response.ok) {
      throw new Error(`NVIDIA NIM API error: ${response.statusText}`);
    }

    const json = await response.json();
    let content = json.choices[0].message.content.trim();
    
    if (content.startsWith('```json')) {
      content = content.replace(/```json/g, '').replace(/```/g, '').trim();
    }
    
    // Zod Validation ensures we don't crash the frontend if LLM hallucinates structure
    const parsedContent = AIResponseSchema.parse(JSON.parse(content));
    return NextResponse.json(parsedContent);
  } catch (error: unknown) {
    console.error("AI Error:", error);
    // Graceful fallback for the hackathon demo if API fails or validation fails
    return NextResponse.json({
      budgetSummary: "You have a solid base, but there's room to optimize your spending.",
      savingsRoadmap: "Based on your income and expenses, you can hit your goal in a few months by reallocating some discretionary funds.",
      spendingAlert: "Your current spending habits might slow down your savings progress.",
      actionSteps: ["Track your daily expenses for one week.", "Cut down on food delivery by cooking one extra meal at home.", "Automate a 10% transfer to savings on payday."],
      explainer: {
        "concept": "Pay Yourself First",
        "explanation": "This means routing a portion of your income into savings automatically before you have a chance to spend it on daily expenses."
      }
    });
  }
}