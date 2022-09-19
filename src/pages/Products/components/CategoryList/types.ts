import { IValue } from 'store/api/types';

export interface ICategoryListProps {
  onRowClick?: (category: IValue) => void;
  onManageCategoriesClick?: () => void;
}
