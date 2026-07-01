# 🤖 AI Customer Support Agent

An AI-powered customer support application built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Google Gemini AI**. The application helps process e-commerce refund requests by validating customer orders against a refund policy and generating professional AI responses.

---

## 🚀 Features

- ✅ Mock CRM database with 15 customer profiles
- ✅ Customer selection from dropdown
- ✅ Display customer order details
- ✅ Refund validation using backend business logic
- ✅ Refund policy stored separately
- ✅ AI-generated customer responses using Gemini
- ✅ Admin dashboard showing reasoning logs
- ✅ Modern responsive UI

---

## 🛠️ Tech Stack

### Frontend
- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS

### Backend
- Next.js API Routes
- Node.js

### AI
- Google Gemini API

### Database
- Mock JSON Database (`customers.json`)

---

## 📁 Project Structure

```
app/
│
├── api/
│   ├── chat/
│   └── customers/
│
├── page.tsx
│
data/
│
├── customers.json
├── refundPolicy.txt
│
lib/
│
├── gemini.ts
├── prompt.ts
│
└── tools/
    └── refundTool.ts
```

---

## ⚙️ Workflow

```
User
   │
   ▼
Select Customer
   │
   ▼
Enter Refund Request
   │
   ▼
POST /api/chat
   │
   ▼
Find Customer
   │
   ▼
Validate Refund Policy
   │
   ▼
Load Refund Policy
   │
   ▼
Generate AI Prompt
   │
   ▼
Google Gemini API
   │
   ▼
AI Response
   │
   ▼
Display Chat + Admin Logs
```

---

## 🧠 How It Works

1. User selects a customer.
2. Customer details are loaded from the mock CRM database.
3. User enters a refund request.
4. Backend validates:
   - Customer exists
   - Order delivered
   - Already refunded or not
   - Purchase within refund period
5. Refund policy is loaded.
6. A structured prompt is created.
7. Prompt is sent to Google Gemini.
8. Gemini generates a professional response.
9. Chat response and reasoning logs are displayed.

---

## 📦 Installation

Clone the repository

```bash
git clone https://github.com/sahilkulkarni04/SAHILKULKARNI_ASSIGNMENT.git
```

Move into the project

```bash
cd SAHILKULKARNI_ASSIGNMENT
```

Install dependencies

```bash
npm install
```

---

## 🔑 Environment Variables

Create a file named `.env.local`

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

## ▶️ Run the Project

Start the development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

## 🧪 Demo Scenarios

### ✅ Approved Refund

Customer:
```
John Doe
```

Message:
```
I want a refund because the product is defective.
```

Expected Result

- Refund Approved
- AI generates professional approval response
- Admin dashboard shows validation logs

---

### ❌ Denied Refund

Customer:
```
Jane Smith
```

Message:
```
I would like a refund.
```

Expected Result

- Refund Denied
- Purchase exceeds refund period
- AI explains denial politely

---

## 📌 Business Rules

- Customer must exist
- Order must be delivered
- Refund should not already be processed
- Purchase must be within 30 days
- Backend tool is the source of truth for refund decisions

---

## 🔍 Reasoning Logs

The Admin Dashboard displays:

- Customer Found
- Order Found
- Refund Validation
- Refund Policy Loaded
- Prompt Sent to Gemini
- AI Response Generated

---

## 📈 Future Improvements

- Voice support using OpenAI Realtime API or LiveKit
- Real database integration (MongoDB/PostgreSQL)
- User authentication
- Intent detection before refund processing
- Conversation history
- Email notifications
- Multi-language support

---

## 👨‍💻 Author

**Sahil Kulkarni**

GitHub:
https://github.com/sahilkulkarni04

LinkedIn:
https://www.linkedin.com/in/sahilkulkarni04/

---

## 📄 License

This project was developed as part of the **Next.js Developer Assignment** for **Jobform Automator**.
