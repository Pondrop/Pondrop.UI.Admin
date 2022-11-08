import { IValue } from "store/api/types";

export interface ICategoryListProps {
  onParentCategoryChange?: () => void;
  onManageCategoriesClick?: () => void;
}

export interface IParentCategAPI {
  items: IValue[];
  count: number;
  limit: number;
  offset: number;
}
