import { IValue } from "store/api/types";

// Props passed to Category List component
export interface ICategoryListProps {
  onManageCategoriesClick?: () => void;
  sortedData?: IValue[];
  handleParentCategoryClick: (category: IValue) => void;
}
