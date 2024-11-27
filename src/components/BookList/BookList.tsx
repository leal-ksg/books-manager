import React, { useEffect, useRef, useState } from "react";
import styles from "./BookList.module.css";

import Book from "../Book/Book.tsx";
import axios from "axios";
import { fetchAllBooks } from "../../domains/services/booksServices.ts";

interface BookData {
  _id: string;
  title: string;
  description: string;
  pageCount: number;
  excerpt: string;
  publishDate: string;
}

interface Image {
  _id: string;
  idBook: string;
  url: string;
}

const BookList = () => {
  const [books, setBooks] = useState<BookData[]>([]);

  const imagesMap = useRef(new Map<string, string>());

  const fetchImages = async () => {
    try {
      const { data: images }: { data: Image[] } = await axios.get(
        `http://localhost:3001/api/images`
      );

      images.forEach((image) => {
        imagesMap.current.set(image.idBook, image.url);
      });
    } catch (err) {
      console.log("Error on images fetching: ", err);
    }
  };

  useEffect(() => {
    const fetchAllBooksData = async () => {
      const booksData = await fetchAllBooks();
      setBooks(booksData);
    };

    fetchAllBooksData();
    fetchImages();
  }, []);

  return (
    <div className={styles.container}>
      {books.map((book) => {
        return (
          <Book
            book={book}
            key={book._id.toString()}
            url={imagesMap.current?.get(book._id)}
          />
        );
      })}
    </div>
  );
};

export default BookList;
