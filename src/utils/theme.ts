import { createTheme } from '@mui/material/styles'

const fontColor = '#fff'

export default createTheme({
  palette: {
    primary: {
      // main: '#000000'
      main: '#fff',
    },
  },
  typography: {
    fontFamily: [''].join(','),
    body1: {
      color: fontColor,
      // lineHeight: 2,
    },
    h1: {
      color: fontColor,
    },
    h2: {
      color: fontColor,
    },
    h3: {
      color: fontColor,
    },
    h4: {
      color: fontColor,
    },
    h5: {
      color: fontColor,
    },
    h6: {
      color: fontColor,
    },
  },
})
