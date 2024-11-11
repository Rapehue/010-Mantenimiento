import { Grid2 } from '@mui/material';
import Modal from 'react-bootstrap/Modal';

export function PopUpModal (props) {

    // const [result, setResult] = useState('')

    const onHandleGreenButtonClick = ( event ) => {
        props.setResult (props.greenButton);

        props.onHide();
    };

    const onHandleRedButtonClick = ( event ) => {
        props.setResult (props.redButton);

        props.onHide();
    };

  return (
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
          backgroundColor: 'antiquewhite'
        }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{ 
          backgroundColor: 'antiquewhite'
        }}
      >
        {props.body}
      </Modal.Body>
      <Modal.Footer
        style={{ 
          backgroundColor: 'antiquewhite'
        }}
      >
        <Grid2 
            size={12}
            sx={{ textAlign: "center",
                alignItems: "center",
                contentAlign: "center",
                minWidth: "100%",
            }}
        >
            <button 
                className="btn btn-outline-success"
                style={{ textAlign: 'center', marginRight: '60px' }}
                onClick={ (e) => onHandleGreenButtonClick(e) }
            >
                {props.greenButton}
            </button>

            <button 
                className="btn btn-outline-danger"
                style={{ textAlign: 'center', marginLeft: '60px' }}
                onClick={ (e) => onHandleRedButtonClick(e) }
            >
                {props.redButton}
            </button>
        </Grid2>
      </Modal.Footer>
    </Modal>
  )
}
