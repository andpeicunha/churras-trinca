import axios, { isAxiosError } from "axios";
import { ObjectId } from "mongodb";

export interface IPropsEvent {
  events?: string;
  _id: ObjectId;
  name: string;
  date: string;
  description?: string;
  status?: string;
  id?: string;
  total_people?: string;
  current_total?: string;
}

type TodoErrorResponse = {
  error: string;
};
export async function getEvents(id?: string) {
  try {
    if (id) {
      const response = await axios.get(`/api/getEvents?_id=${id}`);
      return response.data as IPropsEvent[];
    }
    const response = await axios.get(`/api/getEvents`);
    return response.data as IPropsEvent[];
    //
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addEvent(event: string) {
  try {
    const response = await axios.post(`/api/addEvent?${event}`);
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      console.log(err.response?.data as TodoErrorResponse);
    }
  }
}
