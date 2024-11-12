import { formateaFechaHoraLeeMySql } from "../helpers/generaFechaHora";
import { Link } from "react-router-dom";
import { setActiveTask } from "../../store/slices/mantenimientoSlice";
import { useDispatch } from "react-redux";
import axiosInstance from 'axios';
import { restaFechasDias } from "../helpers";
import { ConditionalLink } from "./ConditionalLink";

export const MiniDeliveryCard = ( delivery ) => {

    const { id //id_entregable
        , fecha_alta
        , descripcion //descripcion_entregable
        , photoUrl_responsable //photoUrl_responsable_entregable
        , codigo_responsable //codigo_responsable_entregable
        , nombre_completo_responsable //nombre_completo_responsable_entregable 
        , objeto
    } = delivery;
  
    const dispatch = useDispatch();

    const onHandleAmpliar = (event) => {
        // Controlar si se trata de una tarea o de un entregable
        axiosInstance.get(`http://localhost:3001/obtenertareasporentregable/${id}`).then((response) => {
            dispatch( setActiveTask(response.data[0]));
        });
        
    }

    const tiempoTranscurrido = Date.now();
    const fechaactual = new Date( tiempoTranscurrido );

    return (
    <>
        <div className="card-per-mini">
            <div className="row container-fullheight">
                <div className="col-3 align-self-center">
                    
                    <img 
                        src= { photoUrl_responsable } 
                        alt={ codigo_responsable } 
                        title= { nombre_completo_responsable }
                        className="card-img" 
                        style={{
                            minHeight: "100px",
                            maxHeight: "100px",
                            minWidth: "100px",
                            maxWidth: "100px",
                            borderRadius: '50px',
                            alignContent: 'center',
                            justifyContent: 'center',
                            padding: '0px'
                    }}/>

                </div>
                <div className="col-9">
                    <div className="row container-center container-flex-column">
                        <div className="row">
                            { descripcion }
                        </div>
                        {/* <br/> */}
                        <div className="row">
                            <div className="col-7">
                                Fecha Estado: { formateaFechaHoraLeeMySql( fecha_alta ) }
                            </div>
                            <div className="col-5">
                                Días en Estado: { restaFechasDias ( fecha_alta, fechaactual ) }
                            </div>
                        </div>
                        {/* <br/> */}
                        {/* <Link
                        sx={{ textAlign: 'justify'}}
                        onClick={ onHandleAmpliar } 
                        // Controlar si se trata de una tarea o de un entregable
                        to={ `/delivery/${id}` }
                        >
                            Mas Información
                        </Link> */}
                        <ConditionalLink sx={{ textAlign: 'justify' }} onClick={ onHandleAmpliar } to={ `/delivery/${id}` } condition={ objeto === 'entregable'}>
                            Mas Información...
                        </ConditionalLink>
                        <ConditionalLink sx={{ textAlign: 'justify' }} onClick={ onHandleAmpliar } to={ `/task/${id}` } condition={ objeto === 'tarea'}>
                            Mas Información...
                        </ConditionalLink>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
