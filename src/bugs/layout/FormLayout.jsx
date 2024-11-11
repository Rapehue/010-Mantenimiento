import { Grid2, Typography } from "@mui/material"

export const FormLayout = ({ children, title }) => {

  return (

    <Grid2 
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: '#e9ecef', padding: 4, maxWidth: '95%' }}
    >

        <Grid2
            className='box-shadow'
            xs= { 3 }
            sx={{ 
                width: '90%',
                backgroundColor: 'rgb(255, 206, 143)', 
                padding: 3, 
                borderRadius: 2
        }}>
            <Typography 
              variant='h6'
              padding={2}
            >{ title }</Typography>

            { children }


        </Grid2>
    </Grid2>
  )
}
