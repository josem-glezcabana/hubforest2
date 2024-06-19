async function getListAnalysisTechniques() {
    return peticionBackGeneral('', 'analysis_technique', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaAnalysisTech(response['resource']) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListByParamAnalysisTechnique(name_analysis_technique, description_analysis_technique, bib_analysis_technique) {
    const analysis_technique = {
        name_analysis_technique: name_analysis_technique,
        description_analysis_technique: description_analysis_technique,
        bib_analysis_technique: bib_analysis_technique,
    };
    return peticionBackGeneral('', 'analysis_technique', 'SEARCH_BY', analysis_technique)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaAnalysisTech(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListByParamAnalysisTechnique_search(name_analysis_technique, description_analysis_technique, bib_analysis_technique) {
    const analysis_technique = {
        name_analysis_technique: name_analysis_technique,
        description_analysis_technique: description_analysis_technique,
        bib_analysis_technique: bib_analysis_technique,
    };
    return peticionBackGeneral('', 'analysis_technique', 'SEARCH', analysis_technique)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaAnalysisTech(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function addAnalysisTechnique(name_analysis_technique, description_analysis_technique, bib_analysis_technique, file_analysis_tecnique) {
    const analysis_technique = {
        name_analysis_technique: name_analysis_technique,
        description_analysis_technique: description_analysis_technique,
        bib_analysis_technique: bib_analysis_technique,
        file_analysis_tecnique: file_analysis_tecnique
    };

    return peticionBackGeneral('formAnalysisTechnique', 'analysis_technique', 'ADD')
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

async function editAnalysisTechnique(id_analysis_technique, name_analysis_technique, description_analysis_technique, bib_analysis_technique, file_analysis_tecnique) {
    const analysis_technique = {
        id_analysis_technique: id_analysis_technique,
        name_analysis_technique: name_analysis_technique,
        description_analysis_technique: description_analysis_technique,
        bib_analysis_technique: bib_analysis_technique,
        file_analysis_tecnique: file_analysis_tecnique
    };

    return peticionBackGeneral('formAnalysisTechnique', 'analysis_technique', 'EDIT')
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function deleteAnalysisTechnique(id_analysis_technique) {
    
    return peticionBackGeneral('', 'analysis_technique', 'DELETE', {'id_analysis_technique': id_analysis_technique})
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

function construyeTablaAnalysisTech(filas) {
    let filasTabla = '';
    let tipo = "'editAnalysisTechnique'";
    let element = document.getElementById("datosAnalysisTechnique");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    $("#datosAnalysisTechnique").html("");
    filas.forEach(fila => {
        let atributosTabla = ["'" + fila.id_analysis_technique + "'","'" + fila.name_analysis_technique + "'", "'" + fila.description_analysis_technique + "'",
                              "'" + fila.bib_analysis_technique + "'","'" + fila.file_analysis_tecnique + "'"];
        let botonEdit='<button class="BotonEditar btn btn-info editarAnalysisTechnique" id="editarAnalysisTechnique" onclick="mostrarModalAnalysisTechnique('+tipo+','+atributosTabla+')">Editar</button>'

        filasTabla += '<tr> <td>' + fila.id_analysis_technique + 
                '</td> <td>' + fila.name_analysis_technique + 
                '</td> <td>' + fila.description_analysis_technique + 
                '</td> <td>' + fila.bib_analysis_technique + 
                '</td> <td>' + fila.file_analysis_tecnique + 
                '</td> <td class="text-center">' + botonEdit +
                '</td> <td class="text-center"><button class="BotonEliminar btn btn-danger borrarAnalysisTechnique" id="borrarAnalysisTechnique" onclick="mostrarBorrarAnalysisTechnique('+fila.id_analysis_technique+')">Eliminar</button>'
                
                '</td>  </tr>';
    });

    recuperarYComprobarUsuarioLogeadoIsAdmin().then(resultado => {
        if (!resultado) {
            let editarAnalysisTechnique = document.getElementsByClassName("BotonEditar");
            for (const fila of editarAnalysisTechnique) {
                fila.style.display = 'none';
            }
            let borrarAnalysisTechnique = document.getElementsByClassName("borrarAnalysisTechnique");
            for (const fila of borrarAnalysisTechnique) {
                fila.style.display = 'none';
            }
            $("#abrirModal").hide();
        } else {
            let editarAnalysisTechnique = document.getElementsByClassName("BotonEditar");
            for (const fila of editarAnalysisTechnique) {
                fila.style.display = 'block';
            }
            let borrarAnalysisTechnique = document.getElementsByClassName("borrarAnalysisTechnique");
            for (const fila of borrarAnalysisTechnique) {
                fila.style.display = 'block';
            }
            $("#abrirModal").show();
        }
    });
    
    $("#datosAnalysisTechnique").append(filasTabla);
    cerrarModal();
    setLang();
}

function getAtributosAnalysisTechnique(tipo){
    let id_analysis_technique = document.getElementById("id_analysis_technique").value
    let name_analysis_technique = document.getElementById("name_analysis_technique").value
    let description_analysis_technique = document.getElementById("description_analysis_technique").value
    let bib_analysis_technique = document.getElementById("bib_analysis_technique").value
    let file_analysis_tecnique = document.getElementById("new_file_analysis_tecnique").value
    switch(tipo){
        case "Editar":
            editAnalysisTechnique(id_analysis_technique, name_analysis_technique, description_analysis_technique, bib_analysis_technique, file_analysis_tecnique)
            break;
        case "Añadir":
            addAnalysisTechnique(name_analysis_technique, description_analysis_technique, bib_analysis_technique, file_analysis_tecnique)
            break;
        case "Buscar":
            getListByParamAnalysisTechnique_search(name_analysis_technique, description_analysis_technique, bib_analysis_technique)
            break;
    }
}

function mostrarModalAnalysisTechnique(tipo, id_analysis_technique=null, name_analysis_technique=null, description_analysis_technique=null, bib_analysis_technique=null, file_analysis_tecnique=null){
    // Ventana modal
    document.getElementById("ventanaModal").style.display = "block";
    document.getElementById("Titulo").innerHTML = '<h2 class="'+tipo+'">'+tipo+'</h2>';
    document.getElementById("aceptar").classList.add(tipo);

    if(tipo.includes("edit")){
        $("#formAnalysisTechnique").attr('action' , 'javascript:getAtributosAnalysisTechnique("Editar");');

        $("#id_analysis_technique").val(id_analysis_technique);
        $("#name_analysis_technique").val(name_analysis_technique);
        $("#description_analysis_technique").val(description_analysis_technique);
        $("#bib_analysis_technique").val(bib_analysis_technique);
        $('#form_old_file_analysis_tecnique').show();
        $('#form_file_analysis_tecnique').show();
        $("#file_analysis_tecnique").val(file_analysis_tecnique);
    }
    else{
        $('#form_old_file_analysis_tecnique').hide();
        if(tipo.includes("buscar")){
            document.getElementById("name_analysis_technique").required = false;
            document.getElementById("description_analysis_technique").required = false;
            document.getElementById("bib_analysis_technique").required = false;
            $('#form_file_analysis_tecnique').hide();
            document.getElementById("new_file_analysis_tecnique").required = false;

            $("#formAnalysisTechnique").attr('action' , 'javascript:getAtributosAnalysisTechnique("Buscar");');
        }
        else{
            document.getElementById("name_analysis_technique").required = true;
            document.getElementById("description_analysis_technique").required = true;
            document.getElementById("bib_analysis_technique").required = true;
            $('#form_file_analysis_tecnique').show();
            document.getElementById("new_file_analysis_tecnique").required = false;

            $("#formAnalysisTechnique").attr('action' , 'javascript:getAtributosAnalysisTechnique("Añadir");');
        }

        $("#id_analysis_technique").val('');
        $("#name_analysis_technique").val('');
        $("#description_analysis_technique").val('');
        $("#bib_analysis_technique").val('');
        $("#file_analysis_tecnique").val('');
    }
    setLang();
    document.getElementById("aceptar").classList.remove(tipo);
}

function cerrarModal(){
    // Ventana modal
    var modal = document.getElementById("ventanaModal");
    modal.style.display = "none"
}

function mostrarBorrarAnalysisTechnique(id){
    // Ventana modal
    document.getElementById("comprobarBorrar").style.display = "block";
    $("#idBorrar").val(id)
    $("#formBorrarAnalysisTechnique").attr('action' , 'javascript:borrarAnalysisTechnique();');
}

function borrarAnalysisTechnique(){
    var id = document.getElementById("idBorrar").value
    deleteAnalysisTechnique(id)
}