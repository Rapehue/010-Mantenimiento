import { Divider } from "@mui/material"
import { formateaFechaHoraLeeMySql } from '../helpers/generaFechaHora';

export const NoteCard = ({ id_nota
    , id_entregable_nota
    , nombre_completo_usuario_nota
    , descripcion_estado_nota
    , descripcion_nota
    , fecha_alta
}) => {

    console.log (nombre_completo_usuario_nota);
  return (
    <div className="card-per-nota">
        <div 
            className="row"
            style={{ fontSize: '14px',
                padding: '5px'
            }}
        >
            <div className="col-4">
                <b>Autor: </b>{ nombre_completo_usuario_nota }
            </div>
            <div className="col-4">
                <b>Estado: </b>{ descripcion_estado_nota }
            </div>
            <div className="col-4">
                <b>Fecha: </b>{ formateaFechaHoraLeeMySql(fecha_alta) }
            </div>
        </div>

        <Divider
            style={{ padding: '5px',
                marginBottom: '10px'
            }} 
            variant="middle" 
        />

        <div 
            className="col-12"
            style={{
                borderColor: '#FFFFFF',
            }}
        >
            { descripcion_nota }
        </div>
    </div>
  )
}
