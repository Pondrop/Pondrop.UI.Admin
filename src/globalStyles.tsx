import { createGlobalStyle, DefaultTheme } from 'styled-components';

const GlobalStyles = createGlobalStyle<{ theme: DefaultTheme }>`
    body {
        font-family: Roboto;
        margin: 0;
    }
    main {
        padding: 0px;
    }
    a {
        color: ${({ theme }) => theme.primary};
    }
    h1 {
        font-size: 20px;
        @media all and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
            font-size: 26px;
        }
    }
    h2 {
        font-size: 16px;
        @media all and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
            font-size: 22px;
        }
    }
    h3 {
        font-size: 12px;
        @media all and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
            font-size: 18px;
        }
    }
`;

export default GlobalStyles;
