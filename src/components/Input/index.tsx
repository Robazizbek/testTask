import React from "react";
import styles from "./Input.module.scss";
import { useDebounce, useLocalStorage } from "../../hooks";

interface Props {
  changeFilterHandler: (value: string) => void;
}

const Input: React.FC<Props> = ({ changeFilterHandler }) => {
  const { storageData } = useLocalStorage<string>("searchValue");
  const [value, setValue] = React.useState<string>(storageData);
  const text = useDebounce(value);
  const searchHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  React.useEffect(() => {
    changeFilterHandler(text);
  }, [text]);

  return (
    <div className={styles.mainWrapper}>
      <input
        type="search"
        className={styles.input}
        placeholder="Поиск"
        value={value}
        onChange={searchHandler}
      />
      <span className={styles.magnify}>&#x1F50E;&#xFE0E;</span>
    </div>
  );
};

export default Input;
