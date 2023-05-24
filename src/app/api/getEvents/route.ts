import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongoConnect";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const idString = searchParams.get("_id");

  if (idString) {
    const id = new ObjectId(idString);
    const client = (await clientPromise).db("churras").collection("event");
    const event = await client.findOne({ _id: id });
    console.log(event);
    return NextResponse.json({ event });
  } else {
    const client = (await clientPromise).db("churras").collection("event");
    const events = await client.find({}).toArray();
    console.log(events);
    return NextResponse.json({ events });
  }
}
