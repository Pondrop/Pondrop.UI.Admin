import styled from "@emotion/styled";
import { DateTimePicker } from '@mui/x-date-pickers';

export const StyledDatePicker = styled(DateTimePicker)`
  margin-bottom: 8px;
  
  & legend {
    display: none;
  }

  & fieldset {
    top: 0;
  }

  & input {
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    padding: 16px 12px;
    border-radius: 8px;
    color: #001f2a;

    &::placeholder {
      color: #72787e;
      opacity: 1;
    }
  }

  .MuiOutlinedInput-root,.MuiPaper-root-MuiDialog-paper {
    border-color: rgba(0, 0, 0, 0.24) !important;
    border-radius: 8px !important;
  }
`;
