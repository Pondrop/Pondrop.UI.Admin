export interface ICreateCategoryRequest {
  name: string;
  type: string;
  publicationLifecycleId?: string;
}

export interface ICreateCategGroupingRequest {
  description?: string;
  higherLevelCategoryId: string;
  lowerLevelCategoryId: string;
  publicationLifecycleId: string;
}

export type ICategoryDialogData = Pick<ICreateCategoryRequest, 'name'> & Pick<ICreateCategGroupingRequest, 'higherLevelCategoryId'>;

export interface ICategory {
  id: string;
  name: string;
  type: string;
  publicationLifecycleId: string;
  createdBy: string;
  updatedBy: string;
  createdUtc: string;
  updatedUtc: string;
}

export interface ICategoryGrouping {
  id: string;
  higherLevelCategoryId: string;
  lowerLevelCategoryId: string;
  description: string;
  publicationLifecycleId: string;
  createdBy: string;
  updatedBy: string;
  createdUtc: string;
  updatedUtc: string;
}
