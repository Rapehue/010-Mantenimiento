
export const calculaPorcentajeDias = (fechainicio, fechafin) => {

    if (!fechainicio || !fechafin) return 0;

    const fechaFin = new Date( fechafin );
    const fechaInicio = new Date( fechainicio );

    const tiempoTranscurrido = Date.now();
    const fechaactual = new Date( tiempoTranscurrido );

    const resta_total = fechaFin.getTime() - fechaInicio.getTime();
    const resta_actual = fechaFin.getTime() - fechaactual.getTime();

    return (Math.round(resta_total/ (1000*60*60*24)) - Math.round(resta_actual/ (1000*60*60*24))) / Math.round(resta_total/ (1000*60*60*24));

};


export const restaFechasDias = (fechainicio, fechafin) => {

    if (!fechainicio || !fechafin) return 0;

    const fechaFin = new Date( fechafin );
    const fechaInicio = new Date( fechainicio );

    const resta_total = fechaFin.getTime() - fechaInicio.getTime();

    return Math.round(resta_total/ (1000*60*60*24));

};