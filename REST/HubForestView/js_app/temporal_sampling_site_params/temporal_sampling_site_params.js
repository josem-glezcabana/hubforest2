
async function getListtemporal_sampling_site_params() {

    return peticionBackGeneral('', 'temporal_sampling_site_params', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablatemporal_sampling_site_params(response['resource']) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
        
}


async function getListByParamtemporal_sampling_site_params(id_project, id_ecosystem, id_ecosystem_param, category_param,
    name_ecosystem_param, values_ecosystem_param) {
    const temporal_sampling_site_params = {
        id_project: id_project,
        id_ecosystem: id_ecosystem,
        id_ecosystem_param: id_ecosystem_param,
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

async function getListByParamtemporal_sampling_site_params_search(id_project, id_ecosystem, id_ecosystem_param, category_param,
    name_ecosystem_param, values_ecosystem_param) {
        const temporal_sampling_site_params = {
            id_project: id_project,
            id_ecosystem: id_ecosystem,
            id_ecosystem_param: id_ecosystem_param,
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

async function addtemporal_sampling_site_params(id_project, id_ecosystem, id_ecosystem_param, category_param,
    name_ecosystem_param, values_ecosystem_param) {
        const temporal_sampling_site_params = {
            id_project: id_project,
            id_ecosystem: id_ecosystem,
            id_ecosystem_param: id_ecosystem_param,
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

async function edittemporal_sampling_site_params(id_project, id_ecosystem, id_ecosystem_param, category_param,
    name_ecosystem_param, values_ecosystem_param) {
        const temporal_sampling_site_params = {
            id_project: id_project,
            id_ecosystem: id_ecosystem,
            id_ecosystem_param: id_ecosystem_param,
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

async function deletetemporal_sampling_site_params(id_project, id_ecosystem, id_ecosystem_param) {
    
    return peticionBackGeneral('', 'temporal_sampling_site_params', 'DELETE', {'id_project': id_project},
        {'id_ecosystem': id_ecosystem}, {'id_ecosystem_param': id_ecosystem_param})
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

function construyeTablatemporal_sampling_site_params(filas) {

    var filasTabla = ''

    var tipo = "'Editar temporal_sampling_site_params'"

    var element = document.getElementById("datostemporal_sampling_site_params");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    $("#datostemporal_sampling_site_params").html("");
    filas.forEach(fila => {
        var atributosTabla = ["'" + fila.id_project + "'","'" + fila.id_ecosystem + "'", "'" + fila.id_ecosystem_param + "'", "'" + fila.category_param + "'", "'" + fila.name_ecosystem_param + "'", "'" + fila.values_ecosystem_param + "'"];
        var botonEdit='<button class="btn btn-info editartemporal_sampling_site_params" id="editartemporal_sampling_site_params" onclick="mostrarModal('+tipo+','+atributosTabla+')">Editar</button>'

        filasTabla += '<tr> <td>' + fila.id_project + 
                '</td> <td>' + fila.id_ecosystem + 
                '</td> <td>' + fila.id_ecosystem_param + 
                '</td> <td>' + fila.category_param + 
                '</td> <td>' + fila.name_ecosystem_param + 
                '</td> <td>' + fila.values_ecosystem_param + 
                '</td> <td class="text-center">' + botonEdit +
                '</td> <td class="text-center"><button class="btn btn-danger borrartemporal_sampling_site_params" id="borrartemporal_sampling_site_params" onclick="mostrarBorrar('+fila.id_project+', '+fila.id_ecosystem+', '+fila.id_ecosystem_param+')">Eliminar</button>'
                '</td>  </tr>';
    });

    recuperarYComprobarUsuarioLogeadoIsAdmin().then(resultado => {
        if (!resultado) {
            let editartemporal_sampling_site_params = document.getElementsByClassName("editartemporal_sampling_site_params");
            for (const fila of editartemporal_sampling_site_params) {
                fila.style.display = 'none';
            }
            let borrartemporal_sampling_site_params = document.getElementsByClassName("borrartemporal_sampling_site_params");
            for (const fila of borrartemporal_sampling_site_params) {
                fila.style.display = 'none';
            }
            $("#abrirModal").hide();
        } else {
            let editartemporal_sampling_site_params = document.getElementsByClassName("editartemporal_sampling_site_params");
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
    var id_project = document.getElementById("id_project").value
    var id_ecosystem = document.getElementById("id_ecosystem").value
    var id_ecosystem_param = document.getElementById("id_ecosystem_param").value
    var category_param = document.getElementById("category_param").value
    var name_ecosystem_param = document.getElementById("name_ecosystem_param").value
    var values_ecosystem_param = document.getElementById("values_ecosystem_param").value
     switch(tipo){
        case "Editar":
            edittemporal_sampling_site_params(id_project,id_ecosystem, id_ecosystem_param, category_param, name_ecosystem_param, values_ecosystem_param)
            break;
        case "Añadir":
            addtemporal_sampling_site_params(id_project,id_ecosystem, id_ecosystem_param, category_param, name_ecosystem_param, values_ecosystem_param)
            break;
        case "Buscar":
            getListByParamtemporal_sampling_site_params_search(id_project,id_ecosystem, id_ecosystem_param, category_param, name_ecosystem_param, values_ecosystem_param)
            break;
     }
}

function mostrarModal(tipo, id_project=null, id_ecosystem=null, id_ecosystem_param=null, category_param=null, name_ecosystem_param=null, 
                            values_ecosystem_param=null){
    // Ventana modal
    document.getElementById("ventanaModal").style.display = "block";
    document.getElementById("Titulo").innerHTML = '<h2>'+tipo+'</h2>';
    document.getElementById("aceptar").innerHTML = tipo;
    if(tipo.includes("Editar")){
        $("#formtemporal_sampling_site_params").attr('action' , 'javascript:getAtributos("Editar");');
        $("#id_project").val(id_project);
        $("#id_ecosystem").val(id_ecosystem);
        $("#id_ecosystem_param").val(id_ecosystem_param);
        $("#category_param").val(category_param);
        $("#name_ecosystem_param").val(name_ecosystem_param);
        $("#values_ecosystem_param").val(values_ecosystem_param);
    }
    else{
        if(tipo.includes("Buscar")){
            document.getElementById("id_project").required = false;
            document.getElementById("id_ecosystem").required = false;
            document.getElementById("id_ecosystem_param").required = false;
            document.getElementById("category_param").required = false;
            document.getElementById("name_ecosystem_param").required = false;
            document.getElementById("values_ecosystem_param").required = false;
            $("#formtemporal_sampling_site_params").attr('action' , 'javascript:getAtributos("Buscar");');
        }
        else{
            document.getElementById("id_project").required = true;
            document.getElementById("id_ecosystem").required = true;
            document.getElementById("id_ecosystem_param").required = true;
            document.getElementById("category_param").required = true;
            document.getElementById("name_ecosystem_param").required = true;
            document.getElementById("values_ecosystem_param").required = true;

            $("#formtemporal_sampling_site_params").attr('action' , 'javascript:getAtributos("Añadir");');
        }

        $("#id_project").val('');
        $("#id_ecosystem").val('');
        $("#id_ecosystem_param").val('');
        $("#category_param").val('');
        $("#name_ecosystem_param").val('');
        $("#values_ecosystem_param").val('');
    }
    setLang();
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
    $("#formBorrartemporal_sampling_site_params").attr('action' , 'javascript:borrar();');
}

function borrar(){
    var id = document.getElementById("idBorrar").value
    deletetemporal_sampling_site_params(id)
}