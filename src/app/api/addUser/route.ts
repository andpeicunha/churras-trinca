import clientPromise from "@/app/lib/mongoConnect";

export async function POST(req: Request) {
  const client = await clientPromise;

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const avatar = searchParams.get("avatar");

  const user = {
    name,
    email,
    avatar,
  };

  const db = client.db("churras").collection("users");
  const result = await db.insertOne(user);

  return new Response(JSON.stringify(result.insertedId), {
    status: 200,
    statusText: "OK",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
