import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongoConnect";
import { useSearchParams } from "next/navigation";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (email) {
    const client = await clientPromise;
    const db = client.db("churras").collection("users");
    const user = await db.findOne({ email });
    return NextResponse.json({ user });
  } else {
    const client = await clientPromise;
    const db = client.db("churras").collection("users");
    const users = await db.find({}).toArray();
    return NextResponse.json({ users });
  }
}
