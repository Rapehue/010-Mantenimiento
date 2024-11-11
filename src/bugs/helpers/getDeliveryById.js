import { delivery } from "../data/delivery";

export const getDeliveryById = ( id ) => {
    return delivery.find ( delivery => delivery.id_entregable === id );
}