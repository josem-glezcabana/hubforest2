async function getListAnalysis_preparation() {
    return peticionBackGeneral('', 'analysis_preparation', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaAnalysis_preparation(response['resource']) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });  
}

async function getListByParamAnalysis_preparation(name_analysis_preparation) {
    const analysis_preparation = {
        name_analysis_preparation: name_analysis_preparation,
    };
    return peticionBackGeneral('', 'analysis_preparation', 'SEARCH_BY', analysis_preparation)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaAnalysis_preparation(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function addAnalisis_preparation(name_analysis_preparation) {
    const analysis_preparation = {
        name_analysis_preparation: name_analysis_preparation,
        
    };

    return peticionBackGeneral('', 'analysis_preparation', 'ADD', analysis_preparation)
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

async function editAnalysis_preparation(id_analysis_preparation, name_analysis_preparation) {
    const analysis_preparation = {
        id_analysis_preparation: id_analysis_preparation,
        name_analysis_preparation: name_analysis_preparation,
    };

    return peticionBackGeneral('', 'analysis_preparation', 'EDIT', analysis_preparation)
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function deleteAnalysis_preparation(id_analysis_preparation) {
    
    return peticionBackGeneral('', 'analysis_preparation', 'DELETE', {'id_analysis_preparation': id_analysis_preparation})
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

function construyeTablaAnalysis_preparation(filas) {

    let filasTabla = '';
    let tipo = "'editAnalysis_preparation'";
    let element = document.getElementById("datosAnalysis_preparation");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    $("#datosAnalysis_preparation").html("");
    filas.forEach(fila => {
        let atributosTabla = ["'" + fila.id_analysis_preparation + "'","'" + fila.name_analysis_preparation + "'"];
        let botonEdit='<button class="BotonEditar btn btn-info" id="editarAnalysisPreparation" onclick="mostrarModalAnalysisPreparation('+tipo+','+atributosTabla+')">Editar</button>'

        filasTabla += '<tr> <td>' + fila.name_analysis_preparation + 
                '</td> <td class="text-center">' + botonEdit +
                '</td> <td class="text-center"><button class="BotonEliminar btn btn-danger borrarAnalysis_preparation" id="borrarAnalysis_preparation" onclick="mostrarBorrarAnalysis_preparation('+fila.id_analysis_preparation+')">Eliminar</button>'
                
                '</td>  </tr>';
    });

    recuperarYComprobarUsuarioLogeadoIsAdmin().then(resultado => {
        if (!resultado) {
            let editarAnalysisTechnique = document.getElementsByClassName("BotonEditar");
            for (const fila of editarAnalysisTechnique) {
                fila.style.display = 'none';
            }
            let borrarAnalysisTechnique = document.getElementsByClassName("borrarAnalysis_preparation");
            for (const fila of borrarAnalysisTechnique) {
                fila.style.display = 'none';
            }
            $("#abrirModal").hide();
        } else {
            let editarAnalysisTechnique = document.getElementsByClassName("BotonEditar");
            for (const fila of editarAnalysisTechnique) {
                fila.style.display = 'block';
            }
            let borrarAnalysisTechnique = document.getElementsByClassName("borrarAnalysis_preparation");
            for (const fila of borrarAnalysisTechnique) {
                fila.style.display = 'block';
            }
            $("#abrirModal").show();
        }
    });
    
    $("#datosAnalysis_preparation").append(filasTabla);
    cerrarModal();
    setLang();
}

function getAtributosAnalysis_preparation(tipo){
    let id_analysis_preparation = document.getElementById("id_analysis_preparation").value
    let name_analysis_preparation = document.getElementById("name_analysis_preparation").value
     switch(tipo){
        case "Editar":
            editAnalysis_preparation(id_analysis_preparation, name_analysis_preparation)
            break;
        case "Añadir":
            addAnalisis_preparation(name_analysis_preparation)
            break;
        case "Buscar":
            getListByParamAnalysis_preparation(name_analysis_preparation)
            break;
     }
}

function mostrarModalAnalysisPreparation(tipo, id_analysis_preparation=null, name_analysis_preparation=null){
    // Ventana modal
    document.getElementById("ventanaModal").style.display = "block";
    document.getElementById("Titulo").innerHTML = '<h2 class="'+tipo+'">'+tipo+'</h2>';
    document.getElementById("aceptar").classList.add(tipo);

    if(tipo.includes("edit")){
        $("#formAnalysis_preparation").attr('action' , 'javascript:getAtributosAnalysis_preparation("Editar");');

        $("#id_analysis_preparation").val(id_analysis_preparation);
        $("#name_analysis_preparation").val(name_analysis_preparation);
    }
    else{
        if(tipo.includes("Buscar")){
            document.getElementById("name_analysis_preparation").required = false;
            $("#formAnalysis_preparation").attr('action' , 'javascript:getAtributosAnalysis_preparation("Buscar");');
        }
        else{
            document.getElementById("name_analysis_preparation").required = true;
            $("#formAnalysis_preparation").attr('action' , 'javascript:getAtributosAnalysis_preparation("Añadir");');
        }

        $("#id_analysis_preparation").val('');
        $("#name_analysis_preparation").val('');
    }
    setLang();
    document.getElementById("aceptar").classList.remove(tipo);
}

function cerrarModal(){
    // Ventana modal
    var modal = document.getElementById("ventanaModal");
    modal.style.display = "none"
}

function mostrarBorrarAnalysis_preparation(id){
    // Ventana modal
    document.getElementById("comprobarBorrar").style.display = "block";
    $("#idBorrar").val(id)
    $("#formBorrarAnalysis_preparation").attr('action' , 'javascript:borrarAnalysis_preparation();');
}

function borrarAnalysis_preparation(){
    var id = document.getElementById("idBorrar").value
    deleteAnalysis_preparation(id)
}