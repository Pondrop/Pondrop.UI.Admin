export interface IUpdateStore {
  id: string;
  name: string;
}

export interface IUpdateAddress {
  id: string;
  storeId: string;
  addressLine1: string;
  addressLine2: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface IPosition {
  coordinates: number[];
  latitude: string;
  longitude: string;
  altitude: unknown;
}

export interface ILocationSort {
  position: IPosition;
  crs: { type: string; };
  type: string;
  boundingBox: unknown;
  additionalProperties: {
    [key: string]: unknown;
  };
}

export interface IStoreAddress {
  id: string;
  externalReferenceId: string;
  addressLine1: string;
  addressLine2: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
  latitude: string;
  longitude: string;
  locationSort: ILocationSort;
  createdBy: string;
  updatedBy: string;
  createdUtc: string;
  updatedUtc: string;
}

export interface IUpdateStoreResponse {
  id: string;
  name: string;
  status: string;
  externalReferenceId: string;
  phone: string;
  email: string;
  openHours: string;
  isCommunityStore: string;
  addresses: IStoreAddress[];
  retailerId: string;
  storeTypeId: string;
  createdBy: string;
  updatedBy: string;
  createdUtc: string;
  updatedUtc: string;
}

export interface IRetailer {
  id: string;
  externalReferenceId: string;
  name: string;
  createdBy: string;
  updatedBy: string;
  createdUtc: string;
  updatedUtc: string;
}

export interface IStoreType {
  id: string;
  externalReferenceId: string;
  name: string;
  sector: string;
  createdBy: string;
  updatedBy: string;
  createdUtc: string;
  updatedUtc: string;
}

export interface IFullStoreInfo extends IUpdateStoreResponse {
  retailer: IRetailer;
  storeType: IStoreType;
}
