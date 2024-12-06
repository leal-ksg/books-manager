import axios from "axios";
import { IImage } from "../types";

const BASE_URL = `http://localhost:3001/api/images`;

export async function removeImage(imageId: string) {
  const response = await axios.delete(`${BASE_URL}/${imageId}`);
  return response;
}

export async function updateImage(image: IImage) {

  const response = await axios.put(`${BASE_URL}/${image._id}`, image);
  return response;
}

export async function addImage(image: IImage) {
  const response = await axios.post(BASE_URL, image);
  return response;
}

export async function fetchAllImages() {
  const response = await axios.get(BASE_URL);
  return response?.data;
}

export async function fetchImageByBookId(bookId: string) {
  const response = await axios.get(`${BASE_URL}/${bookId}`);
  return response?.data;
}
