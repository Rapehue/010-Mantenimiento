import { Grid2, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormLayout } from '../layout/FormLayout';
import { useSelector } from 'react-redux';
import axiosInstance from 'axios';
import { useFetch } from '../../hooks';
import { ObtenerFechaHoraActual, formateaFechaHoraEscribeMySql } from '../helpers/generaFechaHora';

export const FormDeliveryUpdate = () => {

    this.state = { 
        deliveryDetail : {
            descripcion:'',
            descripcion_ampliada: '',
            tarea_egipto: ''
        }
    };

    const { activeDelivery } = useSelector( state => state.mantenimiento );

    const navigate = useNavigate();

    const [descripcion, setDescripcion] = useState('');
    const [descripcion_ampliada, setDescripcion_ampliada] = useState('');
    const [tarea_egipto, setTarea_egipto] = useState('');

    const onHandleAccept = ( event ) => {
        event.preventDefault();
        updEntregable();
        navigate(-1);
    };

    const onHandleCancel = ( event ) => {
        event.preventDefault();
        
        navigate(-1);
    };

    const handleInputChange = ( e ) => {
        const name= e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
        console.log('handle');
    }

    const updEntregable = () => {

        var nuevaFechaInicio = null; 
        var nuevaFechaFin = null; 

        if (activeDelivery.fecha_inicio_real_entregable !== null)
            nuevaFechaInicio = "\'" + formateaFechaHoraEscribeMySql ( activeDelivery.fecha_inicio_real_entregable, 'U' ) + "\'";

        if (activeDelivery.fecha_fin_real_entregable !== null)
            nuevaFechaFin = "\'" + formateaFechaHoraEscribeMySql ( activeDelivery.fecha_fin_real_entregable, 'U' ) + "\'";

        
        axiosInstance.put("http://localhost:3001/updateentregable", {
            id: activeDelivery.id_entregable,
            codigo: activeDelivery.codigo_entregable,
            descripcion: descripcion,
            descripcion_ampliada: descripcion_ampliada,
            id_responsable: activeDelivery.id_responsable_entregable,
            id_tarea: activeDelivery.id_tarea_entregable,
            id_proyecto: activeDelivery.id_proyecto_entregable,
            id_estado: activeDelivery.id_estado_entregable,
            fecha_inicio_real: nuevaFechaInicio,
            fecha_fin_real: nuevaFechaFin,
            esfuerzo_real: activeDelivery.esfuerzo_real_entregable,
            proyecto_egipto: activeDelivery.proyecto_egipto_entregable,
            modulo_egipto: activeDelivery.modulo_egipto_entregable,
            tarea_egipto: tarea_egipto,
            fecha_modificacion: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' )               
        }).then((response) => {
            console.log ('Finaliza actualización entregable' );
            
        });
    };

    const { data: data_delivery, hasError: hasError_delivery, isLoading: isLoading_delivery } = useFetch( `http://localhost:3001/obtenerentregables/${activeDelivery.id_entregable}` );
    
    useEffect(() => {
    
        if(!isLoading_delivery)
        {
            setDescripcion (data_delivery[0].descripcion_entregable);
            setDescripcion_ampliada (data_delivery[0].descripcion_ampliada_entregable);
            setTarea_egipto (data_delivery[0].tarea_egipto_entregable);
        }
    
    }, [isLoading_delivery])
    
  return (
    <>
    {
        isLoading_delivery
        ? <div>...Cargando</div>
        :
    
        <FormLayout title="Actualización Entregable">
            <form>
                <Grid2 container spacing={4}>

                    <Grid2 size={12}>
                        <TextField 
                        label="Descripción" 
                        type="text" 
                        placeholder='Descripción del entregable'
                        fullWidth
                        name="descripcion"
                        value={ descripcion }
                        // onChange={ (e) => setDescripcion (e.target.value) }
                        onChange={ (e) => handleInputChange ( e ) }
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
                        value={ descripcion_ampliada }
                        // onChange={ (e) => setDescripcion_ampliada (e.target.value) }
                        onChange={ (e) => handleInputChange ( e ) }
                        />
                    </Grid2>

                    <Grid2 size={12}>
                        <TextField 
                        label="Tarea Egipto" 
                        type="text" 
                        placeholder='Tarea Egipto'
                        fullWidth
                        name="tarea_egipto"
                        value={ tarea_egipto }
                        // onChange={ (e) => setTarea_egipto (e.target.value) }
                        onChange={ (e) => handleInputChange ( e ) }
                        />
                    </Grid2>

                    <Grid2 size={12}
                        sx={{ textAlign: 'center'}}>
                        <button 
                        className="btn btn-outline-info"
                        style={{ textAlign: 'center', margin: '30px' }}
                        onClick={ (e) => onHandleAccept ( e ) }
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
                    </Grid2>
                </Grid2>
            </form>
        </FormLayout>
    }
    </>
  )
}
