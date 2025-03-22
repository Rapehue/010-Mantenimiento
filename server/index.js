const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'mysql-23226ec5-rapehue82-b029.e.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_EbA40vwUyAQ2uCwb15u',
    database: 'defaultdb',
    port:28229
});

app.get("/obtenertareasig/:id",(req, res)=>{
    const id = req.params.id;

    db.query(`SELECT *
        from next_task_view
        WHERE id_proyecto = ${id}`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenerentregablesig/:id",(req, res)=>{
    const id = req.params.id;

    db.query(`SELECT *
        from next_delivery_view
        WHERE id_tarea = ${id}`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenerestados",(req, res)=>{
    const desc = req.params.desc;

    db.query(`SELECT *
        from estado_activo_view`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenerestadosdesc/:desc",(req, res)=>{
    const desc = req.params.desc;

    db.query(`SELECT *
        from estado_activo_view
        WHERE descripcion = '${desc}'`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenertareas",(req,res)=>{

    db.query(`SELECT * 
        FROM tarea_view_des`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenertareas/:id",(req, res)=>{
    const id = req.params.id;

    db.query(`SELECT * 
        FROM tarea_view_des
        WHERE id_tarea = ${id}`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenertareasporentregable/:id",(req, res)=>{
    const id = req.params.id;

    db.query(`SELECT * 
        FROM tarea_view_des
        WHERE id_tarea in (Select id_tarea_entregable
            FROM entregable_view_des
            WHERE id_entregable = ${id})`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});
app.get("/obtenermaxtareahis/:id",(req, res)=>{
    const id = req.params.id;

    db.query(`SELECT * 
        FROM max_id_tareahis_view
        WHERE id_tarea = ${id}`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenermaxentregablehis/:id",(req, res)=>{
    const id = req.params.id;

    db.query(`SELECT * 
        FROM max_id_entregablehis_view
        WHERE id_entregable = ${id}`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenertareascod/:cod",(req, res)=>{
    const cod = req.params.cod;

    db.query(`SELECT * 
        FROM tarea_view_des
        WHERE codigo_tarea = '${cod}'`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenerentregablescod/:cod",(req, res)=>{
    const cod = req.params.cod;

    db.query(`SELECT * 
        FROM entregable_view_des
        WHERE codigo_entregable = '${cod}'`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenerentregablesportarea/:id",(req, res)=>{
    const id = req.params.id;

    db.query(`SELECT * 
        FROM entregable_view_des
        WHERE id_tarea_entregable = ${id}`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenerentregables/:id",(req, res)=>{
    const id = req.params.id;

    db.query(`SELECT * 
        FROM entregable_view_des
        WHERE id_entregable = ${id}`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenertareahis/:id",(req, res)=>{
    const id = req.params.id;

    db.query(`SELECT * 
        FROM tarea_his
        WHERE id = ${id}`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenerentregablehis/:id",(req, res)=>{
    const id = req.params.id;

    db.query(`SELECT * 
        FROM entregable_his
        WHERE id = ${id}`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});



app.get("/obtenernotasporentregable/:id",(req, res)=>{
    const id = req.params.id;

    db.query(`SELECT * 
        FROM nota_view_des
        WHERE id_entregable_nota = ${id}`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});


app.get("/obtenerusuarios",(req, res)=>{
    const id = req.params.id;

    db.query(`SELECT *
        FROM usuario_activo_view`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenerusuarios/:id",(req, res)=>{
    const id = req.params.id;

    db.query(`SELECT * 
        FROM usuario_activo_view
        WHERE id = ${id}`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenerusuariosuid/:id",(req, res)=>{
    const id = req.params.id;

    db.query(`SELECT identificador_externo uid
        , nombre_completo displayName
        , photourl photoURL
        , id
        FROM usuario_activo_view
        WHERE identificador_externo = '${id}'`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenerproyectos",(req, res)=>{
    const id = req.params.id;

    db.query(`SELECT *
        FROM proyecto_activo_view`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenerestadoentregablestarea/:id",(req, res)=>{
    const id = req.params.id;

    db.query(`SELECT *
        FROM estado_entregables_tarea_view
        WHERE id_tarea = ${id}`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenerestimacionentregable/:id",(req, res)=>{
    const id = req.params.id;

    db.query(`SELECT *
        FROM estimacion_activo_view
        WHERE id_entregable = ${id}`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenerimputacionentregable/:id",(req, res)=>{
    const id = req.params.id;

    db.query(`SELECT *
        FROM imputacion_activo_view
        WHERE id_entregable = ${id}`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenerentregablehisact",(req, res)=>{
    const id = req.params.id;

    db.query(`SELECT ent.id_entregable
        , ent.descripcion_entregable
        , ent.photoUrl_responsable_entregable
        , ent.descripcion_estado
        , ent.id_responsable_entregable
        , ent.codigo_responsable_entregable
        , ent.nombre_completo_responsable_entregable
        , id_proyecto_entregable
        , id_solicitante_tarea
        , his.fecha_alta
        FROM entregable_view_des ent
            inner join entregable_his his on ent.id_entregable = his.id_entregable and his.marca_activo = 'S'
        WHERE ent.fecha_fin_real_entregable is null or to_days(cast(now() as date)) - to_days(ent.fecha_fin_real_entregable) <= 35`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenerentregablehisact/:id",(req, res)=>{
    const id = req.params.id;

    db.query(`SELECT ent.id_entregable
        , ent.descripcion_entregable
        , ent.photoUrl_responsable_entregable
        , ent.descripcion_estado
        , ent.codigo_responsable_entregable
        , ent.nombre_completo_responsable_entregable
        , his.fecha_alta
        FROM entregable_view_des ent
            inner join entregable_his his on ent.id_entregable = his.id_entregable and his.marca_activo = 'S'
        WHERE (ent.fecha_fin_real_entregable is null or to_days(cast(now() as date)) - to_days(ent.fecha_fin_real_entregable) <= 35)
        and ent.id_responsable_entregable = ${id}`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenerentregablehisactproy/:id",(req, res)=>{
    const id = req.params.id;

    db.query(`SELECT ent.id_entregable
        , ent.descripcion_entregable
        , ent.photoUrl_responsable_entregable
        , ent.descripcion_estado
        , ent.codigo_responsable_entregable
        , ent.nombre_completo_responsable_entregable
        , his.fecha_alta
        FROM entregable_view_des ent
            inner join entregable_his his on ent.id_entregable = his.id_entregable and his.marca_activo = 'S'
        WHERE (ent.fecha_fin_real_entregable is null or to_days(cast(now() as date)) - to_days(ent.fecha_fin_real_entregable) <= 35)
        and ent.id_proyecto_entregable = ${id}`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenertareahisact",(req, res)=>{
    const id = req.params.id;

    db.query(`SELECT tar.id_tarea
        , tar.descripcion_tarea
        , tar.photoUrl_responsable_tarea
        , tar.descripcion_estado
        , tar.codigo_responsable_tarea
        , tar.nombre_completo_responsable_tarea
        , his.fecha_alta
        , tar.id_responsable_tarea
        , tar.id_solicitante_tarea
        , tar.id_proyecto_tarea
        FROM tarea_view_des tar
            left join tarea_his his on tar.id_tarea = his.id_tarea and his.marca_activo = 'S'
        WHERE tar.fecha_fin_real_tarea is null or to_days(cast(now() as date)) - to_days(tar.fecha_fin_real_tarea) <= 35`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenerentregables",(req, res)=>{
    const id = req.params.id;

    db.query(`SELECT * 
        FROM entregable_view_des`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenermes",(req, res)=>{
    const id = req.params.id;

    db.query(`Select CONCAT (cal.year, LPAD(CAST(cal.month_of_year as CHAR(2)), 2, '0')) id
	, CONCAT (cal.year, ' - ', cal.month_name) textual
    , LPAD(CAST(cal.month_of_year as CHAR(2)), 2, '0') mes_mm
    , sum (imp.horas) horas
    From imputacion imp
        inner join calendario cal on imp.fecha_imputacion = cal.date_yyyymmdd
    Where imp.horas > 0
    group by 1, 2, 3
    order by 1, 2, 3 desc;`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenerimputacionmesmodulo",(req, res)=>{
    const id = req.params.id;

    db.query(`Select ent.modulo_egipto modulo
    , ent.tarea_egipto egipto
    , CONCAT (cal.year, LPAD(CAST(cal.month_of_year as CHAR(2)), 2, '0')) mes_mm
    , sum (imp.horas) horas
    From imputacion imp
        inner join calendario cal on imp.fecha_imputacion = cal.date_yyyymmdd
        inner join entregable ent on ent.id = imp.id_entregable
    /*Where cal.year = year(curdate())*/
    group by 1, 2, 3
    order by 1, 2, 3 desc`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenerimputacionmesfecha",(req, res)=>{
    const id = req.params.id;

    db.query(`Select cal.date_ddmmyyyy fecha_ddmmyyyy
    , ent.modulo_egipto modulo
    , CONCAT (cal.year, LPAD(CAST(cal.month_of_year as CHAR(2)), 2, '0')) mes_mm
    , sum (imp.horas) horas
    From imputacion imp
        inner join calendario cal on imp.fecha_imputacion = cal.date_yyyymmdd
        inner join entregable ent on ent.id = imp.id_entregable
    /*Where cal.year = year(curdate())*/
    group by 1, 2, 3
    order by 1, 2, 3 desc`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

app.get("/obtenerimputacionmesdetalle",(req, res)=>{
    const id = req.params.id;

    db.query(`Select imp.fecha_imputacion fecha_yyyymmdd
        , ent.modulo_egipto modulo
        , ent.tarea_egipto egipto
        , pry.descripcion descripcion_proyecto
        , tar.descripcion descripcion_tarea
        , ent.codigo codigo_entregable
        , ent.descripcion descripcion_entregable
        , est.descripcion descripcion_estado
        , cal.date_ddmmyyyy fecha_ddmmyyyy
        , LPAD(CAST(cal.month_of_year as CHAR(2)), 2, '0') mes_mm
        , sum (imp.horas) horas
        From imputacion imp
            inner join calendario cal on imp.fecha_imputacion = cal.date_yyyymmdd
            inner join entregable ent on ent.id = imp.id_entregable
            inner join tarea tar on ent.id_tarea = tar.id
            inner join proyecto pry on pry.id = ent.id_proyecto
            inner join estado est on ent.id_estado = est.id
        Where cal.year = year(curdate())
        group by 1, 2, 3, 4, 5, 6, 7, 8, 9, 10`,
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    );
});

//********************** SENTENCIAS INSERT **********************//

app.post('/creartarea', (req, res) => {
    const { codigo, descripcion, descripcion_ampliada, id_solicitante, id_proyecto, id_estado, fecha_inicio_estimada, fecha_fin_estimada, proyecto_egipto, modulo_egipto, fecha_alta, fecha_modificacion } = req.body

    db.query(`INSERT INTO tarea (codigo, descripcion, descripcion_ampliada, id_solicitante, id_proyecto, id_estado, fecha_inicio_estimada, fecha_fin_estimada, proyecto_egipto, modulo_egipto, fecha_alta, fecha_modificacion) 
            VALUES ('${codigo}' , '${descripcion}' , '${descripcion_ampliada}' , '${id_solicitante}' , '${id_proyecto}' , '${id_estado}' , '${fecha_inicio_estimada}' , '${fecha_fin_estimada}' , '${proyecto_egipto}' , '${modulo_egipto}', '${fecha_alta}', '${fecha_modificacion}')`, (err, result) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    })
})

app.post('/crearentregable', (req, res) => {
    const { codigo, descripcion, descripcion_ampliada, id_responsable, id_tarea, id_proyecto, id_estado, fecha_inicio_real, fecha_fin_real, esfuerzo_real, proyecto_egipto, modulo_egipto, tarea_egipto, fecha_alta, fecha_modificacion } = req.body

    db.query(`INSERT INTO entregable (codigo, descripcion, descripcion_ampliada, id_responsable, id_tarea, id_proyecto, id_estado, proyecto_egipto, modulo_egipto, tarea_egipto, fecha_alta, fecha_modificacion) 
            VALUES ('${codigo}','${descripcion}','${descripcion_ampliada}','${id_responsable}','${id_tarea}','${id_proyecto}','${id_estado}','${proyecto_egipto}','${modulo_egipto}','${tarea_egipto}', '${fecha_alta}', '${fecha_modificacion}')`, (err, result) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    })
})

app.post('/creartareahis', (req, res) => {
    const { id_tarea , id_responsable_anterior , id_responsable_actual , id_estado_anterior , id_estado_actual , comentarios , marca_activo, fecha_alta, fecha_modificacion } = req.body

    db.query(`INSERT INTO tarea_his (id_tarea, id_responsable_anterior, id_responsable_actual, id_estado_anterior, id_estado_actual, comentarios, marca_activo, fecha_alta, fecha_modificacion) 
            VALUES ('${id_tarea}', '${id_responsable_anterior}', '${id_responsable_actual}', '${id_estado_anterior}', '${id_estado_actual}', '${comentarios}', '${marca_activo}', '${fecha_alta}', '${fecha_modificacion}' )`, (err, result) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    })
})

app.post('/crearentregablehis', (req, res) => {
    const { id_entregable, id_tarea , id_responsable_anterior , id_responsable_actual , id_estado_anterior , id_estado_actual , comentarios , marca_activo, fecha_alta, fecha_modificacion } = req.body

    db.query(`INSERT INTO entregable_his (id_entregable, id_tarea, id_responsable_anterior, id_responsable_actual, id_estado_anterior, id_estado_actual, comentarios, marca_activo, fecha_alta, fecha_modificacion) 
            VALUES ('${id_entregable}', '${id_tarea}', '${id_responsable_anterior}', '${id_responsable_actual}', '${id_estado_anterior}', '${id_estado_actual}', '${comentarios}', '${marca_activo}', '${fecha_alta}', '${fecha_modificacion}' )`, (err, result) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    })
})

app.post('/crearestimacion', (req, res) => {
    const { id_tarea, id_entregable, id_responsable, id_solicitante, estimacion, fecha_estimacion, marca_activo } = req.body

    db.query(`INSERT INTO estimacion (id_tarea, id_entregable, id_responsable, id_solicitante, estimacion, fecha_estimacion, marca_activo) 
            VALUES ('${id_tarea}', '${id_entregable}', '${id_responsable}', '${id_solicitante}', ${estimacion}, '${fecha_estimacion}', '${marca_activo}')`, (err, result) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    })
})

app.post('/crearimputacion', (req, res) => {
    const { id_entregable, fecha_imputacion, horas, fecha_alta } = req.body

    db.query(`INSERT INTO imputacion (id_entregable, fecha_imputacion, horas, fecha_alta) 
            VALUES ('${id_entregable}', '${fecha_imputacion}', '${horas}', '${fecha_alta}')`, (err, result) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    })
})

app.post('/crearnota', (req, res) => {
    const { id_entregable, id_usuario, id_estado, descripcion, marca_activo, fecha_alta, fecha_modificacion } = req.body

    db.query(`INSERT INTO nota (id_entregable, id_usuario, id_estado, descripcion, marca_activo, fecha_alta, fecha_modificacion) 
            VALUES ('${id_entregable}', '${id_usuario}', '${id_estado}', '${descripcion}', '${marca_activo}', '${fecha_alta}', '${fecha_modificacion}')`, (err, result) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    })
})

//******************** FIN SENTENCIAS INSERT ********************//

//********************** SENTENCIAS UPDATE **********************//

app.put('/updatetarea', (req, res) => {
    const { id, id_responsable, id_estado, fecha_inicio_estimada, fecha_fin_estimada, esfuerzo_estimado, fecha_inicio_real, fecha_fin_real, esfuerzo_real, proyecto_egipto, modulo_egipto, fecha_modificacion } = req.body

    db.query(`UPDATE tarea 
        SET id_responsable = ${ id_responsable }
        , id_estado = ${ id_estado }
        , fecha_inicio_estimada = '${ fecha_inicio_estimada }'
        , fecha_fin_estimada = '${ fecha_fin_estimada }'
        , esfuerzo_estimado = ${ esfuerzo_estimado }
        , fecha_inicio_real = ${ fecha_inicio_real }
        , fecha_fin_real = ${ fecha_fin_real }
        , esfuerzo_real = ${ esfuerzo_real }
        , proyecto_egipto = '${proyecto_egipto}'
        , modulo_egipto = '${modulo_egipto}'
        , fecha_modificacion = '${ fecha_modificacion }'
        WHERE id = ${id}`, (err, result) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    })
})

app.put('/updateentregable', (req, res) => {
    const { id, codigo, descripcion, descripcion_ampliada, id_responsable, id_tarea, id_proyecto, id_estado, fecha_inicio_real, fecha_fin_real, esfuerzo_real, proyecto_egipto, modulo_egipto, tarea_egipto, fecha_modificacion } = req.body

    db.query(`UPDATE entregable 
        SET codigo = '${codigo}'
        , descripcion = '${descripcion}'
        , descripcion_ampliada = '${descripcion_ampliada}'
        , id_responsable = '${id_responsable}'
        , id_tarea = '${id_tarea}'
        , id_proyecto = '${id_proyecto}'
        , id_estado = '${id_estado}'
        , fecha_inicio_real = ${fecha_inicio_real}
        , fecha_fin_real = ${fecha_fin_real}
        , esfuerzo_real = ${esfuerzo_real}
        , proyecto_egipto = '${proyecto_egipto}'
        , modulo_egipto = '${modulo_egipto}'
        , tarea_egipto = '${tarea_egipto}'
        , fecha_modificacion = '${ fecha_modificacion }'
        WHERE id = ${id}`, (err, result) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    })
})

app.put('/updatemaxtareahis', (req, res) => {
    const { id, marca_activo, fecha_modificacion } = req.body

    db.query(`UPDATE tarea_his 
        SET marca_activo = '${marca_activo}'
        , fecha_modificacion = '${ fecha_modificacion }'
        WHERE id = ${id}`, (err, result) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    })
})

app.put('/updatemaxdeliveryhis', (req, res) => {
    const { id, marca_activo, fecha_modificacion } = req.body

    db.query(`UPDATE entregable_his 
        SET marca_activo = '${marca_activo}'
        , fecha_modificacion = '${ fecha_modificacion }'
        WHERE id = ${id}`, (err, result) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    })
})

// ************ ESTUDIAR POSIBILIDAD MERGE *********************//
app.put('/updateestimacion', (req, res) => {
    const { id, estimacion, aprobada, fecha_respuesta } = req.body

    db.query(`UPDATE estimacion 
        SET estimacion = '${estimacion}'
        , aprobada = '${aprobada}'
        , fecha_respuesta = ${fecha_respuesta}
        WHERE id = ${id}`, (err, result) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    })
})

app.put('/updateestimacion_estado', (req, res) => {
    const { id, estimacion, aprobada, fecha_respuesta, marca_activo } = req.body

    db.query(`UPDATE estimacion 
        SET estimacion = '${estimacion}'
        , aprobada = '${aprobada}'
        , fecha_respuesta = ${fecha_respuesta}
        , marca_activo = '${marca_activo}'
        WHERE id = ${id}`, (err, result) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    })
})
// ************ FIN ESTUDIAR POSIBILIDAD MERGE *****************//


//******************** FIN SENTENCIAS UPDATE ********************//

const PORT = '3001';

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});