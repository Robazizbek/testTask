import React from "react";
import styles from "./Header.module.scss";
import Input from "../Input";

interface Props {
  changeFilterHandler: (value: string) => void;
}

const Header: React.FC<Props> = ({ changeFilterHandler }) => {
  return (
    <header>
      <h1 className={styles.title}> Коды ОКВЭД</h1>
      <Input changeFilterHandler={changeFilterHandler} />
    </header>
  );
};

export default Header;
