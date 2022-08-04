import React from 'react';
import { SkeletonLoadingWrapper, SkeletonBar } from './styles';

const SkeletonLoading: React.FunctionComponent = (): JSX.Element => {
  return (
    <SkeletonLoadingWrapper>
      <SkeletonBar />
      <SkeletonBar />
      <SkeletonBar />
      <SkeletonBar />
    </SkeletonLoadingWrapper>
  );
};

export default SkeletonLoading;
