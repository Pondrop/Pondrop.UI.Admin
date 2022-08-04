import { ReactNode } from "react";

export interface IBreadCrumbLink {
  label: string;
  url: string;
  image?: ReactNode;
}

export interface IBreadCrumbProps {
  links: IBreadCrumbLink[];
  separator?: string | ReactNode;
  customSeparator?: boolean;
}

export interface IBreadCrumbContainer {
  customSeparator?: boolean;
  breadcrumbImg?: boolean;
}