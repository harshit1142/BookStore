import styles from "./loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loading;
