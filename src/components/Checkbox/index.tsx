import React from "react";
import styles from "./Checkbox.module.scss";
interface Props {
  isChecked: boolean;
  changeIsCheckedState: () => void;
}

const Checkbox: React.FC<Props> = ({ isChecked, changeIsCheckedState }) => {
  return (
    <div>
      <label>
        <input type="checkbox" hidden onChange={changeIsCheckedState} className={styles.checkbox} />
        <div
          className={`${styles.content} ${
            isChecked ? styles.content__checked : ""
          } `}
        />
      </label>
    </div>
  );
};

export default Checkbox;
