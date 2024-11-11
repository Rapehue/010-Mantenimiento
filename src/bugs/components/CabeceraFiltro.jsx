import { MenuItem, TextField } from "@mui/material";
import { useState } from "react";



export const CabeceraFiltro = ({ data, field, fieldValue, setFieldValue }) => {

    const onInputChange = ( event ) => {
        setFieldValue ( event.target.value );
    };

    const resetFilter = ( event ) => {
        setFieldValue ( - 1 );
    };

    

  return (
    <div className='col'>
        
        <p className="cabecera-tittle">Filtrar por { field }</p>

        <div className='cabecera-select'>
            <TextField
                select
                label="Seleccionar una opción *"
                value={ fieldValue }
                fullWidth
                name = { field }
                onChange={ (e) => onInputChange (e) }
            >
                <MenuItem key='-1' value='-1'>
                    Valor por defecto...
                </MenuItem>
                {data.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.descripcion}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    
        <div className="row justify-content-center">
            <button 
                className="btn btn-outline-danger btn-sm"
                onClick={ (e) => resetFilter(e) }
            >
                Resetear Búsqueda { field }
            </button>
        </div>
    </div>
  )
}
