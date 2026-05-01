# PocketMentor AI

PocketMentor AI is a student financial planning and money-learning web app designed to help young adults take control of their finances with the help of artificial intelligence.

## Features
- **Budget Breakdown**: Simple overview of income vs. expenses.
- **AI Savings Roadmap**: Custom plan to hit your financial goals.
- **Spending Alerts**: Highlights risky habits.
- **Scenario Simulator**: See how behavior changes impact goals.
- **Financial Explainer Cards**: Learn core concepts on the fly.

## Tech Stack
- **Frontend**: Next.js 14, React, Tailwind CSS
- **AI Integration**: NVIDIA NIM API (Llama-3 70B)
- **Deployment**: Vercel

## Local Setup
1. Clone the repository
2. Run `npm install`
3. Create a `.env.local` file with your NVIDIA NIM API key: `NIM_API_KEY=your_key_here`
4. Run `npm run dev` and navigate to http://localhost:3000