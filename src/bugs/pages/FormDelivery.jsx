import { Grid2, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { FormLayout } from '../layout/FormLayout';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from 'axios';
import { useFetch } from '../../hooks';
import { ObtenerFechaHoraActual, formateaFechaHoraEscribeMySql } from '../helpers/generaFechaHora';
import { setValue } from '../../store/slices/mantenimientoSlice';


const formData = {
    descripcion: '',
    descripcion_ampliada: '',
    tarea_egipto: '',
  }

  const formValidations = {
    descripcion: [ (value) => value.length >= 1, 'La descripción es obligatoria'],
    descripcion_ampliada: [ (value) => value.length >= 1, 'El detalle del entregable es obligatorio'],
  }

export const FormDelivery = () => {

    const dispatch = useDispatch();

    const { activeTask } = useSelector( state => state.mantenimiento );

    const navigate = useNavigate();

    const [isSubmitted, setIsSubmitted] = useState(false);
   
    const { formState
        , descripcion
        , descripcion_ampliada
        , tarea_egipto
        , onInputChange
        , onResetForm
        , isFormValid
        , descripcionValid
        , descripcion_ampliadaValid} = useForm ( formData, formValidations );

    const onHandleAccept = ( event ) => {
        event.preventDefault();
        setIsSubmitted (true);

        if ( !isFormValid ) 
            return;

        crearEntregable();

        navigate(-1);
    };

    const onHandleCancel = ( event ) => {
        event.preventDefault();
        
        navigate(-1);
    };

    const onHandleClean = ( event ) => {
        event.preventDefault();
        
        onResetForm();

        setIsSubmitted ( false );
    };

    const { data: data_delivery, hasError: hasError_delivery, isLoading: isLoading_delivery } = useFetch( `http://localhost:3001/obtenerentregablesig/${activeTask.id_tarea}` );
    
    const { data: data_state, hasError: hasError_state, isLoading: isLoading_state } = useFetch( `http://localhost:3001/obtenerestados` );
   
    var nuevoEstado = '';
    var entregableIdCreado = '';

    const crearEntregable = async () => {

        nuevoEstado = data_state.find ( data_state => data_state.descripcion === 'Nuevo' )

        await axiosInstance.post("http://localhost:3001/crearentregable", {
            codigo: data_delivery[0].codigo_next_entregable,
            descripcion: descripcion,
            descripcion_ampliada: descripcion_ampliada,
            id_responsable: 0,
            id_tarea: activeTask.id_tarea,
            id_proyecto: activeTask.id_proyecto_tarea,
            id_estado: nuevoEstado.id,
            proyecto_egipto: activeTask.proyecto_egipto_tarea,
            modulo_egipto: activeTask.modulo_egipto_tarea,
            tarea_egipto: tarea_egipto,
            fecha_alta: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' ),
            fecha_modificacion: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' ),
        }).then((res) => {
            const { insertId } =  res.data
            entregableIdCreado = insertId
            
            axiosInstance.post("http://localhost:3001/crearentregablehis", {
                id_entregable: insertId,
                id_tarea: activeTask.id_tarea,
                id_responsable_anterior: 0,
                id_responsable_actual: 0,
                id_estado_anterior: '0',
                id_estado_actual: nuevoEstado.id,
                comentarios: 'Creacion Entregable: ' + data_delivery[0].codigo_next_entregable + ' - ' + descripcion,
                marca_activo: 'S',
                fecha_alta: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' ),
                fecha_modificacion: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' ),
            }).then(() => {
                
                if ( activeTask.descripcion_estado != 'Nuevo' && activeTask.descripcion_estado != 'Asignado' )
                {
                    console.log ('Comienza actualización tarea' );

                    nuevoEstado = data_state.find ( data_state => data_state.descripcion === 'Desarrollando' )

                    axiosInstance.put("http://localhost:3001/updatetarea", {
                        id: activeTask.id_tarea,
                        id_responsable: activeTask.id_responsable_tarea,
                        id_estado: nuevoEstado.id,
                        fecha_inicio_estimada: formateaFechaHoraEscribeMySql(`${ activeTask.fecha_inicio_estimada_tarea }`, 'U'),
                        fecha_fin_estimada: formateaFechaHoraEscribeMySql(`${ activeTask.fecha_fin_estimada_tarea }`, 'U'),
                        esfuerzo_estimado: `${activeTask.esfuerzo_estimado_tarea}`,
                        fecha_inicio_real: activeTask.fecha_inicio_real_tarea === null ? null : "\'" + formateaFechaHoraEscribeMySql(`${activeTask.fecha_inicio_real_tarea}`, 'U') + "\'",
                        fecha_fin_real: activeTask.fecha_fin_real_tarea === null ? null : "\'" + formateaFechaHoraEscribeMySql(`${activeTask.fecha_fin_real_tarea}`, 'U') + "\'",
                        esfuerzo_real: `${activeTask.esfuerzo_real_tarea}`,
                        proyecto_egipto: `${activeTask.proyecto_egipto_tarea}`,
                        modulo_egipto: `${activeTask.modulo_egipto_tarea}`,
                        fecha_modificacion: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' )               
                    }).then((response) => {
                        console.log ('Finaliza actualización tarea' );
                        console.log ('Comienza actualización tarea histórica' );

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
                                        comentarios: 'Se reinicia la tarea' + activeTask.codigo_tarea + ' tras crearse un nuevo entregable.',
                                        marca_activo: 'S',
                                        fecha_alta: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' ),
                                        fecha_modificacion: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' ),
                                    }).then (( response ) => {
                                        console.log ('Finaliza actualización tarea histórica' );
                                        dispatch (setValue ( entregableIdCreado ));
                                    })
                                })
                            })
                        })
                    });
                }
                console.log('Histórico creado');
                onResetForm();
            });
    
            setIsSubmitted ( false );
        });

        // Al crear nuevo entregable, si estado realizado ==> pasar a estado desarrollando la tarea 
        
    }

  return (
        <FormLayout title="Creación Nuevo Entregable">
            <form>
                <Grid2 container spacing={4}>

                    <Grid2 size={12}>
                        <TextField 
                        label="Descripción" 
                        type="text" 
                        placeholder='Descripción del entregable'
                        fullWidth
                        name="descripcion"
                        value= { descripcion }
                        onChange={ onInputChange }
                        error={ !!descripcionValid && isSubmitted }
                        helperText={ isSubmitted ? descripcionValid : null }
                        />
                    </Grid2>

                    <Grid2 size={12}>
                        <TextField 
                        label="Descripción Ampliada" 
                        type="text" 
                        placeholder='Detalle del entregble'
                        fullWidth
                        multiline={true} 
                        rows={2}
                        name="descripcion_ampliada"
                        value= { descripcion_ampliada }
                        onChange={ onInputChange }
                        error={ !!descripcion_ampliadaValid && isSubmitted }
                        helperText={ isSubmitted ? descripcion_ampliadaValid : null }
                        />
                    </Grid2>

                    <Grid2 size={12}>
                        <TextField 
                        label="Tarea Egipto" 
                        type="text" 
                        placeholder='Tarea Egipto'
                        fullWidth
                        name="tarea_egipto"
                        value= { tarea_egipto }
                        onChange={ onInputChange }
                        />
                    </Grid2>

                    <Grid2 size={12}
                        sx={{ textAlign: 'center'}}>
                        <button 
                        className="btn btn-outline-info"
                        style={{ textAlign: 'center', margin: '30px' }}
                        onClick={ onHandleAccept }
                        >
                        Aceptar
                        </button>

                        <button 
                        className="btn btn-outline-info"
                        style={{ textAlign: 'center', margin: '30px' }}
                        onClick={ onHandleCancel }
                        >
                        Cancelar
                        </button>

                        <button 
                        className="btn btn-outline-info"
                        style={{ textAlign: 'center', margin: '30px' }}
                        onClick={ onHandleClean }
                        >
                        Limpiar
                        </button>
                    </Grid2>
                </Grid2>
            </form>
        </FormLayout>
  )
}
