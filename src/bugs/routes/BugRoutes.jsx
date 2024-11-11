import { Route, Routes } from 'react-router-dom';

import { TaskDetailPage } from '../pages/TaskDetailPage';
import { FormTask } from '../pages/FormTask';

export const BugRoutes = () => {
  return (
  <Routes>
        {/* <Route path="task/:id_tarea" element={<TaskCardDetail />}/> */}

        <Route path="task/:id" element={<TaskDetailPage />}/>

        <Route path="create_task/" element={<FormTask />}/>

    </Routes>
  )
}
