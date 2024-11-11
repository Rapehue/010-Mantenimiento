
// import { task } from '../data/task.js';
import { TaskCard } from "../components/TaskCard.jsx";
import { IconButton } from '@mui/material';
import { AddOutlined } from "@mui/icons-material"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from 'axios';
import { obtenerTareas } from "../helpers/index.js";
import { useFetch } from "../../hooks/index.js";

export const TaskPage = () => {
  
  const navigate = useNavigate();

  const [task, setTask] = useState([]);
  const [isLoadingTask, setIsLoadingTask] = useState(true);

  useEffect(() => {
      
    axiosInstance.get(`http://localhost:3001/obtenertareas`).then((response) => {
      setTask(response.data);
      console.log({ task })
      setIsLoadingTask(false);
    });
    


  }, [isLoadingTask]);

  const { data, hasError, isLoading } = useFetch( `http://localhost:3001/obtenerusuarios` );

  console.log ({ data, isLoading, hasError });

  return (
    <>
    {isLoadingTask || isLoading
      ? <div>...Cargando</div>
      :
    <div
      style={{ maxWidth: '95%' }}
    >
      <div className="row row-cols-1 row-cols-md-3 g-3">
              {
              task.map( item => (
                  <TaskCard 
                      key={ item.id_tarea }
                      { ...item }
                  />
              ))
              }
      
      <IconButton
          // disabled={ isSaving }
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
