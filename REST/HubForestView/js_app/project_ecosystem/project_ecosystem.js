async function getListProjectEcosystem() {

    return peticionBackGeneral('', 'project_ecosystem', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaProjectEcosystem(response['resource']) : console.log(response))
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });       
  }
  
  async function getListByParamProjectEcosystem(id_project, id_ecosystem, number_replicas_by_sampling, number_samplings) {
    const project_ecosystem = {
        id_project: id_project,
        id_ecosystem: id_ecosystem,
        number_replicas_by_sampling: number_replicas_by_sampling,
        number_samplings: number_samplings
        
    };
    return peticionBackGeneral('', 'project_ecosystem', 'SEARCH_BY', project_ecosystem)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaProjectEcosystem(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
  }
  
  async function getListByParamProjectEcosystem_search(id_project, id_ecosystem, number_replicas_by_sampling, number_samplings) {
    const project_ecosystem = {
        id_project: id_project,
        id_ecosystem: id_ecosystem,
        number_replicas_by_sampling: number_replicas_by_sampling,
        number_samplings: number_samplings
      
    };
    return peticionBackGeneral('', 'project_ecosystem', 'SEARCH', project_ecosystem)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaProjectEcosystem(response['resource']) : mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
  }
  
  async function addProjectEcosystem(id_project, id_ecosystem, number_replicas_by_sampling, number_samplings) {
    const project_ecosystem = {
        id_project: id_project,
        id_ecosystem: id_ecosystem,
        number_replicas_by_sampling: number_replicas_by_sampling,
        number_samplings: number_samplings
      
    };
  
    return peticionBackGeneral('', 'project_ecosystem', 'ADD', project_ecosystem)
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
  }
  
  async function editProjectEcosystem(id_project, id_ecosystem, number_replicas_by_sampling, number_samplings) {
    const project_ecosystem = {
        id_project: id_project,
        id_ecosystem: id_ecosystem,
        number_replicas_by_sampling: number_replicas_by_sampling,
        number_samplings: number_samplings
      
    };
  
    return peticionBackGeneral('', 'project_ecosystem', 'EDIT', project_ecosystem)
        .then(response => {
            
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
  }
  
  async function deleteProjectEcosystem(id_project,id_ecosystem) {
    return peticionBackGeneral('', 'project_ecosystem', 'DELETE', {'id_project': id_project, 'id_ecosystem': id_ecosystem})
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
  
  function construyeTablaProjectEcosystem(filas) {
  
    let filasTabla = '';
    let tipo = "'EditarProjectEcosystems'";
    let element = document.getElementById("datosProjectEcosystems");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    
    $("#datosProjectEcosystems").html("");
    filas.forEach(fila => {
        
        let atributosTabla = ["'" + fila.id_project.id_project + "'","'" + fila.id_ecosystem.id_ecosystem + "'","'" + fila.number_replicas_by_sampling + "'","'" + fila.number_samplings + "'"];
        let botonEdit='<button class="BotonEditar btn btn-info " id="editarProjectEcosystem" onclick="mostrarModal('+tipo+','+atributosTabla+')">Editar</button>'
  
        filasTabla += '<tr> <td>' + fila.id_ecosystem.name_ecosystem + 
            '</td> <td>' + fila.id_project.name_project +  
            '</td> <td>' + fila.number_replicas_by_sampling + 
            '</td> <td>' + fila.number_samplings + 
            '</td> <td class="text-center">' + botonEdit +
            '</td> <td class="text-center"><button class="BotonEliminar btn btn-danger" id="borrarProjectEcosystem" onclick="mostrarBorrar('+fila.id_project.id_project+','+fila.id_ecosystem.id_ecosystem+')">Eliminar</button>'
                
            '</td>  </tr>';

            
    });
    
    comprobarAdmin();

    $("#datosProjectEcosystems").append(filasTabla);
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
            elements = document.getElementsByClassName('añadirProjectEcosystems');
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
            elements = document.getElementsByClassName('añadirProjectEcosystems');
                for (var e of elements) {
                    e.style.display ='block';
                }
        }
    });
  }
  
  function getAtributos(tipo){
    var id_project = document.getElementById("id_project").value;
    var id_ecosystem = document.getElementById("id_ecosystem").value;
    var number_replicas_by_sampling = document.getElementById("number_replicas_by_sampling").value;
    var number_samplings = document.getElementById("number_samplings").value;
    

     switch(tipo){
        case "Editar":
            editProjectEcosystem(id_project, id_ecosystem, number_replicas_by_sampling, number_samplings)
            break;
        case "Añadir":
            addProjectEcosystem(id_project, id_ecosystem, number_replicas_by_sampling, number_samplings)
            break;
        case "Buscar":
            getListByParamProjectEcosystem_search(id_project, id_ecosystem, number_replicas_by_sampling, number_samplings)
            break;
     }
  }
  
  function mostrarModal(tipo, id_project=null, id_ecosystem=null, number_replicas_by_sampling=null, number_samplings=null){
    // Ventana modal
    document.getElementById("ventanaModal").style.display = "block";
    document.getElementById("Titulo").innerHTML = '<h2 class="'+tipo+'">'+tipo+'</h2>';
    document.getElementById("aceptar").classList.add(tipo);
  
  
    getListEcosystems(id_ecosystem)
    getListProyectos(id_project)
  
    if(tipo.includes("Editar")){
        $("#formProjectEcosystem").attr('action' , 'javascript:getAtributos("Editar");');
        
        $("#id_project").val(id_project);
        $("#id_ecosystem").val(id_ecosystem);
        $("#number_replicas_by_sampling").val(number_replicas_by_sampling);
        $("#number_samplings").val(number_samplings);
    }
    else{
        if(tipo.includes("Buscar")){
           

            document.getElementById("number_replicas_by_sampling").required = false;
            document.getElementById("number_samplings").required = false;
            $("#formProjectEcosystem").attr('action' , 'javascript:getAtributos("Buscar");');
        }
        else{
            document.getElementById("id_project").required = true;
            document.getElementById("id_ecosystem").required = true;
            document.getElementById("number_replicas_by_sampling").required = false;
            document.getElementById("number_samplings").required = false;
            $("#formProjectEcosystem").attr('action' , 'javascript:getAtributos("Añadir");');
        }
  
        $("#id_project").val('');
        $("#id_ecosystem").val('');
        $("#number_replicas_by_sampling").val('');
        $("#number_samplings").val('');
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
  
  function cerrarModal(){
    // Ventana modal
    var modal = document.getElementById("ventanaModal");
    modal.style.display = "none"
  }
  
  function mostrarBorrar(project, ecosystem){
    // Ventana modal
    document.getElementById("comprobarBorrar").style.display = "block";
    
    $("#idProject").val(project)
    $("#idEcosystem").val(ecosystem)
    $("#formBorrarProjectEcosystem").attr('action' , 'javascript:borrar();');
  }
  
  function borrar(){
    var id_project = document.getElementById("idProject").value
    var id_ecosystem = document.getElementById("idEcosystem").value 
   
    deleteProjectEcosystem(id_project, id_ecosystem)
  }