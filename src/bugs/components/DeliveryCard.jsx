import ProgressBar from 'react-bootstrap/ProgressBar';
import { calculaPorcentajeDias } from '../helpers';
import '../styles/delivery.css';
import DangerousIcon from '@mui/icons-material/Dangerous';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import VerifiedIcon from '@mui/icons-material/Verified';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Link, useNavigate  } from 'react-router-dom';
import { addHoursToDate, formateaDatetoString, formateaFechaHoraEscribeMySql, formateaFechaHoraLeeMySql, generaFechaHora, ObtenerFechaHoraActual } from '../helpers/generaFechaHora';
import { useEffect, useState } from 'react';
import axiosInstance from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveDelivery, setTextButton, setValue } from '../../store/slices/mantenimientoSlice';
import { useFetch } from '../../hooks';
import { generaDatosInternos } from '../helpers/generaDatosInternos';
import { delivery } from '../data/delivery';
import { updateEntregable } from '../helpers/updateTablas';


export const DeliveryCard = ( delivery ) => {

    const {id_entregable
        , id_tarea_entregable
        , id_estado_entregable
        , id_responsable_entregable
        , codigo_entregable
        , descripcion_entregable
        , descripcion_ampliada_entregable
        , nombre_completo_responsable_entregable
        , codigo_responsable_entregable
        , photoUrl_responsable_entregable
        , descripcion_estado
        , fecha_inicio_real_entregable
        , fecha_fin_estimada_tarea
        , tarea_egipto_entregable
        , fecha_alta_entregable
        } = delivery;

    const dispatch = useDispatch();

    const now = calculaPorcentajeDias( fecha_alta_entregable, fecha_fin_estimada_tarea );

    const handleClickAmpliar = (event) => {

        event.preventDefault();
        dispatch (setActiveDelivery( delivery));
        navigate(`/delivery/${id_entregable}`);

    };

    const handleClickAsignar = (event) => {

        dispatch (setActiveDelivery( delivery));

        // const { activeTask, activeDelivery } = useSelector( state => state.mantenimiento );
        
        updateEntregable( event, activeTask, activeDelivery );

    };

    const handleClickImputar = ( event ) => {

        event.preventDefault();
        dispatch (setActiveDelivery( delivery));
        navigate(`/task/${id_tarea_entregable}/delivery/create_imputacion`);

    };

    // dispatch (setTextButton ( null ));

    const { activeTask, value, activeDelivery } = useSelector( state => state.mantenimiento );

    const { data: data_state, hasError: hasError_state, isLoading: isLoading_state } = useFetch( `http://localhost:3001/obtenerestados` );
 

    const navigate = useNavigate();

  return (
    <div className="col-12">
        <div className="card-per">
            <div className="row no-gutters">
                <div 
                    className="col-2"
                    style={{ 
                        alignContent: 'center',
                        textAlign: 'center', 
                    }}
                >
                    <img 
                        src= { photoUrl_responsable_entregable } 
                        alt={ codigo_responsable_entregable } 
                        title= { nombre_completo_responsable_entregable }
                        className="card-img" 
                        style={{
                            minHeight: "80px",
                            maxWidth: "80px",
                            borderRadius: '40px'
                    }}/>
                </div>

                <div className="col-10">                    
	
                    <div className="card-body">
                        <h6 className="card-tittle">{ codigo_entregable } - { descripcion_entregable }</h6>
                        <p className="card-text" style={{marginBottom: "5px"}}>
                            <small className="text-muted">{ descripcion_ampliada_entregable }</small>
                        </p>

                        <div className="row d-flex align-items-center">
                            <div className="col-4">
                                <div className='row'>
                                    <div className="col-2">
                                    {
                                        descripcion_estado === 'Indefinido'
                                        ? <DangerousIcon style={{ color: "black", }} />
                                        : descripcion_estado === 'Nuevo'
                                            ? <StarPurple500Icon style={{ color: "red", }} />
                                            : descripcion_estado === 'Asignado'
                                                ? <EmojiPeopleIcon style={{ color: "green", }} />
                                                : descripcion_estado === 'Estimando'
                                                    ? <AlarmOnIcon style={{ color: "red", }} />
                                                    : descripcion_estado === 'Pdte. Dudas Estimacion'
                                                        ? <HourglassEmptyIcon style={{ color: "red", }} />
                                                        : descripcion_estado === 'Resuelta Dudas Estimacion'
                                                            ? <AlarmOnIcon style={{ color: "yellow", }} />
                                                            : descripcion_estado === 'Estimado'
                                                                ? <AlarmOnIcon style={{ color: "blue", }} />
                                                                : descripcion_estado === 'Pdte. Aprobación'
                                                                    ? <HourglassEmptyIcon style={{ color: "yellow", }} />
                                                                    : descripcion_estado === 'Estimación Rechazada'
                                                                        ? <DangerousIcon style={{ color: "red", }} />
                                                                        : descripcion_estado === 'Estimación Aprobada'
                                                                            ? <AlarmOnIcon style={{ color: "green", }} />
                                                                            : descripcion_estado === 'Desarrollando'
                                                                                ? <PlayArrowIcon style={{ color: "green", }} />
                                                                                : descripcion_estado === 'Paralizado'
                                                                                    ? <AlarmOnIcon style={{ color: "black", }} />
                                                                                    : descripcion_estado === 'Pdte. Dudas Desarrollo'
                                                                                        ? <HourglassEmptyIcon style={{ color: "green", }} />
                                                                                        : descripcion_estado === 'Resuelta Duda Desarrollo'
                                                                                            ? <PlayArrowIcon style={{ color: "red", }} />
                                                                                            : descripcion_estado === 'Realizado'
                                                                                                ? <VerifiedIcon style={{ color: "red", }} />
                                                                                                : descripcion_estado === 'Entregado'
                                                                                                    ? <VerifiedIcon style={{ color: "yellow", }} />
                                                                                                    : descripcion_estado === 'Finalizado'
                                                                                                        ? <VerifiedIcon style={{ color: "green", }} />
                                                                                                        : <RestartAltIcon style={{ color: "red", }} />
                                    }
                                    </div>
                                    <div className="col-10">
                                        <p className="card-text" style={{marginBottom: "5px"}}>
                                            <small className="text-muted"><b>Estado: </b>{ descripcion_estado }</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <p className="card-text" style={{marginBottom: "5px"}}>
                                    <small className="text-muted"><b>Tarea Egipto: </b>{ tarea_egipto_entregable }</small>
                                </p>
                            </div>
                            <div className="col-1">
                                <p className="card-text" style={{marginBottom: "5px"}}>
                                    <small className="text-muted"><b>Avance: </b></small>        
                                </p>                                
                            </div>
                            <div className="col-4">
                                <ProgressBar animated now={now} label={`${now}%`} />                                                                    
                            </div>
                        </div>
                        
                    </div>
                    
                    <div 
                        className="row gx-5"
                        style={{marginBottom: "5px"}}
                    >
                        <div className="col-12 d-flex ">
                            <div className="col-6 justify-content-center">
                                <button 
                                    className="btn btn-outline-info btn-sm"
                                    onClick={ (e) => handleClickAmpliar(e) }
                                >
                                    Ampliar Información
                                </button>
                            </div>
                            <div className="col-6 justify-content-center">
                                <button 
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={ (e) => handleClickImputar(e) }
                                >
                                    Imputar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}