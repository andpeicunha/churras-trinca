import axios, { isAxiosError } from "axios";
import { ObjectId } from "mongodb";

export interface IPropsEvent {
  events?: string;
  status?: string;
  _id: ObjectId;
  id?: string;
  name: string;
  date?: string;
  total_people?: string;
  current_total?: string;
  description?: string;
}

type TodoErrorResponse = {
  error: string;
};
export async function getEvents() {
  try {
    const response = await axios.get("/api/getEvents");
    return response.data as IPropsEvent[];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addEvent(event: string) {
  try {
    console.log("ENTROU FUNÇÃO FETCH AXIOS POST");
    const response = await axios.post(`/api/addEvent?${event}`);

    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      console.log(err.response?.data as TodoErrorResponse);
    }
  }
}
