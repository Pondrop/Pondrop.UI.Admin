import { createStyles, makeStyles } from '@mui/styles';

const useGlobalStyles = makeStyles(() =>
  createStyles({
    '@global': {
      body: {
        fontFamily: 'Roboto',
        margin: '0',
      },
      main: {
        padding: '0',
      },
    },
  }),
);

const GlobalStyles = () => {
  useGlobalStyles();

  return null;
};

export default GlobalStyles;
