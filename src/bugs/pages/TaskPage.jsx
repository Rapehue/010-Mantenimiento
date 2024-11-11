
// import { task } from '../data/task.js';
import { TaskCard } from "../components/TaskCard.jsx";
import { IconButton } from '@mui/material';
import { AddOutlined } from "@mui/icons-material"
import { useNavigate } from 'react-router-dom';
import { useFetch } from "../../hooks";
import { useEffect } from "react";

export const TaskPage = () => {
  
  const navigate = useNavigate();

  const { data, hasError, isLoading } = useFetch( `http://localhost:3001/obtenertareas` );

  useEffect(() => {
    
  }, [data])
  

  return (
    <>
    {isLoading
      ? <div>...Cargando</div>
      :
    <div
      style={{ maxWidth: '95%' }}
    >
      <div className="row row-cols-1 row-cols-md-3 g-3">
              {
              data.map( item => (
                  <TaskCard 
                      key={ item.id_tarea }
                      { ...item }
                  />
              ))
              }
      
      <IconButton
          onClick={() => navigate(`task/create_task`)}
          size='large'
          sx={{
            color: 'white',
            backgroundColor: 'error.main',
            ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
            position: 'fixed',
            right: 50,
            bottom: 50
          }}>
            <AddOutlined sx={{ fontSize: 30 }}/>
        </IconButton>

      </div>
    </div>
    }
    </>
  )
}
