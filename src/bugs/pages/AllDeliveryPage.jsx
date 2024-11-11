import { useEffect, useState } from "react";
import { useFetch } from "../../hooks";
import { CabeceraFiltro } from "../components/CabeceraFiltro";
import { AccordionSample } from "../components/AccordionSample";

  
export const AllDeliveryPage = () => {

    const { data: data_usuario, hasError: hasError_usuario, isLoading: isLoading_usuario } = useFetch( `http://localhost:3001/obtenerusuarios` );

    const { data: data_project, hasError: hasError_project, isLoading: isLoading_project } = useFetch( `http://localhost:3001/obtenerproyectos` );

    const { data: data_delivery, hasError: hasError_delivery, isLoading: isLoading_delivery } = useFetch( `http://localhost:3001/obtenerentregablehisact` );

    const [solicitante, setSolicitante] = useState(-1);
    const [responsable, setResponsable] = useState(-1);
    const [proyecto, setProyecto] = useState(-1);
    const [dataFilter, setDataFilter] = useState([]);
    
    var solicitanteCode = 0;
    var responsableCode = 0;
    var proyectoCode = 0;
    
    var binaryCode = 0;

    const resetCalcValues = () => {
        
        solicitanteCode = 0;
        responsableCode = 0;
        proyectoCode = 0;    
    
    };

    useEffect(() => {

        resetCalcValues ();

        if (!isLoading_delivery)
        {    
            // Solicitante 001 - Responsable 010 - Poryecto 100
            if (solicitante >= 0)
                solicitanteCode += 1; 
            if (responsable >= 0)
                responsableCode += 2;
            if (proyecto >= 0)
                proyectoCode += 4;
            
            binaryCode = solicitanteCode + responsableCode + proyectoCode;

            switch (binaryCode) {
                case 1: setDataFilter( data_delivery.filter((item) => item.id_solicitante_tarea === solicitante )); break;
                case 2: setDataFilter( data_delivery.filter((item) => item.id_responsable_entregable === responsable )); break;
                case 3: setDataFilter( data_delivery.filter((item) => item.id_solicitante_tarea === solicitante && item.id_responsable_entregable === responsable )); break;
                case 4: setDataFilter( data_delivery.filter((item) => item.id_proyecto_entregable === proyecto )); break;
                case 5: setDataFilter( data_delivery.filter((item) => item.id_solicitante_tarea === solicitante && item.id_proyecto_entregable === proyecto )); break;
                case 6: setDataFilter( data_delivery.filter((item) => item.id_responsable_entregable === responsable && item.id_proyecto_entregable === proyecto )); break;
                case 7: setDataFilter( data_delivery.filter((item) => item.id_solicitante_tarea === solicitante && item.id_responsable_entregable === responsable && item.id_proyecto_entregable === proyecto)); break;
                default: setDataFilter(data_delivery); break;
            }
        }
    
    }, [solicitante, responsable, proyecto])


    useEffect(() => {
      
        if(!isLoading_delivery)
        {
            setDataFilter(data_delivery);
        }
    
    }, [isLoading_delivery])

    return (
    <>
        <div className="row filter">
        {
            isLoading_usuario 
                ? <div>...Cargando</div> 
                : <CabeceraFiltro data = {data_usuario.map( item => {return { id: item.id , descripcion : item.nombre_completo }})} field ={'Solicitante'} fieldValue={solicitante} setFieldValue={setSolicitante}/>
        }

        {
            isLoading_usuario 
                ? <div>...Cargando</div> 
                : <CabeceraFiltro data = {data_usuario.map( item => {return { id: item.id , descripcion : item.nombre_completo }})} field ={'Responsable'} fieldValue={responsable} setFieldValue={setResponsable}/>
        }

        {
            isLoading_project 
                ? <div>...Cargando</div> 
                : <CabeceraFiltro data = {data_project.map( item => {return { id: item.id , descripcion : item.descripcion }})} field ={'Proyecto'} fieldValue={proyecto} setFieldValue={setProyecto}/>
        }
        </div>
        {
            isLoading_delivery
                ? <div>...Cargando</div>
                // : <AccordionSample backColor = {'BurlyWood'} title = {'Nuevos'} id={1} data = {data_delivery.filter((item) => item.descripcion_estado === 'Nuevo')}
                : 
                <>
                <AccordionSample backColor = {'AliceBlue'} title = {'Nuevos'} id={1} data = {(dataFilter.filter((item) => item.descripcion_estado === 'Nuevo')).map( item => {return { id: item.id_entregable , ...item }})}/>
                
                <AccordionSample backColor = {'BlanchedAlmond'} title = {'Asignados'} id={2} data = {(dataFilter.filter((item) => item.descripcion_estado === 'Asignado')).map( item => {return { id: item.id_entregable , ...item }})}/>

                <AccordionSample backColor = {'BurlyWood'} title = {'Desarrollando'} id={3} data = {(dataFilter.filter((item) => item.descripcion_estado === 'Desarrollando')).map( item => {return { id: item.id_entregable , ...item }})}/>

                <AccordionSample backColor = {'Gold'} title = {'Realizado'} id={4} data = {(dataFilter.filter((item) => item.descripcion_estado === 'Realizado')).map( item => {return { id: item.id_entregable , ...item }})}/>

                <AccordionSample backColor = {'LightGreen'} title = {'Entregado'} id={5} data = {(dataFilter.filter((item) => item.descripcion_estado === 'Entregado')).map( item => {return { id: item.id_entregable , ...item }})}/>

                <AccordionSample backColor = {'SeaGreen'} title = {'Finalizado'} id={6} data = {(dataFilter.filter((item) => item.descripcion_estado === 'Finalizado')).map( item => {return { id: item.id_entregable , ...item }})}/>

                <AccordionSample backColor = {'OrangeRed'} title = {'Reabierto'} id={7} data = {(dataFilter.filter((item) => item.descripcion_estado === 'Reabierto')).map( item => {return { id: item.id_entregable , ...item }})}/>
                </>
        }
    </>
  )
}