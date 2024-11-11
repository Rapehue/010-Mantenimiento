import { useEffect } from "react";
import { useFetch } from "../../hooks";
import { formateaFechaHoraLeeMySql } from "../helpers/generaFechaHora";
import { Grid2 } from "@mui/material";
import { Padding } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { setActiveTask } from "../../store/slices/mantenimientoSlice";
import { useDispatch } from "react-redux";
import axiosInstance from 'axios';
import { restaFechasDias } from "../helpers";

export const MiniDeliveryCard = ( delivery ) => {

    const { id_entregable, fecha_alta, descripcion_entregable, photoUrl_responsable_entregable, codigo_responsable_entregable, nombre_completo_responsable_entregable } = delivery;
  
    const dispatch = useDispatch();

    const onHandleAmpliar = (event) => {
        
        axiosInstance.get(`http://localhost:3001/obtenertareasporentregable/${id_entregable}`).then((response) => {
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
                        src= { photoUrl_responsable_entregable } 
                        alt={ codigo_responsable_entregable } 
                        title= { nombre_completo_responsable_entregable }
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
                            { descripcion_entregable }
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
                        <Link
                        sx={{ textAlign: 'justify'}}
                        onClick={ onHandleAmpliar } 
                        to={ `/delivery/${id_entregable}` }
                        >
                            Mas Información
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
