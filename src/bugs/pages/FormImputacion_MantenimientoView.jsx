import { Grid2, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { FormLayout } from '../layout/FormLayout';
import { useSelector } from 'react-redux';
import axiosInstance from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { ObtenerFechaHoraActual, addHoursToDate, formateaFechaHoraEscribeMySql, formateaStringtoDate } from '../helpers/generaFechaHora';
import { useFetch } from '../../hooks';


const formData = {
    fecha_imputacion: '',
    horas: '',
  }

  const formValidations = {
    fecha_imputacion: [ (value) => value.length >= 1, 'La fecha es obligatoria'],
    horas: [ (value) => value > 0 && value <= 8, 'El número de horas es obligatorio y no puede ser superior a 8'],
  }

export const FormImputacion_MantenimientoView = () => {
    
    const { activeDelivery } = useSelector( state => state.mantenimiento );

    const { data: data_estimate, hasError: hasError_estimate, isLoading: isLoading_estimate } = useFetch( `http://localhost:3001/obtenerestimacionentregable/${activeDelivery[0].id_entregable}` );
 
    console.log( data_estimate );

    const navigate = useNavigate();

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [horasImputadas, setHorasImputadas] = useState(0);
   
    const { formState
        , fecha_imputacion
        , horas
        , onInputChange
        , onResetForm
        , isFormValid
        , fecha_imputacionValid
        , horasValid} = useForm ( formData, formValidations );

    const onHandleAccept = ( event ) => {
        event.preventDefault();
        setIsSubmitted (true);

        if ( !isFormValid ) 
            return;

        // console.log({ activeDelivery });
        crearImputacion();
    };
    
    useEffect(() => {

        axiosInstance.get(`http://localhost:3001/obtenerimputacionentregable/${activeDelivery[0].id_entregable}`).then((response) => {
            setHorasImputadas(response.data[0].horas);
            });
    
    }, [horasImputadas || isLoading_estimate])
    

    const onHandleCancel = ( event ) => {
        event.preventDefault();
        
        navigate(-1);
    };

    const onHandleClean = ( event ) => {
        event.preventDefault();
        
        onResetForm();

        setIsSubmitted ( false );
    };

    const crearImputacion = async () => {

        await axiosInstance.post("http://localhost:3001/crearimputacion", {
            id_entregable: activeDelivery[0].id_entregable,
            horas: horas,
            fecha_imputacion: formateaFechaHoraEscribeMySql (addHoursToDate (formateaStringtoDate (fecha_imputacion), 19).toISOString(), 'I'),
            fecha_alta: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' ),
        }).then((res) => {
                console.log('Imputación creada');
                setIsSubmitted ( false );
                onResetForm();
        });

    }

  return (
    
    <>
        {
        isLoading_estimate
        ? <div>...Cargando</div>
        :
        <FormLayout title="Insertar Nueva Imputación">
            <form>
                <Grid2 container spacing={4}>

                    <Grid2 size={12}>
                        <TextField 
                        disabled={ true }
                        label="Descripción" 
                        type="text" 
                        placeholder='Descripción del entregable'
                        fullWidth
                        name="descripcion"
                        value= { activeDelivery[0].descripcion_entregable }
                        />
                    </Grid2>

                    <Grid2 size={12}>
                        <TextField 
                        disabled={ true }
                        label="Descripción Ampliada" 
                        type="text" 
                        placeholder='Detalle del entregble'
                        fullWidth
                        multiline={true} 
                        rows={2}
                        name="descripcion_ampliada"
                        value= { activeDelivery[0].descripcion_ampliada_entregable }
                        />
                    </Grid2>

                    <Grid2 size={4}>
                        <TextField 
                        disabled={ true }
                        label="Horas Disponibles" 
                        type="text" 
                        // placeholder='Horas Disponibles' 
                        fullWidth
                        name="horas_disponibles"
                        value= { data_estimate.length === 0 ? 'N/A' : data_estimate[0].estimacion - horasImputadas }
                        slotProps={{
                            inputLabel: {
                            shrink: true,
                            },
                        }}
                        />
                    </Grid2>

                    <Grid2 size={4}>
                        <TextField 
                        label="Horas" 
                        type="number" 
                        placeholder='Horas'
                        fullWidth
                        name="horas"
                        value= { horas }
                        onChange={ onInputChange }
                        error={ !!horasValid && isSubmitted }
                        helperText={ isSubmitted ? horasValid : null }
                        />
                    </Grid2>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid2 size={4}>
                            <TextField 
                                label="Fecha Imputacion"
                                name='fecha_imputacion'
                                type='date'
                                value={ fecha_imputacion }
                                fullWidth
                                slotProps={{
                                    inputLabel: {
                                    shrink: true,
                                    },
                                }}
                                onChange={ onInputChange }
                                error={ !!fecha_imputacionValid && isSubmitted }
                                helperText={ isSubmitted ? fecha_imputacionValid : null }
                            />
                        </Grid2>
                    </LocalizationProvider>

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
    }
    </>
  )
}
