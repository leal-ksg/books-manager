import axios from "axios";
import { IBook } from "../types";

const BASE_URL = `http://localhost:3001/api/books`;

export async function removeBook(book: IBook) {
  const response = await axios.delete(`${BASE_URL}/${book._id}`);
  return response;
}

export async function updateBook(book: Omit<IBook, "_id">, idBook: string) {
  const response = await axios.put(`${BASE_URL}/${idBook}`, book);
  return response;
}

export async function addBook(book: Omit<IBook, "_id">) {
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
