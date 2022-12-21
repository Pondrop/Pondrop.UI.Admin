// Props passed to Add Linked Products modal
export interface IAddLinkedProductsProps {
  isOpen: boolean;
  handleClose: () => void;
  baseCategory: string;
  categoryId: string;
  linkedProducts: string[];
}
