import { useState } from "react";

export const colurSelector = ( estado ) => {

    const [nombreClase, setNombreClase] = useState('');

    switch(estado) {
        case 'Nuevo': 
            setNombreClase('bg-light') 
        break;
        case 'Asignado': 
            setNombreClase('bg-primary')
        break;
        case 'Estimando': 
           setNombreClase('bg-info')
        break;
        case 'Desarrollando': 
            nsetNombreClase('bg-secondary')
        break;
        case 'Paralizado': 
            setNombreClase('bg-dark')
        break;
        case 'Realizado':
        break;
        case 'Entregado':
        break;
        case 'Finalizado': 
            setNombreClase('bg-success')
        break;
        case 'Reabierto': 
            setNombreClase('bg-danger')
        break;
      default: 
        setNombreClase('bg-light')
    }

    return nombreClase;

};
