import { createMuiTheme } from 'material-ui/styles';
import themeStyles from './styles';

const theme = createMuiTheme({
  palette: themeStyles.palette,
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  spacing: {
    unit: 8,
  },
});

export default theme;