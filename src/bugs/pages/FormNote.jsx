import { Grid2, TextField } from '@mui/material';
import { FormLayout } from '../layout/FormLayout';
import { useForm } from '../../hooks/useForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNota } from '../helpers/updateTablas';
import { useSelector } from 'react-redux';

export const FormNote = () => {    

    const formData = {
        descripcion: '',
      }

    const formValidations = {
        descripcion: [ (value) => value.length >= 1, 'La descripción es obligatoria'],
    }

    const { activeDelivery } = useSelector( state => state.mantenimiento );

    const navigate = useNavigate();

    const [isSubmitted, setIsSubmitted] = useState(false);

    const { formState
        , descripcion
        , onInputChange
        , onResetForm
        , isFormValid
        , descripcionValid } = useForm ( formData, formValidations );
    

    const onHandleAccept = ( event ) => {
        event.preventDefault();
    
        setIsSubmitted (true);

        if ( !isFormValid ) 
            return;

        createNota ( descripcion, activeDelivery );

        navigate(-1);
    };

    const onHandleCancel = ( event ) => {
        event.preventDefault();
    
        navigate(-1);
    };


  return (
    <FormLayout title="Añadir Nota">
        <form>
            <Grid2 container spacing={4}>
                
                <Grid2 size={12}>
                    <TextField 
                    label="Descripción *" 
                    type="text" 
                    placeholder='Descripción de la Nota'
                    fullWidth
                    multiline={true} 
                    rows={3}
                    name="descripcion"
                    value= { descripcion }
                    onChange={ onInputChange }
                    error={ !!descripcionValid && isSubmitted }
                    helperText={ isSubmitted ? descripcionValid : null }
                    />
                </Grid2>

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

                </Grid2>
            </Grid2>
        </form>
    </FormLayout>
  )
}
