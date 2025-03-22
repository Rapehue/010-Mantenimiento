import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { useFetch } from "../../hooks";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  
  const { data: data_imputacion, hasError: hasError_imputacion, isLoading: isLoading_imputacion } = useFetch( `http://localhost:3001/obtenerimputacionmesdetalle` );

  console.log ( { row } );
  return (
    <>
    {
      isLoading_imputacion
      ? <div>...Loading</div>
      :
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {
            props.filtro === 'modulos'
            ? <div>{row.modulo}</div>
            : <div>{row.fecha_ddmmyyyy}</div>
          }
        </TableCell>
        <TableCell> 
        {
          props.filtro === 'modulos'
          ? <div>{row.egipto}</div>
          : <div>{row.modulo}</div>
        }
        </TableCell>
        <TableCell align="right">{row.horas}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Desglose
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>{props.filtro === 'modulos' ? 'Fecha' : 'Egipto'}</TableCell>
                    <TableCell>Tarea</TableCell>
                    <TableCell>Entregable</TableCell>
                    <TableCell align="right">Horas</TableCell>
                  </TableRow>
                </TableHead>
                {
                  props.filtro === 'modulos'
                  ? <TableBody>
                    {data_imputacion.filter((item) => item.modulo === row.modulo && item.egipto ===row.egipto).map((desgloseRow) => (
                    <TableRow key={desgloseRow.fecha_ddmmyyyy}>
                      <TableCell component="th" scope="row">
                        {desgloseRow.fecha_ddmmyyyy}
                      </TableCell>
                      <TableCell>{desgloseRow.descripcion_tarea}</TableCell>
                      <TableCell>{desgloseRow.descripcion_entregable}</TableCell>
                      <TableCell align="right">{desgloseRow.horas}</TableCell>
                    </TableRow>
                    ))}
                    </TableBody>
                  : <TableBody>{data_imputacion.filter((item) => item.fecha_ddmmyyyy === row.fecha_ddmmyyyy && item.modulo ===row.modulo).map((desgloseRow) => (
                    <TableRow key={desgloseRow.egipto}>
                      <TableCell component="th" scope="row">
                        {desgloseRow.egipto}
                      </TableCell>
                      <TableCell>{desgloseRow.descripcion_tarea}</TableCell>
                      <TableCell>{desgloseRow.descripcion_entregable}</TableCell>
                      <TableCell align="right">{desgloseRow.horas}</TableCell>
                    </TableRow>
                    ))}
                    </TableBody>
                }
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
    }
    </>
  );
}

export default function CollapsibleTable( props) {

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {
              props.filtro === 'modulos'
            ? <>
            <TableCell>Modulo Egipto</TableCell>
            <TableCell align="right">Tarea Egipto</TableCell>
            <TableCell align="right">Horas&nbsp;</TableCell>
            </>
            : <>
            <TableCell>Fecha</TableCell>
            <TableCell align="right">Modulo Egipto</TableCell>
            <TableCell align="right">Horas&nbsp;</TableCell>
            </>
            }
          </TableRow>
        </TableHead>
        <TableBody>
        {
              props.filtro === 'modulos'
          ? <>
          {props.data.map((row) => (
            <Row key={row.modulo} row={row} filtro = { props.filtro }/>
          ))}
          </>
          :<>
          {props.data.map((row) => (
            <Row key={row.fecha_ddmmyyyy} row={row} filtro = { props.filtro }/>
          ))}
          </>
        }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
