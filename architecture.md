# Architecture Overview

## Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useEffect)
- **Storage**: LocalStorage for demo persistence (simulating a database).

## Backend / API
- **Route**: `/api/analyze` (Next.js serverless route)
- **AI Provider**: NVIDIA NIM API endpoint.
- **Model**: `meta/llama3-70b-instruct` (via NIM).
- **Prompt Engineering**: Uses structured JSON prompts to guarantee stable frontend rendering.

## Flow
1. User enters financial data on the Onboarding page.
2. Data is saved locally and passed to the Dashboard.
3. Dashboard triggers a `POST /api/analyze` request.
4. Next.js server acts as a proxy, securely querying NVIDIA NIM with the secret key.
5. The LLM returns a strictly formatted JSON payload with budget insights.
6. The UI parses and beautifully visualizes the AI response.