import React from 'react'
import { Box, Divider, Drawer, Grid2, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { useFetch } from "../../hooks";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';


export const TimeReportShow = ( props ) => {

    const { data: data_imputacion, hasError: hasError_imputacion, isLoading: isLoading_imputacion } = useFetch( `http://localhost:3001/obtenerimputacionmesdetalle` );

    console.log( props.data)

  return (
    <div>
        {
            props.data.map( item => (                   
                <ListItem key={ item.fecha_ddmmyyyy } disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccessAlarmIcon />
                        </ListItemIcon>
                        <Grid2 container>
                            <ListItemText primary={ item.fecha_ddmmyyyy + ' - TOTAL: ' + item.horas + ' UTE\'s'} />
                        </Grid2>
                    </ListItemButton>
                </ListItem>
            ))
        }
    </div>

    
  )
}
