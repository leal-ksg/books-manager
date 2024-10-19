import axios from "axios";
import { IBook } from "../types";

const BASE_URL = "https://fakerestapi.azurewebsites.net/api/v1/Books";

export async function removeBook(book: IBook) {
  const response = await axios.delete(`${BASE_URL}/${book.id}`);
  return response;
}

export async function updateBook(book: IBook) {
  const response = await axios.put(`${BASE_URL}/${book.id}`, book);
  return response;
}

export async function addBook(book: IBook) {
  const response = await axios.post(BASE_URL, book);
  return response;
}

export async function fetchAllBooks() {
  const response = await axios.get(BASE_URL);
  return response?.data;
}

export async function fetchBook(bookId: string) {
  const response = await axios.get(`${BASE_URL}/${bookId}`);
  return response?.data;
}
