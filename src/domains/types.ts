export interface IBook {
  _id?: string;
  title: string;
  description: string;
  pageCount: number;
  excerpt?: string;
  publishDate: string;
  imageUrl?: string;
}

export interface IImage {
  _id?: string;
  idBook: string;
  url: string;
}
