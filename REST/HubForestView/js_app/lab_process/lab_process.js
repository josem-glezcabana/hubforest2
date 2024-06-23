async function getListLabProcesses() {
    return peticionBackGeneral('', 'lab_process', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaLabProcess(response['resource']) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });  
}

async function getListByParamLabProcess(name_lab_process, description_lab_process, bib_lab_process) {
    const lab_process = {
        name_lab_process: name_lab_process,
        description_lab_process: description_lab_process,
        bib_lab_process: bib_lab_process,
    };
    return peticionBackGeneral('', 'lab_process', 'SEARCH_BY', lab_process)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaLabProcess(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListByParamLabProcess_search(name_lab_process, description_lab_process, bib_lab_process) {
    const lab_process = {
        name_lab_process: name_lab_process,
        description_lab_process: description_lab_process,
        bib_lab_process: bib_lab_process,
    };
    return peticionBackGeneral('', 'lab_process', 'SEARCH', lab_process)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaLabProcess(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function addLabProcess(name_lab_process, description_lab_process, bib_lab_process, file_lab_process) {
    const lab_process = {
        name_lab_process: name_lab_process,
        description_lab_process: description_lab_process,
        bib_lab_process: bib_lab_process,
        file_lab_process: file_lab_process
    };

    return peticionBackGeneral('formLabProcess', 'lab_process', 'ADD')
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

async function editLabProcess(id_lab_process, name_lab_process, description_lab_process, bib_lab_process, file_lab_process) {
    const lab_process = {
        id_lab_process: id_lab_process,
        name_lab_process: name_lab_process,
        description_lab_process: description_lab_process,
        bib_lab_process: bib_lab_process,
        file_lab_process: file_lab_process
    };

    return peticionBackGeneral('formLabProcess', 'lab_process', 'EDIT')
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function deleteLabProcess(id_lab_process) {
    
    return peticionBackGeneral('', 'lab_process', 'DELETE', {'id_lab_process': id_lab_process})
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

function construyeTablaLabProcess(filas) {

    let filasTabla = '';
    let tipo = "'editLabProcess'";
    let element = document.getElementById("datosLabProcess");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    $("#datosLabProcess").html("");
    filas.forEach(fila => {
        let atributosTabla = ["'" + fila.id_lab_process + "'","'" + fila.name_lab_process + "'", "'" + fila.description_lab_process + "'",
                              "'" + fila.bib_lab_process + "'","'" + fila.file_lab_process + "'"];
        let botonEdit='<button class="BotonEditar btn btn-info editarLabProcess" id="editarLabProcess" onclick="mostrarModalLabProcess('+tipo+','+atributosTabla+')">Editar</button>'

        // Generar el enlace de descarga del fichero, si lo tiene
        let fileURL = fila.file_lab_process ? '../../HubForestBack/files/lab_process/' + fila.file_lab_process : '';
        let enlaceArchivo = fileURL ? '<a href="' + fileURL + '" download>'+fila.file_lab_process+'</a>' : '';

        filasTabla += '<tr> <td>' + fila.id_lab_process + 
                '</td> <td>' + fila.name_lab_process + 
                '</td> <td>' + fila.description_lab_process + 
                '</td> <td>' + fila.bib_lab_process + 
                '</td> <td>' + enlaceArchivo + 
                '</td> <td class="text-center">' + botonEdit +
                '</td> <td class="text-center"><button class="BotonEliminar btn btn-danger borrarLabProcess" id="borrarLabProcess" onclick="mostrarBorrarLabProcess('+fila.id_lab_process+')">Eliminar</button>'
                
                '</td>  </tr>';
    });

    recuperarYComprobarUsuarioLogeadoIsAdmin().then(resultado => {
        if (!resultado) {
            let editarLabProcess = document.getElementsByClassName("editarLabProcess");
            for (const fila of editarLabProcess) {
                fila.style.display = 'none';
            }
            let borrarLabProcess = document.getElementsByClassName("borrarLabProcess");
            for (const fila of borrarLabProcess) {
                fila.style.display = 'none';
            }
            $("#abrirModal").hide();
        } else {
            let editarLabProcess = document.getElementsByClassName("editarLabProcess");
            for (const fila of editarLabProcess) {
                fila.style.display = 'block';
            }
            let borrarLabProcess = document.getElementsByClassName("borrarLabProcess");
            for (const fila of borrarLabProcess) {
                fila.style.display = 'block';
            }
            $("#abrirModal").show();
        }
    });
    
    $("#datosLabProcess").append(filasTabla);
    cerrarModal();
    setLang();
}

function getAtributosLabProcess(tipo){
    let id_lab_process = document.getElementById("id_lab_process").value
    let name_lab_process = document.getElementById("name_lab_process").value
    let description_lab_process = document.getElementById("description_lab_process").value
    let bib_lab_process = document.getElementById("bib_lab_process").value
    let file_lab_process = document.getElementById("new_file_lab_process").value
     switch(tipo){
        case "Editar":
            editLabProcess(id_lab_process, name_lab_process, description_lab_process, bib_lab_process, file_lab_process)
            break;
        case "Añadir":
            addLabProcess(name_lab_process, description_lab_process, bib_lab_process, file_lab_process)
            break;
        case "Buscar":
            getListByParamLabProcess_search(name_lab_process, description_lab_process, bib_lab_process)
            break;
     }
}

function mostrarModalLabProcess(tipo, id_lab_process=null, name_lab_process=null, description_lab_process=null, bib_lab_process=null, file_lab_process=null){
    // Ventana modal
    document.getElementById("ventanaModal").style.display = "block";
    document.getElementById("Titulo").innerHTML = '<h2 class="'+tipo+'">'+tipo+'</h2>';
    document.getElementById("aceptar").classList.add(tipo);

    if(tipo.includes("edit")){
        $("#formLabProcess").attr('action' , 'javascript:getAtributosLabProcess("Editar");');

        $("#id_lab_process").val(id_lab_process);
        $("#name_lab_process").val(name_lab_process);
        $("#description_lab_process").val(description_lab_process);
        $("#bib_lab_process").val(bib_lab_process);
        $('#form_old_file_lab_process').show();
        $('#form_file_lab_process').show();
        $("#file_lab_process").val(file_lab_process);
    }
    else{
        $('#form_old_file_lab_process').hide();
        if(tipo.includes("buscar")){
            document.getElementById("name_lab_process").required = false;
            document.getElementById("description_lab_process").required = false;
            document.getElementById("bib_lab_process").required = false;
            $('#form_file_lab_process').hide();
            document.getElementById("new_file_lab_process").required = false;

            $("#formLabProcess").attr('action' , 'javascript:getAtributosLabProcess("Buscar");');
        }
        else{
            document.getElementById("name_lab_process").required = true;
            document.getElementById("description_lab_process").required = true;
            document.getElementById("bib_lab_process").required = true;
            $('#form_file_lab_process').show();
            document.getElementById("new_file_lab_process").required = false;

            $("#formLabProcess").attr('action' , 'javascript:getAtributosLabProcess("Añadir");');
        }

        $("#id_lab_process").val('');
        $("#name_lab_process").val('');
        $("#description_lab_process").val('');
        $("#bib_lab_process").val('');
        $("#file_lab_process").val('');
    }
    setLang();
    document.getElementById("aceptar").classList.remove(tipo);
}

function cerrarModal(){
    // Ventana modal
    var modal = document.getElementById("ventanaModal");
    modal.style.display = "none"
}

function mostrarBorrarLabProcess(id){
    // Ventana modal
    document.getElementById("comprobarBorrar").style.display = "block";
    $("#idBorrar").val(id)
    $("#formBorrarLabProcess").attr('action' , 'javascript:borrarLabProcess();');
}

function borrarLabProcess(){
    var id = document.getElementById("idBorrar").value
    deleteLabProcess(id)
}