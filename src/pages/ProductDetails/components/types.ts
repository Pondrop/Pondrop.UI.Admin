import { CommonTabPanelProps } from "pages/types";
import { IFullProductInfo } from "store/api/products/types";

// Props passed to Product Details Tab component
export interface IProductDetailTabProps extends CommonTabPanelProps {
  data?: IFullProductInfo;
}
