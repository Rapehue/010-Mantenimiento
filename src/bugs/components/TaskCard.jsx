import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setActiveTask } from '../../store/slices/mantenimientoSlice';

export const TaskCard = ( tarea ) => {
  

  const dispatch = useDispatch();

  const onHandleAmpliar = (event) => {
    dispatch( setActiveTask(tarea) );
  }

  const { id_tarea, codigo_tarea, descripcion_tarea, descripcion_ampliada_tarea, descripcion_estado } = tarea;

    return (
        <>
          <Card
              style={{ width: '18rem', marginTop: '20px', marginLeft: '20px', textAlign: 'center' }}
              className={ descripcion_estado === 'Nuevo' 
                ? 'estado_nuevo' 
                : descripcion_estado === 'Asignado'
                  ? 'estado_asignado' 
                  : descripcion_estado === 'Desarrollando'
                    ? 'estado_desarrollando'
                    : descripcion_estado === 'Paralizado'
                      ? 'estado_paralizado'
                      : descripcion_estado === 'Finalizado'
                        ? 'estado_finalizado'
                        : 'estado_reabierto' }
            >
              <Card.Header
              >{ codigo_tarea }</Card.Header>
              <Card.Body>
                <Card.Title>{ descripcion_tarea }</Card.Title>
                <Card.Text 
                  style={{ textAlign: 'justify' }}
                >
                  { descripcion_ampliada_tarea }
                </Card.Text>
              </Card.Body>
              <p style={{ textAlign: 'justify', marginLeft: '20px' }}><b>Estado: </b>{ descripcion_estado }</p>
              {/* <p><a href="#" className={ descripcion_estado === 'Nuevo' ? 'text-dark' : 'text-white'}>Ampliar Información</a></p> */}
              <Link
                onClick={ onHandleAmpliar } 
                to={ `/task/${id_tarea}` }
              >
                            Mas...
              </Link>
            </Card>
        </>
      );
  }