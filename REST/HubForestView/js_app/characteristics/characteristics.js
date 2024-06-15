async function getListCharacteristics() {

    return peticionBackGeneral('', 'characteristic', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaCharacteristic(response['resource']) : console.log(response))
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
        
}

async function getListByParamCharacteristics(name_characteristic, description_characteristic, data_type_characteristic, bibref_characteristic, file_characteristic) {
    const characteristic = {
        name_characteristic: name_characteristic,
        description_characteristic: description_characteristic,
        data_type_characteristic: data_type_characteristic,
        bibref_characteristic: bibref_characteristic,
        file_characteristic: file_characteristic
    };
    return peticionBackGeneral('', 'characteristic', 'SEARCH_BY', characteristic)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaCharacteristic(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListByParamCharacteristics_search(name_characteristic, description_characteristic, data_type_characteristic, bibref_characteristic, file_characteristic) {
    const characteristic = {
        name_characteristic: name_characteristic,
        description_characteristic: description_characteristic,
        data_type_characteristic: data_type_characteristic,
        bibref_characteristic: bibref_characteristic,
        file_characteristic: file_characteristic
    };
    return peticionBackGeneral('', 'characteristic', 'SEARCH', characteristic)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaCharacteristic(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function addCharacteristic(name_characteristic, description_characteristic, data_type_characteristic, bibref_characteristic, file_characteristic) {
    const characteristic = {
        name_characteristic: name_characteristic,
        description_characteristic: description_characteristic,
        data_type_characteristic: data_type_characteristic,
        bibref_characteristic: bibref_characteristic,
        file_characteristic: file_characteristic
    };

    return peticionBackGeneral('', 'characteristic', 'ADD', characteristic)
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

async function editCharacteristic(id_characteristic, name_characteristic, description_characteristic, data_type_characteristic, bibref_characteristic, file_characteristic) {
    const characteristic = {
        id_characteristic: id_characteristic,
        name_characteristic: name_characteristic,
        description_characteristic: description_characteristic,
        data_type_characteristic: data_type_characteristic,
        bibref_characteristic: bibref_characteristic,
        file_characteristic: file_characteristic
    };

    return peticionBackGeneral('', 'characteristic', 'EDIT', characteristic)
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function deleteCharacteristic(id_characteristic) {
    
    return peticionBackGeneral('', 'characteristic', 'DELETE', {'id_characteristic': id_characteristic})
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}



function construyeTablaCharacteristic(filas) {

    var filasTabla = ''
    var tipo = "'editarCharacteristic'"
    var element = document.getElementById("datosCharacteristics");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    //'name_characteristic','description_characteristic','data_type_characteristic','bibref_characteristic','file_characteristic'
    $("#datosCharacteristics").html("");
    filas.forEach(fila => {
        var atributosTabla = ["'" + fila.id_characteristic + "'","'" + fila.name_characteristic + "'", "'" + fila.description_characteristic + "'", "'" + fila.data_type_characteristic + "'", "'" + fila.bibref_characteristic + "'" , "'" + fila.file_characteristic + "'"];
        var botonEdit='<button class="BotonEditar btn btn-info" id="editarCharacteristic" onclick="mostrarModal('+tipo+','+atributosTabla+')">Editar</button>'

        filasTabla += '<tr> <td>' + fila.id_characteristic + 
                '</td> <td>' + fila.name_characteristic + 
                '</td> <td>' + fila.description_characteristic +
                '</td> <td>' + fila.data_type_characteristic + 
                '</td> <td>' + fila.bibref_characteristic + 
                '</td> <td>' + fila.file_characteristic +
                '</td> <td class="text-center">' + botonEdit +
                '</td> <td class="text-center"><button class="BotonEliminar btn btn-danger borrarCharacteristic" id="borrarCharacteristic" onclick="mostrarBorrar('+fila.id_characteristic+')">Eliminar</button>'
                
                '</td>  </tr>';
    });

    recuperarYComprobarUsuarioLogeadoIsAdmin().then(resultado => {
        if (!resultado) {
            let editarCharacteristic = document.getElementsByClassName("BotonEditar");
            for (const fila of editarCharacteristic) {
                fila.style.display = 'none';
            }
            let borrarCharacteristic = document.getElementsByClassName("borrarCharacteristic");
            for (const fila of borrarCharacteristic) {
                fila.style.display = 'none';
            }
            $("#abrirModal").hide();
        } else {
            let editarCharacteristic = document.getElementsByClassName("BotonEditar");
            for (const fila of editarCharacteristic) {
                fila.style.display = 'block';
            }
            let borrarCharacteristic = document.getElementsByClassName("borrarCharacteristic");
            for (const fila of borrarCharacteristic) {
                fila.style.display = 'block';
            }
            $("#abrirModal").show();
        }
    });
    
    $("#datosCharacteristics").append(filasTabla);
    cerrarModal()
    setLang();
}
//'name_characteristic','description_characteristic','data_type_characteristic','bibref_characteristic','file_characteristic'
function getAtributos(tipo){
    var id_characteristic = document.getElementById("id_characteristic").value
    var name_characteristic = document.getElementById("name_characteristic").value
    var description_characteristic = document.getElementById("description_characteristic").value
    var data_type_characteristic = document.getElementById("data_type_characteristic").value
    var bibref_characteristic = document.getElementById("bibref_characteristic").value
    var file_characteristic = document.getElementById("file_characteristic").value
     switch(tipo){
        case "Editar":
            editCharacteristic(id_characteristic, name_characteristic, description_characteristic, data_type_characteristic, bibref_characteristic, file_characteristic)
            break;
        case "Añadir":
            addCharacteristic(name_characteristic, description_characteristic, data_type_characteristic, bibref_characteristic, file_characteristic)
            break;
        case "Buscar":
            getListByParamCharacteristics_search(name_characteristic, description_characteristic, data_type_characteristic, bibref_characteristic, file_characteristic)
            break;
     }
}

function mostrarModal(tipo, id_characteristic=null, name_characteristic=null, description_characteristic=null, data_type_characteristic=null, bibref_characteristic=null, file_characteristic=null){
    // Ventana modal
    document.getElementById("ventanaModal").style.display = "block";
    document.getElementById("Titulo").innerHTML = '<h2 class="'+tipo+'">'+tipo+'</h2>';
    document.getElementById("aceptar").classList.add(tipo);
    console.log(tipo)
    if(tipo.includes("editar")){
        $("#formCharacteristic").attr('action' , 'javascript:getAtributos("Editar");');

        $("#id_characteristic").val(id_characteristic);
        $("#name_characteristic").val(name_characteristic);
        $("#description_characteristic").val(description_characteristic);
        $("#data_type_characteristic").val(data_type_characteristic);
        $("#bibref_characteristic").val(bibref_characteristic);
        $('#form_file_characteristic').show();
       // $("#file_characteristic").val(file_characteristic);
    }
    else{
        if(tipo.includes("buscar")){
            document.getElementById("name_characteristic").required = false;
            document.getElementById("description_characteristic").required = false;
            document.getElementById("data_type_characteristic").required = false;
            document.getElementById("bibref_characteristic").required = false;
            $('#form_file_characteristic').hide();
            document.getElementById("file_characteristic").required = false;

            $("#formCharacteristic").attr('action' , 'javascript:getAtributos("Buscar");');
        }
        else{
            document.getElementById("name_characteristic").required = true;
            document.getElementById("description_characteristic").required = true;
            document.getElementById("data_type_characteristic").required = true;
            document.getElementById("bibref_characteristic").required = true;
            $('#form_file_characteristic').show();
            document.getElementById("file_characteristic").required = false;

            $("#formCharacteristic").attr('action' , 'javascript:getAtributos("Añadir");');
        }

        $("#id_characteristic").val('');
        $("#name_characteristic").val('');
        $("#description_characteristic").val('');
        $("#data_type_characteristic").val('');
        $("#bibref_characteristic").val('');
        $("#file_characteristic").val('');
    }
    setLang();
    document.getElementById("aceptar").classList.remove(tipo);
    console.log
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
    $("#formBorrarCharacteristic").attr('action' , 'javascript:borrar();');
}

function borrar(){
    var id = document.getElementById("idBorrar").value
    deleteCharacteristic(id)
}