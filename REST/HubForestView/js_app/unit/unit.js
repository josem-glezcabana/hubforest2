async function getListUnit() {

    return peticionBackGeneral('', 'unit', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaUnit(response['resource']) : console.log(response))
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
        
}

async function getListByParamUnit(name_unit, description_unit) {
    const unit = {
        name_unit: name_unit,
        description_unit: description_unit
    };
    return peticionBackGeneral('', 'unit', 'SEARCH_BY', unit)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaUnit(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function addUnit(name_unit, description_unit) {
    const unit = {
        name_unit: name_unit,
        description_unit: description_unit
    };

    return peticionBackGeneral('', 'unit', 'ADD', unit)
        .then(response => {
           // location.reload();
           console.log(response)
            response['resource']
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function editUnit(name_unit, description_unit) {
    const unit = {
        id_unit: id_unit,
        name_unit: name_unit,
        description_unit: description_unit
    };

    return peticionBackGeneral('', 'unit', 'EDIT', unit)
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function deleteUnit(id_unit) {
    
    return peticionBackGeneral('', 'unit', 'DELETE', {'id_unit': id_unit})
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}



function construyeTablaUnit(filas) {

    var filasTabla = ''
    var tipo = "'editarUnit'"
    var element = document.getElementById("datosUnit");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    //'name_characteristic','description_characteristic','data_type_characteristic','bibref_characteristic','file_characteristic'
    $("#datosUnit").html("");
    filas.forEach(fila => {
        var atributosTabla = ["'" + fila.id_unit + "'","'" + fila.name_unit + "'", "'" + fila.description_unit];
        var botonEdit='<button class="BotonEditar btn btn-info" id="editarUnit" onclick="mostrarModal('+tipo+','+atributosTabla+')">Editar</button>'

        filasTabla += '<tr> <td>' + fila.name_unit + 
                '</td> <td>' + fila.description_unit + 
                '</td> <td class="text-center">' + botonEdit +
                '</td> <td class="text-center"><button class="BotonEliminar btn btn-danger borrarUnit" id="borrarUnit" onclick="mostrarBorrar('+fila.id_unit+')">Eliminar</button>'
                
                '</td>  </tr>';
    });

    recuperarYComprobarUsuarioLogeadoIsAdmin().then(resultado => {
        if (!resultado) {
            let editarUnit = document.getElementsByClassName("BotonEditar");
            for (const fila of editarUnit) {
                fila.style.display = 'none';
            }
            let borrarUnit = document.getElementsByClassName("borrarUnit");
            for (const fila of borrarUnit) {
                fila.style.display = 'none';
            }
            $("#abrirModal").hide();
        } else {
            let editarUnit = document.getElementsByClassName("BotonEditar");
            for (const fila of editarUnit) {
                fila.style.display = 'block';
            }
            let borrarUnit = document.getElementsByClassName("borrarUnit");
            for (const fila of borrarUnit) {
                fila.style.display = 'block';
            }
            $("#abrirModal").show();
        }
    });
    
    $("#datosUnit").append(filasTabla);
    cerrarModal()
    setLang();
}
//'name_characteristic','description_characteristic','data_type_characteristic','bibref_characteristic','file_characteristic'
function getAtributos(tipo){
    var id_unit = document.getElementById("id_unit").value
    var name_unit = document.getElementById("name_unit").value
    var description_unit = document.getElementById("description_unit").value
     switch(tipo){
        case "Editar":
            editUnit(id_unit, name_unit, description_unit)
            break;
        case "Añadir":
            addUnit(name_unit, description_unit)
            break;
        case "Buscar":
            getListByParamUnit(name_unit, description_unit)
            break;
     }
}

function mostrarModal(tipo, id_unit=null, name_unit=null, description_unit=null){
    // Ventana modal
    document.getElementById("ventanaModal").style.display = "block";
    document.getElementById("Titulo").innerHTML = '<h2 class="'+tipo+'">'+tipo+'</h2>';
    document.getElementById("aceptar").classList.add(tipo);

    if(tipo.includes("editar")){
        $("#formUnit").attr('action' , 'javascript:getAtributos("Editar");');

        $("#id_unit").val(id_unit);
        $("#name_unit").val(name_unit);
        $("#description_unit").val(description_unit);
       // $("#file_characteristic").val(file_characteristic);
    }
    else{
        if(tipo.includes("buscar")){
            document.getElementById("name_unit").required = false;
            document.getElementById("description_unit").required = false;

            $("#formUnit").attr('action' , 'javascript:getAtributos("Buscar");');
        }
        else{
            document.getElementById("name_unit").required = true;
            document.getElementById("description_unit").required = true;

            $("#formUnit").attr('action' , 'javascript:getAtributos("Añadir");');
        }

        $("#id_unit").val('');
        $("#name_unit").val('');
        $("#description_unit").val('');
    }
    setLang();
    document.getElementById("aceptar").classList.remove(tipo);
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
    $("#formBorrarUnit").attr('action' , 'javascript:borrar();');
}

function borrar(){
    var id = document.getElementById("idBorrar").value
    deleteUnit(id)
}