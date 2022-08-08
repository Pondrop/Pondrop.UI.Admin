import styled, { css } from 'styled-components';

import { IFormCellProps } from './types';

export const FormCellContainer = styled.div<Pick<IFormCellProps, 'cellWidth'>>(
  (props) => css`
    display: flex;
    align-items: center;
    ${props.cellWidth === 'auto' ? 'flex: 1 0 auto;' : `flex: 0 0 ${props.cellWidth};`}
  `
);
