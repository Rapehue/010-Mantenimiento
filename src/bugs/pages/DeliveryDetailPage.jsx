import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { NoteCard } from "../components/NoteCard";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Divider, IconButton } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import axiosInstance from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../../hooks";
import { calculaUpdateTarea, resetValores, updateEntregable, updateInsertEntregableHis, updateInsertTareaHis, updateTarea } from "../helpers/updateTablas";
import { setActiveDelivery, setTextButton } from "../../store/slices/mantenimientoSlice";
import { formateaFechaHoraLeeMySql } from "../helpers/generaFechaHora";
import { MyVerticallyCenteredModal } from "../components/MyVerticallyCenteredModal";
import { PopUpModal } from "../components/PopUpModal";

export const DeliveryDetailPage = ( ) => {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [delivery, setDelivery] = useState([]);
    const [note, setNote] = useState([]);
    const [isLoadingDelivery, setIsLoadingDelivery] = useState(true);
    const [isLoadingNote, setIsLoadingNote] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [modalUpdShow, setModalUpdShow] = useState(false);

    const [updEntregable, setUpdEntregable] = useState(false);
    const [updTarea, setUpdTarea] = useState(false);

    const [isUpdated, setIsUpdated] = useState(false);

    const { activeTask, activeDelivery, textButton } = useSelector( state => state.mantenimiento );

    const onNavigateBack = () => {
        navigate(-1);  
    }

    useEffect(() => {
      
      axiosInstance.get(`http://localhost:3001/obtenerentregables/${id}`).then((response) => {
        setDelivery(response.data);
        dispatch (setActiveDelivery( response.data[0] ));
        console.log ( 'activeDelivery actualizado' );
        console.log ( delivery );
        setIsLoadingDelivery (false);
      });

      axiosInstance.get(`http://localhost:3001/obtenernotasporentregable/${id}`).then((response) => {
        setNote(response.data);
        setIsLoadingNote (false);
      });

      console.log ( 'isUpdated: ' + isUpdated);
      console.log ( 'isLoadingDelivery: ' + isLoadingDelivery);
      console.log ( 'updEntregable: ' + updEntregable);
        
    }, [isLoadingNote || isLoadingDelivery || updEntregable]);

    
    const onHandleClickAsignar = async ( event ) => {

      setUpdEntregable ( updateEntregable( event, activeTask, activeDelivery, data_state ));
      setIsUpdated ( true );

    };

    const onHandleClickEstimar = (event) => {

      event.preventDefault();
      navigate(`/task/${id}/create_estimate`);

    };

    const onHandleClickModificar = (event) => {

      event.preventDefault();
      navigate(`/delivery/update_entregable`);

    };

    const onHandleClickImputar = ( event ) => {

      event.preventDefault();
      dispatch (setActiveDelivery( delivery));
      navigate(`/task/${delivery[0].id_tarea_entregable}/delivery/create_imputacion`);

    };

    const { data: data_state, hasError: hasError_state, isLoading: isLoading_state } = useFetch( `http://localhost:3001/obtenerestados` );
    
  return (
    <>
    <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
    />
    <PopUpModal
      show={modalUpdShow}
      onHide={() => setModalUpdShow(false)}
    />
    {
      isLoadingDelivery || isLoadingNote
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
          src={ `${ delivery[0].photoUrl_responsable_entregable }`}
          alt= { delivery[0].codigo_responsable_entregable }  
          title= { delivery[0].nombre_completo_responsable_entregable }  
          style={{ borderRadius: '40px', marginRight: '10px', marginLeft: '10px', width: '80px', height: '80px' }}
        />
      </Col>

      <Col className='col-6'>
        { delivery[0].descripcion_entregable }
      </Col>
      
      <Col  className='col-3'>
        { delivery[0].codigo_entregable }
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
      <p className="text-muted" style={{ fontSize: '16px', padding: '10px' }}>{delivery[0].descripcion_ampliada_entregable }</p>
      <h6>Información General</h6>

      <div className='row' style={{ fontSize: '14px', padding: '10px' }}>
        <Col><b>Estado: </b>{delivery[0].descripcion_estado}</Col>
        <Col><b>Modulo Egipto: </b>{delivery[0].modulo_egipto_entregable}</Col>
        <Col><b>Tarea Egipto: </b>{delivery[0].tarea_egipto_entregable}</Col>
      </div>

      <div className='row' style={{ fontSize: '14px', padding: '10px' }}>
        <Col><b>Fec. Inicio Real: </b>{formateaFechaHoraLeeMySql( delivery[0].fecha_inicio_real_entregable )}</Col>
        <Col><b>Fec. Fin Real.: </b>{formateaFechaHoraLeeMySql( delivery[0].fecha_fin_real_entregable )}</Col>
        <Col><b>Horas Imputadas: </b> {delivery[0].esfuerzo_real_entregable}</Col>
      </div>

      <div className='col-12' style={{ padding: '10px', textAlign: 'center' }}>
        <button 
          className="btn btn-outline-info"
          style={{ textAlign: 'center', margin: '10px',}}
          onClick={ onNavigateBack}
        >
          Regresar
        </button>

        <button
          disabled={ delivery[0].descripcion_estado === 'Finalizado' }
          className="btn btn-outline-secondary"
          style={{ textAlign: 'center', margin: '10px',}}
          onClick={ delivery[0].descripcion_estado === 'Nuevo' 
              ? (e) => onHandleClickAsignar(e)
              : () => setModalShow(true) }
        >
          Asignar
        </button>

        <button 
          disabled={ delivery[0].descripcion_estado !== 'Asignado' }
          className="btn btn-outline-danger" 
          style={{ textAlign: 'center', margin: '10px', }}
          onClick={ (e) => onHandleClickEstimar(e) }
        >
          Estimar
        </button>

        <button 
          disabled={ delivery[0].descripcion_estado !== 'Asignado' && delivery[0].descripcion_estado !== 'Reabierto' }
          className="btn btn-outline-primary" 
          style={{ textAlign: 'center', margin: '10px', }}
          onClick={ (e) => onHandleClickAsignar(e) }
        >
          Iniciar
        </button>

        <button 
          disabled={ delivery[0].descripcion_estado === 'Nuevo' || delivery[0].descripcion_estado === 'Reabierto' }
          className= {delivery[0].descripcion_estado === 'Finalizado'
            ? "btn btn-outline-danger"
            : "btn btn-outline-success"}
          style={{ textAlign: 'center', margin: '10px', }}
          onClick={ (e) => onHandleClickAsignar(e) }
        >
          { delivery[0].descripcion_estado === 'Desarrollando'
            ? 'Realizar'
            : delivery[0].descripcion_estado === 'Realizado'
              ? 'Entregar'
              : delivery[0].descripcion_estado === 'Entregado'
                ? 'Finalizar'
                : delivery[0].descripcion_estado === 'Finalizado'
                  ? 'Reabrir'
                  : 'Realizar'
          }
        </button>

        <button 
          className="btn btn-outline-dark"
          style={{ textAlign: 'center', margin: '10px', }}
          onClick={ (e) => onHandleClickModificar(e) }
          // disabled={ true }
        >
          Modificar
        </button>

        <button 
          className="btn btn-outline-warning"
          style={{ textAlign: 'center', margin: '10px', }}
          onClick={ (e) => onHandleClickImputar(e) }
          // disabled={ true }
        >
          Imputar
        </button>

    </div>
      
      </div>
    </div>
    }
    <div>
        {
            note.map( item => (
                <NoteCard 
                    key={ item.id_nota }
                    { ...item }
                />
            ))
        }
    </div>
  
    <IconButton
        // disabled={ isSaving }
        onClick={() => navigate(`/delivery/${delivery[0].id_entregable}/create_note`)}
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

    </>
  )
}
