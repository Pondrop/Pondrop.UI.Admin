import styled from "styled-components";

import { IFormCellProps } from "./types";

export const FormCellContainer = styled.div<Pick<IFormCellProps, 'cellWidth'>>`
  display: flex;
  align-items: center;
  ${({ cellWidth }) => cellWidth === "auto" ? "flex: 1 0 auto;" : `flex: 0 0 ${cellWidth};`}
`;