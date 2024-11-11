
import { formateaFechaHoraLeeMySql } from "../helpers/generaFechaHora";
import { Link } from "react-router-dom";
import { setActiveTask } from "../../store/slices/mantenimientoSlice";
import { useDispatch } from "react-redux";
import { restaFechasDias } from "../helpers";

export const MiniTaskCard = ( task ) => {

    const { id_tarea, fecha_alta, descripcion_tarea, photoUrl_responsable_tarea, codigo_responsable_tarea, nombre_completo_responsable_tarea } = task;
  
    const dispatch = useDispatch();

    const onHandleAmpliar = (event) => {
        
        dispatch( setActiveTask( task ));
                
    }

    const tiempoTranscurrido = Date.now();
    const fechaactual = new Date( tiempoTranscurrido );

    return (
    <>
        <div className="card-per-mini">
            <div className="row container-fullheight">
                <div className="col-3 align-self-center">
                    
                    <img 
                        src= { photoUrl_responsable_tarea } 
                        alt={ codigo_responsable_tarea } 
                        title= { nombre_completo_responsable_tarea }
                        className="card-img container-flex-content-center" 
                        style={{
                            minHeight: "100px",
                            maxHeight: "100px",
                            minWidth: "100px",
                            maxWidth: "100px",
                            borderRadius: '50px'
                    }}/>

                </div>
                <div className="col-9">
                    <div className="row container-center container-flex-column">
                        <div className="row">
                            { descripcion_tarea }
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
                        to={ `/task/${id_tarea}` }
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
