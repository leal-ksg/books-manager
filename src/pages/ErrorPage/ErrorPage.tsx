import React from "react";
import styles from "./ErrorPage.module.css";
import { useNavigate } from "react-router-dom";
import {Home} from 'lucide-react'

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <p>
        An error has ocurred. Click on the button below to go back to the home
        page
      </p>

      <button type="button" onClick={() => navigate("/")}>
        <Home size={40}></Home>
      </button>
    </div>
  );
};

export default ErrorPage;
