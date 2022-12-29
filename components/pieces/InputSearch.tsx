import { useCallback } from "react";
import styles from "../../styles/InputSearch.module.scss";

export const InputSearch = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}) => {
  const handleClear = useCallback(() => {
    setSearchTerm("");
  }, [setSearchTerm]);

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      {searchTerm !== "" && (
        <button className={styles.clearBtn} onClick={handleClear} title="Clear Search">
          &times;
        </button>
      )}
    </div>
  );
};

export default InputSearch;
