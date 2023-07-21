import React from "react";
function useLocalStorage<T>(defaultKey: string = "") {
  const [storageData, setStorageData] = React.useState<T>(() => {
    if (localStorage.getItem(defaultKey)) {
      return JSON.parse(localStorage.getItem(defaultKey) || "");
    } else {
      return "";
    }
  });

  const localStoreInit = (key: string, state: "set" | "clear", data?: T) => {
    if (state === "set") {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.removeItem(key);
      setStorageData(null as T);
    }
  };

  return { storageData, localStoreInit };
}

export default useLocalStorage;
