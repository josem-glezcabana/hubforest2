async function getListSampling() {

    return peticionBackGeneral('', 'sampling', 'SEARCH_SAMPLINGS')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaSampling(response['resource']) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });   
}

async function getListByParamSampling(id_project, id_ecosystem, id_site, date_sampling, time_sampling, collectors_sampling) {
    const sampling = {
        id_project: id_project,
        id_ecosystem: id_ecosystem,
        id_site: id_site,
        date_sampling: date_sampling,
        time_sampling: time_sampling,
        collectors_sampling: collectors_sampling
    };

  try {
    const response = await peticionBackGeneral('', 'sampling', 'SEARCH_BY', sampling);

    if (response['code'] === "RECORDSET_DATOS") {
      const datos = response['resource'];

      const updatedDatos = await Promise.all(
        datos.map(async (element) => {
          const project = await getProyectoPorId(element.id_project);
          const ecosystem = await getEcosystemPorId(element.id_ecosystem);
          // Crear un nuevo objeto con las propiedades actualizadas
          return {
            ...element,
            name_project: project[0].name_project,
            name_ecosystem: ecosystem[0].name_ecosystem
          };
        })
      );

      return construyeTablaSampling(updatedDatos);
    } else {
      return mostrarErrorBusq();
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return null;
  }    
}

async function addSampling(id_project, id_ecosystem, id_site, date_sampling, time_sampling, temp_air_sampling, collectors_sampling) {
    const sampling = {
        id_project: id_project,
        id_ecosystem: id_ecosystem,
        id_site: id_site,
        date_sampling: date_sampling,
        time_sampling: time_sampling,
        temp_air_sampling: temp_air_sampling,
        collectors_sampling: collectors_sampling
    };

    return peticionBackGeneral('', 'sampling', 'ADD', sampling)
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

async function editSampling(id_project, id_ecosystem,id_sampling, id_site, date_sampling, time_sampling, temp_air_sampling, collectors_sampling) {
    const sampling = {
        id_project: id_project,
        id_ecosystem: id_ecosystem,
        id_sampling: id_sampling,
        id_site: id_site,
        date_sampling: date_sampling,
        time_sampling: time_sampling,
        temp_air_sampling: temp_air_sampling,
        collectors_sampling: collectors_sampling
    };

    return peticionBackGeneral('', 'sampling', 'EDIT', sampling)
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function deleteProyecto(id_sampling) {
    
    return peticionBackGeneral('', 'sampling', 'DELETE', {'id_sampling': id_sampling})
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListEcosystems(ecosystem) {
    return peticionBackGeneral('', 'ecosystem', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectEcosystems("id_ecosystem", response['resource'], ecosystem) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListProyectos(proyecto) {
    return peticionBackGeneral('', 'project', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectProyectos("id_project", response['resource'], proyecto) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListSites(site) {
    return peticionBackGeneral('', 'site', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectSites("id_site", response['resource'], site) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getEcosystemPorId(id_ecosystem) {
    const ecosystem = {
        id_ecosystem: id_ecosystem
    };
    return peticionBackGeneral('', 'ecosystem', 'SEARCH_BY', ecosystem)
        .then(response => response['resource'])
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

function construyeTablaSampling(filas) {

    let filasTabla = '';
    let tipo = "'Editar sampling'";
    let element = document.getElementById("datosSampling");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    $("#datosSampling").html("");
    filas.forEach(fila => {

        if (typeof fila.date_sampling !== 'string') {
            // se coge la parte de la fecha y hora, sin obtener segundos
            const fechaHoraStart = fila.date_sampling.split(" ");
            const fechaStart = fechaHoraStart[0];
            const horaStart = fechaHoraStart[1].substring(0, fechaHoraStart[1].lastIndexOf(":"));
            fila.date_sampling = fechaStart + ' ' + horaStart;
        }

        let atributosTabla = ["'" + fila.id_project + "'","'" + fila.id_ecosystem + "'", "'" + fila.id_sampling + "'", "'" + fila.id_site + "'", "'" + fila.date_sampling + "'",
                              "'" + fila.time_sampling + "'", "'" + fila.temp_air_sampling + "'", "'" + fila.collectors_sampling + "'","'" + fila.id_sampling + "'"];
        let botonEdit='<button class="BotonEditar btn btn-info" id="editarSampling" onclick="mostrarModalSampling('+tipo+','+atributosTabla+')">Editar</button>'

        filasTabla += '<tr> <td>' + fila.name_project + 
                '</td> <td>' + fila.name_ecosystem + 
                '</td> <td>' + fila.id_site + 
                '</td> <td>' + fila.date_sampling + 
                '</td> <td>' + fila.time_sampling + 
                '</td> <td>' + fila.temp_air_sampling + 
                '</td> <td>' + fila.collectors_sampling + 
                '</td> <td class="text-center">' + botonEdit +
                '</td> <td class="text-center"><button class="BotonEliminarSampling btn btn-danger" id="borrarSampling" onclick="mostrarBorrarSampling('+fila.id_sampling+')">Eliminar</button>'
                '</td>  </tr>';
    });

    recuperarYComprobarUsuarioLogeadoIsAdmin().then(resultado => {
        if (!resultado) {
            let elements = document.getElementsByClassName('BotonEditar');
            for (let e of elements) {
                e.style.display = 'none';
            }
            elements = document.getElementsByClassName('BotonEliminarSampling');
            for (let e of elements) {
                e.style.display = 'none';
            }
            $("#abrirModal").hide();
        } else {
            let elements = document.getElementsByClassName('BotonEditar');
            for (let e of elements) {
                e.style.display = 'block';
            }
            elements = document.getElementsByClassName('BotonEliminarSampling');
            for (let e of elements) {
                e.style.display = 'block';
            }
            $("#abrirModal").show();
        }
    });
    
    $("#datosSampling").append(filasTabla);
    cerrarModal();
    setLang();
}

function getAtributos(tipo){
    var id_project = document.getElementById("id_project").value
    var id_ecosystem = document.getElementById("id_ecosystem").value
    var id_site = document.getElementById("id_site").value
    var date_sampling = document.getElementById("date_sampling").value
    var time_sampling = document.getElementById("time_sampling").value
    var temp_air_sampling = document.getElementById("temp_air_sampling").value
    var collectors_sampling = document.getElementById("collectors_sampling").value
    var id_sampling = document.getElementById("id_sampling").value
    var validacion =validarCampos();
    if(validacion){
        switch(tipo){
            case "Editar":
                editSampling(id_project, id_ecosystem, id_sampling, id_site, date_sampling, time_sampling, temp_air_sampling, collectors_sampling)
                break;
            case "Añadir":
                addSampling(id_project, id_ecosystem, id_site, date_sampling, time_sampling, temp_air_sampling, collectors_sampling)
                break;
            case "Buscar":
                getListByParamSampling(id_project, id_ecosystem, id_site, date_sampling, time_sampling, collectors_sampling)
                break;
        }
    }
    else{

    }
}
function validarCampos() {
    var collectorsInput = document.getElementById('collectors_sampling').value;
    var pattern = /^[a-zA-Z]+(:[a-zA-Z]+)*$/;

    if (!pattern.test(collectorsInput)) {
        $('#errorModal').modal('show');
        return false; // Evita que el formulario se envíe
    }

    return true; // Permite que el formulario se envíe
}

function mostrarModalSampling(tipo, id_project=null, id_ecosystem=null, id_sampling=null, id_site=null, date_sampling=null, 
                        time_sampling=null, temp_air_sampling=null, collectors_sampling=null){
    // Ventana modal
    document.getElementById("ventanaModal").style.display = "block";
    document.getElementById("Titulo").innerHTML = '<h2>'+tipo+'</h2>';
    document.getElementById("aceptar").innerHTML = tipo;

    getListEcosystems(id_ecosystem);
    getListProyectos(id_project);
    getListSites(id_site);

    if(tipo.includes("Editar")){
        $("#formSampling").attr('action' , 'javascript:getAtributos("Editar");');

        $("#id_project").val(id_project);
        $("#id_ecosystem").val(id_ecosystem);
        $("#id_sampling").val(id_sampling);
        $("#id_site").val(id_site);
        $("#date_sampling").val(date_sampling);
        $("#time_sampling").val(time_sampling);
        $("#temp_air_sampling").val(temp_air_sampling);
        $("#collectors_sampling").val( collectors_sampling);
    }
    else{
        if(tipo.includes("Buscar")){
            document.getElementById("id_project").required = false;
            document.getElementById("id_ecosystem").required = false;
            document.getElementById("id_site").required = false;
            document.getElementById("date_sampling").required = false;
            document.getElementById("time_sampling").required = false;
            document.getElementById("temp_air_sampling").required = false;
            document.getElementById("collectors_sampling").required = false;

            $("#formSampling").attr('action' , 'javascript:getAtributos("Buscar");');
        }
        else{
            document.getElementById("id_project").required =true;
            document.getElementById("id_ecosystem").required = true;
            document.getElementById("id_site").required = true;
            document.getElementById("date_sampling").required = true;
            document.getElementById("time_sampling").required = true;
            document.getElementById("temp_air_sampling").required = true;
            document.getElementById("collectors_sampling").required = true;

            $("#formSampling").attr('action' , 'javascript:getAtributos("Añadir");');
        }

        $("#id_project").val('');
        $("#id_ecosystem").val('');
        $("#id_sampling").val('');
        $("#id_site").val('');
        $("#date_sampling").val('');
        $("#time_sampling").val('');
        $("#temp_air_sampling").val('');
        $("#collectors_sampling").val('');
    }
    setLang();
}

  function rellenarSelectEcosystems(tipo, filas, ecosystem) {
    let element = document.getElementById(tipo);
    let option = document.createElement('option');
    
    // Eliminar opciones existentes antes de agregar las nuevas
    element.innerHTML = '';
    
    filas.forEach(fila => {
        option = document.createElement('option');
        option.value = fila.id_ecosystem;
        option.textContent = fila.name_ecosystem;
        element.appendChild(option);
    })
    
    if (ecosystem != null) element.value = ecosystem;
    
  }
  
  function rellenarSelectProyectos(tipo, filas, proyecto) {
    let element = document.getElementById(tipo);
    let option = document.createElement('option');
    
    // Eliminar opciones existentes antes de agregar las nuevas
    element.innerHTML = '';
    
    filas.forEach(fila => {
        option = document.createElement('option');
        option.value = fila.id_project;
        option.textContent = fila.name_project;
        element.appendChild(option);
    })
    
    if (proyecto != null) element.value = proyecto;
    
  }

    function rellenarSelectSites(tipo, filas, site) {
    let element = document.getElementById(tipo);
    let option = document.createElement('option');
    
    // Eliminar opciones existentes antes de agregar las nuevas
    element.innerHTML = '';
    
    filas.forEach(fila => {
        option = document.createElement('option');
        option.value = fila.id_site;
        option.textContent = fila.country_site + ':' + fila.state_province_site + ':' +fila.city_town_site;
        element.appendChild(option);
    })
    
    if (site != null) element.value = site;
    
  }

function cerrarModal(){
    // Ventana modal
    var modal = document.getElementById("ventanaModal");
    modal.style.display = "none"
}

function mostrarBorrarSampling(id){
    // Ventana modal
    document.getElementById("comprobarBorrar").style.display = "block";
    $("#idBorrar").val(id)
    $("#formBorrarSampling").attr('action' , 'javascript:borrar();');
}

function borrar(){
    var id = document.getElementById("idBorrar").value
    deleteSampling(id)
}