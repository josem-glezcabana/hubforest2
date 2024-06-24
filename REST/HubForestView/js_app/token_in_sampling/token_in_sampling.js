async function getListTokenInSampling() {

    return peticionBackGeneral('', 'token_in_sampling', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaTokenInSampling(response['resource']) : console.log(response))
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });       
  }
  //id_project, id_ecosystem, id_storage_method, id_technique_sample
  async function getListByParamTokenInSampling(id_token_in_sampling, id_project, id_ecosystem, id_storage_method, id_technique_sample) {
    const token_in_sampling = {
        id_token_in_sampling: id_token_in_sampling,
        id_project: id_project,
        id_ecosystem: id_ecosystem,
        id_storage_method: id_storage_method,
        id_technique_sample: id_technique_sample
        
    };
    return peticionBackGeneral('', 'token_in_sampling', 'SEARCH_BY', token_in_sampling)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaTokenInSampling(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
  }
  
  async function getListByParamTokenInSampling_search(id_token_in_sampling, id_project, id_ecosystem, id_storage_method, id_technique_sample) {
    const token_in_sampling = {
        id_token_in_sampling: id_token_in_sampling,
        id_project: id_project,
        id_ecosystem: id_ecosystem,
        id_storage_method: id_storage_method,
        id_technique_sample: id_technique_sample

      
    };
    return peticionBackGeneral('', 'token_in_sampling', 'SEARCH', token_in_sampling)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaTokenInSampling(response['resource']) : mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
  }
  
  async function addTokenInSampling(id_token_in_sampling, id_project, id_ecosystem, id_storage_method, id_technique_sample) {
    const token_in_sampling = {
        id_token_in_sampling: id_token_in_sampling,
        id_project: id_project,
        id_ecosystem: id_ecosystem,
        id_storage_method: id_storage_method,
        id_technique_sample: id_technique_sample
      
    };
  
    return peticionBackGeneral('', 'token_in_sampling', 'ADD', token_in_sampling)
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
  }
  
  async function editTokenInSampling(id_token_in_sampling, id_project, id_ecosystem, id_storage_method, id_technique_sample) {
    const token_in_sampling = {
        id_token_in_sampling: id_token_in_sampling,
        id_project: id_project,
        id_ecosystem: id_ecosystem,
        id_storage_method: id_storage_method,
        id_technique_sample: id_technique_sample
        
      
    };
  
    return peticionBackGeneral('', 'token_in_sampling', 'EDIT', token_in_sampling)
        .then(response => {
            location.reload();
            
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
  }
  
  async function deleteTokenInSampling(id_token_in_sampling) {
    return peticionBackGeneral('', 'token_in_sampling', 'DELETE', {'id_token_in_sampling': id_token_in_sampling})
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
    return peticionBackGeneral('', 'project_ecosystem', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectEcosystems("id_ecosystem", response['resource'], ecosystem) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
  }
  
  async function getListProyectos(proyecto) {
    return peticionBackGeneral('', 'project_ecosystem', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectProyectos("id_project", response['resource'], proyecto) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
  }

  async function getListStorageMethod(storage_method) {
    return peticionBackGeneral('', 'storage_method', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectStorageMethod("id_storage_method", response['resource'], storage_method) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
  }

  async function getListTechnSample(technique_sample) {
    return peticionBackGeneral('', 'technique_sample', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectTechnSample("id_technique_sample", response['resource'], technique_sample) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
  }
  
  function construyeTablaTokenInSampling(filas) {
    let filasTabla = '';
    let tipo = "'editarTokenInSampling'";
    let element = document.getElementById("datosTokenInSampling");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    
    $("#datosTokenInSampling").html("");
    filas.forEach(fila => {
        
        let atributosTabla = ["'" + fila.id_token_in_sampling + "'", "'" + fila.id_project.id_project + "'","'" + fila.id_ecosystem.id_ecosystem + "'","'" + fila.id_storage_method.id_storage_method + "'","'" + fila.id_technique_sample.id_technique_sample + "'"];
        let botonEdit='<button class="BotonEditar btn btn-info " id="editarTokenInSampling" onclick="mostrarModal('+tipo+','+atributosTabla+')">Editar</button>'
  
        filasTabla += '<tr> <td>' + fila.id_token_in_sampling + 
            '</td> <td>' + fila.id_project.name_project +  
            '</td> <td>' + fila.id_ecosystem.name_ecosystem +  
            '</td> <td>' + fila.id_storage_method.name_storage_method + 
            '</td> <td>' + fila.id_technique_sample.name_technique_sample + 
            '</td> <td class="text-center">' + botonEdit +
            '</td> <td class="text-center"><button class="BotonEliminar btn btn-danger" id="borrarTokenInSampling" onclick="mostrarBorrar(\''+fila.id_token_in_sampling+'\')">Eliminar</button>'
                
            '</td>  </tr>';

            
    });
    
    comprobarAdmin();

    $("#datosTokenInSampling").append(filasTabla);
    cerrarModal()
    setLang();
  }

  function comprobarAdmin(){
    recuperarYComprobarUsuarioLogeadoIsAdmin().then(resultado => {
        if (!resultado) {
            var elements = document.getElementsByClassName('BotonEliminar');
                for (var e of elements) {
                    e.style.display ='none';
                }
            elements = document.getElementsByClassName('BotonEditar');
                for (var e of elements) {
                    e.style.display ='none';
                }
            elements = document.getElementsByClassName('añadirTokenInSampling');
                for (var e of elements) {
                    e.style.display ='none';
                }
           
        } else {
            var elements = document.getElementsByClassName('BotonEliminar');
                for (var e of elements) {
                    e.style.display ='block';
                }
            elements = document.getElementsByClassName('BotonEditar');
                for (var e of elements) {
                    e.style.display ='block';
                }
            elements = document.getElementsByClassName('añadirTokenInSampling');
                for (var e of elements) {
                    e.style.display ='block';
                }
        }
    });
  }
  
  function getAtributos(tipo){
    var id_token_in_sampling = document.getElementById("id_token_in_sampling").value;
    var id_project = document.getElementById("id_project").value;
    var id_ecosystem = document.getElementById("id_ecosystem").value;
    var id_storage_method = document.getElementById("id_storage_method").value;
    var id_technique_sample = document.getElementById("id_technique_sample").value;
 

     switch(tipo){
        case "Editar":
            
            editTokenInSampling(id_token_in_sampling, id_project, id_ecosystem, id_storage_method, id_technique_sample)
            break;
        case "Añadir":
            addTokenInSampling(id_token_in_sampling, id_project, id_ecosystem, id_storage_method, id_technique_sample)
            break;
        case "Buscar":
           
            getListByParamTokenInSampling_search(id_token_in_sampling, id_project, id_ecosystem, id_storage_method, id_technique_sample)
            break;
     }
  }
  
  function mostrarModal(tipo, id_token_in_sampling=null, id_project=null, id_ecosystem=null, id_storage_method=null, id_technique_sample=null){
    // Ventana modal
    document.getElementById("ventanaModal").style.display = "block";
    document.getElementById("Titulo").innerHTML = '<h2 class="'+tipo+'">'+tipo+'</h2>';
    document.getElementById("aceptar").classList.add(tipo);
  
    
    getListEcosystems(id_ecosystem)
    getListProyectos(id_project)
    getListStorageMethod(id_storage_method)
    getListTechnSample(id_technique_sample)
  
    if(tipo.includes("editar")){
        $("#formTokenInSampling").attr('action' , 'javascript:getAtributos("Editar");');
        
        $("#id_token_in_sampling").val(id_token_in_sampling);
        $("#id_project").val(id_project);
        $("#id_ecosystem").val(id_ecosystem);
        $("#id_storage_method").val(id_storage_method);
        $("#id_technique_sample").val(id_technique_sample);
       
    }
    else{
        if(tipo.includes("Buscar")){
           

            document.getElementById("id_project").required = false;
            document.getElementById("id_ecosystem").required = false;
            document.getElementById("id_storage_method").required = false;
            document.getElementById("id_technique_sample").required = false;
           

            $("#formTokenInSampling").attr('action' , 'javascript:getAtributos("Buscar");');
        }
        else{

            document.getElementById("id_project").required = true;
            document.getElementById("id_ecosystem").required = true;
            document.getElementById("id_storage_method").required = true;
            document.getElementById("id_technique_sample").required = true;
  
            $("#formTokenInSampling").attr('action' , 'javascript:getAtributos("Añadir");');
        }
        

        $("#id_token_in_sampling").val('');
        $("#id_project").val('');
        $("#id_ecosystem").val('');
        $("#id_storage_method").val('');
        $("#id_technique_sample").val('');
        $("#date_technique_sample").val('');
    }
    setLang();
    document.getElementById("aceptar").classList.remove(tipo);
    
  }
  
  function rellenarSelectEcosystems(tipo, filas, ecosystem) {
    let element = document.getElementById(tipo);
    let option = document.createElement('option');
    
    // Eliminar opciones existentes antes de agregar las nuevas
    element.innerHTML = '';
    option.value = "";
    option.textContent = "-- Selecciona ecosistema --";
    element.appendChild(option);
    
    filas.forEach(fila => {
        option = document.createElement('option');
        option.value = fila.id_ecosystem.id_ecosystem;
        option.textContent = fila.id_ecosystem.name_ecosystem;
        element.appendChild(option);
    })
    
    if (ecosystem != null) element.value = ecosystem;
    
  }
  
  function rellenarSelectProyectos(tipo, filas, proyecto) {
    let element = document.getElementById(tipo);
    let option = document.createElement('option');
    
    // Eliminar opciones existentes antes de agregar las nuevas
    element.innerHTML = '';
    option.value = "";
    option.textContent = "-- Selecciona proyecto --";
    element.appendChild(option);
    
    filas.forEach(fila => {
    
        option = document.createElement('option');
        option.value = fila.id_project.id_project;
        option.textContent = fila.id_project.name_project;
        element.appendChild(option);
    })
    
    if (proyecto != null) element.value = proyecto;
    
  }

  function rellenarSelectStorageMethod(tipo, filas, storage_method) {
    let element = document.getElementById(tipo);
    let option = document.createElement('option');
    
    // Eliminar opciones existentes antes de agregar las nuevas
    element.innerHTML = '';
    option.value = "";
    option.textContent = "-- Selecciona método --";
    element.appendChild(option);
    
    filas.forEach(fila => {
        option = document.createElement('option');
        option.value = fila.id_storage_method;
        option.textContent = fila.name_storage_method;
        element.appendChild(option);
    })
    
    if (storage_method != null) element.value = storage_method;
    
  }

  function rellenarSelectTechnSample(tipo, filas, technique_sample) {
    let element = document.getElementById(tipo);
    let option = document.createElement('option');
    
    // Eliminar opciones existentes antes de agregar las nuevas
    element.innerHTML = '';
    option.value = "";
    option.textContent = "-- Selecciona técnica --";
    element.appendChild(option);
    
    filas.forEach(fila => {
        option = document.createElement('option');
        option.value = fila.id_technique_sample;
        option.textContent = fila.name_technique_sample;
        element.appendChild(option);
    })
    
    if (technique_sample != null) element.value = technique_sample;
    
  }
  
  function cerrarModal(){
    // Ventana modal
    var modal = document.getElementById("ventanaModal");
    modal.style.display = "none"
  }
  
  function mostrarBorrar(token_in_sampling){
    // Ventana modal
    document.getElementById("comprobarBorrar").style.display = "block";
    
    $("#idBorrar").val(token_in_sampling)
    $("#formBorrarTokenInSampling").attr('action' , 'javascript:borrar();');
  }
  
  function borrar(){
    var id_token_in_sampling = document.getElementById("idBorrar").value

   
    deleteTokenInSampling(id_token_in_sampling)
  }