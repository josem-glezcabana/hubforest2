async function getListReplicas() {

    return peticionBackGeneral('', 'replica', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaReplica(response['resource']) : console.log(response))
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });       
  }
  //id_project, id_ecosystem, id_site, id_sampling
  async function getListByParamReplica(id_replica, id_project, id_ecosystem, id_site, id_sampling) {
    const replica = {
        id_replica: id_replica,
        id_project: id_project,
        id_ecosystem: id_ecosystem,
        id_site: id_site,
        id_sampling: id_sampling
        
    };
    return peticionBackGeneral('', 'replica', 'SEARCH_BY', replica)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaReplica(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
  }
  
  async function getListByParamReplica_search(id_replica, id_project, id_ecosystem, id_site, id_sampling) {
    const replica = {
        id_replica: id_replica,
        id_project: id_project,
        id_ecosystem: id_ecosystem,
        id_site: id_site,
        id_sampling: id_sampling

      
    };
    return peticionBackGeneral('', 'replica', 'SEARCH', replica)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaReplica(response['resource']) : console.log(response))
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
  }
  
  async function addReplica(id_replica, id_project, id_ecosystem, id_site, id_sampling) {
    const replica = {
        id_replica: id_replica,
        id_project: id_project,
        id_ecosystem: id_ecosystem,
        id_site: id_site,
        id_sampling: id_sampling
      
    };
  
    return peticionBackGeneral('', 'replica', 'ADD', replica)
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
  }
  
  async function editReplica(id_replica, id_project, id_ecosystem, id_site, id_sampling) {
    const replica = {
        id_replica: id_replica,
        id_project: id_project,
        id_ecosystem: id_ecosystem,
        id_site: id_site,
        id_sampling: id_sampling
     
      
    };
  
    return peticionBackGeneral('', 'replica', 'EDIT', replica)
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
  }
  
  async function deleteReplica(id_replica) {
    return peticionBackGeneral('', 'replica', 'DELETE', {'id_replica': id_replica})
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

  async function getListSites(site) {
    return peticionBackGeneral('', 'site', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectSites("id_site", response['resource'], site) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
  }

  async function getListSamplings(sampling) {
    return peticionBackGeneral('', 'sampling', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectSamplings("id_sampling", response['resource'], sampling) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
  }
  
  function construyeTablaReplica(filas) {
    console.log(filas)
    let filasTabla = '';
    let tipo = "'editarR'";
    let element = document.getElementById("datosReplicas");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    
    $("#datosReplicas").html("");
    filas.forEach(fila => {
        
        let atributosTabla = ["'" + fila.id_replica + "'", "'" + fila.id_project.id_project + "'","'" + fila.id_ecosystem.id_ecosystem + "'","'" + fila.id_site + "'","'" + fila.id_sampling + "'"];
        let botonEdit='<button class="BotonEditar btn btn-info " id="editarReplica" onclick="mostrarModal('+tipo+','+atributosTabla+')">Editar</button>'
  
        filasTabla += '<tr> <td>' + fila.id_replica + 
            '</td> <td>' + fila.id_project.name_project +  
            '</td> <td>' + fila.id_ecosystem.name_ecosystem +  
            '</td> <td>' + fila.id_site + 
            '</td> <td>' + fila.id_sampling + 
            '</td> <td class="text-center">' + botonEdit +
            '</td> <td class="text-center"><button class="BotonEliminar btn btn-danger" id="borrarReplica" onclick="mostrarBorrar(\''+fila.id_replica+'\')">Eliminar</button>'
                
            '</td>  </tr>';

            
    });
    
    comprobarAdmin();

    $("#datosReplicas").append(filasTabla);
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
            elements = document.getElementsByClassName('añadirReplicas');
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
            elements = document.getElementsByClassName('añadirReplicas');
                for (var e of elements) {
                    e.style.display ='block';
                }
        }
    });
  }
  
  function getAtributos(tipo){
    var id_replica = document.getElementById("id_replica").value;
    var id_project = document.getElementById("id_project").value;
    var id_ecosystem = document.getElementById("id_ecosystem").value;
    var id_site = document.getElementById("id_site").value;
    var id_sampling = document.getElementById("id_sampling").value;
 

     switch(tipo){
        case "Editar":
            editReplica(id_replica, id_project, id_ecosystem, id_site, id_sampling)
            break;
        case "Añadir":
            addReplica(id_replica, id_project, id_ecosystem, id_site, id_sampling)
            break;
        case "Buscar":
           
            getListByParamReplica_search(id_replica, id_project, id_ecosystem, id_site, id_sampling)
            break;
     }
  }
  
  function mostrarModal(tipo, id_replica=null, id_project=null, id_ecosystem=null, id_site=null, id_sampling=null){
    // Ventana modal
    document.getElementById("ventanaModal").style.display = "block";
    document.getElementById("Titulo").innerHTML = '<h2 class="'+tipo+'">'+tipo+'</h2>';
    document.getElementById("aceptar").classList.add(tipo);
  
  
    getListEcosystems(id_ecosystem)
    getListProyectos(id_project)
    getListSites(id_site)
    getListSamplings(id_sampling)
  
    if(tipo.includes("Editar")){
        $("#formReplica").attr('action' , 'javascript:getAtributos("Editar");');
        
        $("#id_replica").val(id_replica);
        $("#idReplica").hide();
        $("#id_project").val(id_project);
        $("#id_ecosystem").val(id_ecosystem);
        $("#id_site").val(id_site);
        $("#id_sampling").val(id_sampling);
       
    }
    else{
        $("#idReplica").show();
        if(tipo.includes("Buscar")){
           
            document.getElementById("id_replica").required = false;
            document.getElementById("id_project").required = false;
            document.getElementById("id_ecosystem").required = false;
            document.getElementById("id_site").required = false;
            document.getElementById("id_sampling").required = false;
           

            $("#formReplica").attr('action' , 'javascript:getAtributos("Buscar");');
        }
        else{
            document.getElementById("id_replica").required = true;
            document.getElementById("id_project").required = true;
            document.getElementById("id_ecosystem").required = true;
            document.getElementById("id_site").required = true;
            document.getElementById("id_sampling").required = true;
  
            $("#formReplica").attr('action' , 'javascript:getAtributos("Añadir");');
        }
        

        $("#id_replica").val('');
        $("#id_project").val('');
        $("#id_ecosystem").val('');
        $("#id_site").val('');
        $("#id_sampling").val('');
        $("#date_sampling").val('');
    }
    setLang();
    document.getElementById("aceptar").classList.remove(tipo);
  }
  
  function rellenarSelectEcosystems(tipo, filas, ecosystem) {
    let element = document.getElementById(tipo);
    let option = document.createElement('option');
    
    // Eliminar opciones existentes antes de agregar las nuevas
    element.innerHTML = '';
    
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
    
    filas.forEach(fila => {
        option = document.createElement('option');
        option.value = fila.id_project.id_project;
        option.textContent = fila.id_project.name_project;
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
        option.textContent = fila.id_site;
        element.appendChild(option);
    })
    
    if (site != null) element.value = site;
    
  }

  function rellenarSelectSamplings(tipo, filas, sampling) {
    let element = document.getElementById(tipo);
    let option = document.createElement('option');
    
    // Eliminar opciones existentes antes de agregar las nuevas
    element.innerHTML = '';
    
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
  
  function mostrarBorrar(replica){
    // Ventana modal
    document.getElementById("comprobarBorrar").style.display = "block";
    
    $("#idBorrar").val(replica)
    $("#formBorrarReplica").attr('action' , 'javascript:borrar();');
  }
  
  function borrar(){
    var id_replica = document.getElementById("idBorrar").value

   
    deleteReplica(id_replica)
  }