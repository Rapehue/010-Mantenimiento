import React, { useEffect, useState } from 'react'
import { CabeceraFiltro } from "../components/CabeceraFiltro";
import { useFetch } from "../../hooks";
import { ObtenerFechaHoraActual } from '../helpers/generaFechaHora';
import { TimeReportShow } from '../components/TimeReportShow';
import CollapsibleTable from '../components/CollapsibleTable';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export const AllTimeReport = () => {

    // Definición de Constantes, Variables

    const { data: data_usuario, hasError: hasError_usuario, isLoading: isLoading_usuario } = useFetch( `http://localhost:3001/obtenerusuarios` );
    const { data: data_imputacion_m, hasError: hasError_imputacion_m, isLoading: isLoading_imputacion_m } = useFetch( `http://localhost:3001/obtenerimputacionmesmodulo` );
    const { data: data_imputacion_f, hasError: hasError_imputacion_f, isLoading: isLoading_imputacion_f } = useFetch( `http://localhost:3001/obtenerimputacionmesfecha` );
    const { data: data_mes, hasError: hasError_mes, isLoading: isLoading_mes } = useFetch( `http://localhost:3001/obtenermes` );

    const [solicitante, setSolicitante] = useState(-1);
    const [mes, setMes] = useState( ObtenerFechaHoraActual ().substring(0, 4) + ObtenerFechaHoraActual ().substring(5, 7) );
    const [dataFilter, setDataFilter] = useState([]);

    const [value, setValue] = useState('modulos');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    var solicitanteCode = 0;
    var mesCode = 0;
    
    var binaryCode = 0;

    const resetCalcValues = () => {
        
        solicitanteCode = 0;
        mesCode = 0;    
    };
    
    // Uso de UseEffect

    useEffect(() => {
    
            resetCalcValues ();

            console.log ( 'El mes actual es: ' + mes );
    
            if (!isLoading_imputacion_m && !isLoading_imputacion_f)
            {    
                // Solicitante 001 - Mes 010
                if (solicitante >= 0)
                    // solicitanteCode += 1; 
                    solicitanteCode = 0
                if (mes >= 0)
                    mesCode += 2;
    
                binaryCode = solicitanteCode + mesCode;

                if (value === 'modulos')
                {
                    switch (binaryCode) {
                        // case 1: setDataFilter( data_task.filter((item) => item.id_solicitante_tarea === solicitante )); break;
                        case 2: setDataFilter( data_imputacion_m.filter((item) => item.mes_mm === mes )); console.log('Filtro información para mes: ' + mes ); break;
                        // case 3: setDataFilter( data_task.filter((item) => item.id_solicitante_tarea === solicitante && item.mes === mes )); break;
                        default: setDataFilter(data_imputacion_m); break;
                    }
                }
                
                else
                {
                    switch (binaryCode) {
                        // case 1: setDataFilter( data_task.filter((item) => item.id_solicitante_tarea === solicitante )); break;
                        case 2: setDataFilter( data_imputacion_f.filter((item) => item.mes_mm === mes )); console.log('Filtro información para mes: ' + mes ); break;
                        // case 3: setDataFilter( data_task.filter((item) => item.id_solicitante_tarea === solicitante && item.mes === mes )); break;
                        default: setDataFilter(data_imputacion_f); break;
                    }
                }
            }
        
        }, [solicitante, mes, isLoading_imputacion_m, isLoading_imputacion_f, value])

  return (
    <>
    <h5 className = 'cabecera-tittle'> Ver Imputaciones </h5>
    <div className="row filter">
    {
        isLoading_usuario 
            ? <div>...Cargando</div> 
            : <CabeceraFiltro data = {data_usuario.map( item => {return { id: item.id , descripcion : item.nombre_completo }})} field ={'Solicitante'} fieldValue={solicitante} setFieldValue={setSolicitante}/>
    }
    {
        isLoading_mes
            ? <div>...Cargando</div> 
            : <CabeceraFiltro data = {data_mes.map( item => {return { id: item.id, descripcion : item.textual }})} field ={'Mes'} fieldValue={mes} setFieldValue={setMes} defaultValue={ ObtenerFechaHoraActual ().substring(0, 4) + ObtenerFechaHoraActual ().substring(5, 7) }/>
    }

    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Información por</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="dias" control={<Radio />} label="Días" />
        <FormControlLabel value="modulos" control={<Radio />} label="Módulos" />
        {/* <FormControlLabel
          value="disabled"
          disabled
          control={<Radio />}
          label="other"
        /> */}
      </RadioGroup>
    </FormControl>
    </div>

    <CollapsibleTable data = { dataFilter } filtro = {value}/>
    </>
  )
}
