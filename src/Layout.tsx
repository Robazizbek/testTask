import React from "react";
import { Board, Header } from "./components";
import { useLocalStorage } from "./hooks";

const Layout = () => {
  const [filterBy, setFilterBy] = React.useState<string>("");

  const { localStoreInit } = useLocalStorage();

  const changeFilterHandler = (value: string) => {
    setFilterBy(value);
    localStoreInit("searchValue", "set", value);
  };

  return (
    <>
      <Header changeFilterHandler={changeFilterHandler} />
      <Board filterBy={filterBy} />
    </>
  );
};

export default Layout;
