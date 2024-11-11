import { delivery } from "../data/delivery";

export const getDeliveryByTaskId = ( id ) => {

    // console.log ('El valor del campo id: ' + id);
    return delivery.filter ( delivery => delivery.id_tarea_entregable === id );

}