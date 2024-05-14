
async function getListSites() {

    return peticionBackGeneral('', 'site', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaSite(response['resource']) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
        
}


async function getListByParamSites(id_project, id_ecosystem, coorN_site, coorW_site, slope_site, orientation_site) {
    const site = {
        id_project: id_project, 
        id_ecosystem: id_ecosystem,
        coorN_site: coorN_site,
        coorW_site: coorW_site,
        slope_site: slope_site,
        orientation_site: orientation_site
    };
    return peticionBackGeneral('', 'site', 'SEARCH_BY', site)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaSite(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListByParamSites_search(id_project, id_ecosystem, coorN_site, coorW_site, slope_site, orientation_site) {
    const site = {
        id_project: id_project, 
        id_ecosystem: id_ecosystem,
        coorN_site: coorN_site,
        coorW_site: coorW_site,
        slope_site: slope_site,
        orientation_site: orientation_site
    };
    return peticionBackGeneral('', 'site', 'SEARCH', site)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaSite(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function addSite(id_project, id_ecosystem, coorN_site, coorW_site, slope_site, orientation_site) {
    const site = {
        id_project: id_project, 
        id_ecosystem: id_ecosystem,
        coorN_site: coorN_site,
        coorW_site: coorW_site,
        slope_site: slope_site,
        orientation_site: orientation_site
    };

    return peticionBackGeneral('', 'site', 'ADD', site)
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

async function editSite(id_site, id_project, id_ecosystem, coorN_site, coorW_site, slope_site, orientation_site) {
    const site = {
        id_site: id_site,
        id_project: id_project, 
        id_ecosystem: id_ecosystem,
        coorN_site: coorN_site,
        coorW_site: coorW_site,
        slope_site: slope_site,
        orientation_site: orientation_site
    };

    return peticionBackGeneral('', 'site', 'EDIT', site)
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function deleteSite(id_site) {
    
    return peticionBackGeneral('', 'site', 'DELETE', {'id_site': id_site})
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}



function construyeTablaSite(filas) {

    var filasTabla = ''

    var tipo = "'editarS'"

    var element = document.getElementById("datosSites");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    
    $("#datosSites").html("");
    filas.forEach(fila => {
        var atributosTabla = ["'" + fila.id_site + "'","'" + fila.id_project + "'", "'" + fila.id_ecosystem + "'", "'" + fila.coorN_site + "'", "'" + fila.coorW_site + "'", "'" + fila.slope_site + "'","'" + fila.orientation_site + "'"];
        
        var botonEdit='<button class="btn btn-info editar" id="editarSite" onclick="mostrarModal('+tipo+','+atributosTabla+')">Editar</button>'

        filasTabla += '<tr> <td>' + fila.id_site + 
                '</td> <td>' + fila.id_project + 
                '</td> <td>' + fila.id_ecosystem + 
                '</td> <td>' + fila.coorN_site + 
                '</td> <td>' + fila.coorW_site + 
                '</td> <td>' + fila.slope_site + 
                '</td> <td>' + fila.orientation_site +
                '</td> <td class="text-center">' + botonEdit +
                '</td> <td class="text-center"><button class="btn btn-danger eliminar" id="borrarSite" onclick="mostrarBorrar('+fila.id_site+')">Eliminar</button>'
                
                '</td>  </tr>';
    });
    
    $("#datosSites").append(filasTabla);
    cerrarModal()
    setLang();
}

function getAtributos(tipo){
    var id_site = document.getElementById("id_site").value
    var id_project = document.getElementById("id_project").value
    var id_ecosystem = document.getElementById("id_ecosystem").value
    var coorW_site = document.getElementById("coorW_site").value
    var coorN_site = document.getElementById("coorN_site").value
    var slope_site = document.getElementById("slope_site").value
    var orientation_site = document.getElementById("orientation_site").value
     switch(tipo){
        case "Editar":
            editSite(id_site, id_project, id_ecosystem, coorN_site, coorW_site, slope_site, orientation_site)
            break;
        case "Añadir":
            addSite(id_project, id_ecosystem, coorN_site, coorW_site, slope_site, orientation_site)
            break;
        case "Buscar":
            getListByParamSites_search(id_project, id_ecosystem, coorW_site, coorN_site, slope_site, orientation_site)
            break;
     }
}

function mostrarModal(tipo, id_site=null, id_project=null, id_ecosystem=null, coorN_site=null, 
                        coorW_site=null, slope_site=null, orientation_site=null){
    // Ventana modal
    document.getElementById("ventanaModal").style.display = "block";
    document.getElementById("Titulo").innerHTML = '<h2>'+tipo+'</h2>';
    document.getElementById("aceptar").classList.add(tipo);
    
    if(tipo.includes("editar")){
        $("#formSite").attr('action' , 'javascript:getAtributos("Editar");');

        $("#id_site").val(id_site);
        $("#id_project").val(id_project);
        $("#id_ecosystem").val(id_ecosystem);
        $("#coorN_site").val(coorN_site);
        $("#coorW_site").val(coorW_site);
        $("#slope_site").val(slope_site);
        $("#orientation_site").val(orientation_site);
    }
    else{
        if(tipo.includes("Buscar")){
            document.getElementById("id_project").required = false;
            document.getElementById("id_ecosystem").required = false;
            document.getElementById("coorN_site").required = false;
            document.getElementById("coorW_site").required = false;
            document.getElementById("slope_site").required = false;
            document.getElementById("orientation_site").required = false;

            $("#formSite").attr('action' , 'javascript:getAtributos("Buscar");');
        }
        else{
            document.getElementById("id_project").required = true;
            document.getElementById("id_ecosystem").required = true;
            document.getElementById("coorN_site").required = true;
            document.getElementById("coorW_site").required = true;
            document.getElementById("slope_site").required = true;
            document.getElementById("orientation_site").required = true;

            $("#formSite").attr('action' , 'javascript:getAtributos("Añadir");');
        }

        $("#id_site").val('');
        $("#id_project").val('');
        $("#passwd").val('');
        $("#id_ecosystem").val('');
        $("#coorN_site").val('');
        $("#coorW_site").val('');
        $("#slope_site").val('');
        $("#orientation_site").val('');
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
    $("#formBorrarSite").attr('action' , 'javascript:borrar();');
}

function borrar(){
    var id = document.getElementById("idBorrar").value
    deleteSite(id)
}