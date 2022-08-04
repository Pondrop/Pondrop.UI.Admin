import { ReactNode } from "react";

export interface IMenu {
  label: string;
  path: string;
}

export interface IHeaderProps {
  title: string;
  logo?: ReactNode;
  menu?: IMenu[];
  children?: ReactNode;
  endElement?: ReactNode;
}