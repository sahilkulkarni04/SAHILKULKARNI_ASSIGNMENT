import { NextResponse } from "next/server";
import customers from "../../../data/customers.json";

export async function GET() {
  return NextResponse.json(customers);
}