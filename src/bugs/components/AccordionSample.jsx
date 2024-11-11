
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { MiniDeliveryCard } from '../components/MiniDeliveryCard';
import { useEffect, useState } from 'react';
import { useFetch } from '../../hooks';

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

export const AccordionSample = ( props ) => {

  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
  };

  const [ariaControls, setAriaControls] = useState(`panel${props.id}d-content`);
  const [accordionId, setAccordionId] = useState(`panel${props.id}d-header`)
      

  return (
    <Accordion sx={{ backgroundColor : props.backColor }} expanded={expanded === `panel${props.id}`} onChange={handleChange(`panel${props.id}`)}>
      <AccordionSummary aria-controls={ariaControls} id={accordionId}>
        <Typography> { props.title } ({props.data.length}) </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="row row-cols-1 row-cols-md-3 g-2">
          {
              props.data.map( item => (
                  <MiniDeliveryCard 
                      key={ item.id }
                      { ...item }
                  />
              ))
          }
        </div>
      </AccordionDetails>
    </Accordion>
  )
}
