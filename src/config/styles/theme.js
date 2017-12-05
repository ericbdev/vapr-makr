import { createMuiTheme } from 'material-ui/styles';
import { blueGrey, indigo } from 'material-ui/colors';

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: indigo,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

export default theme;
