import React, { useEffect, useState } from 'react'
import { CabeceraFiltro } from "../components/CabeceraFiltro";
import { useFetch } from "../../hooks";
import { ObtenerFechaHoraActual } from '../helpers/generaFechaHora';
import { TimeReportShow } from '../components/TimeReportShow';
import CollapsibleTable from '../components/CollapsibleTable';


export const AllTimeReport = () => {

    // Definición de Constantes, Variables

    const { data: data_usuario, hasError: hasError_usuario, isLoading: isLoading_usuario } = useFetch( `http://localhost:3001/obtenerusuarios` );
    const { data: data_imputacion, hasError: hasError_imputacion, isLoading: isLoading_imputacion } = useFetch( `http://localhost:3001/obtenerimputacionmes` );
    const { data: data_mes, hasError: hasError_mes, isLoading: isLoading_mes } = useFetch( `http://localhost:3001/obtenermes` );

    const [solicitante, setSolicitante] = useState(-1);
    const [mes, setMes] = useState( ObtenerFechaHoraActual ().substring(0, 4) + ObtenerFechaHoraActual ().substring(5, 7) );
    const [dataFilter, setDataFilter] = useState([]);


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
    
            if (!isLoading_imputacion)
            {    
                // Solicitante 001 - Mes 010
                if (solicitante >= 0)
                    // solicitanteCode += 1; 
                    solicitanteCode = 0
                if (mes >= 0)
                    mesCode += 2;
    
                binaryCode = solicitanteCode + mesCode;
    
                switch (binaryCode) {
                    // case 1: setDataFilter( data_task.filter((item) => item.id_solicitante_tarea === solicitante )); break;
                    case 2: setDataFilter( data_imputacion.filter((item) => item.mes_mm === mes )); console.log('Filtro información para mes: ' + mes ); break;
                    // case 3: setDataFilter( data_task.filter((item) => item.id_solicitante_tarea === solicitante && item.mes === mes )); break;
                    default: setDataFilter(data_imputacion); break;
                }
            }
        
        }, [solicitante, mes, isLoading_imputacion])

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
    </div>
    
    <CollapsibleTable data = { dataFilter }/>
    </>
  )
}
