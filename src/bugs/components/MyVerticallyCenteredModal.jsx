import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UserCard } from './UserCard.jsx';
import { useFetch } from '../../hooks/useFetch.js';


export function MyVerticallyCenteredModal(props) {

  const { data: data_user, hasError: hasError_user, isLoading: isLoading_user } = useFetch( `http://localhost:3001/obtenerusuarios` );


  return (
    <>
    { isLoading_user
      ? <div>...Cargando</div>
      :
      <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ 
        color: 'GrayText'
      }}
    >
      <Modal.Header closeButton
        style={{ 
          backgroundColor: 'whitesmoke'
        }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          Seleccione un nuevo usuario
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{ 
          backgroundColor: 'whitesmoke'
        }}
      >
        {
          data_user.map( item => (
              <UserCard 
                  key={ item.id }
                  { ...item }
              />
          ))
        }
      </Modal.Body>
      <Modal.Footer
        style={{ 
          backgroundColor: 'whitesmoke'
        }}
      >
        <Button onClick={props.onHide}>Cancelar</Button>
      </Modal.Footer>
    </Modal>
    }
    </>
  );
}