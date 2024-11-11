import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { FormLayout } from "../layout/FormLayout";
import { Grid2, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import { formateaFechaHoraEscribeMySql, formateaFechaHoraLeeMySql, formateaStringtoDate, ObtenerFechaHoraActual } from "../helpers/generaFechaHora";
import { useFetch } from "../../hooks";
import { PopUpModal } from "../components/PopUpModal";
import { updateEstimacion } from "../helpers/updateTablas";


export const FormEstimate = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    
    const { data: data_delivery, hasError: hasError_delivery, isLoading: isLoading_delivery } = useFetch( `http://localhost:3001/obtenerentregables/${id}` );
    const { data: data_estimate, hasError: hasError_estimate, isLoading: isLoading_estimate } = useFetch( `http://localhost:3001/obtenerestimacionentregable/${id}` );
 
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [estado, setEstado] = useState([]);
    const [horasEstimadas, setHorasEstimadas] = useState(null)
    const [modalShow, setModalShow] = useState(false);
    const [result, setResult] = useState('');

    const formData = {
        estimacion: null,
        aprobada: null,
        fecha_respuesta: '',
    }
    
    const formValidations = {
        estimacion: [ (value) => value > 0, 'La estimación es obligatoria'],
    }

    const onHandleCancel = ( event ) => {
        event.preventDefault();
    
        navigate(-1);
      };

    const onHandleSend = (event) => {
        event.preventDefault();
        setIsSubmitted(true);

        if (!isFormValid) return;

        crearEstimacion();
    };

    useEffect(() => {
      
        if ( !isLoading_estimate && data_estimate.length > 0 )
        {
            setHorasEstimadas ( data_estimate[0].estimacion )
        }
    
    }, [isLoading_estimate || isSubmitted])

    // useEffect(() => {
    //   console.log ( result );
    
    // }, [modalShow])
    

    
    const crearEstimacion = () => {

        // Buscar si ya existe un estimación para dicho entregable
        if ( data_estimate.length > 0 )
            // En caso afirmativo: Preguntar si se desea sobreescribir.
        {
            setModalShow(true)

            console.log ( result );

            if ( result === 'Aceptar' ) 
            {
                console.log('Debemos marcar con N la estimación activa');
                // En caso afirmativo: 1. Marcar como marca_activo = 'N' la estimación anterior.
                updateEstimacion( data_estimate, data_delivery, 'N' )
                // En caso afirmativo: 2. Insertar nuevo registro en estimación.
                
                // En caso negativo: No hacer nada.
            }

        }
        // En caso negativo: Insertar nuevo registro en estimación.
        else
        {
            axiosInstance.post("http://localhost:3001/crearestimacion", {
                id_tarea: data_delivery[0].id_tarea_entregable,
                id_entregable: data_delivery[0].id_entregable,
                id_responsable: data_delivery[0].id_responsable_entregable,
                id_solicitante: data_delivery[0].id_solicitante_tarea,
                estimacion: estimacion,
                fecha_estimacion: formateaFechaHoraEscribeMySql(ObtenerFechaHoraActual()),
                marca_activo: 'S',
            }).then(() => {
                onResetForm();
            });
        }
    }

    const onHandleUpdate = async ( event ) => {

        event.preventDefault();

        onInputChange ( target );
        
        console.log ({ formState })
        // axiosInstance.put("http://localhost:3001/updateestimacion", {
        //     id: data_estimate[0].id,
        //     estimacion: estimacion, 
        //     aprobada: aprobada, 
        //     fecha_respuesta: "\'" + formateaFechaHoraEscribeMySql (formateaStringtoDate (fecha_respuesta).toISOString(), 'I') + "\'"             
        // }).then(() => {
        //     setIsSubmitted(true);
        //     onResetForm();
        // });;

    };

    const obtenerEstadoNuevo = async () => {
    
        try {
            const response = await axiosInstance.get(`http://localhost:3001/obtenerestadosdesc/Estimado`);

            setEstado( response.data );
        } catch (error) {
            console.log(error);
        }
    };

    const updateTareaEstado = async () => {
        
        // await axiosInstance.put("http://localhost:3001/updatetarea", {
        //     id: id,
        //     id_responsable: 1, // Añadir la lógica para utilizar al usuario logeado
        //     id_estado: `${ estado[0].id }`,
        //     fecha_inicio_estimada: formateaFechaHoraEscribeMySql(`${ task[0].fecha_inicio_estimada_tarea }`),
        //     fecha_fin_estimada: formateaFechaHoraEscribeMySql(`${ task[0].fecha_fin_estimada_tarea }`),
        //     esfuerzo_estimado: estimacion,
        //     fecha_inicio_real: `${task[0].fecha_inicio_real_tarea}`,
        //     fecha_fin_real: `${task[0].fecha_fin_real_tarea}`,
        //     esfuerzo_real: `${task[0].esfuerzo_real_tarea}`,
        //     proyecto_egipto: `${task[0].proyecto_egipto_tarea}`,
        //     modulo_egipto: `${task[0].modulo_egipto_tarea}`,
        //     fecha_modificacion: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual () )               
        // }).then(() => {
        //     setIsUpdated( true );
        //     console.log( 'Tarea Actualizada' );
        // });
    }

    const { formState
        , estimacion
        , aprobada
        , fecha_respuesta
        , onInputChange
        , onResetForm
        , isFormValid
        , estimacionValid} = useForm ( formData, formValidations );
  
    return (
    <>
    {
        isLoading_delivery || isLoading_estimate
        ? <div>...Cargando</div>
        : 
        <>
        {
            data_estimate.length > 0 ?
            <PopUpModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            title="¿Deseas Actualizar la estimación existente?"
            body={ "Actualmente existe una estimación para el entregable " 
                    + data_delivery[0].codigo_entregable 
                    + " - " 
                    + data_delivery[0].descripcion_entregable
                    + " por un total de "
                    + data_estimate[0].estimacion
                    + " horas con fecha "
                    + formateaFechaHoraLeeMySql( data_estimate[0].fecha_estimacion )
                    + ". ¿Desea actualizar dicha estimación?"
                }
            greenButton="Aceptar"
            redButton="Cancelar"
            result={ result }
            setResult = { setResult }
            />
            : null
        }
        <FormLayout title="Generar Estimacion">
            <form>
                <Grid2 container spacing={4}>
                    <Grid2 size={12}>
                            <TextField 
                            label="Descripción" 
                            type="text" 
                            fullWidth
                            name="descripcion"
                            slotProps={{
                                input: {
                                readOnly: true,
                                },
                            }}
                            value= { data_delivery[0].codigo_entregable + ' - ' + data_delivery[0].descripcion_entregable }
                            />
                    </Grid2>

                    <Grid2 size={12}>
                            <TextField 
                            label="Descripción Ampliada" 
                            type="text" 
                            fullWidth
                            name="descripcion_ampliada"
                            multiline={true} 
                            rows={2}
                            slotProps={{
                                input: {
                                readOnly: true,
                                },
                            }}
                            value= { data_delivery[0].descripcion_ampliada_entregable }
                            />
                    </Grid2>

                    <Grid2 size={6}>
                            <TextField 
                            label="Usuario Solicitante" 
                            type="text" 
                            fullWidth
                            name="usuario_solicitante"
                            slotProps={{
                                input: {
                                readOnly: true,
                                },
                            }}
                            value= { data_delivery[0].nombre_completo_responsable_tarea }
                            />
                    </Grid2>

                    <Grid2 size={6}>
                            <TextField 
                            label="Usuario Responsable" 
                            type="text" 
                            fullWidth
                            name="usuario_responsable" 
                            slotProps={{
                                input: {
                                readOnly: true,
                                },
                            }}
                            value= { data_delivery[0].nombre_completo_responsable_entregable }
                            />
                    </Grid2>

                    <Grid2 
                        sx={{alignItems: "center" }}
                        size={6}
                    >
                        <TextField 
                        label="Estimacion" 
                        type="number" 
                        placeholder={ 'Estimacion Horas' }
                        fullWidth
                        name="estimacion"
                        value= { estimacion }
                        onChange={ onInputChange }
                        error={ !!estimacionValid && isSubmitted }
                        helperText={ isSubmitted ? estimacionValid : null }
                        // slotProps={{
                        //         inputLabel: {
                        //           shrink: data_estimate,
                        //         },
                        //       }}
                        />

                        <TextField 
                            disabled={ !data_estimate }
                            label="Fecha Resolución"
                            name='fecha_respuesta'
                            type='date'
                            fullWidth
                            sx={{ marginTop: '20px'}}
                            value={ fecha_respuesta }
                            slotProps={{
                                inputLabel: {
                                  shrink: true,
                                },
                              }}
                            onChange={ onInputChange }
                            // error={ !!fecha_fin_estimadaValid && isSubmitted }
                            // helperText={ isSubmitted ? fecha_fin_estimadaValid : null }
                        />
                    </Grid2>


                    <Grid2 
                        size={6}
                        sx={{ textAlign: "center",
                            alignItems: "center",
                            contentAlign: "center"
                        }}
                    >
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Resolución Estimación</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="aprobada"
                                onChange={ onInputChange }
                            >
                                <FormControlLabel disabled={ !data_estimate } value="S" control={<Radio />} label="Aprobada" />
                                <FormControlLabel disabled={ !data_estimate } value="N" control={<Radio />} label="Rechazada" />
                            </RadioGroup>
                        </FormControl>  
                    </Grid2>
                    <Grid2 
                        size={12}
                        sx={{ textAlign: "center" }}
                    >
                    <div className="row"
                        sx={{ textAlign: "center" }}
                    >
                        <div className="col-4"> 
                            <button 
                                className="btn btn-outline-success"
                                style={{ textAlign: 'center', marginRight: '20px' }}
                                // disabled={ data_estimate }
                                onClick={ onHandleSend }
                            >
                                Enviar
                            </button>
                        </div>
                        
                        <div className="col-4">
                            <button 
                                className="btn btn-outline-info"
                                style={{ textAlign: 'center', marginRight: '20px' }}
                                disabled={ !data_estimate }
                                onClick={ (e) => onHandleSend(e) }
                            >
                                Modificar
                            </button>
                        </div>

                        <div className="col-4">
                            <button 
                                className="btn btn-outline-danger"
                                style={{ textAlign: 'center', marginLeft: '20px' }}
                                onClick={ onHandleCancel }
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                    </Grid2>
                </Grid2>
            </form>
        </FormLayout>
    </>
    }    
    </> 
  )
}
