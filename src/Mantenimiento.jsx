
import { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { TaskDetailPage } from './bugs/pages/TaskDetailPage';
import { TaskPage } from './bugs/pages/TaskPage';
import { DeliveryDetailPage } from './bugs/pages/DeliveryDetailPage';
import { FormTask } from './bugs/pages/FormTask';
import { FormDelivery } from './bugs/pages/FormDelivery';
import { FormEstimate } from './bugs/pages/FormEstimate';
import { FormImputacion } from './bugs/pages/FormImputacion';
import { FormNote } from './bugs/pages/FormNote';
import { AllDeliveryPage } from './bugs/pages/AllDeliveryPage';
import { AllTaskPage } from './bugs/pages/AllTaskPage';
import { MantenimientoPage } from './bugs/pages/MantenimientoPage';
import { AppRouter } from './router/AppRouter';

export const Mantenimiento = () => {

  return (
    // <Routes>
    //     {/* <Route path="/*" element={ <AllTaskPage />}/> */}
    //     {/* <Route path="/*" element={ <MantenimientoPage />}/> */}
    //     {/* <Route path="/*" element={ <AllDeliveryPage />}/> */}
    //     <Route path="/*" element={ <TaskPage />}/>
    //     <Route path="task/create_task" element={<FormTask />}/>
    //     <Route path="task/create_delivery" element={<FormDelivery />}/>
    //     <Route path="task/:id/delivery/create_imputacion" element={<FormImputacion />}/>
    //     <Route path="task/:id/create_estimate" element={<FormEstimate />}/>
    //     <Route path="delivery/:id" element={<DeliveryDetailPage />}/>
    //     <Route path="delivery/:id/create_note" element={<FormNote />}/>
    //     <Route path="task/:id" element={<TaskDetailPage />}/>
    // </Routes>
    <AppRouter />
  )
}
