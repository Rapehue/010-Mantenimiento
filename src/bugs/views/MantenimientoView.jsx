import { Grid2 } from '@mui/material';
import { AllTaskPage } from '../pages/AllTaskPage';
import { useSelector } from 'react-redux';
import { AllDeliveryPage } from '../pages/AllDeliveryPage';
import { AllTimeReport } from '../pages/AllTimeReport';


export const MantenimientoView = () => {

  const { pantalla } = useSelector( state => state.mantenimiento );

  return (
    <Grid2
      container
      spacing={ 0 }
      direction="column"
    //   alignItems="center"
    //   justifyContent="center"
      sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: 'azure', borderRadius: 3 }}
    >

    {
      pantalla === 'Tareas'
      ? <AllTaskPage />
      : pantalla === 'Entregables'
        ? <AllDeliveryPage />
        : <AllTimeReport />
    }
        

    </Grid2>
  )
}