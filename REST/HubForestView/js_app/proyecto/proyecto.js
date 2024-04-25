async function getListProyectos() {

    return peticionBackGeneral('', 'project', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaProyecto(response['resource']) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });       
}

async function getListByParamProyectos(name_project, start_date_project, end_date_project, responsable_project, organization_project, description_project, code_project, acronym_project) {
    const project = {
        name_project: name_project,
        start_date_project: start_date_project,
        end_date_project: end_date_project,
        responsable_project: responsable_project,
        organization_project: organization_project,
        description_project: description_project,
        code_project: code_project,
        acronym_project: acronym_project
    };
    return peticionBackGeneral('', 'project', 'SEARCH_BY', project)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaProyecto(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListByParamProyectos_search(name_project, start_date_project, end_date_project, responsable_project, organization_project, description_project, code_project, acronym_project) {
    const project = {
        name_project: name_project,
        start_date_project: start_date_project,
        end_date_project: end_date_project,
        responsable_project: responsable_project,
        organization_project: organization_project,
        description_project: description_project,
        code_project: code_project,
        acronym_project: acronym_project
    };
    return peticionBackGeneral('', 'project', 'SEARCH', project)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaProyecto(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function addProyecto(name_project, start_date_project, end_date_project, responsable_project, organization_project, description_project, file_project, code_project, acronym_project) {
    const project = {
        name_project: name_project,
        start_date_project: start_date_project,
        end_date_project: end_date_project,
        responsable_project: responsable_project,
        organization_project: organization_project,
        description_project: description_project,
        file_project: file_project,
        code_project: code_project,
        acronym_project: acronym_project
    };

    return peticionBackGeneral('', 'project', 'ADD', project)
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

async function editProyecto(id_project, name_project, start_date_project, end_date_project, responsable_project, organization_project, description_project, file_project, code_project, acronym_project) {
    const project = {
        id_project: id_project,
        name_project: name_project,
        start_date_project: start_date_project,
        end_date_project: end_date_project,
        responsable_project: responsable_project,
        organization_project: organization_project,
        description_project: description_project,
        file_project: file_project,
        code_project: code_project,
        acronym_project: acronym_project
    };

    return peticionBackGeneral('', 'project', 'EDIT', project)
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function deleteProyectoUser(id_user,id_project) {
    
    return peticionBackGeneral('', 'user_project', 'DELETE', {'id_user': id_user, 'id_project': id_project})
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListUsuarios(usuario) {
    return peticionBackGeneral('', 'user', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectUsuarios("responsable_project", response['resource'], usuario) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

function construyeTablaProyecto(filas) {

    let filasTabla = '';
    let tipo = "'Editar proyecto'";
    let element = document.getElementById("datosProyectos");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    $("#datosProyectos").html("");
    filas.forEach(fila => {
        console.log('fila', fila)

        if (typeof fila.start_date_project !== 'string') {
            // se coge la parte de la fecha y hora, sin obtener segundos
            const fechaHoraStart = fila.start_date_project.split(" ");
            const fechaStart = fechaHoraStart[0];
            const horaStart = fechaHoraStart[1].substring(0, fechaHoraStart[1].lastIndexOf(":"));
            fila.start_date_project = fechaStart + ' ' + horaStart;
        }

        if (typeof fila.end_date_project !== 'string') {
            // se coge la parte de la fecha y hora, sin obtener segundos
            const fechaHoraEnd = fila.end_date_project.split(" ");
            const fechaEnd = fechaHoraEnd[0];
            const horaEnd = fechaHoraEnd[1].substring(0, fechaHoraEnd[1].lastIndexOf(":"));
            fila.end_date_project = fechaEnd + ' ' + horaEnd;
        }

        let atributosTabla = ["'" + fila.id_project + "'","'" + fila.name_project + "'", "'" + fila.start_date_project + "'", "'" + fila.end_date_project + "'",
                              "'" + fila.responsable_project + "'", "'" + fila.organization_project + "'","'" + fila.description_project + "'",
                              /* "'" + fila.file_project + "'", */ "'" + fila.code_project + "'", "'" + fila.acronym_project + "'"];
        let botonEdit='<button class="btn btn-info" id="editarProyectoUsuario" onclick="mostrarModal('+tipo+','+atributosTabla+')">Editar</button>'

        filasTabla += '<tr> <td>' + fila.id_project + 
                '</td> <td>' + fila.name_project + 
                '</td> <td>' + fila.start_date_project + 
                '</td> <td>' + fila.end_date_project + 
                '</td> <td>' + fila.responsable_project + 
                '</td> <td>' + fila.organization_project + 
                '</td> <td>' + fila.description_project + 
                // '</td> <td>' + fila.file_project + 
                '</td> <td>' + fila.code_project + 
                '</td> <td>' + fila.acronym_project + 
                '</td> <td class="text-center">' + botonEdit +
                '</td> <td class="text-center"><button class="btn btn-danger" id="borrarProyecto" onclick="mostrarBorrar('+fila.id_project+')">Eliminar</button>'
                
                '</td>  </tr>';
    });
    
    $("#datosProyectos").append(filasTabla);
    cerrarModal()
}

function getAtributos(tipo){
    var id_project = document.getElementById("id_project").value
    var name_project = document.getElementById("name_project").value
    var start_date_project = document.getElementById("start_date_project").value
    var end_date_project = document.getElementById("end_date_project").value
    var responsable_project = document.getElementById("responsable_project").value
    var organization_project = document.getElementById("organization_project").value
    var description_project = document.getElementById("description_project").value
    var file_project = document.getElementById("file_project").value
    let code_project = document.getElementById("code_project").value
    let acronym_project = document.getElementById("acronym_project").value
     switch(tipo){
        case "Editar":
            editProyecto(id_project, name_project, start_date_project, end_date_project, responsable_project, organization_project, description_project, file_project, code_project, acronym_project)
            break;
        case "Añadir":
            addProyecto(name_project, start_date_project, end_date_project, responsable_project, organization_project, description_project, file_project, code_project, acronym_project)
            break;
        case "Buscar":
            getListByParamProyectos_search(name_project, start_date_project, end_date_project, responsable_project, organization_project, description_project, code_project, acronym_project)
            break;
     }
}

function mostrarModal(tipo, id_project=null, name_project=null, start_date_project=null, end_date_project=null, responsable_project=null, 
                        organization_project=null, description_project=null, file_project=null, code_project=null, acronym_project=null){
    // Ventana modal
    document.getElementById("ventanaModal").style.display = "block";
    document.getElementById("Titulo").innerHTML = '<h2>'+tipo+'</h2>';
    document.getElementById("aceptar").innerHTML = tipo;

    getListUsuarios(responsable_project);

    if(tipo.includes("Editar")){
        $("#formProyecto").attr('action' , 'javascript:getAtributos("Editar");');

        $("#id_project").val(id_project);
        $("#name_project").val(name_project);
        $("#start_date_project").val(start_date_project);
        $("#end_date_project").val(end_date_project);
        $("#responsable_project").val(responsable_project);
        $("#organization_project").val(organization_project);
        $("#description_project").val(description_project);
        $('#form_file_project').show();
        $("#file_project").val(file_project);
        $("#code_project").val(code_project);
        $("#acronym_project").val(acronym_project);
    }
    else{
        if(tipo.includes("Buscar")){
            document.getElementById("name_project").required = false;
            document.getElementById("start_date_project").required = false;
            document.getElementById("end_date_project").required = false;
            document.getElementById("responsable_project").required = false;
            document.getElementById("organization_project").required = false;
            document.getElementById("description_project").required = false;
            $('#form_file_project').hide();
            document.getElementById("file_project").required = false;
            document.getElementById("code_project").required = false;
            document.getElementById("acronym_project").required = false;

            $("#formProyecto").attr('action' , 'javascript:getAtributos("Buscar");');
        }
        else{
            document.getElementById("name_project").required = true;
            document.getElementById("start_date_project").required = true;
            document.getElementById("end_date_project").required = true;
            document.getElementById("responsable_project").required = false;
            document.getElementById("organization_project").required = true;
            document.getElementById("description_project").required = false;
            $('#form_file_project').show();
            document.getElementById("file_project").required = false;
            document.getElementById("code_project").required = true;
            document.getElementById("acronym_project").required = true;

            $("#formProyecto").attr('action' , 'javascript:getAtributos("Añadir");');
        }

        $("#id_project").val('');
        $("#name_project").val('');
        $("#start_date_project").val('');
        $("#end_date_project").val('');
        $("#responsable_project").val('');
        $("#organization_project").val('');
        $("#description_project").val('');
        $("#file_project").val('');
        $("#code_project").val('');
        $("#acronym_project").val('');
    }
}

function rellenarSelectUsuarios(tipo, filas, usuario) {
    let element = document.getElementById(tipo);
    let option = document.createElement('option');

    option.value = "";
    option.textContent = "-- Selecciona responsable de proyecto --";
    element.appendChild(option);

    filas.forEach(fila => {
        option = document.createElement('option');
        option.value = fila.id_user;
        option.textContent = fila.name_user;
        element.appendChild(option);
    })

    if (usuario != null) element.value = usuario;
}

function cerrarModal(){
    // Ventana modal
    var modal = document.getElementById("ventanaModal");
    modal.style.display = "none"
}

function mostrarBorrar(id){
    // Ventana modal
    document.getElementById("comprobarBorrar").style.display = "block";
    $("#idBorrar").val(id)
    $("#formBorrarProyecto").attr('action' , 'javascript:borrar();');
}

function borrar(){
    var id = document.getElementById("idBorrar").value
    deleteProyecto(id)
}