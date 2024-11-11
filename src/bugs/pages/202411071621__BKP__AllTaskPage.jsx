import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useFetch } from '../../hooks';
import { MiniTaskCard } from '../components/MiniTaskCard';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)',
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export const AllTaskPage= () => {
  const [expanded, setExpanded] = React.useState('panel1');

  const [taskNuevo, setTaskNuevo] = React.useState([]);
  const [taskAsignado, setTaskAsignado] = React.useState([]);
  const [taskDesarrollando, setTaskDesarrollando] = React.useState([]);
  const [taskRealizado, setTaskRealizado] = React.useState([]);
  const [taskEntregado, setTaskEntregado] = React.useState([]);
  const [taskFinalizado, setTaskFinalizado] = React.useState([]);
  const [taskReabierto, setTaskReabierto] = React.useState([]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const { data: data, hasError: hasError, isLoading: isLoading } = useFetch( `http://localhost:3001/obtenertareahisact` );

  React.useEffect(() => {
    
    if ( !isLoading ) 
    {
        setTaskNuevo (data.filter((item) => item.descripcion_estado === 'Nuevo'));
        setTaskAsignado (data.filter((item) => item.descripcion_estado === 'Asignado'));
        setTaskDesarrollando (data.filter((item) => item.descripcion_estado === 'Desarrollando'));
        setTaskRealizado (data.filter((item) => item.descripcion_estado === 'Realizado'));
        setTaskEntregado (data.filter((item) => item.descripcion_estado === 'Entregado'));
        setTaskFinalizado (data.filter((item) => item.descripcion_estado === 'Finalizado'));
        setTaskReabierto (data.filter((item) => item.descripcion_estado === 'Reabierto'));
    }
  
  }, [isLoading])
  
  

  return (
    <>
    {
        isLoading & !!taskNuevo ? <div>...Cargando</div> :
    <div>
      <Accordion sx={{ backgroundColor : 'AliceBlue' }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Nuevo ({taskNuevo.length}) </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row row-cols-1 row-cols-md-3 g-2">
            {
                taskNuevo.map( item => (
                    <MiniTaskCard 
                        key={ item.id_tarea }
                        { ...item }
                    />
                ))
            }
          </div>
        </AccordionDetails>
      </Accordion>
      
      <Accordion sx={{ backgroundColor : 'BlanchedAlmond' }} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Asignado ({taskAsignado.length}) </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row row-cols-1 row-cols-md-3 g-2">
            {
                taskAsignado.map( item => (
                    <MiniTaskCard 
                        key={ item.id_tarea }
                        { ...item }
                    />
                ))
            }
          </div>  
        </AccordionDetails>
      </Accordion>
      
      <Accordion sx={{ backgroundColor : 'BurlyWood' }} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Desarrollando ({taskDesarrollando.length}) </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row row-cols-1 row-cols-md-3 g-2">
            {
                taskDesarrollando.map( item => (
                    <MiniTaskCard 
                        key={ item.id_tarea }
                        { ...item }
                    />
                ))
            }
          </div>
        </AccordionDetails>
      </Accordion>
      
      <Accordion sx={{ backgroundColor : 'Gold' }} expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Realizado ({taskRealizado.length}) </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row row-cols-1 row-cols-md-3 g-2">
            {
                taskRealizado.map( item => (
                    <MiniTaskCard 
                        key={ item.id_tarea }
                        { ...item }
                    />
                ))
            }
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ backgroundColor : 'LightGreen' }} expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography>Entregado ({taskEntregado.length}) </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row row-cols-1 row-cols-md-3 g-2">
            {
                taskEntregado.map( item => (
                    <MiniTaskCard 
                        key={ item.id_tarea }
                        { ...item }
                    />
                ))
            }
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ backgroundColor : 'SeaGreen' }} expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <Typography>Finalizado ({taskFinalizado.length}) </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row row-cols-1 row-cols-md-3 g-2">
            {
                taskFinalizado.map( item => (
                    <MiniTaskCard 
                        key={ item.id_tarea }
                        { ...item }
                    />
                ))
            }
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ backgroundColor : 'OrangeRed' }} expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
        <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
          <Typography>Reabierto ({taskReabierto.length}) </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row row-cols-1 row-cols-md-3 g-2">
            {
                taskReabierto.map( item => (
                    <MiniTaskCard 
                        key={ item.id_tarea }
                        { ...item }
                    />
                ))
            }
          </div>
        </AccordionDetails>
      </Accordion>

    </div>
    }
    </>
  );
}
