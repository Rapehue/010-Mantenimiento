import axiosInstance from 'axios';

export const loadTasksbyId = async ( id = '' ) => {

    const tasks = [];

    tasks = axiosInstance.get(`http://localhost:3001/obtenertareas/${id}`);

    console.log(tasks);
    return tasks;
}

export const obtenerUsuarios = async () => { 
    try { 
      const response = await axiosInstance.get(`http://localhost:3001/obtenerusuarios`)
      const jsonData = await response.data; 
      return jsonData;
    } catch (error) { 
      console.error('Error al obtener datos de la API:', error); 
    } 
}

export const obtenerProyectos = async () => { 
    try { 
      const response = await axiosInstance.get(`http://localhost:3001/obtenerproyectos`)
      const jsonData = await response.data; 
      return jsonData;
    } catch (error) { 
      console.error('Error al obtener datos de la API:', error); 
    } 
}

export const obtenerTareas = async () => {
    try {
    const { data } = axiosInstance.get(`http://localhost:3001/obtenertareas`)
        
        return data;    
    
    } catch (error) {
        console.log(error)
    } 
}