async function getListStorage_method() {
    return peticionBackGeneral('', 'storage_method', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaStorage_method(response['resource']) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });  
}

async function getListByParamStorage_method(name_storage_method, description_storage_method, storage_container, size_storage_container, unit_storage_container) {
    const storage_method = {
        name_storage_method: name_storage_method,
        description_storage_method: description_storage_method,
        storage_container: storage_container,
        size_storage_container: size_storage_container,
        unit_storage_container: unit_storage_container
    };
    return peticionBackGeneral('', 'storage_method', 'SEARCH_BY', storage_method)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaStorage_method(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function addStorage_method(name_storage_method, description_storage_method, storage_container, size_storage_container, unit_storage_container) {
    const storage_method = {
        name_storage_method: name_storage_method,
        description_storage_method: description_storage_method,
        storage_container: storage_container,
        size_storage_container: size_storage_container,
        unit_storage_container: unit_storage_container
    };

    return peticionBackGeneral('', 'storage_method', 'ADD', storage_method)
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

async function editStorage_method(id_storage_method, name_storage_method, description_storage_method, storage_container, size_storage_container, unit_storage_container) {
    const storage_method = {
        id_storage_method: id_storage_method,
        name_storage_method: name_storage_method,
        description_storage_method: description_storage_method,
        storage_container: storage_container,
        size_storage_container: size_storage_container,
        unit_storage_container: unit_storage_container
    };

    return peticionBackGeneral('', 'storage_method', 'EDIT', storage_method)
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function deleteStorage_method(id_storage_method) {
    
    return peticionBackGeneral('', 'storage_method', 'DELETE', {'id_storage_method': id_storage_method})
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

function construyeTablaStorage_method(filas) {

    let filasTabla = '';
    let tipo = "'editStorage_method'";
    let element = document.getElementById("datosStorage_method");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    $("#datosStorage_method").html("");
    filas.forEach(fila => {
        let atributosTabla = ["'" + fila.id_storage_method + "'","'" + fila.name_storage_method + "'", "'" + fila.description_storage_method + "'",
                              "'" + fila.storage_container + "'","'" + fila.size_storage_container + "'","'" + fila.unit_storage_container + "'"];
        let botonEdit='<button class="BotonEditar btn btn-info" id="editarStorageMethod" onclick="mostrarModalStorage_method('+tipo+','+atributosTabla+')">Editar</button>'

        filasTabla += '<tr> <td>' + fila.name_storage_method + 
                '</td> <td>' + fila.description_storage_method + 
                '</td> <td>' + fila.storage_container + 
                '</td> <td>' + fila.size_storage_container + 
                '</td> <td>' + fila.unit_storage_container + 
                '</td> <td class="text-center">' + botonEdit +
                '</td> <td class="text-center"><button class="BotonEliminar btn btn-danger borrarStorage_method" id="borrarStorage_method" onclick="mostrarBorrarStorage_method('+fila.id_storage_method+')">Eliminar</button>'
                
                '</td>  </tr>';
    });

    
    $("#datosStorage_method").append(filasTabla);
    cerrarModal();
    setLang();
}

function getAtributosStorage_method(tipo){
    let id_storage_method = document.getElementById("id_storage_method").value
    let name_storage_method = document.getElementById("name_storage_method").value
    let description_storage_method = document.getElementById("description_storage_method").value
    let storage_container = document.getElementById("storage_container").value
    let size_storage_container = document.getElementById("size_storage_container").value
    let unit_storage_container = document.getElementById("unit_storage_container").value
     switch(tipo){
        case "Editar":
            editStorage_method(id_storage_method, name_storage_method, description_storage_method, storage_container, size_storage_container, unit_storage_container)
            break;
        case "Añadir":
            addStorage_method(name_storage_method, description_storage_method, storage_container, size_storage_container, unit_storage_container)
            break;
        case "Buscar":
            getListByParamStorage_method(name_storage_method, description_storage_method, storage_container, size_storage_container, unit_storage_container)
            break;
     }
}

function mostrarModalStorage_method(tipo, id_storage_method=null, name_storage_method=null, description_storage_method=null, storage_container=null, size_storage_container=null,
  unit_storage_container=null){
    // Ventana modal
    document.getElementById("ventanaModal").style.display = "block";
    document.getElementById("Titulo").innerHTML = '<h2 class="'+tipo+'">'+tipo+'</h2>';
    document.getElementById("aceptar").classList.add(tipo);

    if(tipo.includes("edit")){
        $("#formStorage_method").attr('action' , 'javascript:getAtributosStorage_method("Editar");');

        $("#id_storage_method").val(id_storage_method);
        $("#name_storage_method").val(name_storage_method);
        $("#description_storage_method").val(description_storage_method);
        $("#storage_container").val(storage_container);
        $('#size_storage_container').val(size_storage_container)
        $("#unit_storage_container").val(unit_storage_container);
    }
    else{
        if(tipo.includes("Buscar")){
            document.getElementById("name_storage_method").required = false;
            document.getElementById("description_storage_method").required = false;
            document.getElementById("storage_container").required = false;
            document.getElementById("size_storage_container").required = false;
            document.getElementById("unit_storage_container").required = false;

            $("#formStorage_method").attr('action' , 'javascript:getAtributosStorage_method("Buscar");');
        }
        else{
            document.getElementById("name_storage_method").required = true;
            document.getElementById("description_storage_method").required = true;
            document.getElementById("storage_container").required = true;
            document.getElementById("size_storage_container").required = false
            document.getElementById("unit_storage_container").required = false;

            $("#formStorage_method").attr('action' , 'javascript:getAtributosStorage_method("Añadir");');
        }

        $("#id_storage_method").val('');
        $("#name_storage_method").val('');
        $("#description_storage_method").val('');
        $("#storage_container").val('');
        $('#size_storage_container').val('')
        $("#unit_storage_container").val('');
    }
    setLang();
    document.getElementById("aceptar").classList.remove(tipo);
}

function cerrarModal(){
    // Ventana modal
    var modal = document.getElementById("ventanaModal");
    modal.style.display = "none"
}

function mostrarBorrarStorage_method(id){
    // Ventana modal
    document.getElementById("comprobarBorrar").style.display = "block";
    $("#idBorrar").val(id)
    $("#formBorrarStorage_method").attr('action' , 'javascript:borrarStorage_method();');
}

function borrarStorage_method(){
    var id = document.getElementById("idBorrar").value
    deleteStorage_method(id)
}