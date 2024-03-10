
//let urlAPIREST = 'https://jrodeiro.webs.uvigo.es/PsEducaBase/index.php';
let urlAPIREST = 'http://localhost:8080/HubForestBack/index.php';         // Creo que sería esta la URL para las peticiones


function peticionBackGeneral(formulario, controlador, action, datosextra=null){

    var datos;
    
    if (formulario === ''){
        datos = new FormData();
    }
    else{
        formulario = document.getElementById(formulario);
        datos = new FormData(formulario);
    }

    datos.append('controlador', controlador);
    datos.append('action', action);

    if (datosextra==null){}
    else{
        for(var clave in datosextra){
            datos.append(clave, datosextra[clave]);
        }
    }
    
    return new Promise(function(resolve) { 
        $.ajax({
            type :"POST",
            url : urlAPIREST,
            data : datos,
            processData : false,
            contentType : false,
        })
        .done(res => {
            resolve(res);
        })
        .fail(res => {
            alert('error : '+res.status);
        })

    });

}

async function creartablavista(entidad, titulos=null, datos=null){
    

    //cargar automaticamente js de acciones y submit de entidad si existe
    /*var nombrescript = '../js_app/'+entidad+'/'+entidad+'.js';
    try{
        $.getScript(nombrescript);
    }
    catch (error){
        //alert('no existe fichero script'+nombrescript);
        console.log("oaiewfnoiwejfoiwaej")
    }*/
    
    var textodiv = '';
    
    if (datos==null){
      
        //solicito las filas de la entidad en la bd
        await peticionBackGeneral('', entidad, 'SEARCH')// obtener datos de la bd sin criterios de busqueda
            .then((respuesta) => {
                if (respuesta['code']=='RECORDSET_DATOS'){
                    datos = respuesta['resource'];
                }
                else{
                    datos=null;
                }
        }); 
    }
        

    $("#tituloseccion").html(entidad);
    $("#tablaentidad").html('');
    $("#tbodytablaentidad").remove();
    $("#formularioentidad").html('');

    document.getElementById('tablaentidad').style.display = 'block';
    document.getElementById('formularioentidad').style.display = 'none';

    textodiv += '<button id="botoninsertar">Insertar</button>\n';
    textodiv += '<button id="botonbuscar">Buscar</button>\n';
   
    if (datos == ''){
        textodiv += '<h1>Búsqueda sin resultados<h1>';
    }
    else{
        textodiv += '<table border="1">';
        textodiv += '<thead><tr>';

        if (titulos == null){ 
            var clavestitulos = datos[0];
            var titulos = [];
            for(var titulo in clavestitulos){
                titulos.push(titulo);
            }
        }

        for(titulo in titulos){
            textodiv += '<th>'+titulos[titulo]+'</th>';
        }

        textodiv += '<th colspan="3">Acciones</th>';

        textodiv += '</tr></thead>';
        textodiv += '<tbody id="tbodytablaentidad">';
        
        

        //recorremos las filas para pintar segun el titulo
        numerofilas = Object.keys(datos).length;
        //var llamadasbotones = [];
        for(var fila in datos){

            var linea = datos[fila];
            textodiv += '<tr>';
            for(var titulo in titulos){
                textodiv += '<td>'+linea[titulos[titulo]]+'</td>';
            }
            
            var estafila = JSON.stringify(datos[fila]);
            
            //llamadasbotones[fila] = estafila;
            
            textodiv += `<td><button id="botoneditar${fila}" onclick='crearformulario(${estafila},"${entidad}","${titulos}","EDIT")'>Editar</button></td>`;
            textodiv += `<td><button id="botoneditar${fila}" onclick='crearformulario(${estafila},"${entidad}","${titulos}","DELETE")'>Borrar</button></td>`;;
            textodiv += `<td><button id="botoneditar${fila}" onclick='crearformulario(${estafila},"${entidad}","${titulos}","CURRENT")'>Detalle</button></td>`;;

            textodiv += '</tr>';
            

        }

        textodiv += '</tbody></table>';
        textodiv += '</div>';
    
        
    }

    $("#tablaentidad").append(textodiv);
    
    $("#botoninsertar").on('click',function(){crearformulario('',entidad,titulos,'ADD')});
    $("#botonbuscar").on('click',function(){crearformulario('',entidad,titulos,'SEARCH')});
   

}

function importarScript(nombre, callback) {
    var s = document.createElement("script");
    s.onload = callback;
    s.src = nombre;
    document.querySelector("body").appendChild(s);
}

function crearformularioAccion(estructura, valores, entidad, titulos, accion){

    
    $("#tituloseccion").html(entidad+'('+accion+')');

    $("#formularioentidad").html('');
    document.getElementById("formularioentidad").style.display = 'block';

    var result = $('#formularioentidad').load('../formsbase/'+entidad+'_formbase.html', function () {
        
        // transformo a json los elementos serializados que recibo
        //estructura = JSON.parse(estructura);
        if (valores!==''){
        //valores = JSON.parse(valores);
        }

        var losvalores = valores;


        // Recorro la estructura de campos

            estructura.forEach(element => {

                var idkey = "#"+element['Field'];

                if (accion == 'ADD'){

                    if (element['Key']=='PRI'){
                        $(idkey).attr("readonly","readonly");
                        $(idkey).attr('required', false);
                    }
        
                    if (element['Extra']=='auto_increment'){
                        $(idkey).attr("readonly","readonly");
                        $(idkey).attr('required', false);
                    }

                    if (element['Null'] == 'YES'){
                        $(idkey).attr('required',false);
                    }

                    //introducir validaciones si se meten en la bd.... SINO MODIFICAR DIRECTAMENTE EN EL FICHERO HTML

                }

                if (accion == 'EDIT'){

                    //rellenado de datos
                    //utilizo el nombre del atributo actual para obtener su valor en el array de valores
                    $(idkey).val(losvalores[element['Field']]);

                                       
                    if (element['KEY']=='PRI'){
                        $(idkey).attr("readonly","readonly");
                        $(idkey).attr('required', false);
                    }

                    if (element['Extra']=='auto_increment'){
                        $(idkey).attr("readonly","readonly");
                        $(idkey).attr('required', false);
                    }

                    if (element['Null'] == 'YES'){
                        $(idkey).attr('required',false);
                    }

                    //introducir validaciones si se meten en la bd.... SINO MODIFICAR DIRECTAMENTE EN EL FICHERO HTML

                }

                if (accion == 'SEARCH'){

                    // todos los campos como no requeridos
                    $(idkey).attr('required', false);

                    //se colocan los valores vacios en la funcion especifica de search

        
                    //introducir validaciones si se meten en la bd.... SINO MODIFICAR DIRECTAMENTE EN EL FICHERO HTML

                }

                if ((accion == 'DELETE') || (accion == 'CURRENT')){

                    //rellenado de datos
                    //utilizo el nombre del atributo actual para obtener su valor en el array de valores
                    $(idkey).val(losvalores[element['Field']]);
                
                    //coloco todos como solo lectura y requeridos a false
                    //$(idkey).attr("readonly","readonly");
                    //$(idkey).removeAttr("required");
                
                    $("#formbase input").attr('readonly', 'readonly');
                    $("#formbase textarea").attr('readonly', 'readonly');

                    // poner disabled todos los campos posibles (selects) en accionenForm
                    

                    // poner disabled todos los campos posibles (input file) en accionenForm
                    

                }
            
        });

        $("#id_submit_formbase").val(accion);
        $("#formbase").attr('action','javascript: accionenBD(\''+entidad+'\',\''+titulos+'\',\''+accion+'\');');
        $("#formbase").attr('onsubmit','return comprobar_submit(\''+entidad+'\',\''+accion+'\');');

        // si hay acciones sobre el formulario mas alla de las necesarias por los atributos de tablas (claves foraneas, etc) ejecuto una funcion especifica sobre la accion y la entidad 
        // intento ejecutar la funcion... si existe la ejecuta y sino existe capturo el error
        estaaccion = accion;
        if ((accion == 'DELETE') || (accion == 'CURRENT')){
            var estaaccion = 'DELETE';
        }
        var nombrefuncion = `accionenForm_${estaaccion}_${entidad}()`;

        try {
            eval(nombrefuncion);
        } catch (error) {
            //alert('no se encuentra la funcion en el fichero de accion : '+nombrefuncion);
        }


    } );  


}

async function crearformulario(valores, entidad, titulos, accion){
//async function crearformulario(event){


    $("#tablaentidad").html('');
    datos = {tabla:entidad};
    await peticionBackGeneral('', 'funcionesesquema', 'estructuratabla', datos)//prueba obtener datos formulario de la bd
        .then((respuesta) => {

            crearformularioAccion(respuesta['resource'], valores, entidad, titulos, accion);

        });

}

async function accionenBD(entidad, titulos, accion){

    titulos = titulos.split(',');

    await peticionBackGeneral('formbase', entidad, accion)
    .then((respuesta) => {

        if (respuesta['ok'] == true){}
        else{
            alert(respuesta['code']);
        }

        //if ((respuesta['code']=='RECORSET_DATOS') || (respuesta['code']=='RECORSET_VACIO')){
        if (accion == 'SEARCH'){
            creartablavista(entidad, titulos, respuesta['resource']);
        }
        else{
            creartablavista(entidad, titulos);
        }

    });

}


function comprobar_submit(entidad, accion){

    // se comprueba si existe funcion especifica de comprobacion de submit para esta accion y entidad, SINO se deja pasar
    var nombrefuncion = `comprobar_submit_${accion}_${entidad}()`;
    
    try{ 
        return eval(nombrefuncion);
    }
    catch (error) {
        //alert('no existe la funcion '+nombrefuncion);
    }

    /*console.log($("#nuevo_fichero_programa"));
    if ($("#nuevo_fichero_programa")==1){
        alert('funciona');
    }
    else{
        alert('no funciona');
    }*/
    
    //codigo para submit general si es necesario... sino devolvemos true

    return true;

}





