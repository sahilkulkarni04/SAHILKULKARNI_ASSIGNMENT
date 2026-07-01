import { NextResponse } from "next/server";
import { askGemini } from "@/lib/gemini";
import { buildPrompt } from "@/lib/prompt";
import { checkRefundEligibility } from "@/lib/tools/refundTool";

import customers from "../../../data/customers.json";
import fs from "fs";
import path from "path";

type Customer = {
  id: number;
  name: string;
  email: string;
  orderId: string;
  product: string;
  purchaseDate: string;
  status: string;
  price: number;
  refunded: boolean;
};

export async function POST(request: Request) {
  try {
    const { customer, message } = await request.json();

    // Find customer
    const selectedCustomer = (customers as Customer[]).find(
      (c) => c.name === customer
    );

    if (!selectedCustomer) {
      return NextResponse.json({
        reply: "Customer not found.",
        logs: ["Customer not found"],
      });
    }

    // Read refund policy
    const policyPath = path.join(process.cwd(), "data", "refundPolicy.txt");

    const refundPolicy = fs.readFileSync(policyPath, "utf-8");
    const toolResult = checkRefundEligibility(selectedCustomer);

    // Build AI prompt
    const prompt = `
${buildPrompt(selectedCustomer, refundPolicy, message)}

=========================
BACKEND TOOL RESULT
=========================

Refund Approved: ${toolResult.approved}

Reason:
${toolResult.reason}

IMPORTANT:

Use the backend tool result as the final source of truth.

Do not override the backend decision.

Only explain the decision politely to the customer.
`;

    // Ask Gemini
    const reply = await askGemini(prompt);

const logs = [
  `Customer: ${selectedCustomer.name}`,
  `Order ID: ${selectedCustomer.orderId}`,
  "🔧 Tool Executed: Refund Validation",
  `Tool Result: ${
    toolResult.approved ? "APPROVED" : "DENIED"
  }`,
  toolResult.reason,
  "Refund policy loaded",
  "Prompt sent to Gemini",
  "Gemini generated customer response",
];

return NextResponse.json({
  reply,
  logs,
});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        reply: "Something went wrong while contacting Gemini.",
        logs: ["Gemini Error"],
      },
      { status: 500 }
    );
  }
}