import { Route, Routes } from 'react-router-dom';

import { TaskDetailPage } from '../pages/TaskDetailPage';
import { FormTask } from '../pages/FormTask';
import { MantenimientoPage } from '../pages/MantenimientoPage';
import { FormDelivery } from '../pages/FormDelivery';
import { FormImputacion } from '../pages/FormImputacion';
import { FormImputacion_MantenimientoView } from '../pages/FormImputacion_MantenimientoView';
import { FormEstimate } from '../pages/FormEstimate';
import { DeliveryDetailPage } from '../pages/DeliveryDetailPage';
import { FormNote } from '../pages/FormNote';
import { FormDeliveryUpdate } from '../pages/FormDeliveryUpdate';
import { TaskPage } from '../pages/TaskPage';

export const BugRoutes = () => {
  return (
  <Routes>
        {/* <Route path="task/:id_tarea" element={<TaskCardDetail />}/> */}

        {/* <Route path="/*" element={ <TaskPage />}/> */}
        <Route path="/*" element={ <MantenimientoPage />}/>

        <Route path="/task/create_task/" element={<FormTask />}/>

        <Route path="task/:id" element={<TaskDetailPage />}/>

        <Route path="task/create_delivery" element={<FormDelivery />}/>
        // Version para TaskPage
        {/* <Route path="task/:id/delivery/create_imputacion" element={<FormImputacion />}/> */}
        // Version para MantenimientoView
        <Route path="task/:id/delivery/create_imputacion" element={<FormImputacion_MantenimientoView />}/>
        <Route path="task/:id/create_estimate" element={<FormEstimate />}/>
        <Route path="delivery/:id" element={<DeliveryDetailPage />}/>
        <Route path="delivery/:id/create_note" element={<FormNote />}/>

        <Route path="delivery/update_entregable" element={<FormDeliveryUpdate />}/>

    </Routes>
  )
}
