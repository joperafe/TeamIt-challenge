import { useCallback } from "react";
import styles from "../../../styles/PostForm.module.scss";
import { useReducer } from "react";
import isEmpty from "../../../utils/isEmpty";

interface IFormState {
  title: string;
  author: string;
  content: string;
  error: boolean;
}

interface IUpdateFieldAction {
  type: "updateField";
  field: keyof IFormState;
  value: string | boolean;
}

type IFormAction = IUpdateFieldAction;

const initialState: IFormState = {
  title: "",
  author: "",
  content: "",
  // @ Error will be true when the user tries to submit an empty form
  error: false,
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

const PostForm = ({ handleSubmit }: { handleSubmit: (state: IFormState) => void }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({
      type: "updateField",
      field: event.target.name as keyof IFormState,
      value: event.target.value,
    });
  };

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!isEmpty(state.title) && !isEmpty(state.author) && !isEmpty(state.content)) {
        handleSubmit(state);
      }
      dispatch({
        type: "updateField",
        field: "error",
        value: true,
      });
    },
    [handleSubmit, state]
  );

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={isEmpty(state.title) && state.error ? styles.empty : ""}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={state.title} onChange={handleChange} />
      </div>
      <br />
      <div className={isEmpty(state.author) && state.error ? styles.empty : ""}>
        <label htmlFor="author">Author:</label>
        <input type="text" id="author" name="author" value={state.author} onChange={handleChange} />
      </div>
      <br />
      <div className={isEmpty(state.content) && state.error ? styles.empty : ""}>
        <label htmlFor="content">Content:</label>
        <textarea id="content" name="content" value={state.content} onChange={handleChange} />
      </div>
      <br />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default PostForm;
