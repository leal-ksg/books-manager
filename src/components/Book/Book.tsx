import React, { useState } from "react";
import styles from "./Book.module.css";
import { IBook } from "../../domains/types";
import { useNavigate } from "react-router-dom";
import { ImageOff } from "lucide-react";

interface BookProps {
  book: IBook;
  url?: string;
}

const Book: React.FC<BookProps> = ({ book, url }) => {
  const [imageFound, setImageFound] = useState(true);
  const navigate = useNavigate();

  return (
    <button
      className={styles.container}
      onClick={() => navigate(`/book-details/${book._id}`)}
    >
      {imageFound ? (
        <img
          src={url}
          className={styles.bookImage}
          alt="book image"
          onError={() => setImageFound(false)}
        />
      ) : (
        <div className={styles.imageNotFound}>
          <ImageOff size={40} />
        </div>
      )}

      <div className={styles.content}>
        <p>{book.title}</p>
      </div>
    </button>
  );
};

export default Book;
