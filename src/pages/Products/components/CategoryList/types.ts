import { IValue } from "store/api/types";

export interface ICategoryListProps {
  onManageCategoriesClick?: () => void;
  sortedData?: IValue[];
  handleParentCategoryClick: (category: IValue) => void;
}
