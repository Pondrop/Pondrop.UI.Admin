import { createStyles, makeStyles } from '@mui/styles';

const useGlobalStyles = makeStyles(() =>
  createStyles({
    '@global': {
      body: {
        fontFamily: 'Roboto',
        margin: '0',
        '& .MuiPaper-root': {
          borderRadius: '12px',
        },
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
