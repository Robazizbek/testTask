import React from "react";
import { MainData } from "../types";

const useFetching = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");

  const getData = async (): Promise<MainData[] | undefined> => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/data.json");
      const data = await response.json();
      return data;
    } catch (error) {
      setError("Ошибка при запросе");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getData,
    error,
    isLoading,
  };
};

export default useFetching;
