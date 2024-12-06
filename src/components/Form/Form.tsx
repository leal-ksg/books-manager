import React from "react";
import styles from "./Form.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { addBook, updateBook } from "../../domains/services/booksServices";
import { addImage, updateImage } from "../../domains/services/imagesServices";

interface FormFields {
  _id?: string;
  title: string;
  description: string;
  excerpt?: string;
  pageCount: number;
  publishDate: string;
  imageUrl?: string;
}

interface FormProps {
  defaultValues?: FormFields;
  children?: React.ReactNode;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  onFailure?: () => void;
  onSuccess?: () => void;
}

const Form: React.FC<FormProps> = ({
  defaultValues,
  children,
  setIsSubmitting,
  onFailure,
  onSuccess,
}) => {
  const resolver = yupResolver(schema);

  const formattedDefaultValues = {
    ...defaultValues,
    publishDate: defaultValues?.publishDate
      ? new Date(defaultValues.publishDate).toISOString().slice(0, 10)
      : "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: resolver,
    defaultValues: formattedDefaultValues,
  });

  const onSubmit = async (data: FormFields) => {
    const book = {
      title: data.title,
      description: data.description,
      pageCount: data.pageCount,
      excerpt: data.excerpt,
      publishDate: data.publishDate,
    };

    setIsSubmitting(true);

    try {
      if (defaultValues && data._id) {
        await updateBook(book, data._id);
        await updateImage({
          idBook: data._id,
          url: data.imageUrl!,
        });
      } else {
        const newBook = await addBook(book);
        console.log(newBook)
        console.log(data.imageUrl)
        await addImage({
          idBook: newBook._id,
          url: data.imageUrl!,
        });
      }
      onSuccess && onSuccess();
    } catch (error) {
      onFailure && onFailure();
    }

    setIsSubmitting(false);
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGroup}>
          <label htmlFor="title">Title</label>
          <input type="text" {...register("title")} />
          <span className={styles.error}>{errors?.title?.message}</span>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="description">Description</label>
          <input type="text" {...register("description")} />
          <span className={styles.error}>{errors?.description?.message}</span>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="excerpt">Excerpt</label>
          <input type="text" {...register("excerpt")} />
          <span className={styles.error}>{errors?.excerpt?.message}</span>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="pageCount">Page Count</label>
          <input type="number" {...register("pageCount")} />
          <span className={styles.error}>{errors?.pageCount?.message}</span>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="publishDate">Publish Date</label>
          <input type="date" {...register("publishDate")} />
          <span className={styles.error}>{errors?.publishDate?.message}</span>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="imageUrl">Image URL</label>
          <input type="text" {...register("imageUrl")} />
          <span className={styles.error}>{errors?.imageUrl?.message}</span>
        </div>

        {children}
      </form>
    </div>
  );
};

export default Form;