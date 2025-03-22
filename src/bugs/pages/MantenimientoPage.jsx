import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { MantenimientoLayout } from '../layout/MantenimientoLayout';
import { AllTaskPage } from './AllTaskPage';
import { MantenimientoView } from '../views';

export const MantenimientoPage = () => {

  return (
    <MantenimientoLayout>
      
      <MantenimientoView />
      {/* <AllTaskPage />    */}
      
    </MantenimientoLayout>
  )
}