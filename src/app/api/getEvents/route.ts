import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongoConnect";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("churras").collection("event");
  const events = await db.find({}).toArray();

  return NextResponse.json({ events });
}
