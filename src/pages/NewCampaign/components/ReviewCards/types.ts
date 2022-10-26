import { Moment } from 'moment';
import { IModalState } from "pages/types"

export interface IReviewCardsInfo {
  data: IModalState;
  onStoreCompletionChange: (value: number) => void;
  onEndDateChange: (value: Moment) => void;
}
