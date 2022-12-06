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

export interface ISetCategoriesRequest {
  productId: string;
  categoryIds: string[];
  publicationLifecycleId?: string;
}

export interface ISetProductsRequest {
  categoryId: string;
  productIds: string[];
  publicationLifecycleId?: string;
}

export interface ISetLinkedItem {
  id: string;
  categoryId: string;
  productId: string;
  publicationLifecycleId?: string;
  createdBy: string;
  updatedBy: string;
  createdUtc: string;
  updatedUtc: string;
}

export interface ICategoryType {
  id: string;
  name: string;
  type: string;
}

export interface IFullProductInfo {
  id: string;
  parentCategoryId: string;
  name: string;
  brandId: string;
  externalReferenceId: string;
  variant: string;
  altName: string;
  shortDescription: string;
  netContent: number;
  netContentUom: string;
  possibleCategories: string;
  publicationLifecycleId: string;
  childProductId: string[];
  barcodeNumber: string;
  categoryNames: string;
  parentCategory: ICategoryType;
  categories: ICategoryType[];
}

export interface ICheckProductInfo {
  name: string;
  brandId: string;
  externalReferenceId: string;
  variant: string;
  altName: string;
  shortDescription: string;
  netContent: number;
  netContentUom: string;
  possibleCategories: string;
  publicationLifecycleId: string;
  childProductId: string[];
  id: string;
  streamId: string;
  streamType: string;
  atSequence: number;
  createdBy: string;
  updatedBy: string;
  createdUtc: string;
  updatedUtc: string;
  deletedUtc: string;
  eventsCount: number;
}
