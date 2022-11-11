import { CommonTabPanelProps } from "pages/types";
import { IFullProductInfo } from "store/api/products/types";

export interface IProductDetailTabProps extends CommonTabPanelProps {
  data?: IFullProductInfo;
}
