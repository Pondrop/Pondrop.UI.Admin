export interface ISearchFieldProps {
  onEnterPress?: (searchValue: string) => void;
  value: string;
  id: string;
  isfullsize?: boolean;
  width?: number;
  onChange?: (searchValue: string) => void;
}
