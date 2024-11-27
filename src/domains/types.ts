import mongoose from "mongoose";

export interface IBook {
  _id?: string;
  title: string;
  description: string;
  pageCount: number;
  excerpt?: string;
  publishDate: string;
}

export interface IAuthor {
  id: number;
  idBook: mongoose.Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
}
