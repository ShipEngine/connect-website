import styles from "./index.module.scss";
import useScript from '@charlietango/use-script'

const PostmanButton = () => {
  useScript("https://run.pstmn.io/button.js");
  return (
    <span
      className={`${styles.runInPostman} postman-run-button`}
      data-postman-action="collection/import"
      data-postman-var-1="12340335-39b1c68e-b79c-4d34-9512-ca9a7cdf1341-T1LPBRJk"
      data-postman-var-2="latest"
    ></span>
  );
};

export default PostmanButton;
