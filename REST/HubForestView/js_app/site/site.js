
async function getListSites() {

    return peticionBackGeneral('', 'site', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaSite(response['resource']) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
        
}


async function getListByParamSites(country_site, state_province_site, city_town_site, geographical_direction1, 
    coordinate1_value_site, geographical_direction2, coordinate2_value_site, owner_site, 
    slope_form_site, slope_gradient_site, orientation_site) {
    const site = {
        country_site: country_site, 
        state_province_site: state_province_site,
        city_town_site: city_town_site,
        geographical_direction1: geographical_direction1,      
        coordinate1_value_site: coordinate1_value_site,
        geographical_direction2: geographical_direction2,      
        coordinate2_value_site: coordinate2_value_site,
        owner_site: owner_site, 
        slope_form_site: slope_form_site,
        slope_gradient_site: slope_gradient_site,
        orientation_site: orientation_site
    };
    return peticionBackGeneral('', 'site', 'SEARCH_BY', site)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaSite(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListByParamSites_search(country_site, state_province_site, city_town_site, geographical_direction1, 
    coordinate1_value_site, geographical_direction2, coordinate2_value_site, owner_site, 
    slope_form_site, slope_gradient_site, orientation_site) {
    const site = {
        country_site: country_site, 
        state_province_site: state_province_site,
        city_town_site: city_town_site,
        geographical_direction1: geographical_direction1,      
        coordinate1_value_site: coordinate1_value_site,
        geographical_direction2: geographical_direction2,      
        coordinate2_value_site: coordinate2_value_site,
        owner_site: owner_site, 
        slope_form_site: slope_form_site,
        slope_gradient_site: slope_gradient_site,
        orientation_site: orientation_site
    };
    return peticionBackGeneral('', 'site', 'SEARCH', site)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaSite(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function addSite(country_site, state_province_site, city_town_site, geographical_direction1, 
    coordinate1_value_site, geographical_direction2, coordinate2_value_site, owner_site, 
    slope_form_site, slope_gradient_site, orientation_site) {
    const site = {
        country_site: country_site, 
        state_province_site: state_province_site,
        city_town_site: city_town_site,
        geographical_direction1: geographical_direction1,      
        coordinate1_value_site: coordinate1_value_site,
        geographical_direction2: geographical_direction2,      
        coordinate2_value_site: coordinate2_value_site,
        owner_site: owner_site, 
        slope_form_site: slope_form_site,
        slope_gradient_site: slope_gradient_site,
        orientation_site: orientation_site
    };
    
    return peticionBackGeneral('', 'site', 'ADD', site)
        .then(response => {
            console.log(response)
            location.reload();
            response['resource']
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function editSite(id_site, country_site, state_province_site, city_town_site, geographical_direction1, 
    coordinate1_value_site, geographical_direction2, coordinate2_value_site, owner_site, 
    slope_form_site, slope_gradient_site, orientation_site) {

    const site = {
        id_site: id_site,
        country_site: country_site, 
        state_province_site: state_province_site,
        city_town_site: city_town_site,
        geographical_direction1: geographical_direction1,      
        coordinate1_value_site: coordinate1_value_site,
        geographical_direction2: geographical_direction2,      
        coordinate2_value_site: coordinate2_value_site,
        owner_site: owner_site, 
        slope_form_site: slope_form_site,
        slope_gradient_site: slope_gradient_site,
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
        var atributosTabla = ["'" + fila.id_site + "'","'" + fila.country_site + "'","'" + fila.state_province_site + "'","'" + fila.city_town_site + "'","'" + fila.geographical_direction1 + 
            "'","'" + fila.coordinate1_value_site + "'","'" + fila.geographical_direction2 + "'","'" + fila.coordinate2_value_site + "'","'" + fila.owner_site + "'","'" + fila.slope_form_site +
            "'","'" + fila.slope_gradient_site + "'","'" + fila.orientation_site + "'"];       
       // var atributosTabla = ["'" + fila.id_site + "'","'" + fila.country_site + "'", "'" + fila.state_province_site + "'", "'" + fila.geographical_direction1 + "'", "'" + fila.city_town_site + "'", "'" + fila.coordinate1_value_site + "'","'" + fila.orientation_site + "'"];
        
        var botonEdit='<button class="btn btn-info editar" id="editarSite" onclick="mostrarModal('+tipo+','+atributosTabla+')">Editar</button>'

        filasTabla += '<tr> <td>' + fila.id_site + 
                '</td> <td>' + fila.country_site + 
                '</td> <td>' + fila.state_province_site + 
                '</td> <td>' + fila.city_town_site +
                '</td> <td>' + fila.geographical_direction1  + 
                '</td> <td>' + fila.coordinate1_value_site + 
                '</td> <td>' + fila.geographical_direction2  + 
                '</td> <td>' + fila.coordinate2_value_site + 
                '</td> <td>' + fila.owner_site + 
                '</td> <td>' + fila.slope_form_site +
                '</td> <td>' + fila.slope_gradient_site + 
                '</td> <td>' + fila.orientation_site +
                '</td> <td class="text-center">' + botonEdit +
                '</td> <td class="text-center"><button class="btn btn-danger eliminar" id="borrarSite" onclick="mostrarBorrar('+fila.id_site+')">Eliminar</button>'
                
                '</td>  </tr>';
    });
    comprobarAdmin()
    $("#datosSites").append(filasTabla);
    cerrarModal()
    setLang();
}

function comprobarAdmin(){
    recuperarYComprobarUsuarioLogeadoIsAdmin().then(resultado => {
        if (!resultado) {
            var elements = document.getElementsByClassName('eliminar');
                for (var e of elements) {
                    e.style.display ='none';
                }
            elements = document.getElementsByClassName('editar');
                for (var e of elements) {
                    e.style.display ='none';
                }
            elements = document.getElementsByClassName('añadirSite');
                for (var e of elements) {
                    e.style.display ='none';
                }
           
        } else {
            var elements = document.getElementsByClassName('eliminar');
                for (var e of elements) {
                    e.style.display ='block';
                }
            elements = document.getElementsByClassName('editar');
                for (var e of elements) {
                    e.style.display ='block';
                }
            elements = document.getElementsByClassName('añadirSite');
                for (var e of elements) {
                    e.style.display ='block';
                }
        }
    });
  }


function getAtributos(tipo){
    var id_site = document.getElementById("id_site").value
    var country_site = document.getElementById("country_site").value
    var state_province_site = document.getElementById("state_province_site").value
    var city_town_site = document.getElementById("city_town_site").value
    var geographical_direction1 = document.getElementById("geographical_direction1").value
    var coordinate1_value_site = document.getElementById("coordinate1_value_site").value
    var geographical_direction2 = document.getElementById("geographical_direction2").value
    var coordinate2_value_site = document.getElementById("coordinate2_value_site").value
    var owner_site = document.getElementById("owner_site").value
    var slope_form_site = document.getElementById("slope_form_site").value
    var slope_gradient_site = document.getElementById("slope_gradient_site").value
    var orientation_site = document.getElementById("orientation_site").value
     switch(tipo){
        case "Editar":
            editSite(id_site, country_site, state_province_site, city_town_site, geographical_direction1, coordinate1_value_site, geographical_direction2, coordinate2_value_site, owner_site, slope_form_site, slope_gradient_site, orientation_site)
            break;
        case "Añadir":
            addSite(country_site, state_province_site, city_town_site, geographical_direction1, coordinate1_value_site, geographical_direction2, coordinate2_value_site, owner_site, slope_form_site, slope_gradient_site, orientation_site)
            break;
        case "Buscar":
            getListByParamSites_search(country_site, state_province_site, city_town_site, geographical_direction1, coordinate1_value_site, geographical_direction2, coordinate2_value_site, owner_site, slope_form_site, slope_gradient_site, orientation_site)
            break;
     }
}

function mostrarModal(tipo, id_site=null, country_site=null, state_province_site=null, city_town_site=null, 
            geographical_direction1=null, coordinate1_value_site=null, geographical_direction2=null, coordinate2_value_site=null, 
            owner_site=null, slope_form_site=null, slope_gradient_site=null, orientation_site=null){
    // Ventana modal
    document.getElementById("ventanaModal").style.display = "block";
    document.getElementById("Titulo").innerHTML = '<h2 class="'+tipo+'">'+tipo+'</h2>';
    document.getElementById("aceptar").classList.add(tipo);
    
    if(tipo.includes("editar")){
        $("#formSite").attr('action' , 'javascript:getAtributos("Editar");');

        $("#id_site").val(id_site);
        $("#country_site").val(country_site);
        $("#state_province_site").val(state_province_site);
        $("#city_town_site").val(city_town_site);
        $("#geographical_direction1").val(geographical_direction1);
        $("#coordinate1_value_site").val(coordinate1_value_site);
        $("#geographical_direction2").val(geographical_direction2);
        $("#coordinate2_value_site").val(coordinate2_value_site);
        $("#owner_site").val(owner_site);
        $("#slope_form_site").val(slope_form_site);
        $("#slope_gradient_site").val(slope_gradient_site);
        $("#orientation_site").val(orientation_site);
    }
    else{
        if(tipo.includes("buscar")){
            document.getElementById("country_site").required = false;
            document.getElementById("state_province_site").required = false;
            document.getElementById("city_town_site").required = false;
            document.getElementById("geographical_direction1").required = false;
            document.getElementById("coordinate1_value_site").required = false;
            document.getElementById("geographical_direction2").required = false;
            document.getElementById("coordinate2_value_site").required = false;
            document.getElementById("owner_site").required = false;
            document.getElementById("slope_form_site").required = false;
            document.getElementById("slope_gradient_site").required = false;
            document.getElementById("orientation_site").required = false;

            $("#formSite").attr('action' , 'javascript:getAtributos("Buscar");');
        }
        else{
            document.getElementById("country_site").required = true;
            document.getElementById("state_province_site").required = true;
            document.getElementById("city_town_site").required = true;
            document.getElementById("geographical_direction1").required = true;
            document.getElementById("coordinate1_value_site").required = true;
            document.getElementById("geographical_direction2").required = true;
            document.getElementById("coordinate2_value_site").required = true;
            document.getElementById("owner_site").required = true;
            document.getElementById("slope_form_site").required = true;
            document.getElementById("slope_gradient_site").required = true;
            document.getElementById("orientation_site").required = true;
            
            $("#formSite").attr('action' , 'javascript:getAtributos("Añadir");');
        }

        $("#id_site").val('');
        $("#country_site").val('');
        $("#state_province_site").val('');
        $("#city_town_site").val('');
        $("#geographical_direction1").val('');
        $("#coordinate1_value_site").val('');
        $("#geographical_direction2").val('');
        $("#coordinate2_value_site").val('');
        $("#owner_site").val('');
        $("#slope_form_site").val('');
        $("#slope_gradient_site").val('');
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