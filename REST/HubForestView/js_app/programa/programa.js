async function rellenarselects(){

    await peticionBackGeneral('', 'etiqueta', 'SEARCH')
    .then((respuesta) => {

        var informacion = respuesta['resource']

        for(var datos in informacion){
            var dato = informacion[datos];
            $('#etiqueta').append($('<option>', {
                value: dato['id_etiqueta'],
                text: dato['nombre_etiqueta']
            }));
            
        }

    });

    await peticionBackGeneral('', 'area', 'SEARCH')
    .then((respuesta) => {

        var informacion = respuesta['resource']

        for(var datos in informacion){
            var dato = informacion[datos];
            $('#area').append($('<option>', {
                value: dato['id_area'],
                text: dato['nombre_area']
            }));
            
        }

    });

}

async function rellenaryseleccionarselects(){

    

    await peticionBackGeneral('', 'etiqueta', 'SEARCH')
    .then((respuesta) => {

        var informacion = respuesta['resource']

        for(var datos in informacion){
            var dato = informacion[datos];
            $('#etiqueta').append($('<option>', {
                value: dato['id_etiqueta'],
                text: dato['nombre_etiqueta']
            }));
            
        }

    });

    // seleccionar actual
    
    await peticionBackGeneral('', 'programa_etiqueta', 'SEARCH_BY', {'id_programa':$("#id_programa").val()})
    .then((respuesta) => {

        var informacion = respuesta['resource'];
        etiquetasenbd = new Array();
        for(datos in informacion){
            etiquetasenbd.push(informacion[datos]['id_etiqueta']);
        }

        for(i=0;i<$("#etiqueta option").length;i++){
            if (etiquetasenbd.includes($("#etiqueta option")[i].value)){
                $("#etiqueta option")[i].selected = true;
            }
            
        }

    });

    await peticionBackGeneral('', 'area', 'SEARCH')
    .then((respuesta) => {

        var informacion = respuesta['resource']

        for(var datos in informacion){
            var dato = informacion[datos];
            $('#area').append($('<option>', {
                value: dato['id_area'],
                text: dato['nombre_area']
            }));
            
        }

    });

    
    //seleccionar actual (por hacer)
    await peticionBackGeneral('', 'programa_area', 'SEARCH_BY', {'id_programa':$("#id_programa").val()})
    .then((respuesta) => {

        var informacion = respuesta['resource'];
        areasenbd = new Array();
        for(datos in informacion){
            areasenbd.push(informacion[datos]['id_area']);
        }

        for(i=0;i<$("#area option").length;i++){
            if (areasenbd.includes($("#area option")[i].value)){
                $("#area option")[i].selected = true;
            }
            
        }

    });

}

// ESPECIFICAS DE ENTIDAD programa

// ESPECIFICAS DE ACCIONES

function accionenForm_ADD_programa(){

    rellenaryseleccionarselects();

    $("#caption_fichero_programa").remove();
    $("#fichero_programa").attr("readonly","readonly");
    $("#nuevo_fichero_programa").attr("required","required");


    $("#caption_imagen_programa").remove();
    $("#imagen_programa").attr("readonly","readonly");
    $("#nuevo_imagen_programa").attr("required","required");

    $("#area").attr("required","required");
    $("#etiqueta").attr("required","required");

}

async function accionenForm_EDIT_programa(){

    rellenaryseleccionarselects();
    
    // muestro valor fichero programa y limpio input para nuevo fichero si quiere y lo pongo no required
    $("#nuevo_fichero_programa").removeAttr("required");

    // muestro valor imagen programa y limpio input para nueva imagen si quiere y lo pongo no required
    $("#nuevo_imagen_programa").removeAttr("required");

    var link = "https://jrodeiro.webs.uvigo.es/PsEducaBase/filesuploaded/files_fichero_programa/"+$("#fichero_programa").val();
    $("#id_href_link_fichero_programa").attr('href',link);

    var link = "https://jrodeiro.webs.uvigo.es/PsEducaBase/filesuploaded/files_imagen_programa/"+$("#imagen_programa").val();
    $("#id_href_link_imagen_programa").attr('href',link);

}

function accionenForm_DELETE_programa(){

    // rellenar las select de area y etiqueta
    rellenaryseleccionarselects();

    // poner readonly todos los campos posibles (inputs)

    $("#formbase input").attr('readonly', 'readonly');
    $("#formbase textarea").attr('readonly', 'readonly');

    // poner disabled todos los campos posibles (selects)
    selects = $("#formbase select");
    for (var i = 0; i < selects.length; i++) {
        $(selects[i]).attr('disabled', 'disabled'); 
        $(selects[i]).removeAttr("required");
    }

    // poner disabled todos los campos posibles (input file)
    files = $("#formbase input[type=file");
    for (var i = 0; i < files.length; i++) {
        $(files[i]).attr('disabled', 'disabled');
        $(files[i]).removeAttr("required");
    }

    var link = "https://jrodeiro.webs.uvigo.es/PsEducaBase/filesuploaded/files_fichero_programa/"+$("#fichero_programa").val();
    $("#id_href_link_fichero_programa").attr('href',link);
    
    var link = "https://jrodeiro.webs.uvigo.es/PsEducaBase/filesuploaded/files_imagen_programa/"+$("#imagen_programa").val();
    $("#id_href_link_imagen_programa").attr('href',link);
}


function accionenForm_SEARCH_programa(){
    
    //crear valor vacio para buscar en selects y ponerlo como selected
    // rellenar las select de area y etiqueta
    rellenaryseleccionarselects();
    $('#etiqueta').append($('<option>', {
        value: '',
        text: '------'
    }));
    $('#etiqueta').val('');

    $('#area').append($('<option>', {
        value: '',
        text: '------'
    }));
    $('#area').val('');

    // poner valor por defecto en '' en los otros select construidos en html
    $('#unidad_poblacion').append($('<option>', {
        value: '',
        text: '------'
    }));
    $('#unidad_poblacion').val('');

    $('#tipo_programa').append($('<option>', {
        value: '',
        text: '------'
    }));
    $('#tipo_programa').val('');

    $('#formato_programa').append($('<option>', {
        value: '',
        text: '------'
    }));
    $('#formato_programa').val('');

    $('#modo_correccion_programa').append($('<option>', {
        value: '',
        text: '------'
    }));
    $('#modo_correccion_programa').val('');

    $('#modo_correccion_programa').append($('<option>', {
        value: '',
        text: '------'
    }));
    $('#modo_correccion_programa').val('');

    $('#modo_aplicacion_programa').append($('<option>', {
        value: '',
        text: '------'
    }));
    $('#modo_aplicacion_programa').val('');

    // desactivar input file
    files = $("#formbase input[type=file");
    for (var i = 0; i < files.length; i++) {
        $(files[i]).attr('disabled', 'disabled');
        $(files[i]).removeAttr("required");
    }

}
/*
async function accionenForm_CURRENT_programa(){

    rellenaryseleccionarselects();

    // muestro valor fichero programa y limpio input para nuevo fichero si quiere y lo pongo no required
    $("#nuevo_fichero_programa").removeAttr("required");

    // muestro valor imagen programa y limpio input para nueva imagen si quiere y lo pongo no required
    $("#nuevo_imagen_programa").removeAttr("required");

}
*/
// ESPECIFICAS DE SUBMIT

function comprobar_submit_SEARCH_programa(){

    return true;

}

// ESPECIFICAS DE SUBMIT

function comprobar_submit_EDIT_programa(){

    return true;

}
