
async function getListEcosystems() {

    return peticionBackGeneral('', 'ecosystem', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaEcosystem(response['resource']) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
        
}

async function getListByParamEcosystems(name_ecosystem, description_ecosystem, bib_ref_ecosystem) {
    const ecosystem = {
        name_ecosystem: name_ecosystem,
        description_ecosystem: description_ecosystem,
        bib_ref_ecosystem: bib_ref_ecosystem
    };
    return peticionBackGeneral('', 'ecosystem', 'SEARCH_BY', ecosystem)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaEcosystem(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListByParamEcosystems_search(name_ecosystem, description_ecosystem, bib_ref_ecosystem) {
    const ecosystem = {
        name_ecosystem: name_ecosystem,
        description_ecosystem: description_ecosystem,
        bib_ref_ecosystem: bib_ref_ecosystem
    };
    return peticionBackGeneral('', 'ecosystem', 'SEARCH', ecosystem)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaEcosystem(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function addEcosystem(name_ecosystem, description_ecosystem, bib_ref_ecosystem) {
    const ecosystem = {
        name_ecosystem: name_ecosystem,
        description_ecosystem: description_ecosystem,
        bib_ref_ecosystem: bib_ref_ecosystem
    };

    return peticionBackGeneral('', 'ecosystem', 'ADD', ecosystem)
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

async function editEcosystem(id_ecosystem, name_ecosystem, description_ecosystem, bib_ref_ecosystem) {
    const ecosystem = {
        id_ecosystem: id_ecosystem,
        name_ecosystem: name_ecosystem,
        description_ecosystem: description_ecosystem,
        bib_ref_ecosystem: bib_ref_ecosystem
    };

    return peticionBackGeneral('', 'ecosystem', 'EDIT', ecosystem)
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function deleteEcosystem(id_ecosystem) {
    
    return peticionBackGeneral('', 'ecosystem', 'DELETE', {'id_ecosystem': id_ecosystem})
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}



function construyeTablaEcosystem(filas) {

    var filasTabla = ''
    var tipo = "'editarEcosystem'"
    var element = document.getElementById("datosEcosystems");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    $("#datosEcosystems").html("");
    filas.forEach(fila => {
        var atributosTabla = ["'" + fila.id_ecosystem + "'","'" + fila.name_ecosystem + "'", "'" + fila.description_ecosystem + "'", "'" + fila.bib_ref_ecosystem + "'"];
        var botonEdit='<button class="BotonEditar btn btn-info" id="editarEcosystem" onclick="mostrarModal('+tipo+','+atributosTabla+')">Editar</button>'

        filasTabla += '<tr> <td>' + fila.id_ecosystem + 
                '</td> <td>' + fila.name_ecosystem + 
                '</td> <td>' + fila.description_ecosystem + 
                '</td> <td>' + fila.bib_ref_ecosystem + 
                '</td> <td class="text-center">' + botonEdit +
                '</td> <td class="text-center"><button class="BotonEliminar btn btn-danger borrarEcosystem" id="borrarEcosystem" onclick="mostrarBorrar('+fila.id_ecosystem+')">Eliminar</button>'
                
                '</td>  </tr>';
    });

    recuperarYComprobarUsuarioLogeadoIsAdmin().then(resultado => {
        if (!resultado) {
            let editarEcosystem = document.getElementsByClassName("BotonEditar");
            for (const fila of editarEcosystem) {
                fila.style.display = 'none';
            }
            let borrarEcosystem = document.getElementsByClassName("borrarEcosystem");
            for (const fila of borrarEcosystem) {
                fila.style.display = 'none';
            }
            $("#abrirModal").hide();
        } else {
            let editarEcosystem = document.getElementsByClassName("BotonEditar");
            for (const fila of editarEcosystem) {
                fila.style.display = 'block';
            }
            let borrarEcosystem = document.getElementsByClassName("borrarEcosystem");
            for (const fila of borrarEcosystem) {
                fila.style.display = 'block';
            }
            $("#abrirModal").show();
        }
    });
    
    $("#datosEcosystems").append(filasTabla);
    cerrarModal()
    setLang();
}

function getAtributos(tipo){
    var id_ecosystem = document.getElementById("id_ecosystem").value
    var name_ecosystem = document.getElementById("name_ecosystem").value
    var description_ecosystem = document.getElementById("description_ecosystem").value
    var bib_ref_ecosystem = document.getElementById("bib_ref_ecosystem").value
     switch(tipo){
        case "Editar":
            editEcosystem(id_ecosystem, name_ecosystem, description_ecosystem, bib_ref_ecosystem)
            break;
        case "Añadir":
            addEcosystem(name_ecosystem, description_ecosystem, bib_ref_ecosystem)
            break;
        case "Buscar":
            getListByParamEcosystems_search(name_ecosystem, description_ecosystem, bib_ref_ecosystem)
            break;
     }
}

function mostrarModal(tipo, id_ecosystem=null, name_ecosystem=null, description_ecosystem=null, bib_ref_ecosystem=null){
    // Ventana modal
    document.getElementById("ventanaModal").style.display = "block";
    document.getElementById("Titulo").innerHTML = '<h2 class="'+tipo+'">'+tipo+'</h2>';
    document.getElementById("aceptar").classList.add(tipo);
    if(tipo.includes("editar")){
        $("#formEcosystem").attr('action' , 'javascript:getAtributos("Editar");');

        $("#id_ecosystem").val(id_ecosystem);
        $("#name_ecosystem").val(name_ecosystem);
        $("#description_ecosystem").val(description_ecosystem);
        $("#bib_ref_ecosystem").val(bib_ref_ecosystem);
    }
    else{
        if(tipo.includes("buscar")){
            document.getElementById("name_ecosystem").required = false;
            document.getElementById("description_ecosystem").required = false;
            document.getElementById("bib_ref_ecosystem").required = false;

            $("#formEcosystem").attr('action' , 'javascript:getAtributos("Buscar");');
        }
        else{
            document.getElementById("name_ecosystem").required = true;
            document.getElementById("description_ecosystem").required = true;
            document.getElementById("bib_ref_ecosystem").required = true;

            $("#formEcosystem").attr('action' , 'javascript:getAtributos("Añadir");');
        }

        $("#id_ecosystem").val('');
        $("#name_ecosystem").val('');
        $("#description_ecosystem").val('');
        $("#bib_ref_ecosystem").val('');
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
    $("#formBorrarEcosystem").attr('action' , 'javascript:borrar();');
}

function borrar(){
    var id = document.getElementById("idBorrar").value
    deleteEcosystem(id)
}