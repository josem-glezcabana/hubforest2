async function getListTemporalValues() {
    return peticionBackGeneral('', 'temporal_sampling_site_values', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaTemporalValues(response['resource']) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });       
}

async function getListByParamTemporalValues(id_ecosystem_param, id_replica, id_sampling, value_ecosystem_param) {
    const temporal_sampling_site_values = {
        id_ecosystem_param: id_ecosystem_param,
        id_replica: id_replica,
        id_sampling: id_sampling,
        value_ecosystem_param: value_ecosystem_param
    };
    return peticionBackGeneral('', 'temporal_sampling_site_values', 'SEARCH_BY', temporal_sampling_site_values)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaTemporalValues(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListByParamTemporalValues_search(id_ecosystem_param, id_replica, id_sampling, value_ecosystem_param) {
    const temporal_sampling_site_values = {
        id_ecosystem_param: id_ecosystem_param,
        id_replica: id_replica,
        id_sampling: id_sampling,
        value_ecosystem_param: value_ecosystem_param
    };
    return peticionBackGeneral('', 'temporal_sampling_site_values', 'SEARCH', temporal_sampling_site_values)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaTemporalValues(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function addTemporalValues(id_ecosystem_param, id_replica, id_sampling, value_ecosystem_param) {
    const temporal_sampling_site_values = {
        id_ecosystem_param: id_ecosystem_param,
        id_replica: id_replica,
        id_sampling: id_sampling,
        value_ecosystem_param: value_ecosystem_param
    };

    return peticionBackGeneral('', 'temporal_sampling_site_values', 'ADD', temporal_sampling_site_values)
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

async function editTemporalValues(id_ecosystem_param, id_replica, id_sampling, value_ecosystem_param) {
    const temporal_sampling_site_values = {
        id_ecosystem_param: id_ecosystem_param,
        id_replica: id_replica,
        id_sampling: id_sampling,
        value_ecosystem_param: value_ecosystem_param
    };

    return peticionBackGeneral('', 'temporal_sampling_site_values', 'EDIT', temporal_sampling_site_values)
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

async function deleteTemporalValues(id_ecosystem_param, id_replica, id_sampling) {
    return peticionBackGeneral('', 'temporal_sampling_site_values', 'DELETE', {
        'id_ecosystem_param': id_ecosystem_param,
        'id_replica': id_replica,
        'id_sampling': id_sampling
    }).then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListTemporalParams(temporal_params) {
    return peticionBackGeneral('', 'temporal_sampling_site_params', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectTempParam("id_ecosystem_param", response['resource'], temporal_params) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });       
}

async function getListReplica(replicas) {
    return peticionBackGeneral('', 'replica', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectReplica("id_replica", response['resource'], replicas) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });       
}

async function getListSamplings(samplings) {
    return peticionBackGeneral('', 'sampling', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectSampling("id_sampling", response['resource'], samplings) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });       
}

function construyeTablaTemporalValues(filas) {

    let filasTabla = '';
    let tipo = "'editTemporalValues'";
    let element = document.getElementById("datosTemporalValues");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    $("#datosTemporalValues").html("");
    filas.forEach(fila => {
        let atributosTabla = ["'" + fila.id_ecosystem_param + "'", "'" + fila.id_replica + "'", "'" + fila.id_sampling + "'", "'" + fila.value_ecosystem_param + "'"];
        let botonEdit='<button class="BotonEditar btn btn-info editarTemporalValues" id="editarTemporalValues" onclick="mostrarModalTempValues('+tipo+','+atributosTabla+')">Editar</button>'

        filasTabla += '<tr> <td>' + fila.id_ecosystem_param + 
                '</td> <td>' + fila.id_replica + 
                '</td> <td>' + fila.id_sampling + 
                '</td> <td>' + fila.value_ecosystem_param + 
                '</td> <td class="text-center">' + botonEdit +
                '</td> <td class="text-center"><button class="BotonEliminar btn btn-danger borrarTemporalValues" id="borrarTemporalValues" onclick="mostrarBorrarTemporalValues(' + fila.id_ecosystem_param + ', \'' + fila.id_replica + '\',' + fila.id_sampling + ')">Eliminar</button>'
                
                '</td>  </tr>';
    });

    recuperarYComprobarUsuarioLogeadoIsAdmin().then(resultado => {
        if (!resultado) {
            let editarTemporalValues = document.getElementsByClassName("editarTemporalValues");
            for (const fila of editarTemporalValues) {
                fila.style.display = 'none';
            }
            let borrarTemporalValues = document.getElementsByClassName("borrarTemporalValues");
            for (const fila of borrarTemporalValues) {
                fila.style.display = 'none';
            }
            $("#abrirModal").hide();
        } else {
            let editarTemporalValues = document.getElementsByClassName("editarTemporalValues");
            for (const fila of editarTemporalValues) {
                fila.style.display = 'block';
            }
            let borrarTemporalValues = document.getElementsByClassName("borrarTemporalValues");
            for (const fila of borrarTemporalValues) {
                fila.style.display = 'block';
            }
            $("#abrirModal").show();
        }
    });
    
    $("#datosTemporalValues").append(filasTabla);
    cerrarModal();
    setLang();
}

function getAtributos(tipo){
    var id_ecosystem_param = document.getElementById("id_ecosystem_param").value
    var id_replica = document.getElementById("id_replica").value
    var id_sampling = document.getElementById("id_sampling").value
    var value_ecosystem_param = document.getElementById("value_ecosystem_param").value
     switch(tipo){
        case "Editar":
            editTemporalValues(id_ecosystem_param, id_replica, id_sampling, value_ecosystem_param)
            break;
        case "Añadir":
            addTemporalValues(id_ecosystem_param, id_replica, id_sampling, value_ecosystem_param)
            break;
        case "Buscar":
            getListByParamTemporalValues_search(id_ecosystem_param, id_replica, id_sampling, value_ecosystem_param)
            break;
     }
}

function mostrarModalTempValues(tipo, id_ecosystem_param=null, id_replica=null, id_sampling=null, value_ecosystem_param=null){
    // Ventana modal
    document.getElementById("ventanaModal").style.display = "block";
    document.getElementById("Titulo").innerHTML = '<h2 class="'+tipo+'">'+tipo+'</h2>';
    document.getElementById("aceptar").classList.add(tipo);

    getListTemporalParams(id_ecosystem_param);
    getListReplica(id_replica);
    getListSamplings(id_sampling);

    if(tipo.includes("edit")){
        $("#formTemporalValues").attr('action' , 'javascript:getAtributos("Editar");');

        $("#id_ecosystem_param").val(id_ecosystem_param);
        $("#id_replica").val(id_replica);
        $("#id_sampling").val(id_sampling);
        $("#value_ecosystem_param").val(value_ecosystem_param);
    }
    else{
        if(tipo.includes("Buscar")){
            document.getElementById("id_ecosystem_param").required = false;
            document.getElementById("id_replica").required = false;
            document.getElementById("id_sampling").required = false;
            document.getElementById("value_ecosystem_param").required = false;

            $("#formTemporalValues").attr('action' , 'javascript:getAtributos("Buscar");');
        }
        else{
            document.getElementById("id_ecosystem_param").required = true;
            document.getElementById("id_replica").required = true;
            document.getElementById("id_sampling").required = true;
            document.getElementById("value_ecosystem_param").required = true;

            $("#formTemporalValues").attr('action' , 'javascript:getAtributos("Añadir");');
        }

        $("#id_ecosystem_param").val('');
        $("#id_replica").val('');
        $("#id_sampling").val('');
        $("#value_ecosystem_param").val('');
    }
    setLang();
    document.getElementById("aceptar").classList.remove(tipo);
}

function rellenarSelectTempParam(tipo, filas, temporal_param) {
    let element = document.getElementById(tipo);
    let option = document.createElement('option');

    // Eliminar opciones existentes antes de agregar las nuevas
    element.innerHTML = '';
    option.value = "";
    option.textContent = "-- Selecciona parámetro --";
    element.appendChild(option);

    filas.forEach(fila => {
        option = document.createElement('option');
        option.value = fila.id_ecosystem_param;
        option.textContent = fila.name_ecosystem_param;
        element.appendChild(option);
    })

    if (temporal_param != null) element.value = temporal_param;
}

function rellenarSelectReplica(tipo, filas, replica) {
    let element = document.getElementById(tipo);
    let option = document.createElement('option');

    // Eliminar opciones existentes antes de agregar las nuevas
    element.innerHTML = '';
    option.value = "";
    option.textContent = "-- Selecciona replica --";
    element.appendChild(option);

    filas.forEach(fila => {
        option = document.createElement('option');
        option.value = fila.id_replica;
        option.textContent = fila.id_replica;
        element.appendChild(option);
    })

    if (replica != null) element.value = replica;
}

function rellenarSelectSampling(tipo, filas, sampling) {
    let element = document.getElementById(tipo);
    let option = document.createElement('option');

    // Eliminar opciones existentes antes de agregar las nuevas
    element.innerHTML = '';
    option.value = "";
    option.textContent = "-- Selecciona muestreo --";
    element.appendChild(option);

    filas.forEach(fila => {
        option = document.createElement('option');
        option.value = fila.id_sampling;
        option.textContent = fila.id_sampling;
        element.appendChild(option);
    })

    if (sampling != null) element.value = sampling;
}

function cerrarModal(){
    // Ventana modal
    var modal = document.getElementById("ventanaModal");
    modal.style.display = "none"
}

function mostrarBorrarTemporalValues(id_ecosystem_param, id_replica, id_sampling){
    // Ventana modal
    const attributes = [id_ecosystem_param, id_replica, id_sampling];
    document.getElementById("comprobarBorrar").style.display = "block";
    $("#idBorrar").val(attributes)
    $("#formBorrarTemporalValues").attr('action' , 'javascript:borrar();');
}

function borrar(){
    let ids = $("#idBorrar").val();
    let id_array = ids.split(',');
    // Obtenemos los IDs por separado
    let id_ecosystem_param = id_array[0];
    let id_replica = id_array[1];
    let id_sampling = id_array[2];
    deleteTemporalValues(id_ecosystem_param, id_replica, id_sampling)
}