export interface ICreateProductRequest {
  name: string;
  brandId?: string;
  variant?: string;
  altName?: string;
  shortDescription?: string;
  netContent?: number;
  netContentUom?: string;
  possibleCategories?: string;
  childProductId?: string[];
  publicationLifecycleId?: string;
  categoryIds?: string[];
  barcodeNumber?: string;
}

export interface ICreateProduct extends ICreateProductRequest {
  id: string;
  externalReferenceId: string;
  createdBy: string;
  updatedBy: string;
  createdUtc: string;
  updatedUtc: string;
}

export interface IProductDialogData {
  name: string;
  barcodeNumber?: string;
  shortDescription?: string;
  categoryIds?: string[];
}
