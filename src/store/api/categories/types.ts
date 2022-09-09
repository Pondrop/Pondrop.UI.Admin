export interface ICreateCategoryRequest {
  categoryName: string;
  description: string;
  publicationLifecycleId?: string;
}

export interface ICategory {
  id: string;
  categoryName: string;
  description: string;
  publicationLifecycleId: string;
  createdBy: string;
  updatedBy: string;
  createdUtc: string;
  updatedUtc: string;
}
