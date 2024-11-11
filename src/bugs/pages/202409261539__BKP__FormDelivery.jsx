import { Grid2, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { FormLayout } from '../layout/FormLayout';
import { useSelector } from 'react-redux';
import axiosInstance from 'axios';


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
    
    const { activeTask } = useSelector( state => state.mantenimiento );

    const navigate = useNavigate();

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [nextEntregable, setNextEntregable] = useState([]);
    const [codigoEntregable, setCodigoEntregable] = useState([]);

    const [estado, setEstado] = useState('');

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

    useEffect(() => {
        
        axiosInstance.get(`http://localhost:3001/obtenerentregablesig/${activeTask.id_tarea}`).then((response) => {
            setNextEntregable(response.data);
            console.log('Entregable recuperado');
        });

        axiosInstance.get(`http://localhost:3001/obtenerestadosdesc/Nuevo`).then((response) => {
            setEstado(response.data);
            console.log('Estado recuperado');
        });
    
    }, [])
    

    const crearEntregable = async () => {

        await axiosInstance.post("http://localhost:3001/crearentregable", {
            codigo: nextEntregable[0].codigo_next_entregable,
            descripcion: descripcion,
            descripcion_ampliada: descripcion_ampliada,
            id_responsable: 0,
            id_tarea: activeTask.id_tarea,
            id_proyecto: activeTask.id_proyecto_tarea,
            id_estado: estado[0].id,
            proyecto_egipto: activeTask.proyecto_egipto_tarea,
            modulo_egipto: activeTask.modulo_egipto_tarea,
            tarea_egipto: tarea_egipto,
        });
        
        console.log('Entregable creado');

        await axiosInstance.get(`http://localhost:3001/obtenerentregablescod/${nextEntregable[0].codigo_next_entregable}`).then((response) => {
            setCodigoEntregable(response.data);
            console.log('Código recuperado');
        });

        await axiosInstance.post("http://localhost:3001/crearentregablehis", {
            id_entregable: codigoEntregable[0].id_entregable,
            id_tarea: activeTask.id_tarea,
            id_responsable_anterior: 0,
            id_responsable_actual: 0,
            id_estado_anterior: '0',
            id_estado_actual: estado[0].id,
            comentarios: 'Creacion Entregable: ' + nextEntregable[0].codigo_next_entregable + ' - ' + descripcion,
            marca_activo: 'S',
        }).then(() => {
            
            console.log('Histórico creado');
            onResetForm();
        });

        setIsSubmitted ( false );

    };

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
