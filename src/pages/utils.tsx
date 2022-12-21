import { CircularProgress } from "@mui/material";

// Styles
import { CircularLoaderWrapper } from "./styles";

export const renderLoader = (height: string, size: number, thickness: number) => (
  <CircularLoaderWrapper height={height}>
    <CircularProgress size={size} thickness={thickness} />
  </CircularLoaderWrapper>
);