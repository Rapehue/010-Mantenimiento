import { useEffect, useState } from "react";
import { formateaFechaHoraEscribeMySql, ObtenerFechaHoraActual } from "./generaFechaHora";

export const generaDatosInternos = ( accion ) => {

    const [state, setState] = useState({
        nuevoEstado: null,
        nuevoUsuario: null,
        nuevaDescripcion: null,
        nuevaFechaInicio: null,
        nuevaFechaFin: null,
    });

    useEffect(() => {
      
        getData();

    }, [accion]);

    const getData = () => {
    
        if ( accion === 'Asignarme')

            setState({
                nuevoEstado: 'Asignado',
                nuevoUsuario: 1, // Usuario actual
                nuevaDescripcion: 'Se asigna el entregable al usuario',
                ...state, //
            });

        else if ( accion === 'Iniciar')

            setState({
                nuevoEstado: 'Desarrollando',
                nuevoUsuario: 1, // Usuario actual
                nuevaDescripcion: 'Se inicia el entregable',
                nuevaFechaInicio: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual () ),
                ...state, //
            });

    }
    
    return {
        nuevoEstado: state.nuevoEstado,
        nuevoUsuario: state.nuevoUsuario,
        nuevaDescripcion: state.nuevaDescripcion,
        nuevaFechaInicio: state.nuevaFechaInicio,
        nuevaFechaFin: state.nuevaFechaFin
    }

}
