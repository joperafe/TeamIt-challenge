import styles from "../../styles/Pagination.module.scss";

const PageButtons: React.FC<{ totalPages: number; currentPage: number; setCurrentPage: (page: number) => void }> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(
      <button key={i} onClick={() => handleClick(i)} className={currentPage === i ? styles.active : ""}>
        {i}
      </button>
    );
  }

  return <div className="page-buttons">{pageButtons}</div>;
};

const Pagination: React.FC<{
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}> = ({ totalPages, itemsPerPage, currentPage, handlePageChange }) => {
  return (
    <div className={styles.pagination}>
      {totalPages > 1 && (
        <PageButtons totalPages={totalPages} currentPage={currentPage} setCurrentPage={handlePageChange} />
      )}
    </div>
  );
};

export default Pagination;
