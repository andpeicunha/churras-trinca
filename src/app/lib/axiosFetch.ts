import axios, { isAxiosError } from "axios";
import { ObjectId } from "mongodb";

export interface IPropsEvent {
  events?: string;
  id?: string;
  _id: ObjectId;
  name: string;
  date: string;
  description?: string;
  users?: {
    idUser: string;
    name: string;
    value: string;
    status: string;
  }[];
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

export async function addUserEvent(event: string) {
  try {
    const response = await axios.post(`/api/addUserEvent?${event}`);
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      console.log(err.response?.data as TodoErrorResponse);
    }
  }
}

export async function deleteUserEvent(event: string) {
  try {
    console.log(event);
    const response = await axios.post(`/api/deleteUserEvent?${event}`);
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      console.log(err.response?.data as TodoErrorResponse);
    }
  }
}
