export interface MainData {
  title: string;
  code?: string;
  isChecked: boolean;
  firstRow?:boolean
  children?: MainData[];
}
