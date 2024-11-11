export const generaFechaHora = ( inputDate ) => {

    var myDate = new Date(inputDate)
    const thisMonth = new Date(inputDate.getFullYear(), inputDate.getMonth(), 1);

    function padLeft (n) {
        return ("00" + n).slice(-2);
    }

    function formatDate(){        
        var d = new Date,
            dformat = [ d.getFullYear(),
                        padLeft(d.getMonth()+1),
                        padLeft(d.getDate())
                        ].join('-');
        var d = new Date,
            hformat = [ padLeft(d.getUTCHours()),
                        padLeft(d.getMinutes()),
                        padLeft(d.getSeconds())
                        ].join(':');

         return dformat + ' ' + hformat;
      }
  
  return formatDate ( thisMonth );
}

export const formateaFechaHoraLeeMySql = ( inputDate ) => {

    if ( !inputDate ) return;

    // Añadido 30/09/2024 - 13:38

    //const newDate = addHoursToDate( new Date( inputDate ), 2).toISOString();
    const newDate = addHoursToDate( new Date( inputDate ), 1).toISOString();

    // Fin añadido 30/09/2024 - 13:38

    
    const stringDate = newDate.substring(8, 10) 
                        + '-' + newDate.substring(5, 7)
                        + '-' + newDate.substring(0, 4) 
                        + ' ' + newDate.substring(11, 16); 
    /* 2024-10-06T22:00:00.000Z */
    return stringDate;
}

export const formateaFechaHoraEscribeMySql = ( inputDate, insert_or_update ) => {

    console.log ( inputDate );
    if ( !inputDate || inputDate === null ) return;

    // Añadido 30/09/2024 - 13:38

    var newDate = new Date( inputDate );
    
    if ( insert_or_update === 'I')
        //newDate = addHoursToDate( new Date( inputDate ), 2).toISOString();
        newDate = addHoursToDate( new Date( inputDate ), 1).toISOString();
    else
        //newDate = addHoursToDate( new Date( inputDate ), 2).toISOString();
        newDate = addHoursToDate( new Date( inputDate ), 1).toISOString();
        

    // Fin añadido 30/09/2024 - 13:38
    
    const stringDate = newDate.substring(0, 4) 
                        + '-' + newDate.substring(5, 7)
                        + '-' + newDate.substring(8, 10) 
                        + ' ' + newDate.substring(11, 16); 
    /* 2024-10-06T22:00:00.000Z */
    return stringDate;
}

export const ObtenerFechaHoraActual = () => {

    const tiempoTranscurrido = Date.now();
    var fechaactual = new Date( tiempoTranscurrido );

    return fechaactual.toISOString();
}


export const addHoursToDate = (objDate, intHours) => {
    const numberOfMlSeconds = objDate.getTime();
    const addMlSeconds = (intHours * 60) * 60000;
    const newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
    return newDateObj;
}

export const formateaDatetoString = (dateObj) => { 
    // dateObj: date -- Mon Sep 30 2024 10:54:00 GMT+0200 (hora de verano de Europa central)    
    if ( !dateObj ) return;

    const numberOfMlSeconds = dateObj.getTime();
    return numberOfMlSeconds;

};

export const formateaStringtoDate = (stringObj) => {

    // stringObj: string -- YYYY-MM-DD    
    if ( !stringObj ) return;

    var arregloFecha = stringObj.split("-");
    var anio = arregloFecha[0];
    var mes = arregloFecha[1] - 1;
    var dia = arregloFecha[2];

    var fecha = new Date(anio, mes, dia); // fecha será de tipo Date

    return fecha;
};