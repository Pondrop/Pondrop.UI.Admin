// Add Product initial values type
export interface IEditStoreData {
  isCommunityStore: boolean;
  retailer: { name: string; };
  name: string;
  addressLine1: string;
  suburb: string;
  state: string;
  postcode: string;
  location: string;
}

// Props passed to Add Product Dialog
export interface IAddProductProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: (storeData: IEditStoreData) => void;
  isLoading?: boolean;
  initialValue: IEditStoreData;
}
