import clientPromise from "@/app/lib/mongoConnect";

export async function POST(req: Request) {
  const client = await clientPromise;

  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const date = searchParams.get("date");
  const description = searchParams.get("description");

  const event = {
    name,
    date,
    description,
    users: [],
  };

  const db = client.db("churras").collection("event");
  const result = await db.insertOne(event);

  return new Response(JSON.stringify(result.insertedId), {
    status: 200,
    statusText: "OK",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
