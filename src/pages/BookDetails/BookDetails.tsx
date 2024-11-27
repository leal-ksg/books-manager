import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Trash, Pencil } from "lucide-react";

import bookImage from "../../assets/image.png";

import styles from "./BookDetails.module.css";
import axios from "axios";
import { IBook, IAuthor } from "../../domains/types";
import {
  fetchBook,
  removeBook,
  updateBook,
} from "../../domains/services/booksServices";
import Modal from "../../components/Modal/Modal";
import Form from "../../components/Form/Form";

const BookDetails = () => {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [redirectTo, setRedirectTo] = useState("/");

  const [book, setBook] = useState<IBook>();
  const [author, setAuthor] = useState<IAuthor>();
  const { bookId } = useParams();
  const navigate = useNavigate();

  const fetchAuthor = async () => {
    const { data: authorData }: { data: IAuthor[] } = await axios.get(
      `https://fakerestapi.azurewebsites.net/api/v1/Authors/authors/books/${bookId}`
    );

    setAuthor(authorData[0]);
  };

  useEffect(() => {
    const fetchBookData = async () => {
      const bookData = await fetchBook(bookId!);
      setBook(bookData);
    };

    try {
      fetchBookData();
      fetchAuthor();
    } catch (error) {
      setIsFailureModalOpen(true);
    }
  }, []);

  const handleRemoveConfirm = async () => {
    setIsRemoveModalOpen(false);
    try {
      if (!book) return;

      await removeBook(book);
      setSuccessMessage("Book removed successfully.");
      setRedirectTo("/")
      setIsSuccessModalOpen(true);
    } catch {
      setIsFailureModalOpen(true);
    }
  };

  const handleOkClick = () => {
    setIsSuccessModalOpen(false);
    navigate(redirectTo);
  };

  return (
    <div className={styles.container}>
      <Modal
        title="Confirmation"
        content="Would you really like to remove this book?"
        isOpen={isRemoveModalOpen}
        setIsOpen={setIsRemoveModalOpen}
        width="25%"
        height="25%"
      >
        <div className={styles.modalButtonsGroup}>
          <button onClick={() => setIsRemoveModalOpen(false)}>Cancel</button>
          <button onClick={handleRemoveConfirm} className={styles.confirm}>
            Remove
          </button>
        </div>
      </Modal>

      <Modal
        title="Update book"
        isOpen={isUpdateModalOpen}
        setIsOpen={setIsUpdateModalOpen}
        overlayClick={false}
        backgroundColor="#94a3b8"
        width="30%"
        height="auto"
        textAlign="left"
      >
        <Form
          defaultValues={{
            ...book!,
            author: author ? `${author.firstName} ${author.lastName}` : " - ",
          }}
          onFailure={() => setIsFailureModalOpen(true)}
          onSuccess={() => {
            setSuccessMessage("Book updated successfully.");
            setRedirectTo(`/book-details/${bookId}`);
            setIsUpdateModalOpen(false);
            setIsSuccessModalOpen(true);
          }}
          setIsSubmitting={setIsSubmitting}
        >
          <div className={styles.formButtonsGroup}>
            <button
              type="button"
              onClick={() => {
                setIsUpdateModalOpen(false);
              }}
            >
              Back
            </button>
            <button type="submit" disabled={isSubmitting}>
              Save
            </button>
          </div>
        </Form>
      </Modal>

      <Modal
        title="Success!"
        content={successMessage}
        isOpen={isSuccessModalOpen}
        setIsOpen={setIsSuccessModalOpen}
        width="25%"
        height="25%"
      >
        <div className={styles.modalButtonsGroup}>
          <button onClick={handleOkClick} className={styles.ok}>
            OK
          </button>
        </div>
      </Modal>

      <Modal
        title="Failure"
        content={"An error has occurred. Please, try to reaload the page."}
        isOpen={isFailureModalOpen}
        setIsOpen={setIsFailureModalOpen}
        width="25%"
        height="25%"
      >
        <div className={styles.modalButtonsGroup}>
          <button
            onClick={() => setIsFailureModalOpen(false)}
            className={styles.ok}
          >
            OK
          </button>
        </div>
      </Modal>

      <div className={styles.firstColumn}>
        <div className={styles.detailContainer}>
          <h3 className={styles.containerTitle}>{book?.title}</h3>
          <div className={styles.detailGroup}>
            <p>Description</p>
            <div className={styles.detail}>{book?.description}</div>
          </div>

          <div className={styles.detailGroup}>
            <p>Excerpt</p>
            <div className={styles.detail}>{book?.excerpt}</div>
          </div>

          <div className={styles.detailGroup}>
            <p>Author</p>
            <div className={styles.detail}>
              {author && `${author?.firstName} ${author?.lastName}`}
            </div>
          </div>

          <div className={styles.detailGroup}>
            <p>Pages count</p>
            <div className={styles.detail}>{book?.pageCount}</div>
          </div>

          <div className={styles.detailGroup}>
            <p>Publish date</p>
            <div className={styles.detail}>
              {book?.publishDate.substring(0, 10)}
            </div>
          </div>

          <div className={styles.buttonsGroup}>
            <button
              className={styles.update}
              onClick={() => setIsUpdateModalOpen(true)}
            >
              <Pencil />
            </button>
            <button
              className={styles.delete}
              onClick={() => setIsRemoveModalOpen(true)}
            >
              <Trash />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.secondColumn}>
        <div className={styles.imgContainer}>
          {book && <img src={bookImage} alt="Book Image" />}
        </div>
        <button className={styles.back} onClick={() => navigate("/")}>
          <ChevronLeft />
          Back
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
