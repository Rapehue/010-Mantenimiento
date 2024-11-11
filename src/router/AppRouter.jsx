import { Route, Routes } from 'react-router-dom';

import { BugRoutes } from '../bugs/routes/BugRoutes';
import { LoginPage } from '../auth';



export const AppRouter = () => {
  return (
    <>

        <Routes>
            
            <Route path="login" element={<LoginPage />} />
            
            
            <Route path="/*" element={ <BugRoutes />} />
            
            

        </Routes>
    
    </>
  )
}
