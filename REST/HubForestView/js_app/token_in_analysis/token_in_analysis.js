async function getListTokenAnalysis() {

    return peticionBackGeneral('', 'token_in_analysis', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaTokenAnalysis(response['resource']) : console.log(response))
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
        
}
//id_token_in_lab, id_analysis_technique, id_analysis_preparation
async function getListByParamTokenAnalysis(id_token_in_lab, id_analysis_technique, id_analysis_preparation) {
    const characteristic = {
        id_token_in_lab: id_token_in_lab, 
        id_analysis_technique: id_analysis_technique, 
        id_analysis_preparation: id_analysis_preparation
    };
    return peticionBackGeneral('', 'token_in_analysis', 'SEARCH_BY', characteristic)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaTokenAnalysis(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListByParamTokenAnalysis_search(id_token_in_lab, id_analysis_technique, id_analysis_preparation) {
    const characteristic = {
        id_token_in_lab: id_token_in_lab, 
        id_analysis_technique: id_analysis_technique, 
        id_analysis_preparation: id_analysis_preparation
    };
    return peticionBackGeneral('', 'token_in_analysis', 'SEARCH', characteristic)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaTokenAnalysis(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}


async function addTokenAnalysis(id_token_in_lab, id_analysis_technique, id_analysis_preparation) {
    const characteristic = {
        id_token_in_lab: id_token_in_lab, 
        id_analysis_technique: id_analysis_technique, 
        id_analysis_preparation: id_analysis_preparation
    };

    return peticionBackGeneral('', 'token_in_analysis', 'ADD', characteristic)
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

async function editTokenAnalysis(id_token_in_analysis, id_token_in_lab, id_analysis_technique, id_analysis_preparation) {
    const characteristic = {
        id_token_in_analysis: id_token_in_analysis,
        id_token_in_lab: id_token_in_lab, 
        id_analysis_technique: id_analysis_technique, 
        id_analysis_preparation: id_analysis_preparation
    };

    return peticionBackGeneral('', 'token_in_analysis', 'EDIT', characteristic)
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function deleteTokenAnalysis(id_token_in_analysis) {
    
    return peticionBackGeneral('', 'token_in_analysis', 'DELETE', {'id_token_in_analysis': id_token_in_analysis})
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

  //id_token_in_lab, id_analysis_technique, id_analysis_preparation
async function getListTokenLab(token_in_lab) {
    return peticionBackGeneral('', 'token_in_lab', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectTokenLab("id_token_in_lab", response['resource'], token_in_lab) : console.log())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}
  
async function getListAnalysisTech(analysis_technique) {
    return peticionBackGeneral('', 'analysis_technique', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectAnalysisTech("id_analysis_technique", response['resource'], analysis_technique) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListAnalysisPrep(analysis_preparation) {
    return peticionBackGeneral('', 'analysis_preparation', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectAnalysisPrep("id_analysis_preparation", response['resource'], analysis_preparation) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}


function construyeTablaTokenAnalysis(filas) {

    var filasTabla = ''
    var tipo = "'editarTokenAnalysis'"
    var element = document.getElementById("datosTokenAnalysis");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
  
    $("#datosTokenAnalysis").html("");
    filas.forEach(fila => {
        var atributosTabla = ["'" + fila.id_token_in_analysis + "'","'" + fila.id_token_in_lab.id_token_in_lab + "'", "'" + fila.id_analysis_technique.id_analysis_technique + "'", "'" + fila.id_analysis_preparation.id_analysis_preparation + "'"];
        var botonEdit='<button class="BotonEditar btn btn-info" id="editarTokenAnalysis" onclick="mostrarModal('+tipo+','+atributosTabla+')">Editar</button>'

        filasTabla += '<tr> <td>' + fila.id_token_in_analysis + 
                '</td> <td>' + fila.id_token_in_lab.id_token_in_lab + 
                '</td> <td>' + fila.id_analysis_technique.name_analysis_technique +
                '</td> <td>' + fila.id_analysis_preparation.name_analysis_preparation + 
                '</td> <td class="text-center">' + botonEdit +
                '</td> <td class="text-center"><button class="BotonEliminar btn btn-danger borrarTokenAnalysis" id="borrarTokenAnalysis" onclick="mostrarBorrar('+fila.id_token_in_analysis+')">Eliminar</button>'
                
                '</td>  </tr>';
    });

    recuperarYComprobarUsuarioLogeadoIsAdmin().then(resultado => {
        if (!resultado) {
            let editarTokenAnalysis = document.getElementsByClassName("BotonEditar");
            for (const fila of editarTokenAnalysis) {
                fila.style.display = 'none';
            }
            let borrarTokenAnalysis = document.getElementsByClassName("borrarTokenAnalysis");
            for (const fila of borrarTokenAnalysis) {
                fila.style.display = 'none';
            }
            $("#abrirModal").hide();
        } else {
            let editarTokenAnalysis = document.getElementsByClassName("BotonEditar");
            for (const fila of editarTokenAnalysis) {
                fila.style.display = 'block';
            }
            let borrarTokenAnalysis = document.getElementsByClassName("borrarTokenAnalysis");
            for (const fila of borrarTokenAnalysis) {
                fila.style.display = 'block';
            }
            $("#abrirModal").show();
        }
    });
    
    $("#datosTokenAnalysis").append(filasTabla);
    cerrarModal()
    setLang();
}
  //id_token_in_lab, id_analysis_technique, id_analysis_preparation
function getAtributos(tipo){
    var id_token_in_analysis = document.getElementById("id_token_in_analysis").value
    var id_token_in_lab = document.getElementById("id_token_in_lab").value
    var id_analysis_technique = document.getElementById("id_analysis_technique").value
    var id_analysis_preparation = document.getElementById("id_analysis_preparation").value
     switch(tipo){
        case "Editar":
            editTokenAnalysis(id_token_in_analysis, id_token_in_lab, id_analysis_technique, id_analysis_preparation)
            break;
        case "Añadir":
            addTokenAnalysis(id_token_in_lab, id_analysis_technique, id_analysis_preparation)
            break;
        case "Buscar":
            getListByParamTokenAnalysis_search(id_token_in_lab, id_analysis_technique, id_analysis_preparation)
            break;
     }
}

function mostrarModal(tipo, id_token_in_analysis=null, id_token_in_lab=null, id_analysis_technique=null, id_analysis_preparation=null){
    // Ventana modal
    document.getElementById("ventanaModal").style.display = "block";
    document.getElementById("Titulo").innerHTML = '<h2 class="'+tipo+'">'+tipo+'</h2>';
    document.getElementById("aceptar").classList.add(tipo);
    
    getListTokenLab(id_token_in_lab);
    getListAnalysisTech(id_analysis_technique);
    getListAnalysisPrep(id_analysis_preparation);

    if(tipo.includes("editar")){
        $("#formTokenAnalysis").attr('action' , 'javascript:getAtributos("Editar");');

        $("#id_token_in_analysis").val(id_token_in_analysis);
        $("#id_token_in_lab").val(id_token_in_lab);
        $("#id_analysis_technique").val(id_analysis_technique);
        $("#id_analysis_preparation").val(id_analysis_preparation);

    }
    else{
        if(tipo.includes("buscar")){
            document.getElementById("id_token_in_lab").required = false;
            document.getElementById("id_analysis_technique").required = false;
            document.getElementById("id_analysis_preparation").required = false;

            $("#formTokenAnalysis").attr('action' , 'javascript:getAtributos("Buscar");');
        }
        else{
            document.getElementById("id_token_in_lab").required = true;
            document.getElementById("id_analysis_technique").required = true;
            document.getElementById("id_analysis_preparation").required = true;

            $("#formTokenAnalysis").attr('action' , 'javascript:getAtributos("Añadir");');
        }

        $("#id_token_in_analysis").val('');
        $("#id_token_in_lab").val('');
        $("#id_analysis_technique").val('');
        $("#id_analysis_preparation").val('');
    }
    setLang();
    document.getElementById("aceptar").classList.remove(tipo);
}

function rellenarSelectTokenLab(tipo, filas, token_in_lab) {
    let element = document.getElementById(tipo);
    let option = document.createElement('option');
    
    // Eliminar opciones existentes antes de agregar las nuevas
    element.innerHTML = '';
    
    filas.forEach(fila => {
        option = document.createElement('option');
        option.value = fila.id_token_in_lab;
        option.textContent = fila.id_token_in_lab;
        element.appendChild(option);
    })
    
    if (token_in_lab != null) element.value = token_in_lab;
    
}

function rellenarSelectAnalysisTech(tipo, filas, analysis_technique) {
    let element = document.getElementById(tipo);
    let option = document.createElement('option');
    
    // Eliminar opciones existentes antes de agregar las nuevas
    element.innerHTML = '';
    
    filas.forEach(fila => {
        option = document.createElement('option');
        option.value = fila.id_analysis_technique;
        option.textContent = fila.name_analysis_technique;
        element.appendChild(option);
    })
    
    if (analysis_technique != null) element.value = analysis_technique;
    
}
  
function rellenarSelectAnalysisPrep(tipo, filas, analysis_preparation) {
    let element = document.getElementById(tipo);
    let option = document.createElement('option');
    
    // Eliminar opciones existentes antes de agregar las nuevas
    element.innerHTML = '';
    
    filas.forEach(fila => {
        option = document.createElement('option');
        option.value = fila.id_analysis_preparation;
        option.textContent = fila.name_analysis_preparation;
        element.appendChild(option);
    })
    
    if (analysis_preparation != null) element.value = analysis_preparation;
    
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
    $("#formBorrarTokenAnalysis").attr('action' , 'javascript:borrar();');
}

function borrar(){
    var id = document.getElementById("idBorrar").value
    deleteTokenAnalysis(id)
}