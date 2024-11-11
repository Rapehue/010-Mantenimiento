import axiosInstance from 'axios';
import { formateaFechaHoraEscribeMySql, ObtenerFechaHoraActual } from './generaFechaHora';

    var nuevoEstado = [];
    var nuevoEstadoId = null;
    var nuevoEstadoDesc = null;
    var nuevoUsuario = '';
    var nuevoMensaje = '';
    var nuevoMensajeTarea = '';
    var nuevoFechaInicio = null;
    var nuevoFechaInicioTarea = null;
    var nuevoFechaFin = null;
    var textButton = '';


export const resetValores = () => {

    nuevoEstado = [];
    nuevoEstadoId = null;
    nuevoEstadoDesc = null;
    nuevoUsuario = '';
    nuevoMensaje = '';
    nuevoMensajeTarea = '';
    nuevoFechaInicio = null;
    nuevoFechaInicioTarea = null;
    nuevoFechaFin = null;
    textButton = '';

};

export const calculaCamposUpdate = ( textButton, activeTask, activeDelivery, data_state ) => {

    console.log ('Este es el valor de textButton dentro de calcula campos update: ' + textButton)

    if ( textButton === 'Seleccionar' )
    {
        nuevoEstado = activeDelivery.id_estado_entregable
        nuevoUsuario = activeDelivery.id_responsable_entregable
        nuevoMensaje = 'Se asigna el entregable ' + activeDelivery.codigo_entregable + ' - ' + activeDelivery.descripcion_entregable
        nuevoMensajeTarea = 'Se asigna la tarea: ' + activeTask.codigo_tarea + ' - ' + activeTask.descripcion_tarea + ' al usuario: ' + activeTask.nombre_completo_responsable_tarea
        nuevoFechaInicio = "\'" + formateaFechaHoraEscribeMySql (activeDelivery.fecha_inicio_real_entregable, 'U' ) + "\'"
        if (activeDelivery.fecha_fin_real_entregable === null)
            nuevoFechaFin = null
    }
    if ( textButton === 'Asignar' )
    {
        nuevoEstado = data_state.find ( data_state => data_state.descripcion === 'Asignado' )
        nuevoUsuario = 1 // Usuario Activo
        nuevoMensaje = 'Se asigna el entregable ' + activeDelivery.codigo_entregable + ' - ' + activeDelivery.descripcion_entregable
        nuevoMensajeTarea = 'Se asigna la tarea: ' + activeTask.codigo_tarea + ' - ' + activeTask.descripcion_tarea + ' al usuario: ' + activeTask.nombre_completo_responsable_tarea
        if (activeDelivery.fecha_inicio_real_entregable === null)
            nuevoFechaInicio = null
        else
            nuevoFechaInicio = "\'" + formateaFechaHoraEscribeMySql (activeDelivery.fecha_inicio_real_entregable, 'U' ) + "\'"
        if (activeDelivery.fecha_fin_real_entregable === null)
                nuevoFechaFin = null
    }
    else if ( textButton === 'Iniciar' )
    {
        nuevoEstado = data_state.find ( data_state => data_state.descripcion === 'Desarrollando' )
        nuevoUsuario = activeDelivery.id_responsable_entregable
        nuevoMensaje = 'Se inicia el entregable ' + activeDelivery.codigo_entregable + ' - ' + activeDelivery.descripcion_entregable
        if ( activeDelivery.fecha_inicio_real_entregable === null )
        {
            nuevoFechaInicio = "\'" + formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' ) + "\'"
        }
        else 
        {
            nuevoFechaInicio = "\'" + formateaFechaHoraEscribeMySql ( activeDelivery.fecha_inicio_real_entregable, 'I' ) + "\'"
        }
        if ( activeTask.fecha_inicio_real_tarea === null )
        {
            nuevoMensajeTarea = 'Se inicia la tarea ' + activeTask.codigo_tarea + ' - ' + activeTask.descripcion_tarea
            nuevoFechaInicioTarea = "\'" + formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' ) + "\'"
        }
        else
        {
            nuevoMensajeTarea = 'Se reinicia la tarea ' + activeTask.codigo_tarea + ' - ' + activeTask.descripcion_tarea
            nuevoFechaInicioTarea = "\'" + formateaFechaHoraEscribeMySql ( activeTask.fecha_inicio_real_tarea, 'I' ) + "\'"
        }

        if (activeDelivery.fecha_fin_real_entregable === null)
            nuevoFechaFin = null
        
    }
    else if ( textButton === 'Realizar' )
    {
        nuevoEstado = data_state.find ( data_state => data_state.descripcion === 'Realizado' )
        nuevoUsuario = activeDelivery.id_responsable_entregable
        nuevoMensaje = 'Entregable ' + activeDelivery.codigo_entregable + ' - ' + activeDelivery.descripcion_entregable + ' finalizado en entorno Desarrollo';
        nuevoFechaInicio = "\'" + formateaFechaHoraEscribeMySql ( activeDelivery.fecha_inicio_real_entregable, 'U' ) + "\'"
        nuevoMensajeTarea = 'Se finaliza la tarea ' + activeTask.codigo_tarea + ' - ' + activeTask.descripcion_tarea + ' en el entorno de Desarrollo';
        if (activeDelivery.fecha_fin_real_entregable === null)
            nuevoFechaFin = null
    }
    else if ( textButton === 'Entregar' )
    {
            nuevoEstado = data_state.find ( data_state => data_state.descripcion === 'Entregado' )
            nuevoUsuario = activeDelivery.id_responsable_entregable
            nuevoMensaje = 'Entregable ' + activeDelivery.codigo_entregable + ' - ' + activeDelivery.descripcion_entregable + ' desplegado en entorno Producción';
            nuevoFechaInicio = "\'" + formateaFechaHoraEscribeMySql ( activeDelivery.fecha_inicio_real_entregable, 'U' ) + "\'"
            nuevoMensajeTarea = 'Se despliegan todos los entregables de la tarea ' + activeTask.codigo_tarea + ' - ' + activeTask.descripcion_tarea + ' en el entorno de Producción';
            if (activeDelivery.fecha_fin_real_entregable === null)
                nuevoFechaFin = null
    }

    else if ( textButton === 'Finalizar' )
    {
            nuevoEstado = data_state.find ( data_state => data_state.descripcion === 'Finalizado' )
            nuevoUsuario = activeDelivery.id_responsable_entregable
            nuevoMensaje = 'Entregable ' + activeDelivery.codigo_entregable + ' - ' + activeDelivery.descripcion_entregable + ' validado en entorno Producción';
            nuevoFechaInicio = "\'" + formateaFechaHoraEscribeMySql ( activeDelivery.fecha_inicio_real_entregable, 'U' ) + "\'"
            nuevoMensajeTarea = 'Se validan todos los entregables de la tarea ' + activeTask.codigo_tarea + ' - ' + activeTask.descripcion_tarea + ' en el entorno de Producción';
            nuevoFechaFin = "\'" + formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' ) + "\'"
    }

    else if ( textButton === 'Reabrir' )
    {
            nuevoEstado = data_state.find ( data_state => data_state.descripcion === 'Reabierto' )
            nuevoUsuario = activeDelivery.id_responsable_entregable
            nuevoMensaje = 'Entregable ' + activeDelivery.codigo_entregable + ' - ' + activeDelivery.descripcion_entregable + ' reabierto para su revisión';
            nuevoFechaInicio = "\'" + formateaFechaHoraEscribeMySql ( activeDelivery.fecha_inicio_real_entregable, 'U' ) + "\'"
            nuevoMensajeTarea = 'Se reabre la tarea ' + activeTask.codigo_tarea + ' - ' + activeTask.descripcion_tarea + '  para revisión del entregable ' + activeDelivery.codigo_entregable + ' - ' + activeDelivery.descripcion_entregable + '.';
            // Habría que analizar la necesidad de incluir un campo también para la tarea en caso de que esté finalizada
            nuevoFechaFin = "\'" + formateaFechaHoraEscribeMySql ( activeDelivery.fecha_fin_real_entregable, 'U' ) + "\'"
    }

    nuevoEstadoId = nuevoEstado.id;
    nuevoEstadoDesc = nuevoEstado.descripcion;

};

export const updateEntregable = ( event, activeTask, activeDelivery, data_state ) => {

    textButton = event.target.textContent;

    calculaCamposUpdate ( textButton, activeTask, activeDelivery, data_state );

    console.log ('Comienza actualización entregable' );
    
    axiosInstance.put("http://localhost:3001/updateentregable", {
        id: activeDelivery.id_entregable,
        codigo: activeDelivery.codigo_entregable,
        descripcion: activeDelivery.descripcion_entregable,
        descripcion_ampliada: activeDelivery.descripcion_ampliada_entregable,
        id_responsable: nuevoUsuario,
        id_tarea: activeTask.id_tarea,
        id_proyecto: activeTask.id_proyecto_tarea,
        id_estado: nuevoEstadoId,
        fecha_inicio_real: nuevoFechaInicio,
        fecha_fin_real: nuevoFechaFin,
        esfuerzo_real: null,
        proyecto_egipto: activeTask.proyecto_egipto_tarea,
        modulo_egipto: activeTask.modulo_egipto_tarea,
        tarea_egipto: activeDelivery.tarea_egipto_entregable,
        fecha_modificacion: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' )               
    }).then((response) => {
        console.log ('Finaliza actualización entregable' );
        return updateInsertEntregableHis ( activeDelivery, activeTask );
    });
};

export const updateTarea = ( activeTask ) => {

    console.log ('Comienza actualización tarea' );

    axiosInstance.put("http://localhost:3001/updatetarea", {
        id: activeTask.id_tarea,
        id_responsable: activeTask.id_responsable_tarea,
        id_estado: nuevoEstadoId,
        fecha_inicio_estimada: formateaFechaHoraEscribeMySql(`${ activeTask.fecha_inicio_estimada_tarea }`, 'U'),
        fecha_fin_estimada: formateaFechaHoraEscribeMySql(`${ activeTask.fecha_fin_estimada_tarea }`, 'U'),
        esfuerzo_estimado: `${activeTask.esfuerzo_estimado_tarea}`,
        fecha_inicio_real: nuevoFechaInicioTarea,
        fecha_fin_real: nuevoFechaFin,
        esfuerzo_real: `${activeTask.esfuerzo_real_tarea}`,
        proyecto_egipto: `${activeTask.proyecto_egipto_tarea}`,
        modulo_egipto: `${activeTask.modulo_egipto_tarea}`,
        fecha_modificacion: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' )               
    }).then((response) => {
        console.log ('Finaliza actualización tarea' );
        updateInsertTareaHis ( activeTask );
    });
};

export const updateInsertTareaHis = ( activeTask ) => {

    console.log ('Comienza actualización tarea histórica' );

    axiosInstance.get(`http://localhost:3001/obtenermaxtareahis/${activeTask.id_tarea}`).then((response) => {
        axiosInstance.get(`http://localhost:3001/obtenertareahis/${response.data[0].id}`).then((response) => {
            console.log({ response });
            axiosInstance.put("http://localhost:3001/updatemaxtareahis", { // No lo hace al 'iniciar'
                id: `${response.data[0].id}`,
                marca_activo: 'N',
                fecha_modificacion: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' )               
            }).then((response) => {
                axiosInstance.post("http://localhost:3001/creartareahis", { // No lo hace al 'iniciar'
                    id_tarea: activeTask.id_tarea,
                    id_responsable_anterior: activeTask.id_responsable_tarea,
                    id_responsable_actual: activeTask.id_responsable_tarea,
                    id_estado_anterior: activeTask.id_estado_tarea,
                    id_estado_actual: nuevoEstadoId,
                    comentarios: nuevoMensajeTarea + '.',
                    marca_activo: 'S',
                    fecha_alta: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' ),
                    fecha_modificacion: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' ),
                }).then (( response ) => {
                    console.log ('Finaliza actualización tarea histórica' );
                })
            })
        })
    })

};

export const updateInsertEntregableHis = ( activeDelivery, activeTask ) => {
    
    console.log ('Comienza actualización entregable histórico' );

    axiosInstance.get(`http://localhost:3001/obtenermaxentregablehis/${activeDelivery.id_entregable}`).then((response) => {
        console.log(response);
        console.log(activeDelivery.id_entregable)
        axiosInstance.get(`http://localhost:3001/obtenerentregablehis/${response.data[0].id}`).then((response) => {
            axiosInstance.put("http://localhost:3001/updatemaxdeliveryhis", {
                id: `${response.data[0].id}`,
                marca_activo: 'N',
                fecha_modificacion: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' )               
                }).then(() => {
                    
                });
        });
    }).then((response) => {

        axiosInstance.post("http://localhost:3001/crearentregablehis", {
            id_entregable: activeDelivery.id_entregable,
            id_tarea: activeDelivery.id_tarea_entregable,
            id_responsable_anterior: activeDelivery.id_responsable_entregable,
            id_responsable_actual: nuevoUsuario,
            id_estado_anterior: activeDelivery.id_estado_entregable,
            id_estado_actual: nuevoEstadoId,
            comentarios: nuevoMensaje,
            marca_activo: 'S',
            fecha_alta: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' ),
            fecha_modificacion: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' ),
        }).then (( response ) => {
            console.log ('Finaliza actualización entregable histórico' );
            calculaUpdateTarea ( activeTask )
            
            // Aquí sería necesario enviar un 'Aviso' para que se refresque la información del entregable activo
            return true
        })
    });
};
export const calculaUpdateTarea = ( activeTask ) => {

    var resp = false;
    var total_entregables_estado_anterior = null;

    axiosInstance.get(`http://localhost:3001/obtenerestadoentregablestarea/${activeTask.id_tarea}`).then((response) => {
        console.log ( response.data );
        total_entregables_estado_anterior = response.data.filter ( estado => estado.id_estado_entregable < nuevoEstadoId )

        // Cuando SÍ se debe actualizar la tarea

        // Entregable asignado con posterioridad a estado 'Tarea Asignada'
        if ( textButton === 'Asignar' && activeTask.descripcion_estado != 'Asignado' && activeTask.descripcion_estado != 'Desarrollando')
        {
            console.log ( 'Hay que actualizar la tarea porque el botón es Asignar y la tarea no está en estado Asginado / Desarrollando' );
            resp = true;
        }
        // Primer entregable que inicia la tarea => 'Cambia Estado y cambia Fecha de Inicio'
        else if ( textButton === 'Iniciar' && activeTask.fecha_inicio_real_tarea === null )
        {
            console.log ( 'Hay que actualizar la tarea porque el botón es Iniciar y la fecha de Inicio es Null' );
            resp = true;
        }
        // Entregable iniciado desde 'Tarea Asignada' pero con Fecha de Inicio informada => 'Cambia Estado pero NO cambia Fecha de Inicio'
        else if ( textButton === 'Iniciar' && activeTask.fecha_inicio_real_tarea != null && activeTask.descripcion_estado === 'Asignado' )
            {
                console.log ( 'Hay que actualizar la tarea porque el botón es Iniciar y la fecha de Inicio no es Null y el estado de la tarea es Asignado' );
                resp = true;
            }
        // Último entregable que realiza la tarea
        else if ( (textButton === 'Realizar' || textButton === 'Entregar' || textButton === 'Finalizar') && total_entregables_estado_anterior.length === 0 )
        {
            console.log ( 'Hay que actualizar la tarea porque el botón es: ' +  textButton + ' y la tarea no tiene entregables en estado: Nuevo, Asignado, Desarrollando' );
            resp = true;
        }
        // Entregable reabierto con tarea finalizada
        else if ( textButton === 'Reabrir' && activeTask.fecha_fin_real_tarea != null && activeTask.descripcion_estado === 'Finalizado' )
        {
                console.log ( 'Hay que actualizar la tarea porque el botón es Reabrir y la fecha de Fin no es Null y el estado de la tarea es Finalizado' );
                resp = true;
        }
        else
        {
            console.log ( 'No hay que actualizar la tarea porque el botón es: ' + textButton + ' y la fecha de inicio de la tarea es: ' + activeTask.fecha_inicio_real_tarea
                + ' el estado actual de la tarea es: ' + activeTask.descripcion_estado + ' y el número de entregables con estado anterior es: ' + total_entregables_estado_anterior.length
                );
            resp = false;
        }

        console.log ( 'El resultado del cálculo de la tarea es: ' + resp)

        if ( resp )
            updateTarea ( activeTask )
        
        return resp;

        
    });            
};

export const updateEstimacion = ( data_estimate, data_delivery, marca_activo = 'S' ) => {

    console.log ( data_estimate );

    var aprobada = data_estimate[0].aprobada === 'null' ? null : data_estimate[0].aprobada
    var fecha_respuesta = data_estimate[0].fecha_respuesta === 'null' ? null : formateaFechaHoraEscribeMySql (data_estimate[0].fecha_respuesta)

    console.log ( data_delivery );

    axiosInstance.put("http://localhost:3001/updateestimacion_estado", {
        id: data_estimate[0].id, 
        estimacion: data_estimate[0].estimacion, 
        aprobada: aprobada, 
        fecha_respuesta: fecha_respuesta, 
        marca_activo: marca_activo            
    }).then((response) => {
        console.log ('Finaliza actualización estimación' );
        if ( marca_activo === 'N' )
        {
            axiosInstance.post("http://localhost:3001/crearestimacion", {
                id_tarea: data_delivery[0].id_tarea_entregable,
                id_entregable: data_delivery[0].id_entregable,
                id_responsable: data_delivery[0].id_responsable_entregable,
                id_solicitante: data_delivery[0].id_solicitante_tarea,
                estimacion: estimacion,
                fecha_estimacion: formateaFechaHoraEscribeMySql(ObtenerFechaHoraActual()),
                marca_activo: 'S',
            }).then(() => {
                console.log ('Finaliza inserción nueva estimación' );
            });
        }
        else
        {
            console.log ('No hace falta insertar nueva estimación' );
        }
    });

};

export const createNota = ( descripcion_nota, activeDelivery ) => {

    axiosInstance.post("http://localhost:3001/crearnota", {
        id_entregable: activeDelivery.id_entregable,
        id_usuario: activeDelivery.id_responsable_entregable,
        id_estado: activeDelivery.id_estado_entregable,
        descripcion: descripcion_nota,
        marca_activo: 'S',
        fecha_alta: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' ),
        fecha_modificacion: formateaFechaHoraEscribeMySql ( ObtenerFechaHoraActual (), 'I' ),
    }).then (( response ) => {
        console.log ('Finaliza la inserción de la nota' );
    })

}