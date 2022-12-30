import styles from "../../../styles/PostForm.module.scss";
import { useReducer } from "react";

interface IFormState {
  title: string;
  author: string;
  content: string;
}

interface IUpdateFieldAction {
  type: "updateField";
  field: keyof IFormState;
  value: string;
}

type IFormAction = IUpdateFieldAction;

const initialState: IFormState = {
  title: "",
  author: "",
  content: "",
};

const reducer = (state: IFormState, action: IFormAction): IFormState => {
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

const PostForm = ({
  handleSubmit,
}: {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>, state: IFormState) => void;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({
      type: "updateField",
      field: event.target.name as keyof IFormState,
      value: event.target.value,
    });
  };

  return (
    <form className={styles.form} onSubmit={(event) => handleSubmit(event, state)}>
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
