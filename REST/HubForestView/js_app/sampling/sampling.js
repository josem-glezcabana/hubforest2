async function getListSampling() {

    return peticionBackGeneral('', 'sampling', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaSampling(response['resource']) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });       
}

async function getListByParamSampling(id_project, id_ecosystem, id_sampling, id_site, date_sampling, time_sampling, collectors_sampling) {
    const sampling = {
        id_project: id_project,
        id_ecosystem: id_ecosystem,
        id_sampling: id_sampling,
        id_site: id_site,
        date_sampling: date_sampling,
        time_sampling: time_sampling,
        collectors_sampling: collectors_sampling
    };
    return peticionBackGeneral('', 'sampling', 'SEARCH_BY', sampling)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaSampling(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function addSampling(id_project, id_ecosystem, id_sampling, id_site, date_sampling, time_sampling, temp_air_sampling, collectors_sampling) {
    const sampling = {
        id_project: id_project,
        id_ecosystem: id_ecosystem,
        id_sampling: id_sampling,
        id_site: id_site,
        date_sampling: date_sampling,
        time_sampling: time_sampling,
        temp_air_sampling: temp_air_sampling,
        collectors_sampling: collectors_sampling
    };

    return peticionBackGeneral('', 'sampling', 'ADD', sampling)
        .then(response => {
            location.reload();
            response['resource']
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function editSampling(id_project, id_ecosystem, id_sampling, id_site, date_sampling, time_sampling, temp_air_sampling, collectors_sampling) {
    const sampling = {
        id_project: id_project,
        id_ecosystem: id_ecosystem,
        id_sampling: id_sampling,
        id_site: id_site,
        date_sampling: date_sampling,
        time_sampling: time_sampling,
        temp_air_sampling: temp_air_sampling,
        collectors_sampling: collectors_sampling
    };

    return peticionBackGeneral('', 'sampling', 'EDIT', sampling)
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function deleteProyecto(id_sampling) {
    
    return peticionBackGeneral('', 'sampling', 'DELETE', {'id_sampling': id_sampling})
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

function construyeTablaSampling(filas) {

    let filasTabla = '';
    let tipo = "'Editar sampling'";
    let element = document.getElementById("datosSampling");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    $("#datosSampling").html("");
    filas.forEach(fila => {

        if (typeof fila.date_sampling !== 'string') {
            // se coge la parte de la fecha y hora, sin obtener segundos
            const fechaHoraStart = fila.date_sampling.split(" ");
            const fechaStart = fechaHoraStart[0];
            const horaStart = fechaHoraStart[1].substring(0, fechaHoraStart[1].lastIndexOf(":"));
            fila.date_sampling = fechaStart + ' ' + horaStart;
        }

        let atributosTabla = ["'" + fila.name_project + "'","'" + fila.name_ecosystem + "'", "'" + fila.date_sampling + "'", "'" + fila.name_site + "'",
                              "'" + fila.temp_sampling + "'", "'" + fila.temp_air_sampling + "'","'" + fila.id_sampling + "'"];
        let botonEdit='<button class="BotonEditar btn btn-info" id="editarSampling" onclick="mostrarModal('+tipo+','+atributosTabla+')">Editar</button>'

        filasTabla += '<tr> <td>' + fila.name_project + 
                '</td> <td>' + fila.name_ecosystem + 
                '</td> <td>' + fila.name_site + 
                '</td> <td>' + fila.date_sampling + 
                '</td> <td>' + fila.time_sampling + 
                '</td> <td>' + fila.temp_air_sampling + 
                '</td> <td class="text-center">' + botonEdit +
                '</td> <td class="text-center"><button class="BotonEliminarSampling btn btn-danger" id="borrarSampling" onclick="mostrarBorrarSampling('+fila.id_sampling+')">Eliminar</button>'
                '</td>  </tr>';
    });

    recuperarYComprobarUsuarioLogeadoIsAdmin().then(resultado => {
        if (!resultado) {
            $("#editarSampling").hide();
            $("#borrarSampling").hide();
            $("#abrirModal").hide();
        } else {
            $("#editarSampling").show();
            $("#borrarSampling").show();
            $("#abrirModal").show();
        }
    });
    
    $("#datosSampling").append(filasTabla);
    cerrarModal();
    setLang();
}

function getAtributos(tipo){
    var id_project = document.getElementById("id_project").value
    var id_ecosystem = document.getElementById("id_ecosystem").value
    var id_site = document.getElementById("id_sitio").value
    var date_sampling = document.getElementById("fechaSampling").value
    var time_sampling = document.getElementById("timeSampling").value
    var temp_air_sampling = document.getElementById("temperatura").value
    var collectors_sampling = document.getElementById("collectorsSampling").value
    var id_sampling = document.getElementById("id_sampling").value
     switch(tipo){
        case "Editar":
            editSampling(id_project, id_ecosystem, id_sampling, id_site, date_sampling, time_sampling, temp_air_sampling, collectors_sampling)
            break;
        case "Añadir":
            addSampling(id_project, id_ecosystem, id_sampling, id_site, date_sampling, time_sampling, temp_air_sampling, collectors_sampling)
            break;
        case "Buscar":
            getListByParamSampling(id_project, id_ecosystem, id_sampling, id_site, date_sampling, time_sampling, collectors_sampling)
            break;
     }
}

function mostrarModal(tipo, id_project=null, id_ecosystem=null, id_sampling=null, id_site=null, date_sampling=null, 
                        time_sampling=null, temp_air_sampling=null, collectors_sampling=null){
    // Ventana modal
    document.getElementById("ventanaModal").style.display = "block";
    document.getElementById("Titulo").innerHTML = '<h2>'+tipo+'</h2>';
    document.getElementById("aceptar").innerHTML = tipo;


    if(tipo.includes("Editar")){
        $("#formSampling").attr('action' , 'javascript:getAtributos("Editar");');

        $("#id_project").val(id_project);
        $("#id_ecosystem").val(id_ecosystem);
        $("#id_sampling").val(id_sampling);
        $("#id_site").val(id_site);
        $("#date_sampling").val(date_sampling);
        $("#time_sampling").val(time_sampling);
        $("#temp_air_sampling").val(temp_air_sampling);
        $("#collectors_sampling").val(file_project);
    }
    else{
        if(tipo.includes("Buscar")){
            document.getElementById("id_project").required = false;
            document.getElementById("id_ecosystem").required = false;
            document.getElementById("id_sampling").required = false;
            document.getElementById("id_site").required = false;
            document.getElementById("date_sampling").required = false;
            document.getElementById("time_sampling").required = false;
            document.getElementById("temp_air_sampling").required = false;
            document.getElementById("collectors_sampling").required = false;

            $("#formProyecto").attr('action' , 'javascript:getAtributos("Buscar");');
        }
        else{
            document.getElementById("id_project").required =true;
            document.getElementById("id_ecosystem").required = true;
            document.getElementById("id_sampling").required = true;
            document.getElementById("id_site").required = true;
            document.getElementById("date_sampling").required = true;
            document.getElementById("time_sampling").required = true;
            document.getElementById("temp_air_sampling").required = true;
            document.getElementById("collectors_sampling").required = true;

            $("#formProyecto").attr('action' , 'javascript:getAtributos("Añadir");');
        }

        $("#id_project").val('');
        $("#id_ecosystem").val('');
        $("#id_sampling").val('');
        $("#id_site").val('');
        $("#date_sampling").val('');
        $("#time_sampling").val('');
        $("#temp_air_sampling").val('');
        $("#collectors_sampling").val('');
    }
    setLang();
}

function cerrarModal(){
    // Ventana modal
    var modal = document.getElementById("ventanaModal");
    modal.style.display = "none"
}

function mostrarBorrarSampling(id){
    // Ventana modal
    document.getElementById("comprobarBorrar").style.display = "block";
    $("#idBorrar").val(id)
    $("#formBorrarSampling").attr('action' , 'javascript:borrar();');
}

function borrar(){
    var id = document.getElementById("idBorrar").value
    deleteSampling(id)
}