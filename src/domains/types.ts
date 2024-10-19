export interface IBook {
  id: number;
  title: string;
  description: string;
  pageCount: number;
  excerpt?: string;
  publishDate: string;
}

export interface IAuthor {
  id: number;
  idBook: number;
  firstName: string;
  lastName: string;
}
