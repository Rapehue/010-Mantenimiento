import { Grid2, TextField } from '@mui/material';
import { FormLayout } from '../layout/FormLayout';
import { useForm } from '../../hooks/useForm';
import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from 'axios';
import Select from '@mui/material/Select';

  const tiempoTranscurrido = Date.now();
  var fechaactual = new Date( tiempoTranscurrido );   
  fechaactual.setDate(fechaactual.getDate() - 1)

export const FormTask = () => {    

    const formData = {
        descripcion: '',
        descripcion_ampliada: '',
        id_solicitante: '',
        id_proyecto: '',
        fecha_inicio_estimada: '',
        fecha_fin_estimada: '',
        esfuerzo_estimado: '',
        proyecto_egipto: '',
        modulo_egipto: '',
      }

    const formValidations = {
        descripcion: [ (value) => value.length >= 1, 'La descripción es obligatoria'],
        descripcion_ampliada: [ (value) => value.length >= 1, 'El detalle de la tarea es obligatorio'],
        id_solicitante: [ (value) => value >= 1, 'El usuario solicitante es obligatorio'],
        id_proyecto: [ (value) => value >= 1, 'El nombre del proyecto es obligatorio'],
        fecha_inicio_estimada: [ (value) => Date.parse(value) >= fechaactual, 'La fecha de inicio debe ser mayor o igual que la fecha actual'],
        fecha_fin_estimada: [ (value) => Date.parse(value) >= Date.parse(fecha_inicio_estimada), 'La fecha de fin debe ser mayor o igual que la fecha inicio'],
    }

    const navigate = useNavigate();

    const [nextTarea, setNextTarea] = useState();
    const [user , setUser] = useState();
    const [project, setProject] = useState();
    const [estado, setEstado] = useState()
    const [codigoTarea, setCodigoTarea] = useState()

    const [isSubmitted, setIsSubmitted] = useState(false);

    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [isLoadingProject, setIsLoadingProject] = useState(true);
    const [isInserted, setIsInserted] = useState(false);

    useEffect(() => {
      
        axiosInstance.get(`http://localhost:3001/obtenerusuarios`).then((response) => {
            setUser(response.data);
            setIsLoadingUser (false);
        });
  
        axiosInstance.get(`http://localhost:3001/obtenerproyectos`).then((response) => {
            setProject(response.data);
            setIsLoadingProject (false);
        });
  
      }, [isLoadingUser || isLoadingProject]);

  
    const { formState
        , descripcion
        , descripcion_ampliada
        , id_solicitante
        , id_proyecto
        , fecha_inicio_estimada
        , fecha_fin_estimada
        , esfuerzo_estimado
        , proyecto_egipto
        , modulo_egipto
        , onInputChange
        , onResetForm
        , isFormValid
        , descripcionValid
        , descripcion_ampliadaValid
        , id_solicitanteValid
        , id_proyectoValid
        , fecha_inicio_estimadaValid
        , fecha_fin_estimadaValid } = useForm ( formData, formValidations );
    

    const onHandleAccept = ( event ) => {
        event.preventDefault();
    
        setIsSubmitted (true);

        if ( !isFormValid ) 
            return;

        creartarea();
      };

      const creartarea = async () => {

        await axiosInstance.get(`http://localhost:3001/obtenertareasig/${id_proyecto}`).then((response) => {
            setNextTarea(response.data);
            console.log('Proyecto recuperado');
        });

        await axiosInstance.get(`http://localhost:3001/obtenerestadosdesc/Nuevo`).then((response) => {
            setEstado(response.data);
            console.log('Estado recuperado');
        });

        await axiosInstance.post("http://localhost:3001/creartarea", {
            codigo: nextTarea[0].codigo_next_tarea,
            descripcion: descripcion,
            descripcion_ampliada: descripcion_ampliada,
            id_solicitante: id_solicitante,
            id_responsable: 0,
            id_proyecto: id_proyecto,
            id_estado: estado[0].id,
            fecha_inicio_estimada: fecha_inicio_estimada,
            fecha_fin_estimada: fecha_fin_estimada,
            proyecto_egipto: proyecto_egipto,
            modulo_egipto: modulo_egipto            
        });
        
        console.log('Tarea creada');
        
        await axiosInstance.get(`http://localhost:3001/obtenertareascod/${nextTarea[0].codigo_next_tarea}`).then((response) => {
            setCodigoTarea(response.data);
            console.log('Código recuperado');
        });

        await axiosInstance.post("http://localhost:3001/creartareahis", {
            id_tarea: codigoTarea[0].id_tarea,
            id_responsable_anterior: '0',
            id_responsable_actual: '0',
            id_estado_anterior: '0',
            id_estado_actual: estado[0].id,
            comentarios: 'Creacion Tarea: ' + nextTarea[0].codigo_next_tarea + ' - ' + descripcion,
            marca_activo: 'S',
        }).then(() => {
            
            console.log('Histórico creado');
            onResetForm();
            setIsSubmitted ( false );
            setIsInserted( true );
          
        });
        
      }

      const onHandleCancel = ( event ) => {
        event.preventDefault();
    
        navigate(-1);
      };

      const onHandleCleanup = ( event ) => {
        event.preventDefault();

        onResetForm();
        setIsSubmitted ( false );
      };


  return (
    <>
    {
        isLoadingUser || isLoadingProject
        ? <div>Cargando...</div>
        :
    
    <FormLayout title="Creación Nueva Tarea">
        <form>
            <Grid2 container spacing={4}>
                
                <Grid2 size={12}>
                    <TextField 
                    label="Descripción *" 
                    type="text" 
                    placeholder='Descripción de la tarea'
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
                    label="Descripción Ampliada *" 
                    type="text" 
                    placeholder='Detalle de la tarea'
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


                <Grid2 size={6}>
                    <TextField
                        select
                        label="Proyecto *"
                        fullWidth
                        name="id_proyecto"
                        value= { id_proyecto }
                        error={ !!id_proyectoValid && isSubmitted }
                        helperText={ isSubmitted ? id_proyectoValid : null }
                        onChange={ onInputChange }
                        >
                        {project.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                            {option.descripcion}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid2>

                <Grid2 size={6}>
                    <TextField
                        select
                        label="Usuario Solicitante *"
                        value={ id_solicitante }
                        fullWidth
                        name="id_solicitante"
                        error={ !!id_solicitanteValid && isSubmitted }
                        helperText={ isSubmitted ? id_solicitanteValid : null }
                        onChange={ onInputChange }
                        >
                        {user.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                            {option.nombre_completo}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid2>

                <Grid2 size={6}>
                    <TextField 
                    label="Proyecto Egipto" 
                    type="text" 
                    placeholder='Proyecto Egipto'
                    fullWidth
                    name="proyecto_egipto"
                    value= { proyecto_egipto }
                    onChange={ onInputChange }
                    />
                </Grid2>

                <Grid2 size={6}>
                    <TextField 
                    label="Módulo Egipto" 
                    type="text" 
                    placeholder='Módulo Egipto'
                    fullWidth
                    name="modulo_egipto"
                    value= { modulo_egipto }
                    onChange={ onInputChange }
                    />
                </Grid2>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid2 size={6}>
                        <TextField 
                            label="Fecha Inicio Estimada"
                            name='fecha_inicio_estimada'
                            type='date'
                            value={ fecha_inicio_estimada }
                            fullWidth
                            slotProps={{
                                inputLabel: {
                                  shrink: true,
                                },
                              }}
                            onChange={ onInputChange }
                            error={ !!fecha_inicio_estimadaValid && isSubmitted }
                            helperText={ isSubmitted ? fecha_inicio_estimadaValid : null }
                        />
                    </Grid2>
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid2 size={6}>
                    <TextField 
                            label="Fecha Fin Estimada"
                            name='fecha_fin_estimada'
                            type='date'
                            fullWidth
                            value={ fecha_fin_estimada }
                            slotProps={{
                                inputLabel: {
                                  shrink: true,
                                },
                              }}
                            onChange={ onInputChange }
                            error={ !!fecha_fin_estimadaValid && isSubmitted }
                            helperText={ isSubmitted ? fecha_fin_estimadaValid : null }
                        />
                    </Grid2>
                </LocalizationProvider>

                <Grid2 
                    size={12}
                    style={{ textAlign: 'center' }}
                >
                    
                    <button 
                    className="btn btn-outline-info"
                    style={{ textAlign: 'center', margin: '30px' }}
                    onClick={ onHandleAccept }
                    // disabled={ !isFormValid }
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
                    onClick={ onHandleCleanup }
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
