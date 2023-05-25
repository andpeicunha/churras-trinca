import clientPromise from "@/app/lib/mongoConnect";
import { ObjectId } from "mongodb";

interface IPropsAddUserEvent {
  id: string;
  name: string;
  value: number;
  status: string;
}

export async function POST(req: Request) {
  const client = await clientPromise;

  const { searchParams } = new URL(req.url);
  const idString = searchParams.get("id");
  const idUser = searchParams.get("idUser");
  const name = searchParams.get("name");
  const value = searchParams.get("value");
  const status = searchParams.get("status");

  const user = {
    idUser,
    name,
    value,
    status,
  };

  if (idString && name && value) {
    const id = new ObjectId(idString);
    const db = client.db("churras").collection("event");

    const result = await db.updateOne({ _id: id }, { $push: { users: user } });
    return new Response(JSON.stringify(result), {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    new Response("Error", {
      status: 400,
      statusText: "Bad Request",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
