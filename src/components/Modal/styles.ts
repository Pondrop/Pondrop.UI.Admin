import styled from "styled-components";

import { IModalBodyProps } from "./types";

export const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.bgDark};
  overflow: auto;
  z-index: 2;
`;

export const ModalBody = styled.div<IModalBodyProps>`
  background: ${({ theme }) => theme.bgWhite};
  height: auto;
  margin: auto;
  width: 41.7%;
  @media all and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 70%;
  }
  @media all and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    margin: 0px;
    height: 100vh;
    border-radius: 0px;
    padding: 0px 28px 0px 28px;
    border-top: none;
  }
  padding: 28px 28px 0px 28px;
  border-radius: ${({ theme }) => theme.borderRadiusMd};
  border-top: ${({ theme }) => `${theme.borderRadiusSm} solid ${theme.primary}`};
  position: relative;

  ${({ animationType }) => animationType && `
    animation: ${animationType} 0.6s;
    @keyframes grow {
      0% {
        transform: scale(0.6);
      }
      100% {
        transform: scale(1);
      }
    }
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    @keyframes top {
      0% {
        top: -300px;
        opacity: 0;
      }
      100% {
        top: 0;
        opacity: 1;
      }
    }
    @keyframes bottom {
      0% {
        bottom: -300px;
        opacity: 0;
      }
      100% {
        bottom: 0;
        opacity: 1;
      }
    }
    @keyframes left {
      0% {
        left: -300px;
        opacity: 0;
      }
      100% {
        left: 0;
        opacity: 1;
      }
    }
    @keyframes right {
      0% {
        right: -300px;
        opacity: 0;
      }
      100% {
        right: 0;
        opacity: 1;
      }
    }
  `}

  ${({ animate }) => animate && `
    animation: grow 0.5s;
    @keyframes grow {
      0% {
        transform: translate(-50%, -50%) scale(0);
      }
      100% {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  `}

  ${({ childModalVisibility, theme }) => childModalVisibility && `
    & > div:last-child {
      position: absolute;
      width: 62%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 1px solid ${theme.textBlack};
      @media all and (max-width: ${theme.breakpoints.sm}) {
        height: 50vh;
      }
    }
  `}
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  h2 {
    margin-bottom: 0px;
  }
  svg {
    cursor: pointer;
    width: 18px;
    height: 18px;
    fill: ${({ theme }) => theme.textDark};
    flex-shrink: 0;
  }
  @media all and (max-width: ${({ theme }) => theme.breakpoints.sm }) {
    padding-top: 28px;
  }
`;

export const ModalContent = styled.div`
  margin: 15px 0px;
  color: ${({ theme }) => theme.textExtraDark};
`;

export const ModalFooter = styled.div`
  margin: 10px -28px 0px -28px;
  padding: 20px 28px;
  display: inline-flex;
  justify-content: flex-end;
  width: 100%;
  background-color: ${({ theme }) => theme.bgLight};
  border-bottom-left-radius: ${({ theme }) => theme.borderRadiusMd};
  border-bottom-right-radius: ${({ theme }) => theme.borderRadiusMd};
  @media all and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 20px 0px;
    position: absolute;
    bottom: 0px;
    margin: 0px -28px 0px -28px;
    border-radius: 0px;
    & > div {
      margin-right: 28px;
    }
  }
  & > div {
    button {
      padding-left: 2vw;
      padding-right: 2vw;
    }
  }
`;