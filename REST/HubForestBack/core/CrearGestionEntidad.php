<?php


class managementCore{

    private $estructura=array();
    private $listaatributos=array();
    private $autoincrementales=array();
    private $nonulos=array();
    private $primarias=array();
    private $unicos=array();
    private $tabla;
    private $stringarrayatributos;
    private $stringarraynonulos;
    private $stringarraynonulosservice;
    private $stringarrayprimarias;
    private $stringarrayautoincrementales;
    private $stringarrayunicos;
    private $directorioparaficheros;

	function __construct(){
        define('urlnoRest','http://localhost/webProjects/webs6uvigo/repoEducacion/Back/index.php');
	}

    function ejecutarmanagementCore(){
        
        $this->tabla = $_POST['entidad'];
        
        include_once './Base/mapping.php';
        $query = "show columns from ".$this->tabla;
        $mapping = new mapping('');
        $res = $mapping->lanzarqueryconresults($query);
        
        if (($res['ok'] == false)){
            $mensaje = $this->tabla;
            $respuesta = array('ok' => false, 'code' => 'tabla_not_exist', 'resource' => $mensaje);
            return $respuesta;
        }
        else{

            $this->estructura = $res['resource'];

            foreach($this->estructura as $atributo){

                array_push($this->listaatributos, $atributo['Field']);
                
                if ($atributo['Extra'] == 'auto_increment'){
                    array_push($this->autoincrementales, $atributo['Field']);
                }
                
                if ($atributo['Null'] == 'NO'){
                    if ($atributo['Extra'] == 'auto_increment'){}
                    else{
                        array_push($this->nonulos, $atributo['Field']);
                    }
                }
    
                if ($atributo['Key'] == 'PRI'){
                    array_push($this->primarias, $atributo['Field']);
                }

                if ($atributo['Key'] == 'UNI'){
                    array_push($this->unicos, $atributo['Field']);
                }
    
            }

            $this->crearDirectorio(); //crea el directorio de app para la entidad
            $this->crearControlador(); // crea el controlador de la entidad
            $this->creararraylistaatributos(); // crea la lista de atributos segun la bd para incluir en service y model
            $this->crearService(); // crea el service de la entidad
            $this->crearModel(); // crea el model de la entidad
            /*$this->crearDataForm();*/ // crea los datos del formulario en la bd para poder modificarlos si se quiere
                                      // podriamos crearlo antes del service para incluir la informacion de files
            //$this->crearFormBase();   // crea los formularios base en un fichero

            //crear validaciones automaticamente para primarias y unicos

            //crear vistas automaticamente para la gestion de la entidad
            
            /*
            $mensaje = $estructura;
            $respuesta = array('ok' => true, 'code' => 'tabla_exist', 'resource' => $mensaje);
            return $respuesta;
            */

        }
    
    }

    function crearDataForm(){

        //crear entidad en form_entity
        $datos['name_entity'] = $this->tabla;
        $datos['controlador'] = 'form_entity';
        $datos['action'] = 'ADD';

        $res = $this->ejecutarCurl($datos);

        if (!($res['ok'])){
            echo('falla insertar el nombre del form en form_entity');
        }
        else{
            // recupero el id_form_entity recien creado
            $datos['name_entity'] = $this->tabla;
            $datos['controlador'] = 'form_entity';
            $datos['action'] = 'SEARCH_BY';
            $res = $this->ejecutarCurl($datos);
            $id_form_entity = $res['resource'][0]['id_form_entity'];

            //crear campos en field_entity
            unset($datos['name_entity']);
            $datos['controlador'] = 'field_entity';
            $datos['action'] = 'ADD';

            $datos['id_form_entity'] = $id_form_entity;

            foreach($this->estructura as $atributo){
                
                $datos['name_field_entity'] = $atributo['Field'];
                
                if ($atributo['Key'] == 'PRI'){
                    $datos['primary_field_entity'] = 'SI';
                }
                else{
                    $datos['primary_field_entity'] = 'NO';
                }

                if ($atributo['Extra'] == 'auto_increment'){
                    $datos['autoincrement_field_entity'] = 'SI';
                }
                else{
                    $datos['autoincrement_field_entity'] = 'NO';
                }

                if ($atributo['Null'] == 'NO'){
                    $datos['null_field_entity'] = 'NO';
                }
                else{
                    $datos['null_field_entity'] = 'SI';
                }

                $res = $this->devolversizefield($atributo['Type']);
                $datos['max_length_field_entity'] = $res['size'];
                                
                switch($res['tipo']){
                    case 'float':
                        $datos['type_field_entity'] = 'decimal';
                        break;
                    case 'decimal':
                        $datos['type_field_entity'] = 'decimal';
                        break;
                    case 'int':
                        $datos['type_field_entity'] = 'numero';
                        break;
                    case 'date':
                        $datos['type_field_entity'] = 'date';
                        $datos['max_length_field_entity'] = 0;
                        break;
                    case 'enum':
                        $datos['type_field_entity'] = 'enum';
                        $datos['max_length_field_entity'] = 0;
                        break;
                    default:
                        $datos['type_field_entity'] = 'string';
                        break;
                }

                
                $datos['class_field_entity'] = '';
                $datos['on_blur_field_entity'] = '';

                $res = $this->ejecutarCurl($datos);

                if ($res['ok']){
                    //echo('-------insercion correcta');
                }
                else{
                    //echo('error insercion-------');
                    //var_dump($res);
                }

            }
            
        }

        // crear events en event_field_entity
        // esto implica usar la tabla intermedia entre field_entity y event_field_entity

    }

    function crearFormBase(){
        // recupero el id_form_entity de la entidad
        $datos['name_entity'] = $this->tabla;
        $datos['controlador'] = 'form_entity';
        $datos['action'] = 'SEARCH_BY';
        $res = $this->ejecutarCurl($datos);
        $id_form_entity = $res['resource'][0]['id_form_entity'];

        // buscar en field_entity las tuplas de los campos del form_entity
        //crear campos en field_entity
        unset($datos['name_entity']);  
        $datos['controlador'] = 'field_entity';
        $datos['action'] = 'SEARCH_BY';
        $datos['id_form_entity'] = $id_form_entity;
        $res = $this->ejecutarCurl($datos);

        // empiezo string de creación del formulario base

        $textoformulario = "<form name=\"formbase\" id=\"formbase\" action=\"".$this->tabla."_XXXXXXX()\" method=\"POST\" onsubmit=\"comprobar_submit_".$this->tabla."_XXXXX()\">

    ";
    
        // proceso los campos para generar el formulario base
        $campos = $res['resource'];
        foreach($campos as $campo){

            $textocampo = '';
            $textofin = '';

            // colocar el fieldform de principio de campo

            $caption = "<caption id=\"".$campo['name_field_entity']."\">".$campo['name_field_entity']."</caption>:
    ";
                        
            if ($campo['type_field_entity'] == 'enum'){
                $textoinicio = "<select name=\"".$campo['name_field_entity']."\" id=\"".$campo['name_field_entity']."\" required >";
                $opciones = $this->rellenarOptions($this->tabla, $campo['name_field_entity']);
                $textoinicio .= $opciones;
                $textofin = "</select>
    ";
            }
            elseif ($campo['type_field_entity'] == 'date'){
                $textoinicio = "<input type=\"text\" class=\"tcal\" name=\"".$campo['name_field_entity']."\" id=\"".$campo['name_field_entity']."\" required >";
                $textofinal = "</input>";
                $textoinicio .= $textofinal;
            }            
            else{
                if ($campo['max_length_field_entity']>100){
                    $columnas = 100;
                    $filas = $campo['max_length_field_entity']/97;
                    $type = '<textarea ';
                    $textoinicio = $type." name=\"".$campo['name_field_entity']."\" id=\"".$campo['name_field_entity']."\" maxlength=\"".$campo['max_length_field_entity']."\" size=\"".$campo['max_length_field_entity']."\" cols=\"".$columnas."\" rows=\"".$filas."\" required >";
                    $textofinal = '</textarea>';
                    $textoinicio .= $textofinal;
                }
                else{
                    if ($campo['type_field_entity']=='numero'){
                        $textoinicio = "<input type=\"number\" name=\"".$campo['name_field_entity']."\" id=\"".$campo['name_field_entity']."\" maxlength=\"".$campo['max_length_field_entity']."\" size=\"".$campo['max_length_field_entity']."\" required >";
                        $textofinal = "</input>";
                        $textoinicio .= $textofinal;
                    }
                    else{
                        if ($campo['type_field_entity']=='decimal'){
                            $textoinicio = "<input type=\"number\" name=\"".$campo['name_field_entity']."\" step=\"0.001\" id=\"".$campo['name_field_entity']."\" maxlength=\"".$campo['max_length_field_entity']."\" size=\"".$campo['max_length_field_entity']."\" required >";
                            $textofinal = "</input>";
                            $textoinicio .= $textofinal;
                        }
                        else{
                            $textoinicio = "<input type=\"text\" name=\"".$campo['name_field_entity']."\" id=\"".$campo['name_field_entity']."\" maxlength=\"".$campo['max_length_field_entity']."\" size=\"".$campo['max_length_field_entity']."\" required >";
                            $textofinal = "</input>";
                            $textoinicio .= $textofinal;
                        }
                    }
                }
            }

            //colocar el final del fieldform... quizas en $textofin?
            
            $textocampo = $caption.$textoinicio."
    ".$textofin."<br>

    ";

            $textoformulario .= $textocampo;

        }



        //cierro string formulario
        $textoformulario .= "
        <input type=\"submit\" id=\"id_submit_formbase\" value=\"Enviar\"></input>

</form>";

        $this->crearFormBaseFile($textoformulario);

    }

    function rellenarOptions($tabla, $nombrecampo){

        include_once './Base/mapping.php';
        $query = "show columns from ".$this->tabla;
        $mapping = new mapping('');
        $res = $mapping->lanzarqueryconresults($query);

        foreach($res['resource'] as $campo){
            if ($campo['Field'] == $nombrecampo){
                $tipo = $campo['Type'];
                break;
            }
        }

        if (!(strpos($tipo,'('))){
            return '';
        }

        $tipo = str_replace('\'','',$tipo);
        $tipo = str_replace('enum(','',$tipo);
        $tipo = str_replace(')','',$tipo);
        $arraytipo = explode(',',$tipo);

        $textoopcion = '';
        foreach($arraytipo as $opcion){
            $options = "
        <option value=\"".$opcion."\">".$opcion."</option>";
            $textoopcion .= $options; 
        }

        return $textoopcion;

    }

    function devolversizefield($tipoysize){

        $inicioparentesis = strpos($tipoysize,'(');
        $coma = strpos($tipoysize,',');
        $finparentesis = strpos($tipoysize,')');
        
        if ($inicioparentesis == false){
            $tipoatributo = $atributo['Type'];
        }
        else{
            $tipoatributo = substr($tipoysize,0, $inicioparentesis);
            if ($coma == false){
                $sizeatributo = substr($tipoysize, $inicioparentesis+1, $finparentesis-$inicioparentesis-1);
            }
            else{
                $sizeatributo = substr($tipoysize, $inicioparentesis+1, $finparentesis-$coma);
            }
            
        }

        $res = array('tipo'=>$tipoatributo,'size'=>$sizeatributo);
        return $res;

    }

    function crearDirectorio(){

        $directorio = dirname(__FILE__);
        $creardirectorio = 'mkdir '.$directorio.'/../app/'.$this->tabla;
        $this->directorioparaficheros = $directorio.'/../app/'.$this->tabla;
        $res = shell_exec($creardirectorio);
        if (stripos($res , 'Permiso denegado')){
            $mensaje = 'no se puede crear el directorio';
            $respuesta = array('ok' => false, 'code' => 'dir_permissions_KO', 'resource' => $mensaje);
            return $respuesta;
        }
        else{
            $mensaje = 'creado';
            $respuesta = array('ok' => true, 'code' => 'dir_permissions_OK', 'resource' => $mensaje);
            return $respuesta;
            
        }

    }

    function crearFormBaseFile($contenido){
        $newFile= '../formsbase'.'/'.$this->tabla."_formbase.html"; 
        file_put_contents($newFile,$contenido);
    }

    function crearControlador(){
        $oldFile="./core/BaseFiles/BaseController.php"; 
        $newFile= $this->directorioparaficheros.'/'.$this->tabla."_CONTROLLER.php"; 
        file_put_contents($newFile,str_replace('xxentidadxx',$this->tabla,file_get_contents($oldFile)));
    }

    function crearService(){
        
        //crear fichero service y colocar la entidad
        $oldFile="./core/BaseFiles/BaseService.php"; 
        $newFile= $this->directorioparaficheros.'/'.$this->tabla."_SERVICE.php"; 
        file_put_contents($newFile,str_replace('xxentidadxx',$this->tabla,file_get_contents($oldFile)));

        //con el fichero ya creado modificar los atributos
        $this->reemplazarenArchivo($newFile, 'xxatributosxx', $this->stringarrayatributos);

        //con el fichero ya creado modificar los nulos
        $this->reemplazarenArchivo($newFile, 'xxnonulosxx', $this->stringarraynonulosservice);

    }

    function crearModel(){
        
        //crear fichero service y colocar la entidad
        $oldFile="./core/BaseFiles/BaseModel.php"; 
        $newFile= $this->directorioparaficheros.'/'.$this->tabla."_MODEL.php"; 
        file_put_contents($newFile,str_replace('xxentidadxx',$this->tabla,file_get_contents($oldFile)));

        //con el fichero ya creado modificar las primarias
        $this->reemplazarenArchivo($newFile, 'xxprimariasxx', $this->stringarrayprimarias);

        //con el fichero ya creado modificar los autoincrementales
        $this->reemplazarenArchivo($newFile, 'xxautoincrementalesxx', $this->stringarrayautoincrementales);

        //con el fichero ya creado modificar los unicos
        $this->reemplazarenArchivo($newFile, 'xxunicosxx', $this->stringarrayunicos);

    }

    function creararraylistaatributos(){
        
        $this->stringarrayatributos = '';

        $primero = true;
        foreach($this->listaatributos as $atributo){ //recorrer array de listaatributos para construtir string con el array a sustituir en fichero service
            if ($primero){
                $this->stringarrayatributos .= "'".$atributo."'"; 
                $primero = false;  
            }
            else{
                $this->stringarrayatributos .= ",'".$atributo."'";
            }
        }

        $this->stringarrayprimarias = '';

        $primero = true;
        foreach($this->primarias as $atributo){ //recorrer array de primarias para construtir string con el array a sustituir en fichero service
            if ($primero){
                $this->stringarrayprimarias .= "'".$atributo."'"; 
                $primero = false;  
            }
            else{
                $this->stringarrayprimarias .= ",'".$atributo."'";
            }
        }

        $this->stringarraynonulos = '';

        $primero = true;
        foreach($this->nonulos as $atributo){ //recorrer array de nonulos para construtir string con el array a sustituir en fichero service para cada accion
            if ($primero){
                $this->stringarraynonulos .= "'".$atributo."'"; 
                $primero = false;  
            }
            else{
                $this->stringarraynonulos .= ",'".$atributo."'";
            }
        }

        //crear el string de no nulos para el service compuesto de las acciones de ADD, EDIT y DELETE

        $this->stringarraynonulosservice = "'ADD' => array(".$this->stringarraynonulos."),\n\t\t\t\t\t\t";
        $this->stringarraynonulosservice .= "'EDIT' => array(".$this->stringarraynonulos."),\n\t\t\t\t\t\t";
        $this->stringarraynonulosservice .= "'DELETE' => array(".$this->stringarrayprimarias.")";

        //crear el string de autoincrementales para el model
        
        $this->stringarrayautoincrementales = '';

        $primero = true;
        foreach($this->autoincrementales as $atributo){ //recorrer array de nonulos para construtir string con el array a sustituir en fichero service para cada accion
            if ($primero){
                $this->stringarrayautoincrementales .= "'".$atributo."'"; 
                $primero = false;  
            }
            else{
                $this->stringarrayautoincrementales .= ",'".$atributo."'";
            }
        }

        // crear el string de unicos para el model

        $this->stringarrayunicos = '';

        $primero = true;
        foreach($this->unicos as $atributo){ //recorrer array de nonulos para construtir string con el array a sustituir en fichero service para cada accion
            if ($primero){
                $this->stringarrayunicos .= "'".$atributo."'"; 
                $primero = false;  
            }
            else{
                $this->stringarrayunicos .= ",'".$atributo."'";
            }
        }       
        
        
    }

    function reemplazarenArchivo($archivo, $referencia, $textonuevo){

        $oldFile= $archivo;
        echo shell_exec('whoami');
        var_dump(fileperms('/var/www/html/HubForestBack/core/../app/usuario/usuario_MODEL.php'));

        file_put_contents($oldFile,str_replace($referencia,$textonuevo,file_get_contents($oldFile)));

    }

    function ejecutarCurl($parametros){

        
        
        $cliente = curl_init();
        
        curl_setopt($cliente, CURLOPT_URL, urlnoRest);
        curl_setopt($cliente, CURLOPT_HEADER, 0);
        curl_setopt($cliente, CURLOPT_POST, True);
        curl_setopt($cliente, CURLOPT_POSTFIELDS, $parametros);
        curl_setopt($cliente, CURLOPT_RETURNTRANSFER, True); 
        
        $result = curl_exec($cliente); // obtengo un json
        
        if (curl_error($cliente)) { 
            echo 'Error: '.curl_error($cliente); 
        }
        else{
         
            $resp = json_decode($result,true); // convierto en un stdClass
            $resp = (array)$resp; //convierto en array
            return $resp;
        }	
        
        curl_close($cliente);
        
        }

} //FIN DE CLASS
?>