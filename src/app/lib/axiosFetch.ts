import axios from "axios";
import { ObjectId } from "mongodb";

export interface Event {
  events?: string;
  _id: ObjectId;
  id?: string;
  name: string;
  date?: string;
  total_people?: string;
  current_total?: string;
}
export async function getEvents() {
  try {
    const response = await axios.get("/api/getEvents");
    // console.log("GETEVENTES...", response.data.events);
    return response.data as Event[];
  } catch (error) {
    console.log(error);
    return null;
  }
}
