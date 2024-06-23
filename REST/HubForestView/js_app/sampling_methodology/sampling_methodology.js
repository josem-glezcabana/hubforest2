async function getListSamplingMethods() {
    return peticionBackGeneral('', 'sampling_methodology', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaSamplingMethod(response['resource']) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });  
}

async function getListByParamSamplingMethods(name_methodology, description_methodology, bibref_methodology) {
    const sampling_methodology = {
        name_methodology: name_methodology,
        description_methodology: description_methodology,
        bibref_methodology: bibref_methodology,
    };
    return peticionBackGeneral('', 'sampling_methodology', 'SEARCH_BY', sampling_methodology)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaSamplingMethod(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListByParamSamplingMethods_search(name_methodology, description_methodology, bibref_methodology) {
    const sampling_methodolody = {
        name_methodology: name_methodology,
        description_methodology: description_methodology,
        bibref_methodology: bibref_methodology,
    };
    return peticionBackGeneral('', 'sampling_methodology', 'SEARCH', sampling_methodolody)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaSamplingMethod(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function addSamplingMethod(name_methodology, description_methodology, bibref_methodology, file_methodology) {
    const sampling_methodology = {
        name_methodology: name_methodology,
        description_methodology: description_methodology,
        bibref_methodology: bibref_methodology,
        file_methodology: file_methodology
    };

    return peticionBackGeneral('formSamplingMethod', 'sampling_methodology', 'ADD')
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

async function editSamplingMethod(id_sampling_methodology, name_methodology, description_methodology, bibref_methodology, file_methodology) {
    const sampling_methodolody = {
        id_sampling_methodology: id_sampling_methodology,
        name_methodology: name_methodology,
        description_methodology: description_methodology,
        bibref_methodology: bibref_methodology,
        file_methodology: file_methodology
    };

    return peticionBackGeneral('formSamplingMethod', 'sampling_methodology', 'EDIT')
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function deleteSamplingMethod(id_sampling_methodology) {
    
    return peticionBackGeneral('', 'sampling_methodology', 'DELETE', {'id_sampling_methodology': id_sampling_methodology})
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

function construyeTablaSamplingMethod(filas) {

    let filasTabla = '';
    let tipo = "'editSamplingMethod'";
    let element = document.getElementById("datosSamplingMethod");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    $("#datosSamplingMethod").html("");
    filas.forEach(fila => {
        let atributosTabla = ["'" + fila.id_sampling_methodology + "'","'" + fila.name_methodology + "'", "'" + fila.description_methodology + "'",
                              "'" + fila.bibref_methodology + "'","'" + fila.file_methodology + "'"];
        let botonEdit='<button class="BotonEditar btn btn-info editarSamplingMethod" id="editarSamplingMethod" onclick="mostrarModalSamplingMethod('+tipo+','+atributosTabla+')">Editar</button>'

        // Generar el enlace de descarga del fichero, si lo tiene
        let fileURL = fila.file_methodology ? '../../HubForestBack/files/sampling_methodology/' + fila.file_methodology : '';
        let enlaceArchivo = fileURL ? '<a href="' + fileURL + '" download>'+fila.file_methodology+'</a>' : '';

        filasTabla += '<tr> <td>' + fila.id_sampling_methodology + 
                '</td> <td>' + fila.name_methodology + 
                '</td> <td>' + fila.description_methodology + 
                '</td> <td>' + fila.bibref_methodology + 
                '</td> <td>' + enlaceArchivo + 
                '</td> <td class="text-center">' + botonEdit +
                '</td> <td class="text-center"><button class="BotonEliminar btn btn-danger borrarSamplingMethod" id="borrarSamplingMethod" onclick="mostrarBorrarSamplingMethod('+fila.id_sampling_methodology+')">Eliminar</button>'
                
                '</td>  </tr>';
    });

    recuperarYComprobarUsuarioLogeadoIsAdmin().then(resultado => {
        if (!resultado) {
            let editarSamplingMethod = document.getElementsByClassName("editarSamplingMethod");
            for (const fila of editarSamplingMethod) {
                fila.style.display = 'none';
            }
            let borrarSamplingMethod = document.getElementsByClassName("borrarSamplingMethod");
            for (const fila of borrarSamplingMethod) {
                fila.style.display = 'none';
            }
            $("#abrirModal").hide();
        } else {
            let editarSamplingMethod = document.getElementsByClassName("editarSamplingMethod");
            for (const fila of editarSamplingMethod) {
                fila.style.display = 'block';
            }
            let borrarSamplingMethod = document.getElementsByClassName("borrarSamplingMethod");
            for (const fila of borrarSamplingMethod) {
                fila.style.display = 'block';
            }
            $("#abrirModal").show();
        }
    });
    
    $("#datosSamplingMethod").append(filasTabla);
    cerrarModal();
    setLang();
}

function getAtributosSamplingMethod(tipo){
    let id_sampling_methodology = document.getElementById("id_sampling_methodology").value
    let name_methodology = document.getElementById("name_methodology").value
    let description_methodology = document.getElementById("description_methodology").value
    let bibref_methodology = document.getElementById("bibref_methodology").value
    let file_methodology = document.getElementById("new_file_methodology").value
     switch(tipo){
        case "Editar":
            editSamplingMethod(id_sampling_methodology, name_methodology, description_methodology, bibref_methodology, file_methodology)
            break;
        case "Añadir":
            addSamplingMethod(name_methodology, description_methodology, bibref_methodology, file_methodology)
            break;
        case "Buscar":
            getListByParamSamplingMethods_search(name_methodology, description_methodology, bibref_methodology)
            break;
     }
}

function mostrarModalSamplingMethod(tipo, id_sampling_methodology=null, name_methodology=null, description_methodology=null, bibref_methodology=null, file_methodology=null){
    // Ventana modal
    document.getElementById("ventanaModal").style.display = "block";
    document.getElementById("Titulo").innerHTML = '<h2 class="'+tipo+'">'+tipo+'</h2>';
    document.getElementById("aceptar").classList.add(tipo);

    if(tipo.includes("edit")){
        $("#formSamplingMethod").attr('action' , 'javascript:getAtributosSamplingMethod("Editar");');

        $("#id_sampling_methodology").val(id_sampling_methodology);
        $("#name_methodology").val(name_methodology);
        $("#description_methodology").val(description_methodology);
        $("#bibref_methodology").val(bibref_methodology);
        $('#form_old_file_methodology').show();
        $('#form_file_methodology').show();
        $("#file_methodology").val(file_methodology);
    }
    else{
        $('#form_old_file_methodology').hide();
        if(tipo.includes("Buscar")){
            document.getElementById("name_methodology").required = false;
            document.getElementById("description_methodology").required = false;
            document.getElementById("bibref_methodology").required = false;
            $('#form_file_methodology').hide();
            document.getElementById("new_file_methodology").required = false;

            $("#formSamplingMethod").attr('action' , 'javascript:getAtributosSamplingMethod("Buscar");');
        }
        else{
            document.getElementById("name_methodology").required = true;
            document.getElementById("description_methodology").required = true;
            document.getElementById("bibref_methodology").required = true;
            $('#form_file_methodology').show();
            document.getElementById("new_file_methodology").required = false;

            $("#formSamplingMethod").attr('action' , 'javascript:getAtributosSamplingMethod("Añadir");');
        }

        $("#id_sampling_methodology").val('');
        $("#name_methodology").val('');
        $("#description_methodology").val('');
        $("#bibref_methodology").val('');
        $("#file_methodology").val('');
    }
    setLang();
    document.getElementById("aceptar").classList.remove(tipo);
}

function cerrarModal(){
    // Ventana modal
    var modal = document.getElementById("ventanaModal");
    modal.style.display = "none"
}

function mostrarBorrarSamplingMethod(id){
    // Ventana modal
    document.getElementById("comprobarBorrar").style.display = "block";
    $("#idBorrar").val(id)
    $("#formBorrarSamplingMethod").attr('action' , 'javascript:borrarSamplingMethod();');
}

function borrarSamplingMethod(){
    var id = document.getElementById("idBorrar").value
    deleteSamplingMethod(id)
}