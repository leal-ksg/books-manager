import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import BookList from "../../components/BookList/BookList";
import { Plus } from "lucide-react";
import Modal from "../../components/Modal/Modal";
import Form from "../../components/Form/Form";

const Home = () => {
  const [isAddModalOpen, setisAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Modal
        title="Add new book"
        isOpen={isAddModalOpen}
        setIsOpen={setisAddModalOpen}
        overlayClick={false}
        backgroundColor="#94a3b8"
        width="30%"
        height="auto"
        textAlign="left"
      >
        <Form
          setIsSubmitting={setIsSubmitting}
          onFailure={() => setIsFailureModalOpen(true)}
          onSuccess={() => {
            setisAddModalOpen(false);
            setIsSuccessModalOpen(true);
          }}
        >
          <div className={styles.formButtonsGroup}>
            <button type="button" onClick={() => setisAddModalOpen(false)}>
              Back
            </button>
            <button type="submit" disabled={isSubmitting}>
              Save
            </button>
          </div>
        </Form>
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

      <Modal
        title="Success!"
        content={"Book successfully added."}
        isOpen={isSuccessModalOpen}
        setIsOpen={setIsSuccessModalOpen}
        width="25%"
        height="25%"
      >
        <div className={styles.modalButtonsGroup}>
          <button
            onClick={() => {
              setIsSuccessModalOpen(false);
            }}
            className={styles.ok}
          >
            OK
          </button>
        </div>
      </Modal>

      <div className={styles.titleGroup}>
        <button type="button" onClick={() => setisAddModalOpen(true)}>
          Add
          <Plus></Plus>
        </button>
      </div>
      <BookList />
    </div>
  );
};

export default Home;
