import React from "react";
import { MainData } from "../../../types";
import styles from "./DrawElements.module.scss";
import Checkbox from "../../Checkbox";

interface Props extends MainData {
  changeState: (value: string) => void;
  height?: number;
}

const DrawElements: React.FC<Props> = ({
  title,
  children,
  isChecked,
  code,
  changeState,
  firstRow,
}) => {
  const [showChields, setShowChields] = React.useState<boolean>(isChecked);

  const changeIsCheckedState = () => {
    changeState(title);
  };

  React.useEffect(() => {
    setShowChields(isChecked);
  }, [isChecked]);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper}>
          <Checkbox
            isChecked={isChecked}
            changeIsCheckedState={changeIsCheckedState}
          />
          {code && <span>{code}</span>}
          <span className={`${firstRow ? styles.firstRow : " "}`}>{title}</span>
        </div>
        {children && (
          <span
            onClick={() => setShowChields((prev) => !prev)}
            className={styles.arrows}
          >
            {showChields ? <>&and;</> : <>&or;</>}
          </span>
        )}
      </div>
      <div className={styles.childrenWrapper}>
        {showChields && (
          <div className={styles.childrenContent}>
            {children &&
              children!.map((items) => (
                <DrawElements
                  {...items}
                  changeState={changeState}
                  key={items.title}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DrawElements;
