async function getListTechniqueSamples() {
    return peticionBackGeneral('', 'technique_sample', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaTechSample(response['resource']) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListByParamTechniqueSample(name_technique_sample, description_technique_sample, bib_technique_sample) {
    const technique_sample = {
        name_technique_sample: name_technique_sample,
        description_technique_sample: description_technique_sample,
        bib_technique_sample: bib_technique_sample,
    };
    return peticionBackGeneral('', 'technique_sample', 'SEARCH_BY', technique_sample)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaTechSample(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListByParamTechniqueSample_search(name_technique_sample, description_technique_sample, bib_technique_sample) {
    const technique_sample = {
        name_technique_sample: name_technique_sample,
        description_technique_sample: description_technique_sample,
        bib_technique_sample: bib_technique_sample,
    };
    return peticionBackGeneral('', 'technique_sample', 'SEARCH', technique_sample)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaTechSample(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function addTechniqueSample(name_technique_sample, description_technique_sample, bib_technique_sample, file_technique_sample) {
    const technique_sample = {
        name_technique_sample: name_technique_sample,
        description_technique_sample: description_technique_sample,
        bib_technique_sample: bib_technique_sample,
        file_technique_sample: file_technique_sample
    };

    return peticionBackGeneral('', 'technique_sample', 'ADD', technique_sample)
        .then(response => {
            console.log('response', response)
            location.reload();
            response['resource']
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function editTechniqueSample(id_technique_sample, name_technique_sample, description_technique_sample, bib_technique_sample, file_technique_sample) {
    const technique_sample = {
        id_technique_sample: id_technique_sample,
        name_technique_sample: name_technique_sample,
        description_technique_sample: description_technique_sample,
        bib_technique_sample: bib_technique_sample,
        file_technique_sample: file_technique_sample
    };

    return peticionBackGeneral('', 'technique_sample', 'EDIT', technique_sample)
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function deleteTechniqueSample(id_technique_sample) {
    
    return peticionBackGeneral('', 'technique_sample', 'DELETE', {'id_technique_sample': id_technique_sample})
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

function construyeTablaTechSample(filas) {
    let filasTabla = '';
    let tipo = "'editTechniqueSample'";
    let element = document.getElementById("datosTechniqueSample");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    $("#datosTechniqueSample").html("");
    filas.forEach(fila => {
        let atributosTabla = ["'" + fila.id_technique_sample + "'","'" + fila.name_technique_sample + "'", "'" + fila.description_technique_sample + "'",
                              "'" + fila.bib_technique_sample + "'"/* ,"'" + fila.file_technique_sample + "'" */];
        let botonEdit='<button class="BotonEditar btn btn-info editarTechniqueSample" id="editarTechniqueSample" onclick="mostrarModalTechSample('+tipo+','+atributosTabla+')">Editar</button>'

        filasTabla += '<tr> <td>' + fila.id_technique_sample + 
                '</td> <td>' + fila.name_technique_sample + 
                '</td> <td>' + fila.description_technique_sample + 
                '</td> <td>' + fila.bib_technique_sample + 
                // '</td> <td>' + fila.file_technique_sample + 
                '</td> <td class="text-center">' + botonEdit +
                '</td> <td class="text-center"><button class="BotonEliminar btn btn-danger borrarTechniqueSample" id="borrarTechniqueSample" onclick="mostrarBorrarTechSample('+fila.id_technique_sample+')">Eliminar</button>'
                
                '</td>  </tr>';
    });

    recuperarYComprobarUsuarioLogeadoIsAdmin().then(resultado => {
        if (!resultado) {
            let editarTechniqueSample = document.getElementsByClassName("BotonEditar");
            for (const fila of editarTechniqueSample) {
                fila.style.display = 'none';
            }
            let borrarTechniqueSample = document.getElementsByClassName("borrarTechniqueSample");
            for (const fila of borrarTechniqueSample) {
                fila.style.display = 'none';
            }
            $("#abrirModal").hide();
        } else {
            let editarTechniqueSample = document.getElementsByClassName("BotonEditar");
            for (const fila of editarTechniqueSample) {
                fila.style.display = 'block';
            }
            let borrarTechniqueSample = document.getElementsByClassName("borrarTechniqueSample");
            for (const fila of borrarTechniqueSample) {
                fila.style.display = 'block';
            }
            $("#abrirModal").show();
        }
    });
    
    $("#datosTechniqueSample").append(filasTabla);
    cerrarModal();
    setLang();
}

function getAtributosTechSample(tipo){
    let id_technique_sample = document.getElementById("id_technique_sample").value
    let name_technique_sample = document.getElementById("name_technique_sample").value
    let description_technique_sample = document.getElementById("description_technique_sample").value
    let bib_technique_sample = document.getElementById("bib_technique_sample").value
    let file_technique_sample = document.getElementById("file_technique_sample").value
    switch(tipo){
        case "Editar":
            editTechniqueSample(id_technique_sample, name_technique_sample, description_technique_sample, bib_technique_sample, file_technique_sample)
            break;
        case "Añadir":
            addTechniqueSample(name_technique_sample, description_technique_sample, bib_technique_sample, file_technique_sample)
            break;
        case "Buscar":
            getListByParamTechniqueSample_search(name_technique_sample, description_technique_sample, bib_technique_sample)
            break;
    }
}

function mostrarModalTechSample(tipo, id_technique_sample=null, name_technique_sample=null, description_technique_sample=null, bib_technique_sample=null, file_technique_sample=null){
    // Ventana modal
    document.getElementById("ventanaModal").style.display = "block";
    document.getElementById("Titulo").innerHTML = '<h2 class="'+tipo+'">'+tipo+'</h2>';
    document.getElementById("aceptar").classList.add(tipo);

    if(tipo.includes("edit")){
        $("#formTechniqueSample").attr('action' , 'javascript:getAtributosTechSample("Editar");');

        $("#id_technique_sample").val(id_technique_sample);
        $("#name_technique_sample").val(name_technique_sample);
        $("#description_technique_sample").val(description_technique_sample);
        $("#bib_technique_sample").val(bib_technique_sample);
        $('#form_file_technique_sample').show();
        // $("#file_technique_sample").val(file_technique_sample);
    }
    else{
        if(tipo.includes("buscar")){
            document.getElementById("name_technique_sample").required = false;
            document.getElementById("description_technique_sample").required = false;
            document.getElementById("bib_technique_sample").required = false;
            $('#form_file_technique_sample').hide();
            document.getElementById("file_technique_sample").required = false;

            $("#formTechniqueSample").attr('action' , 'javascript:getAtributosTechSample("Buscar");');
        }
        else{
            document.getElementById("name_technique_sample").required = true;
            document.getElementById("description_technique_sample").required = true;
            document.getElementById("bib_technique_sample").required = true;
            $('#form_file_technique_sample').show();
            document.getElementById("file_technique_sample").required = false;

            $("#formTechniqueSample").attr('action' , 'javascript:getAtributosTechSample("Añadir");');
        }

        $("#id_technique_sample").val('');
        $("#name_technique_sample").val('');
        $("#description_technique_sample").val('');
        $("#bib_technique_sample").val('');
        $("#file_technique_sample").val('');
    }
    setLang();
    document.getElementById("aceptar").classList.remove(tipo);
}

function cerrarModal(){
    // Ventana modal
    var modal = document.getElementById("ventanaModal");
    modal.style.display = "none"
}

function mostrarBorrarTechSample(id){
    // Ventana modal
    document.getElementById("comprobarBorrar").style.display = "block";
    $("#idBorrar").val(id)
    $("#formBorrarTechniqueSample").attr('action' , 'javascript:borrarTechniqueSample();');
}

function borrarTechniqueSample(){
    var id = document.getElementById("idBorrar").value
    deleteTechniqueSample(id)
}