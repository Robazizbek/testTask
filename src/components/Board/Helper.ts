import { MainData } from "../../types";
class Helper {
  foundItems = [] as MainData[];
  addIsChecked(data: MainData[]): MainData[] {
    const array = [...data];
    data.forEach((el) => {
      el.isChecked = false;
      if (el.children) {
        this.addIsChecked(el.children);
      }
    });
    return array;
  }
  checkedStatus(data: MainData[], title: string): MainData[] {
    const preventData = [...data];
    preventData.forEach((el) => {
      if (el.title === title) {
        el.isChecked = !el.isChecked;
      } else if (el.children) {
        this.checkedStatus(el.children, title);
      }
    });
    return preventData;
  }

   search(data: MainData[], key: keyof MainData, value: string): MainData[] {
    if (value) {
      for (let i = 0; i < data.length; i++) {
        const findByData = (data[i][key] as string)
          .toLowerCase()
          .includes(value.toLowerCase());
        if (findByData && !this.foundItems.includes(data[i])) {
          this.foundItems.push(data[i]);
        } else if (data[i].children && !findByData) {
          this.search(data[i].children!, key, value);
        }
      }
    }
    let result = this.foundItems.filter((el) =>
      el.title.toLowerCase().includes(value.toLowerCase())
    );
    return value ? result : data;
  }
}
export default Helper;
