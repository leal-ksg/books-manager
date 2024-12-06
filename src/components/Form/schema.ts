import { number, object, string } from "yup";

export const schema = object({
  _id: string(),
  title: string().required("Title is a required field"),
  description: string().required("Description is a required field"),
  excerpt: string(),
  pageCount: number().required("Pages Count is a required field"),
  publishDate: string().required("Publish Date is a required field"),
  imageUrl: string(),
});
