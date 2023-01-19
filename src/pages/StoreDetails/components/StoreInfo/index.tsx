import { useEffect, useState } from 'react';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';

//Components
import EditStoreDialog from '../EditStoreDialog';

// Constants
import { storeTitles } from './constants';

// Store/APIs
import { useAppDispatch, useAppSelector } from 'store';
import {
  storeApi,
  storesMicroService,
  useGetFullStoreInfoQuery,
  useGetStoresQuery,
  useLazyRefreshStoresQuery,
  useUpdateAddressMutation,
  useUpdateStoreMutation,
} from 'store/api/stores/api';
import { selectStores } from 'store/api/stores/slice';

// Styles
import { RowAlignWrapper, SpaceBetweenDiv, StyledCard, StyledCardTitle, StyledTabContent } from 'pages/styles';

// Types
import { IFullStoreInfo, IStoreAddress } from 'store/api/stores/types';
import { IValue } from 'store/api/types';
import { ITabPanelProps } from 'pages/types';
import { IEditStoreData } from '../EditStoreDialog/types';

const StoreInfoPanel = ({ value, index, data }: ITabPanelProps): JSX.Element => {
  const [storeInfo, setStoreInfo] = useState<IFullStoreInfo>({} as IFullStoreInfo);
  const [newStoreData, setNewStoreData] = useState<IEditStoreData>({} as IEditStoreData);
  const [initialStoreValues, setInitialStoreValues] = useState<IEditStoreData>({} as IEditStoreData);
  const [isEditStoreModalOpen, setIsEditStoreModalOpen] = useState<boolean>(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { refetch, isSuccess: isGetFullStoreInfoSuccess } = useGetFullStoreInfoQuery({ storeId: data?.id as string });

  const [updateStore, { isSuccess: isUpdateStoreSuccess, reset: resetUpdateStore, isLoading: isUpdateStoreLoading }] =
    useUpdateStoreMutation({ fixedCacheKey: 'update-store-mutation' });

  const [
    updateAddress,
    { isSuccess: isUpdateAddressSuccess, reset: resetUpdateAddress, isLoading: isUpdateAddressLoading },
  ] = useUpdateAddressMutation({ fixedCacheKey: 'update-address-mutation' });

  const [refreshStores, { isFetching: isRefreshFetching, isSuccess: isRefreshSuccess }] = useLazyRefreshStoresQuery();

  const { filterItem, searchValue = '', selectedProviders = [], sortValue } = useAppSelector(selectStores);
  const { refetch: refetchStores } = useGetStoresQuery({
    searchString: searchValue,
    sortValue,
    filterItem,
    prevPageItems: 0,
    pageSize: 10,
    selectedProviders,
  });

  const handleEditStoreModalOpen = () => {
    setIsEditStoreModalOpen(true);
  };

  const handleEditStoreModalClose = () => {
    setIsEditStoreModalOpen(false);
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
    resetUpdateAddress();
    resetUpdateStore();
  };

  const handleEditStoreSubmit = (storeData: IEditStoreData) => {
    setNewStoreData(storeData);
    updateStore({
      id: storeInfo?.id as string,
      name: storeData?.name as string,
    });
  };

  useEffect(() => {
    const retailer = data?.retailer as unknown as IValue;
    setStoreInfo((data ?? {}) as unknown as IFullStoreInfo);
    setInitialStoreValues({
      isCommunityStore: (data?.isCommunityStore as boolean) ?? false,
      retailer: { name: retailer.name as string },
      name: data?.name as string,
      addressLine1: (data as unknown as IFullStoreInfo).addresses[0]?.addressLine1,
      suburb: (data as unknown as IFullStoreInfo).addresses[0]?.suburb,
      state: (data as unknown as IFullStoreInfo).addresses[0]?.state,
      postcode: (data as unknown as IFullStoreInfo).addresses[0]?.postcode,
      location: `${(data as unknown as IFullStoreInfo).addresses[0]?.latitude}, ${
        (data as unknown as IFullStoreInfo).addresses[0]?.longitude
      }` as string,
    });
  }, [data]);

  useEffect(() => {
    if (isUpdateStoreSuccess && !isUpdateStoreLoading) {
      const locValues = newStoreData?.location.split(',').map((loc) => loc.trim());
      const addressValues = storeInfo.addresses[0];
      updateAddress({
        id: addressValues.id,
        storeId: storeInfo?.id,
        addressLine1: newStoreData?.addressLine1,
        addressLine2: addressValues.addressLine2,
        suburb: newStoreData?.suburb,
        state: newStoreData?.state,
        postcode: newStoreData?.postcode,
        country: addressValues.country,
        latitude: Number(locValues[0]),
        longitude: Number(locValues[1]),
      });
    }
  }, [isUpdateStoreSuccess, isUpdateStoreLoading]);

  useEffect(() => {
    setIsSnackbarOpen(isUpdateAddressSuccess);
    if (isUpdateAddressSuccess) {
      handleEditStoreModalClose();
      setTimeout(() => {
        dispatch(storesMicroService.util.resetApiState());
        refetch();
      }, 1000);
    }
  }, [isUpdateAddressSuccess, isUpdateAddressLoading]);

  useEffect(() => {
    if (isGetFullStoreInfoSuccess) refreshStores();
  }, [isGetFullStoreInfoSuccess]);

  // When refresh products is called and is finished, reset API and refetch data after 7s
  // 7s was determined to be the time it takes to get the correct values from the search index
  useEffect(() => {
    if (!isRefreshFetching && isRefreshSuccess) {
      setTimeout(() => {
        dispatch(storeApi.util.resetApiState());
        refetchStores();
      }, 7000);
    }
  }, [isRefreshFetching, isRefreshSuccess]);

  const renderStoreDetails = () => {
    return storeTitles.map((row, index) => {
      if (index === 0) {
        return (
          <SpaceBetweenDiv key={`${storeInfo.id}-details-${index}`}>
            <span className="row-label">{row.label}</span>
            <span className="row-value singleline">{storeInfo?.isCommunityStore ? 'Yes' : 'No'}</span>
          </SpaceBetweenDiv>
        );
      } else if (index === 1) {
        const retailer = storeInfo?.retailer as unknown as IValue;
        return (
          <SpaceBetweenDiv key={`${storeInfo.id}-details-${index}`}>
            <span className="row-label">{row.label}</span>
            <span className="row-value singleline">{retailer?.name}</span>
          </SpaceBetweenDiv>
        );
      } else if (index === storeTitles.length - 1) {
        return (
          <SpaceBetweenDiv key={`${storeInfo.id}-details-${index}`}>
            <span className="row-label">{row.label}</span>
            <span className="row-value singleline">{`${storeInfo?.addresses ? storeInfo?.addresses[0].latitude : 0}, ${
              storeInfo?.addresses ? storeInfo?.addresses[0].longitude : 0
            }`}</span>
          </SpaceBetweenDiv>
        );
      } else if (index > 2) {
        return (
          <SpaceBetweenDiv key={`${storeInfo.id}-details-${index}`}>
            <span className="row-label">{row.label}</span>
            <span className="row-value singleline">
              {storeInfo?.addresses ? storeInfo?.addresses[0][row.field as keyof IStoreAddress] : ''}
            </span>
          </SpaceBetweenDiv>
        );
      }
      return (
        <SpaceBetweenDiv key={`${storeInfo.id}-details-${index}`}>
          <span className="row-label">{row.label}</span>
          <span className="row-value singleline">{storeInfo?.[row.field as keyof IFullStoreInfo]}</span>
        </SpaceBetweenDiv>
      );
    });
  };

  const renderOpeningHours = () => {
    const storeHoursArray = String(storeInfo?.openHours).split(' | ');

    return storeHoursArray.map((row, index) => {
      const labelValue = row.split(':- ')[0];
      const hoursValue = row.split(':- ')[1];
      return (
        <SpaceBetweenDiv key={`${storeInfo.id}-hours-${index}`}>
          <span className="row-label capitalize">{labelValue}</span>
          <span className="row-value singleline">{hoursValue}</span>
        </SpaceBetweenDiv>
      );
    });
  };

  return (
    <StyledTabContent role="tabpanel" hidden={value !== index} id="store-detail-0" aria-labelledby="tab-0">
      <RowAlignWrapper>
        <StyledCard width="470px">
          <StyledCardTitle variant="h6" gutterBottom>
            <SpaceBetweenDiv withmargin={false}>
              Details
              <IconButton aria-label="edit" size="small" onClick={handleEditStoreModalOpen}>
                <EditOutlined fontSize="inherit" />
              </IconButton>
            </SpaceBetweenDiv>
          </StyledCardTitle>
          {renderStoreDetails()}
          <RowAlignWrapper></RowAlignWrapper>
        </StyledCard>
        <StyledCard width="350px">
          <StyledCardTitle variant="h6" gutterBottom>
            Opening Hours
          </StyledCardTitle>
          {renderOpeningHours()}
          <RowAlignWrapper></RowAlignWrapper>
        </StyledCard>
      </RowAlignWrapper>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isSnackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={3000}
      >
        <Alert severity="success" onClose={handleSnackbarClose} sx={{ width: '100%' }}>
          Changes saved successfully
        </Alert>
      </Snackbar>
      <EditStoreDialog
        isOpen={isEditStoreModalOpen}
        handleClose={handleEditStoreModalClose}
        handleSubmit={handleEditStoreSubmit}
        isLoading={isUpdateStoreLoading || isUpdateAddressLoading}
        initialValue={initialStoreValues}
      />
    </StyledTabContent>
  );
};

export default StoreInfoPanel;
