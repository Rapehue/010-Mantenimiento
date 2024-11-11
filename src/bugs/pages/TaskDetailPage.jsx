import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axiosInstance from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DeliveryCard } from '../components/DeliveryCard';
import { IconButton } from '@mui/material';
import { AddOutlined } from "@mui/icons-material"
import Divider from '@mui/material/Divider';
import { formateaFechaHoraLeeMySql, formateaFechaHoraEscribeMySql, ObtenerFechaHoraActual } from '../helpers/generaFechaHora';
import { useDispatch, useSelector } from "react-redux";
import { setActiveTask } from "../../store/slices/mantenimientoSlice";
import { MyVerticallyCenteredModal } from "../components/MyVerticallyCenteredModal";

export const TaskDetailPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [delivery, setDelivery] = useState([]);
    const [task, setTask] = useState([]);
    const [maxTask, setMaxTask] = useState([])
    const [taskHis, setTaskHis] = useState([])
    const [usuario, setUsuario] = useState([])

    const [isLoadingTask, setIsLoadingTask] = useState(true);
    const [isLoadingTaskHis, setIsLoadingTaskHis] = useState(true);
    const [isLoadingDelivery, setIsLoadingDelivery] = useState(true);
    const [isLoadingMaxTareaId, setIsLoadingMaxTareaId] = useState(true);
    const [isLoadingUsuario, setIsLoadingUsuario] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    
    const [estado, setEstado] = useState('')
    
    const [isUpdated, setIsUpdated] = useState(false);

    const { value } = useSelector( state => state.mantenimiento );

    useEffect(() => { 
      
      axiosInstance.get(`http://localhost:3001/obtenertareas/${id}`).then((response) => {
        setTask(response.data);
        dispatch( setActiveTask( ...response.data ) );
        console.log({ task })
        setIsLoadingTask(false);
      });

      axiosInstance.get(`http://localhost:3001/obtenerestadosdesc/Asignado`).then((response) => {
        setEstado(response.data);
        console.log({ estado })
      });

      axiosInstance.get(`http://localhost:3001/obtenerentregablesportarea/${id}`).then((response) => {
        setDelivery(response.data);
        console.log({ delivery })
        setIsLoadingDelivery(false);
      });

      axiosInstance.get(`http://localhost:3001/obtenermaxtareahis/${id}`).then((response) => {
        setMaxTask(response.data);
        console.log({ maxTask })
        setIsLoadingMaxTareaId(false);
      });

      axiosInstance.get(`http://localhost:3001/obtenerusuarios/1`).then((response) => {
        setUsuario(response.data);
        console.log({ usuario })
        setIsLoadingUsuario(false);
      });

    }, [(isLoadingDelivery || isLoadingTask || isLoadingMaxTareaId || isLoadingUsuario) || isUpdated || value]);

    useEffect(() => {

      if (maxTask.length > 0)
      {
        axiosInstance.get(`http://localhost:3001/obtenertareahis/${maxTask[0].id}`).then((response) => {
          setTaskHis(response.data);
          console.log({ taskHis })
          setIsLoadingTaskHis(false);
        });
      }
    }, [isLoadingMaxTareaId]);
        
    
    const onNavigateBack = () => {
        navigate(-1);  
    }

    const onHandleAssign = () => {
      
      updateTareaEstado();

    };

    const onHandleInfo = () => {

    };
    

    const updateTareaEstado = async () => {

          await axiosInstance.put("http://localhost:3001/updatetarea", {
              id: `${task[0].id_tarea}`,
              id_responsable: 1, // Añadir la lógica para utilizar al usuario logeado
              id_estado: estado[0].id,
              fecha_inicio_estimada: formateaFechaHoraEscribeMySql(`${ task[0].fecha_inicio_estimada_tarea }`, 'U'),
              fecha_fin_estimada: formateaFechaHoraEscribeMySql(`${ task[0].fecha_fin_estimada_tarea }`, 'U'),
              esfuerzo_estimado: `${task[0].esfuerzo_estimado_tarea}`,
              fecha_inicio_real: `${task[0].fecha_inicio_real_tarea}`,
              fecha_fin_real: `${task[0].fecha_fin_real_tarea}`,
              esfuerzo_real: `${task[0].esfuerzo_real_tarea}`,
              proyecto_egipto: `${task[0].proyecto_egipto_tarea}`,
              modulo_egipto: `${task[0].modulo_egipto_tarea}`,
              fecha_modificacion: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' )               
          }).then(() => {
              
              console.log( 'Tarea Actualizada' );
              
          });

          await axiosInstance.put("http://localhost:3001/updatemaxtareahis", {
            id: `${taskHis[0].id}`,
            marca_activo: 'N',
            fecha_modificacion: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' )               
          }).then(() => {

            console.log( 'Tarea Histórico Actualizada' );
            
          });

          await axiosInstance.post("http://localhost:3001/creartareahis", {
            id_tarea: `${task[0].id_tarea}`,
            id_responsable_anterior: '0',
            id_responsable_actual: '1',
            id_estado_anterior: '38',
            id_estado_actual: estado[0].id,
            comentarios: 'Se asigna la tarea: ' + task[0].codigo_tarea_tarea + ' - ' + task[0].descripcion_tarea + ' al usuario: ' + usuario[0].nombre_completo + '.',
            marca_activo: 'S',
            fecha_alta: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' ),
            fecha_modificacion: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' ),
        }).then(() => {
          setIsUpdated( true );
          console.log( 'Tarea Histórico Insertada' );
          
        });
    }
    
  return (
  
<div
  style={{ maxWidth: '95%' }}
>
  <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
  />

    {
      isLoadingDelivery
        ? <div>Cargando...</div>
        :
    
  <div
    className="card-per-task"
  >

    <Row 
      style={{ 
        padding: '10px',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '22px', 
      }}
    >
      <Col className='col-3'>
        <img 
          src={ `${ task[0].photoUrl_responsable_tarea }`}
          alt= { task[0].codigo_responsable_tarea }  
          title= { task[0].nombre_completo_responsable_tarea }  
          style={{ borderRadius: '40px', marginRight: '10px', marginLeft: '10px', width: '80px', height: '80px' }}
        />
      </Col>

      <Col className='col-6'>
        { task[0].descripcion_tarea }
      </Col>
      
      <Col  className='col-3'>
        { task[0].codigo_tarea }
      </Col>
    </Row>

    <Divider
      style={{ padding: '5px',
        marginBottom: '10px'
       }} 
      variant="middle" 
    />

    <div 
      className='col-12'
      style={{ padding: '5px' }} 
    >
      <h6>Descripción detallada</h6>
      <p className="text-muted" style={{ fontSize: '16px', padding: '10px' }}>{ task[0].descripcion_ampliada_tarea }</p>
      <h6>Información General</h6>
      
      <div className='row' style={{ fontSize: '14px', padding: '10px' }}>
        <Col><b>Proyecto: </b>{task[0].descripcion_proyecto}</Col>
        <Col><b>Solicitante: </b>{task[0].nombre_completo_solicitante_tarea}</Col>
        <Col><b>Departamento: </b>{task[0].departamento_solicitante_tarea}</Col>
      </div>

      <div className='row' style={{ fontSize: '14px', padding: '10px' }}>
        <Col><b>Estado: </b>{task[0].descripcion_estado}</Col>
        <Col><b>Prioridad: </b>{}</Col>
        <Col><b>Modulo Egipto: </b>{task[0].modulo_egipto_tarea}</Col>
      </div>

      <div className='row' style={{ fontSize: '14px', padding: '10px' }}>
        <Col><b>Fec. Inicio Est.: </b>{formateaFechaHoraLeeMySql( task[0].fecha_inicio_estimada_tarea, 1 )}</Col>
        <Col><b>Fec. Fin Est.: </b>{formateaFechaHoraLeeMySql( task[0].fecha_fin_estimada_tarea )}</Col>
        <Col><b>Estimación Inicial: </b> {task[0].esfuerzo_estimado_tarea}</Col>
      </div>

      <div className='row' style={{ fontSize: '14px', padding: '10px' }}>
        <Col><b>Fec. Inicio Real: </b>{formateaFechaHoraLeeMySql(task[0].fecha_inicio_real_tarea)}</Col>
        <Col><b>Fec. Fin Real.: </b>{formateaFechaHoraLeeMySql(task[0].fecha_fin_real_tarea)}</Col>
        <Col><b>Horas Imputadas: </b> {task[0].horas_imputadas_tarea}</Col>
      </div>

      <div className='row' style={{ fontSize: '14px', padding: '10px' }}>
        
        <div className='col-4' style={{ padding: '10px', textAlign: 'center' }}>
          { task[0].descripcion_estado !== 'Asignado'
          ? <button 
            className="btn btn-outline-success"
            style={{ textAlign: 'center' }}
            onClick={ onHandleAssign }
          >
            Asignarme
          </button>

          : <button 
            className="btn btn-outline-success"
            style={{ textAlign: 'center' }}
            onClick={() => navigate(`../task/${id}/create_estimate`)}
          >
            Estimar
          </button>
          }
        </div>

        
        <div className='col-4' style={{ padding: '10px', textAlign: 'center' }}>
          <button 
            className="btn btn-outline-secondary"
            style={{ textAlign: 'center' }}
            onClick={() => setModalShow(true)}
          >
            Actualizar Info
          </button>

        </div>
        
        <div className='col-4' style={{ padding: '10px', textAlign: 'center' }}>
          <button 
            className="btn btn-outline-info"
            style={{ textAlign: 'center' }}
            onClick={ onNavigateBack }
          >
            Cancelar
          </button>

        </div>
      </div>
    </div>
  </div>
  }
  {
      isLoadingDelivery
        ? <div></div>
        :
  <Divider
    style={{ padding: '5px',
      marginBottom: '10px',
      maxWidth: '95%'
    }} 
    variant="middle"
  >
    ENTREGABLES
  </Divider>
  }
  {
      isLoadingDelivery
        ? <div></div>
        :
  <div className="row row-cols-1 row-cols-md-1 g-3">
      {
      delivery.map( item => (
          <DeliveryCard 
              key={ item.id_entregable }
              { ...item }
          />
      ))
      }
  </div>
  }
  {
      isLoadingDelivery
        ? <div></div>
        :
  <IconButton
        disabled={ task[0].descripcion_estado === 'Nuevo' || task[0].descripcion_estado === 'Indefinido' || task[0].descripcion_estado === 'Finalizado' }
        onClick={() => navigate(`/task/create_delivery`)}
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
  }
</div>    

  )
}
