async function getListProyectos() {

    return peticionBackGeneral('', 'project', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaProyecto(response['resource']) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });       
}

async function getListByParamProyectos(name_project, start_date_project, end_date_project, responsable_project, organization_project, description_project, code_project, acronym_project, id_sampling_methodology) {
    const project = {
        name_project: name_project,
        start_date_project: start_date_project,
        end_date_project: end_date_project,
        responsable_project: responsable_project,
        organization_project: organization_project,
        description_project: description_project,
        code_project: code_project,
        acronym_project: acronym_project,
        id_sampling_methodology: id_sampling_methodology
    };
    return peticionBackGeneral('', 'project', 'SEARCH_BY', project)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaProyecto(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListByParamProyectos_search(name_project, start_date_project, end_date_project, responsable_project, organization_project, description_project, code_project, acronym_project, id_sampling_methodology) {
    const project = {
        name_project: name_project,
        start_date_project: start_date_project,
        end_date_project: end_date_project,
        responsable_project: responsable_project,
        organization_project: organization_project,
        description_project: description_project,
        code_project: code_project,
        acronym_project: acronym_project,
        id_sampling_methodology: id_sampling_methodology
    };
    return peticionBackGeneral('', 'project', 'SEARCH', project)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaProyecto(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getProyectoPorId(id_project) {
    const project = {
        id_project: id_project
    };
    return peticionBackGeneral('', 'project', 'SEARCH_BY', project)
        .then(response => response['resource'])
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function addProyecto(name_project, start_date_project, end_date_project, responsable_project, organization_project, description_project, file_project, code_project, acronym_project, id_sampling_methodology) {
    const project = {
        name_project: name_project,
        start_date_project: start_date_project,
        end_date_project: end_date_project,
        responsable_project: responsable_project,
        organization_project: organization_project,
        description_project: description_project,
        file_project: file_project,
        code_project: code_project,
        acronym_project: acronym_project,
        id_sampling_methodology: id_sampling_methodology
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

async function editProyecto(id_project, name_project, start_date_project, end_date_project, responsable_project, organization_project, description_project, file_project, code_project, acronym_project, id_sampling_methodology) {
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
        acronym_project: acronym_project,
        id_sampling_methodology: id_sampling_methodology
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

async function deleteProyecto(id_project) {
    
    return peticionBackGeneral('', 'project', 'DELETE', {'id_project': id_project})
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListUsuariosProyectos(usuario) {
    return peticionBackGeneral('', 'user', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectResponsables("responsable_project", response['resource'], usuario) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListSamplingMethodologiesProyectos(id_sampling_methodology) {
    return peticionBackGeneral('', 'sampling_methodology', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectIdSampling("id_sampling_methodology", response['resource'], id_sampling_methodology) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        })
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
                              /* "'" + fila.file_project + "'", */ "'" + fila.code_project + "'", "'" + fila.acronym_project + "'", "'" + fila.id_sampling_methodology + "'"];
        let botonEdit='<button class="BotonEditar btn btn-info" id="editarProyectoUsuario" onclick="mostrarModalProyecto('+tipo+','+atributosTabla+')">Editar</button>'

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
                '</td> <td>' + fila.id_sampling_methodology +
                '</td> <td class="text-center">' + botonEdit +
                '</td> <td class="text-center"><button class="BotonEliminar btn btn-danger" id="borrarProyecto" onclick="mostrarBorrarProyecto('+fila.id_project+')">Eliminar</button>'
                
                '</td>  </tr>';
    });

    recuperarYComprobarUsuarioLogeadoIsAdmin().then(resultado => {
        if (!resultado) {
            $("#editarProyectoUsuario").hide();
            $("#borrarProyecto").hide();
            $("#abrirModal").hide();
        } else {
            $("#editarProyectoUsuario").show();
            $("#borrarProyecto").show();
            $("#abrirModal").show();
        }
    });
    
    $("#datosProyectos").append(filasTabla);
    cerrarModal();
    setLang();
}

function getAtributosProyecto(tipo){
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
    let id_sampling_methodology = document.getElementById("id_sampling_methodology").value
     switch(tipo){
        case "Editar":
            editProyecto(id_project, name_project, start_date_project, end_date_project, responsable_project,
                        organization_project, description_project, file_project, code_project, acronym_project,id_sampling_methodology)
            break;
        case "Añadir":
            addProyecto(name_project, start_date_project, end_date_project, responsable_project,
                        organization_project, description_project, file_project, code_project, acronym_project, id_sampling_methodology)
            break;
        case "Buscar":
            getListByParamProyectos_search(name_project, start_date_project, end_date_project, responsable_project,
                                        organization_project, description_project, code_project, acronym_project, id_sampling_methodology)
            break;
     }
}

function mostrarModalProyecto(tipo, id_project=null, name_project=null, start_date_project=null, end_date_project=null, responsable_project=null, 
                        organization_project=null, description_project=null, file_project=null, code_project=null, acronym_project=null, id_sampling_methodology=null){
    // Ventana modal
    document.getElementById("ventanaModal").style.display = "block";
    document.getElementById("Titulo").innerHTML = '<h2>'+tipo+'</h2>';
    document.getElementById("aceptar").innerHTML = tipo;

    getListUsuariosProyectos(responsable_project);
    getListSamplingMethodologiesProyectos(id_sampling_methodology);

    if(tipo.includes("Editar")){
        $("#formProyecto").attr('action' , 'javascript:getAtributosProyecto("Editar");');

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
        $("#id_sampling_methodology").val(id_sampling_methodology);
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
            document.getElementById("id_sampling_methodology").required = false;

            $("#formProyecto").attr('action' , 'javascript:getAtributosProyecto("Buscar");');
        }
        else{
            document.getElementById("name_project").required = true;
            document.getElementById("start_date_project").required = true;
            document.getElementById("end_date_project").required = true;
            document.getElementById("responsable_project").required = true;
            document.getElementById("organization_project").required = true;
            document.getElementById("description_project").required = false;
            $('#form_file_project').show();
            document.getElementById("file_project").required = false;
            document.getElementById("code_project").required = true;
            document.getElementById("acronym_project").required = true;
            document.getElementById("id_sampling_methodology").required = true;

            $("#formProyecto").attr('action' , 'javascript:getAtributosProyecto("Añadir");');
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
        $("#id_sampling_methodology").val('');
    }
    setLang();
}

function rellenarSelectResponsables(tipo, filas, usuario) {
    let element = document.getElementById(tipo);
    let option = document.createElement('option');

      // Eliminar opciones existentes antes de agregar las nuevas
    element.innerHTML = '';
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

function rellenarSelectIdSampling(tipo, filas, usuario) {
    let element = document.getElementById(tipo);
    let option = document.createElement('option');

      // Eliminar opciones existentes antes de agregar las nuevas
    element.innerHTML = '';
    option.value = "";
    option.textContent = "-- Selecciona metodología de sampling --";
    element.appendChild(option);

    filas.forEach(fila => {
        option = document.createElement('option');
        option.value = fila.id_sampling_methodology;
        option.textContent = fila.name_methodology;
        element.appendChild(option);
    })

    if (usuario != null) element.value = usuario;
}

function cerrarModal(){
    // Ventana modal
    var modal = document.getElementById("ventanaModal");
    modal.style.display = "none"
}

function mostrarBorrarProyecto(id){
    // Ventana modal
    document.getElementById("comprobarBorrar").style.display = "block";
    $("#idBorrar").val(id)
    $("#formBorrarProyecto").attr('action' , 'javascript:borrarproyecto();');
}

function borrarproyecto(){
    var id = document.getElementById("idBorrar").value
    deleteProyecto(id)
}