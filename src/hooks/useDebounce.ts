import React from "react";

const useDebounce = (text: string, duration: number = 100) => {
  const [value, setValue] = React.useState<string>("");

  React.useEffect(() => {
    const time = setTimeout(() => {
      setValue(text);
    }, duration);
    return () => {
      clearTimeout(time);
    };
  }, [text]);
  return value;
};

export default useDebounce;
