
async function getListtemporal_sampling_site_params() {

    return peticionBackGeneral('', 'temporal_sampling_site_params', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablatemporal_sampling_site_params(response['resource']) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
        
}


async function getListByParamtemporal_sampling_site_params(id_project, id_ecosystem, category_param,
    name_ecosystem_param, values_ecosystem_param) {
    const temporal_sampling_site_params = {
        id_project: id_project,
        id_ecosystem: id_ecosystem,
        category_param: category_param,
        name_ecosystem_param: name_ecosystem_param,
        values_ecosystem_param: values_ecosystem_param
    };
    return peticionBackGeneral('', 'temporal_sampling_site_params', 'SEARCH_BY', temporal_sampling_site_params)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablatemporal_sampling_site_params(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListByParamtemporal_sampling_site_params_search(id_project, id_ecosystem, category_param,
    name_ecosystem_param, values_ecosystem_param) {
        const temporal_sampling_site_params = {
            id_project: id_project,
            id_ecosystem: id_ecosystem,
            category_param: category_param,
            name_ecosystem_param: name_ecosystem_param,
            values_ecosystem_param: values_ecosystem_param
        };
    return peticionBackGeneral('', 'temporal_sampling_site_params', 'SEARCH', temporal_sampling_site_params)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablatemporal_sampling_site_params(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function addtemporal_sampling_site_params(id_project, id_ecosystem, category_param, name_ecosystem_param, values_ecosystem_param) {
        const temporal_sampling_site_params = {
            id_project: id_project,
            id_ecosystem: id_ecosystem,
            category_param: category_param,
            name_ecosystem_param: name_ecosystem_param,
            values_ecosystem_param: values_ecosystem_param
        };

    return peticionBackGeneral('', 'temporal_sampling_site_params', 'ADD', temporal_sampling_site_params)
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

async function edittemporal_sampling_site_params(id_ecosystem_param, id_project, id_ecosystem, category_param,
    name_ecosystem_param, values_ecosystem_param) {
        const temporal_sampling_site_params = {
            id_ecosystem_param: id_ecosystem_param,
            id_project: id_project,
            id_ecosystem: id_ecosystem,
            category_param: category_param,
            name_ecosystem_param: name_ecosystem_param,
            values_ecosystem_param: values_ecosystem_param
        };

    return peticionBackGeneral('', 'temporal_sampling_site_params', 'EDIT', temporal_sampling_site_params)
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function deletetemporal_sampling_site_params(id_ecosystem_param, id_project, id_ecosystem) {    
    return peticionBackGeneral('', 'temporal_sampling_site_params', 'DELETE', {
        'id_ecosystem_param': id_ecosystem_param,
        'id_project': id_project,
        'id_ecosystem': id_ecosystem
    }).then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListProjectParams(project_params) {
    return peticionBackGeneral('', 'project', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectProject("id_project", response['resource'], project_params) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListEcosystemParams(ecosystem_params) {
    return peticionBackGeneral('', 'ecosystem', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectEcosystem("id_ecosystem", response['resource'], ecosystem_params) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

function construyeTablatemporal_sampling_site_params(filas) {

    var filasTabla = ''

    var tipo = "'editTemporal_sampling_site_params'"

    var element = document.getElementById("datostemporal_sampling_site_params");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    $("#datostemporal_sampling_site_params").html("");
    filas.forEach(fila => {
        var atributosTabla = ["'" + fila.id_ecosystem_param + "'", "'" + fila.id_project + "'","'" + fila.id_ecosystem + "'", "'" + fila.category_param + "'", "'" + fila.name_ecosystem_param + "'", "'" + fila.values_ecosystem_param + "'"];
        var botonEdit='<button class="BotonEditar btn btn-info" id="editartemporal_sampling_site_params" onclick="mostrarModal('+tipo+','+atributosTabla+')">Editar</button>'

        filasTabla += '<tr> <td>' + fila.id_ecosystem_param +
                '</td> <td>' + fila.id_ecosystem + 
                '</td> <td>' + fila.id_project + 
                '</td> <td>' + fila.category_param + 
                '</td> <td>' + fila.name_ecosystem_param + 
                '</td> <td>' + fila.values_ecosystem_param + 
                '</td> <td class="text-center">' + botonEdit +
                '</td> <td class="text-center"><button class="BotonEliminar btn btn-danger borrartemporal_sampling_site_params" id="borrartemporal_sampling_site_params" onclick="mostrarBorrar(' + fila.id_ecosystem_param + ',' + fila.id_project + ',' + fila.id_ecosystem + ')">Eliminar</button>'
                '</td>  </tr>';
    });

    recuperarYComprobarUsuarioLogeadoIsAdmin().then(resultado => {
        if (!resultado) {
            let editartemporal_sampling_site_params = document.getElementsByClassName("BotonEditar");
            for (const fila of editartemporal_sampling_site_params) {
                fila.style.display = 'none';
            }
            let borrartemporal_sampling_site_params = document.getElementsByClassName("borrartemporal_sampling_site_params");
            for (const fila of borrartemporal_sampling_site_params) {
                fila.style.display = 'none';
            }
            $("#abrirModal").hide();
        } else {
            let editartemporal_sampling_site_params = document.getElementsByClassName("BotonEditar");
            for (const fila of editartemporal_sampling_site_params) {
                fila.style.display = 'block';
            }
            let borrartemporal_sampling_site_params = document.getElementsByClassName("borrartemporal_sampling_site_params");
            for (const fila of borrartemporal_sampling_site_params) {
                fila.style.display = 'block';
            }
            $("#abrirModal").show();
        }
    });
    
    $("#datostemporal_sampling_site_params").append(filasTabla);
    cerrarModal()
    setLang();
}

function getAtributos(tipo){
    var id_ecosystem_param = document.getElementById("id_ecosystem_param").value
    var id_project = document.getElementById("id_project").value
    var id_ecosystem = document.getElementById("id_ecosystem").value
    var category_param = document.getElementById("category_param").value
    var name_ecosystem_param = document.getElementById("name_ecosystem_param").value
    var values_ecosystem_param = document.getElementById("values_ecosystem_param").value
     switch(tipo){
        case "Editar":
            edittemporal_sampling_site_params(id_ecosystem_param, id_project, id_ecosystem, category_param, name_ecosystem_param, values_ecosystem_param)
            break;
        case "Añadir":
            addtemporal_sampling_site_params(id_project, id_ecosystem, category_param, name_ecosystem_param, values_ecosystem_param)
            break;
        case "Buscar":
            getListByParamtemporal_sampling_site_params_search(id_project, id_ecosystem, category_param, name_ecosystem_param, values_ecosystem_param)
            break;
     }
}

function mostrarModal(tipo, id_ecosystem_param=null, id_project=null, id_ecosystem=null, category_param=null, name_ecosystem_param=null, 
                            values_ecosystem_param=null){
    // Ventana modal
    document.getElementById("ventanaModal").style.display = "block";
    document.getElementById("Titulo").innerHTML = '<h2 class="'+tipo+'">'+tipo+'</h2>';
    document.getElementById("aceptar").classList.add(tipo);

    getListProjectParams(id_ecosystem);
    getListEcosystemParams(id_project);

    if(tipo.includes("edit")){
        $("#formtemporal_sampling_site_params").attr('action' , 'javascript:getAtributos("Editar");');
        $("#id_ecosystem_param").val(id_ecosystem_param);
        $("#id_project").val(id_project);
        $("#id_ecosystem").val(id_ecosystem);
        $("#category_param").val(category_param);
        $("#name_ecosystem_param").val(name_ecosystem_param);
        $("#values_ecosystem_param").val(values_ecosystem_param);
    }
    else{
        if(tipo.includes("buscar")){
            document.getElementById("id_project").required = false;
            document.getElementById("id_ecosystem").required = false;
            document.getElementById("category_param").required = false;
            document.getElementById("name_ecosystem_param").required = false;
            document.getElementById("values_ecosystem_param").required = false;
            $("#formtemporal_sampling_site_params").attr('action' , 'javascript:getAtributos("Buscar");');
        }
        else{
            document.getElementById("id_project").required = true;
            document.getElementById("id_ecosystem").required = true;
            document.getElementById("category_param").required = true;
            document.getElementById("name_ecosystem_param").required = true;
            document.getElementById("values_ecosystem_param").required = true;

            $("#formtemporal_sampling_site_params").attr('action' , 'javascript:getAtributos("Añadir");');
        }

        $("#id_ecosystem_param").val('');
        $("#id_project").val('');
        $("#id_ecosystem").val('');
        $("#category_param").val('');
        $("#name_ecosystem_param").val('');
        $("#values_ecosystem_param").val('');
    }
    setLang();
    document.getElementById("aceptar").classList.remove(tipo);
}

function rellenarSelectProject(tipo, filas, project) {
    let element = document.getElementById(tipo);
    let option = document.createElement('option');

      // Eliminar opciones existentes antes de agregar las nuevas
    element.innerHTML = '';
    option.value = "";
    option.textContent = "-- Selecciona proyecto --";
    element.appendChild(option);

    filas.forEach(fila => {
        option = document.createElement('option');
        option.value = fila.id_project;
        option.textContent = fila.name_project;
        element.appendChild(option);
    })

    if (project != null) element.value = project;
}

function rellenarSelectEcosystem(tipo, filas, ecosystem) {
    let element = document.getElementById(tipo);
    let option = document.createElement('option');

      // Eliminar opciones existentes antes de agregar las nuevas
    element.innerHTML = '';
    option.value = "";
    option.textContent = "-- Selecciona ecosistema --";
    element.appendChild(option);

    filas.forEach(fila => {
        option = document.createElement('option');
        option.value = fila.id_ecosystem;
        option.textContent = fila.name_ecosystem;
        element.appendChild(option);
    })

    if (ecosystem != null) element.value = ecosystem;
}


function cerrarModal(){
    // Ventana modal
    var modal = document.getElementById("ventanaModal");
    modal.style.display = "none"
}

function mostrarBorrar(id_ecosystem_param, id_project, id_ecosystem){
    // Ventana modal
    const attributes = [id_ecosystem_param, id_project, id_ecosystem];
    document.getElementById("comprobarBorrar").style.display = "block";
    $("#idBorrar").val(attributes)
    $("#formBorrartemporal_sampling_site_params").attr('action' , 'javascript:borrar();');
}

function borrar(){
    let ids = $("#idBorrar").val();
    let id_array = ids.split(',');
    // Obtenemos los IDs por separado
    let id_ecosystem_param = id_array[0];
    let id_project = id_array[1];
    let id_ecosystem = id_array[2];
    deletetemporal_sampling_site_params(id_ecosystem_param, id_project, id_ecosystem)
}