import styles from "../../../styles/PostForm.module.scss";
import { useReducer } from "react";

interface FormState {
  title: string;
  author: string;
  content: string;
}

interface UpdateFieldAction {
  type: "updateField";
  field: keyof FormState;
  value: string;
}

type FormAction = UpdateFieldAction;

const initialState: FormState = {
  title: "",
  author: "",
  content: "",
};

const reducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "updateField":
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      throw new Error();
  }
};

const PostForm = ({ handleSubmit }: { handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({
      type: "updateField",
      field: event.target.name as keyof FormState,
      value: event.target.value,
    });
  };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // Dispatch an action to create a new post with the form data
  //   console.log("state ", state);
  // };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" name="title" value={state.title} onChange={handleChange} />
      <br />
      <label htmlFor="author">Author:</label>
      <input type="text" id="author" name="author" value={state.author} onChange={handleChange} />
      <br />
      <label htmlFor="content">Content:</label>
      <textarea id="content" name="content" value={state.content} onChange={handleChange} />
      <br />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default PostForm;
