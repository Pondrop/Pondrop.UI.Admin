import { Moment } from 'moment';
import { IModalState } from "pages/types"

// Props passed to Review Cards component
export interface IReviewCardsInfo {
  data: IModalState;
  onStoreCompletionChange: (value: number) => void;
  onStartDateChange: (value: Moment) => void;
  onEndDateChange: (value: Moment) => void;
}
