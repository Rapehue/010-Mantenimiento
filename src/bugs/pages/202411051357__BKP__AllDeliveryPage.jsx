import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useFetch } from '../../hooks';
import { MiniDeliveryCard } from '../components/MiniDeliveryCard';
import { Grid2, MenuItem, TextField } from '@mui/material';
import axiosInstance from 'axios';

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



export const AllDeliveryPage= () => {

  const [expanded, setExpanded] = React.useState('panel1');

  const [dataFilter, setDataFilter] = React.useState([]);
  const [entNuevo, setEntNuevo] = React.useState([]);
  const [entAsignado, setEntAsignado] = React.useState([]);
  const [entDesarrollando, setEntDesarrollando] = React.useState([]);
  const [entRealizado, setEntRealizado] = React.useState([]);
  const [entEntregado, setEntEntregado] = React.useState([]);
  const [entFinalizado, setEntFinalizado] = React.useState([]);
  const [entReabierto, setEntReabierto] = React.useState([]);
  const [solicitante, setSolicitante] = React.useState(-1);
  const [proyecto, setProyecto] = React.useState(0);
  const [responsable, setResponsable] = React.useState(-1);
  const [responsableActualizado, setResponsableActualizado] = React.useState(false);
  
  const { data: data, hasError: hasError, isLoading: isLoading } = useFetch( `http://localhost:3001/obtenerentregablehisact` );

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const onInputChange = ( event ) => {

    // console.log ( event.target.name );
    event.preventDefault();

    if( event.target.name === 'proyecto')
    {
      setProyecto ( event.target.value );
      if (solicitante > 0)
      {
        if (responsable >= 0)
          setDataFilter(data.filter((item) => item.id_proyecto_entregable === event.target.value && item.id_responsable_entregable === responsable && item.id_solicitante_tarea === solicitante));  
        else
          setDataFilter(data.filter((item) => item.id_proyecto_entregable === event.target.value && item.id_solicitante_tarea === solicitante));  
      }
      else 
      {
        if (responsable >= 0)
          setDataFilter(data.filter((item) => item.id_proyecto_entregable === event.target.value && item.id_responsable_entregable === responsable));
        else
          setDataFilter(data.filter((item) => item.id_proyecto_entregable === event.target.value));
      }        
    }

    else if( event.target.name === 'solicitante')
    {
      setSolicitante ( event.target.value );
      if (proyecto > 0)
      {
        if (responsable >= 0)
          setDataFilter(data.filter((item) => item.id_solicitante_tarea === event.target.value && item.id_responsable_entregable === responsable && item.id_proyecto_entregable === proyecto));  
        else
          setDataFilter(data.filter((item) => item.id_solicitante_tarea === event.target.value && item.id_proyecto_entregable === proyecto));  
      }
      else 
      {
        if (responsable >= 0)
          setDataFilter(data.filter((item) => item.id_solicitante_tarea === event.target.value && item.id_responsable_entregable === responsable));
        else
          setDataFilter(data.filter((item) => item.id_solicitante_tarea === event.target.value));
      }
    }
    
    else if( event.target.name === 'responsable')
    {
      setResponsable(event.target.value);
      setDataFilter(data.filter((item) => item.id_responsable_entregable === event.target.value));
      if (proyecto > 0)
      {
        if (solicitante >= 0)
          setDataFilter(data.filter((item) => item.id_responsable_entregable === event.target.value && item.id_solicitante_tarea === solicitante && item.id_proyecto_entregable === proyecto));  
        else
          setDataFilter(data.filter((item) => item.id_responsable_entregable === event.target.value && item.id_proyecto_entregable === proyecto));  
      }
      else 
      {
        if (solicitante >= 0)
          setDataFilter(data.filter((item) => item.id_responsable_entregable === event.target.value && item.id_solicitante_tarea === solicitante));
        else
          setDataFilter(data.filter((item) => item.id_responsable_entregable === event.target.value));
      }
    }
    
  };

  const resetUserFilter = ( event ) => {
    event.preventDefault();
    setSolicitante( -1 );

    if (proyecto > 0)
    {
      if (responsable >= 0)
        setDataFilter(data.filter((item) => item.id_responsable_entregable === responsable && item.id_proyecto_entregable === proyecto));  
      else
        setDataFilter(data.filter((item) => item.id_proyecto_entregable === proyecto));  
    }
    else 
    {
      if (responsable >= 0)
        setDataFilter(data.filter((item) => item.id_responsable_entregable === responsable));
    }
  };

  const resetResponsableFilter = ( event ) => {
    event.preventDefault();
    setResponsable( -1 );
    
    if (proyecto > 0)
    {
      if (solicitante >= 0)
        setDataFilter(data.filter((item) => item.id_solicitante_tarea === solicitante && item.id_proyecto_entregable === proyecto));  
      else
        setDataFilter(data.filter((item) => item.id_proyecto_entregable === proyecto));  
    }
    else 
    {
      if (solicitante >= 0)
        setDataFilter(data.filter((item) => item.id_solicitante_tarea === solicitante));
    }
  };

  const resetProjectFilter = ( event ) => {
    event.preventDefault();
    setProyecto ( 0 );

    if (solicitante > 0)
    {
      if (responsable >= 0)
        setDataFilter(data.filter((item) => item.id_responsable_entregable === responsable && item.id_solicitante_tarea === solicitante));  
      else
        setDataFilter(data.filter((item) => item.id_solicitante_tarea === solicitante));  
    }
    else 
    {
      if (responsable >= 0)
        setDataFilter(data.filter((item) => item.id_responsable_entregable === responsable));
    }
  };

  const { data: data_user, hasError: hasError_user, isLoading: isLoading_user } = useFetch( `http://localhost:3001/obtenerusuarios` );
  const { data: data_project, hasError: hasError_project, isLoading: isLoading_project } = useFetch( `http://localhost:3001/obtenerproyectos` );

  const inicializarArray = () => {

    setEntNuevo (dataFilter.filter((item) => item.descripcion_estado === 'Nuevo'));
    setEntAsignado (dataFilter.filter((item) => item.descripcion_estado === 'Asignado'));
    setEntDesarrollando (dataFilter.filter((item) => item.descripcion_estado === 'Desarrollando'));
    setEntRealizado (dataFilter.filter((item) => item.descripcion_estado === 'Realizado'));
    setEntEntregado (dataFilter.filter((item) => item.descripcion_estado === 'Entregado'));
    setEntFinalizado (dataFilter.filter((item) => item.descripcion_estado === 'Finalizado')) 
    setEntReabierto (dataFilter.filter((item) => item.descripcion_estado === 'Reabierto'));

  }

  React.useEffect(() => {

    if ( !isLoading )
    
    {
      setEntNuevo ([ ...data].filter((item) => item.descripcion_estado === 'Nuevo'));
      setEntAsignado ([ ...data].filter((item) => item.descripcion_estado === 'Asignado'));
      setEntDesarrollando ([ ...data].filter((item) => item.descripcion_estado === 'Desarrollando'));
      setEntRealizado ([ ...data].filter((item) => item.descripcion_estado === 'Realizado'));
      setEntEntregado ([ ...data].filter((item) => item.descripcion_estado === 'Entregado'));
      setEntFinalizado ([ ...data].filter((item) => item.descripcion_estado === 'Finalizado')) 
      setEntReabierto ([ ...data].filter((item) => item.descripcion_estado === 'Reabierto'));
    }

  }, [ isLoading ])

  React.useEffect(() => {

    if( responsable >= 0 || proyecto > 0 || solicitante >= 0)
    {
      console.log ( 'Entro al useEffect porque hay algún filtro activado' );

      console.log ( { dataFilter });

      inicializarArray();
    }
      
    if( responsable < 0 && proyecto === 0 && solicitante < 0 && !isLoading )
    {
      setEntNuevo ([ ...data].filter((item) => item.descripcion_estado === 'Nuevo'));
      setEntAsignado ([ ...data].filter((item) => item.descripcion_estado === 'Asignado'));
      setEntDesarrollando ([ ...data].filter((item) => item.descripcion_estado === 'Desarrollando'));
      setEntRealizado ([ ...data].filter((item) => item.descripcion_estado === 'Realizado'));
      setEntEntregado ([ ...data].filter((item) => item.descripcion_estado === 'Entregado'));
      setEntFinalizado ([ ...data].filter((item) => item.descripcion_estado === 'Finalizado')) 
      setEntReabierto ([ ...data].filter((item) => item.descripcion_estado === 'Reabierto'));

    }
  }, [ responsable, proyecto, solicitante])


  return (
    <>
    {
        ( isLoading || isLoading_user || isLoading_project) & !!entNuevo ? <div>...Cargando</div> :
    <div>
      <div className="row container-cabecera-pagina">  
        <div className='col'>
              <p className="cabecera-tittle">Filtrar por Usuario</p>

              <div className='cabecera-select'>
                <TextField
                  select
                  label="Seleccionar usuario responsable *"
                  value={ responsable }
                  fullWidth
                  name="responsable"
                  onChange={ (e) => onInputChange (e) }
                  >
                    <MenuItem key='-1' value='-1'>
                      Valor por defecto...
                    </MenuItem>
                  {data_user.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                      {option.nombre_completo}
                      </MenuItem>
                  ))}
              </TextField>
            </div>
            <div className="row justify-content-center">
              <button 
                  className="btn btn-outline-danger btn-sm"
                  onClick={ (e) => resetResponsableFilter(e) }
              >
                  Resetear Búsqueda Usuario
              </button>
            </div>
        </div>

        <div className='col'>
              <p className="cabecera-tittle">Filtrar por Proyecto</p>

          <div className='cabecera-select'>
              <TextField
                select
                label="Seleccionar proyecto *"
                value={ proyecto }
                fullWidth
                name="proyecto"
                onChange={ (e) => onInputChange (e) }
                >
                  <MenuItem key='0' value='0'>
                    Valor por defecto...
                  </MenuItem>
                {data_project.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                    {option.descripcion}
                    </MenuItem>
                ))}
            </TextField>
          </div>
          
            <div className="row justify-content-center">
              <button 
                  className="btn btn-outline-danger btn-sm"
                  onClick={ (e) => resetProjectFilter(e) }
              >
                  Resetear Búsqueda Proyecto
              </button>
            </div>
        </div>

        <div className='col'>
              <p className="cabecera-tittle">Filtrar por Solicitante</p>

          <div className='cabecera-select'>
              <TextField
                select
                label="Seleccionar usuario *"
                value={ solicitante }
                fullWidth
                name="solicitante"
                onChange={ (e) => onInputChange (e) }
                >
                  <MenuItem key='-1' value='-1'>
                    Valor por defecto...
                  </MenuItem>
                {data_user.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                    {option.nombre_completo}
                    </MenuItem>
                ))}
            </TextField>
          </div>
          
            <div className="row justify-content-center">
              <button 
                  className="btn btn-outline-danger btn-sm"
                  onClick={ (e) => resetUserFilter(e) }
              >
                  Resetear Búsqueda Proyecto
              </button>
            </div>
        </div>

      </div>

      
      <br />
      <Accordion sx={{ backgroundColor : 'AliceBlue' }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Nuevo ({entNuevo.length}) </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row row-cols-1 row-cols-md-3 g-2">
            {
                entNuevo.map( item => (
                    <MiniDeliveryCard 
                        key={ item.id_entregable }
                        { ...item }
                    />
                ))
            }
          </div>
        </AccordionDetails>
      </Accordion>
      
      <Accordion sx={{ backgroundColor : 'BlanchedAlmond' }} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Asignado ({entAsignado.length}) </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row row-cols-1 row-cols-md-3 g-2">
            {
                entAsignado.map( item => (
                    <MiniDeliveryCard 
                        key={ item.id_entregable }
                        { ...item }
                    />
                ))
            }
          </div>  
        </AccordionDetails>
      </Accordion>
      
      <Accordion sx={{ backgroundColor : 'BurlyWood' }} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Desarrollando ({entDesarrollando.length}) </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row row-cols-1 row-cols-md-3 g-2">
            {
                entDesarrollando.map( item => (
                    <MiniDeliveryCard 
                        key={ item.id_entregable }
                        { ...item }
                    />
                ))
            }
          </div>
        </AccordionDetails>
      </Accordion>
      
      <Accordion sx={{ backgroundColor : 'Gold' }} expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Realizado ({entRealizado.length}) </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row row-cols-1 row-cols-md-3 g-2">
            {
                entRealizado.map( item => (
                    <MiniDeliveryCard 
                        key={ item.id_entregable }
                        { ...item }
                    />
                ))
            }
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ backgroundColor : 'LightGreen' }} expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography>Entregado ({entEntregado.length}) </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row row-cols-1 row-cols-md-3 g-2">
            {
                entEntregado.map( item => (
                    <MiniDeliveryCard 
                        key={ item.id_entregable }
                        { ...item }
                    />
                ))
            }
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ backgroundColor : 'SeaGreen' }} expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <Typography>Finalizado ({entFinalizado.length}) </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row row-cols-1 row-cols-md-3 g-2">
            {
                entFinalizado.map( item => (
                    <MiniDeliveryCard 
                        key={ item.id_entregable }
                        { ...item }
                    />
                ))
            }
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ backgroundColor : 'OrangeRed' }} expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
        <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
          <Typography>Reabierto ({entReabierto.length}) </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row row-cols-1 row-cols-md-3 g-2">
            {
                entReabierto.map( item => (
                    <MiniDeliveryCard 
                        key={ item.id_entregable }
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
