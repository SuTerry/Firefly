import { TextField } from '@mui/material'

import { styled } from '@mui/material/styles'

export default styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    color: '#fff',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}))
