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
import { setActiveDelivery } from '../../store/slices/mantenimientoSlice';
import { useFetch } from '../../hooks';
import { generaDatosInternos } from '../helpers/generaDatosInternos';


export const DeliveryCard = ({id_entregable
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
    }) => {

    const dispatch = useDispatch();

    const now = calculaPorcentajeDias( fecha_alta_entregable, fecha_fin_estimada_tarea );

    // const {nuevoEstado, nuevoUsuario, nuevaDescripcion, nuevaFechaInicio, nuevaFechaFin} = generaDatosInternos ( 'Asignarme' );
        

    const handleClickAmpliar = (event) => {
        event.preventDefault();
        // console.log( id_entregable );
        <Link to={`/delivery/${id_entregable}`}/>
    };

    const handleClickAsignar = (event) => {

        event.preventDefault();

        const textButton = event.target.textContent;
        var nuevoEstado = [];
        var nuevoUsuario = '';
        var nuevoMensaje = '';
        var nuevoMensajeTarea = '';
        var nuevoFechaInicio = null;
        var nuevoFechaInicioTarea = null;
        var nuevoFechaFin = null;

        // console.log( fecha_inicio_real_entregable );
        // console.log( addHoursToDate (new Date (fecha_inicio_real_entregable), 2).toISOString() );
        // console.log( new Date (fecha_inicio_real_entregable).toISOString() );


        if ( textButton === 'Asignarme' )
        {
            nuevoEstado = data_state.find ( data_state => data_state.descripcion === 'Asignado' )
            nuevoUsuario = 1 // Usuario Activo
            nuevoMensaje = 'Se asigna el entregable ' + codigo_entregable + ' - ' + descripcion_entregable
            nuevoMensajeTarea = 'Se asigna la tarea: ' + activeTask.codigo_tarea + ' - ' + activeTask.descripcion_tarea + ' al usuario: ' + activeTask.nombre_completo_responsable_tarea
        }
        else if ( textButton === 'Iniciar' )
        {
            nuevoEstado = data_state.find ( data_state => data_state.descripcion === 'Desarrollando' )
            nuevoUsuario = id_responsable_entregable
            nuevoMensaje = 'Se inicia el entregable ' + codigo_entregable + ' - ' + descripcion_entregable
            nuevoFechaInicio = "\'" + formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' ) + "\'"
            nuevoMensajeTarea = 'Se inicia la tarea ' + activeTask.codigo_tarea + ' - ' + activeTask.descripcion_tarea
        }
        else if ( textButton === 'Realizar' ) //! Qué es una fecha para javascript
        {
            nuevoEstado = data_state.find ( data_state => data_state.descripcion === 'Realizado' )
            nuevoUsuario = id_responsable_entregable
            nuevoMensaje = 'Entregable ' + codigo_entregable + ' - ' + descripcion_entregable + ' finalizado en entorno Desarrollo';
            nuevoFechaInicio = "\'" + formateaFechaHoraEscribeMySql ( fecha_inicio_real_entregable, 'U' ) + "\'"
            nuevoMensajeTarea = 'Se finaliza la tarea ' + activeTask.codigo_tarea + ' - ' + activeTask.descripcion_tarea + ' en el entorno de Desarrollo';
        }
        
        axiosInstance.put("http://localhost:3001/updateentregable", {
            id: id_entregable,
            codigo: codigo_entregable,
            descripcion: descripcion_entregable,
            descripcion_ampliada: descripcion_ampliada_entregable,
            id_responsable: nuevoUsuario,
            id_tarea: activeTask.id_tarea,
            id_proyecto: activeTask.id_proyecto_tarea,
            id_estado: nuevoEstado.id,
            fecha_inicio_real: nuevoFechaInicio,
            fecha_fin_real: nuevoFechaFin,
            esfuerzo_real: null,
            proyecto_egipto: activeTask.proyecto_egipto_tarea,
            modulo_egipto: activeTask.modulo_egipto_tarea,
            tarea_egipto: tarea_egipto_entregable,
            fecha_modificacion: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' )               
        }).then((response) => {

            axiosInstance.get(`http://localhost:3001/obtenerestadoentregablestarea/${activeTask.id_tarea}`).then((response) => {
                const total_entregables_estado_anterior = response.data.filter ( estado => estado.id_estado_entregable < nuevoEstado.id )
                const total_entregables_estado_posterior = response.data.filter ( estado => estado.id_estado_entregable > nuevoEstado.id )
                const total_entregables_estado_desarrollando = response.data.filter ( estado => estado.descripcion === 'Desarrollando' )

                console.log( total_entregables_estado_desarrollando );

                console.log( total_entregables_estado_posterior );

                if ( (textButton === 'Iniciar' && activeTask.fecha_inicio_real_tarea === null ) 
                    || (textButton === 'Realizar' && total_entregables_estado_anterior.length === 0)
                    || (textButton === 'Asignarme' && total_entregables_estado_posterior.length > 0 && activeTask.descripcion_estado != 'Asignado' && total_entregables_estado_desarrollando.length === 0))
                {
                    console.log( 'Estoy dentro del if' );

                    if( activeTask.fecha_inicio_real_tarea != null )
                        nuevoFechaInicioTarea = "\'" + formateaFechaHoraEscribeMySql( activeTask.fecha_inicio_real_tarea, 'U' ) + "\'";
                    else
                        nuevoFechaInicioTarea = "\'" + formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' ) + "\'"
                    
                    console.log( nuevoFechaInicioTarea );

                    console.log ('Entro en los updates por el textButton es: ' + textButton + ' y el total de entregables es: ' + total_entregables_estado_anterior.length);
                    axiosInstance.put("http://localhost:3001/updatetarea", {
                        id: activeTask.id_tarea,
                        id_responsable: activeTask.id_responsable_tarea,
                        id_estado: nuevoEstado.id,
                        fecha_inicio_estimada: formateaFechaHoraEscribeMySql(`${ activeTask.fecha_inicio_estimada_tarea }`, 'U'),
                        fecha_fin_estimada: formateaFechaHoraEscribeMySql(`${ activeTask.fecha_fin_estimada_tarea }`, 'U'),
                        esfuerzo_estimado: `${activeTask.esfuerzo_estimado_tarea}`,
                        fecha_inicio_real: nuevoFechaInicioTarea,
                        fecha_fin_real: nuevoFechaFin,
                        esfuerzo_real: `${activeTask.esfuerzo_real_tarea}`,
                        proyecto_egipto: `${activeTask.proyecto_egipto_tarea}`,
                        modulo_egipto: `${activeTask.modulo_egipto_tarea}`,
                        fecha_modificacion: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' )               
                    })

                    axiosInstance.get(`http://localhost:3001/obtenermaxtareahis/${activeTask.id_tarea}`).then((response) => {
                        axiosInstance.get(`http://localhost:3001/obtenertareahis/${response.data[0].id}`).then((response) => {
                            console.log({ response });
                            axiosInstance.put("http://localhost:3001/updatemaxtareahis", { // No lo hace al 'iniciar'
                                id: `${response.data[0].id}`,
                                marca_activo: 'N',
                                fecha_modificacion: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' )               
                            }).then((response) => {
                                axiosInstance.post("http://localhost:3001/creartareahis", { // No lo hace al 'iniciar'
                                    id_tarea: activeTask.id_tarea,
                                    id_responsable_anterior: activeTask.id_responsable_tarea,
                                    id_responsable_actual: activeTask.id_responsable_tarea,
                                    id_estado_anterior: activeTask.id_estado_tarea,
                                    id_estado_actual: nuevoEstado.id,
                                    comentarios: nuevoMensajeTarea + '.',
                                    marca_activo: 'S',
                                    fecha_alta: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' ),
                                    fecha_modificacion: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' ),
                                })
                            })
                        })
                    })
                }
            });
        });

        axiosInstance.get(`http://localhost:3001/obtenermaxentregablehis/${id_entregable}`).then((response) => {
            // console.log('Se obtiene el id del máximo de la tabla histórica para el entregable: ' + id_entregable);
            axiosInstance.get(`http://localhost:3001/obtenerentregablehis/${response.data[0].id}`).then((response) => {
                axiosInstance.put("http://localhost:3001/updatemaxdeliveryhis", {
                    id: `${response.data[0].id}`,
                    marca_activo: 'N',
                    fecha_modificacion: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' )               
                  }).then(() => {
        
                    // console.log( 'Entregble Histórico Actualizado' );
                    
                  });
            });
        }).then((response) => {

            axiosInstance.post("http://localhost:3001/crearentregablehis", {
                id_entregable: id_entregable,
                id_tarea: activeTask.id_tarea,
                id_responsable_anterior: id_responsable_entregable,
                id_responsable_actual: nuevoUsuario,
                id_estado_anterior: id_estado_entregable,
                id_estado_actual: nuevoEstado.id,
                comentarios: nuevoMensaje,
                marca_activo: 'S',
                fecha_alta: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' ),
                fecha_modificacion: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' ),
            })
            
        });

        dispatch (setActiveDelivery (id_entregable ));

    };

    const { activeTask, value } = useSelector( state => state.mantenimiento );

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
                            maxHeight: "100px",
                            maxWidth: "100px",
                            borderRadius: '50px'
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
                        <div className="col-4 d-flex justify-content-center">
                            <button 
                                // disabled={descripcion_estado !== 'Nuevo'}
                                className="btn btn-outline-success btn-sm"
                                onClick={ (e) => handleClickAsignar(e) }
                            >
                            {
                                descripcion_estado === 'Nuevo'
                                ? 'Asignarme'
                                : descripcion_estado === 'Asignado'
                                    ? 'Iniciar'
                                    : 'Realizar'
                            }
                            </button>    
                        </div>
                        
                        <div className="col-4 d-flex justify-content-center">
                            <button 
                                className="btn btn-outline-info btn-sm"
                                onClick={() => navigate(`/delivery/${id_entregable}`)}
                            >
                                Ampliar Información
                            </button>
                        </div>

                        <div className="col-4 d-flex justify-content-center">
                            <button 
                                disabled={descripcion_estado !== 'Finalizado'}
                                className="btn btn-outline-danger btn-sm"
                                onClick={ (e) => handleClickParalizar(e) }
                            >
                                Reabrir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}