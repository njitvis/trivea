import { createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
  spacing:3,      
  typography: {
    button: {
      textTransform: 'none'
    }
  },
  overrides:{
    MuiGrid:{
      root:{
        margin:0,
        padding:0
      },
    }
  }
});
export default theme;