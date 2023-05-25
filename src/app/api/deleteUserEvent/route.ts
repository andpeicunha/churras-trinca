import clientPromise from "@/app/lib/mongoConnect";
import { ObjectId } from "mongodb";

interface IPropsAddUserEvent {
  idUser: string;
}

export async function POST(req: Request) {
  const client = await clientPromise;

  const { searchParams } = new URL(req.url);
  const idString = searchParams.get("id");
  const idUser = searchParams.get("idUser");

  const user = {
    idUser,
  };

  if (idString) {
    const id = new ObjectId(idString);
    const db = client.db("churras").collection("event");

    const result = await db.updateOne({ _id: id }, { $pull: { users: { idUser: idUser } } });
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
