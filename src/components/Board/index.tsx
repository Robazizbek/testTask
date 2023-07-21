import React from "react";
import { MainData } from "../../types";
import DrawElements from "./DrawElements";
import styles from "./Board.module.scss";
import Loading from "../Loading";
import Helper from "./Helper";
import { useFetching, useLocalStorage } from "../../hooks";

interface Props {
  filterBy: string;
}

const Board: React.FC<Props> = ({ filterBy }) => {
  const [data, setData] = React.useState<MainData[]>([]);
  const [drawData, setDrawData] = React.useState<MainData[]>([]);
  const { error, getData, isLoading } = useFetching();
  const { localStoreInit, storageData } = useLocalStorage<MainData[]>("data");
  const { storageData: inputData } = useLocalStorage<string>("searchValue");

  const helper = new Helper();
  const fetchData = async () => {
    const allData = await getData();
    if (allData) {
      setData(helper.addIsChecked(allData));
      setDrawData(helper.addIsChecked(allData));
    }
    if (storageData) {
      setData(storageData);
      const filterData = helper.search(storageData, "title", inputData);
      setDrawData(filterData);
    }
  };
  const filterByText = (text: string) => 
 

    setDrawData(helper.search(data, "title", text));
  
  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    filterByText(filterBy);
  }, [filterBy]);

  const changeState = (value: string) => {
    const findDataAndChange = (data: MainData[]) => {
      const preventData = helper.checkedStatus(data, value);
      const arrForDrawData = helper.search(preventData, "title", filterBy);
      localStoreInit("data", "set", preventData);
      setDrawData(arrForDrawData);
      setData(preventData);
    };
    findDataAndChange(data);
  };
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  if (!drawData.length) {
    return <h1>По вашему запросу нечего не найдена</h1>;
  }
  return (
    <div className={styles.mainWrapper}>
      {drawData.map((el) => (
        <DrawElements {...el} key={el.title} changeState={changeState} />
      ))}
    </div>
  );
};

export default Board;
