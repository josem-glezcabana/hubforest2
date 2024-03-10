<?php

define('SERVER', "http://localhost");
define('SECRET_KEY', '71YMT');  /// secret key can be a random string and keep in secret from anyone
define('ALGORITHM', 'HS256');

require_once "./Base/JWT/JWT.php";

class MiToken {

    public static function devuelveToken($tokenFront) {
                $secretKey = base64_decode(SECRET_KEY);
                $DecodedDataArray = JWT::decode($tokenFront, $secretKey);
                //$token = json_decode(json_encode($DecodedDataArray));
                $payload = $DecodedDataArray;
            return $payload;
    }

        /*Las bibliotecas de las que depende el soporte de MCrypt no se han actualizado
        en años y MCrypt ya no debería considerarse un método viable o seguro para cifrar
        datos. Además, MCrypt ha quedado obsoleto en PHP 5 y se eliminó por completo en
        PHP 7. Si tiene algún código que ejecute MCrypt, debe refactorizarlo para usar 
        una biblioteca de cifrado más moderna.
        
        Según lo sugerido por @rqLizard , puede usar openssl_encrypt / openssl_decrypt _ ​​PHP 
        en lugar de eso, que proporciona una alternativa mucho mejor para implementar 
        AES ( Estándar de cifrado avanzado) también conocido como cifrado Rijndael.
        
        Advertencia
        Esta función está OBSOLETA en PHP 7.1.0. y ELIMINADA en PHP 7.2.0.
        Las alternativas a esta función son:
        random_bytes()*/

    public static function creaToken($usuario, $contrasena) {
        
        $tokenId = base64_encode(random_bytes(32));
        $issuedAt = time();
        //$notBefore = $issuedAt;
        // a la hora de expiracion no le añado nada para poder usar el token directamente 
        // si le pongo mas tiempo tengo que esperar para poder usar el token
        $expire = $issuedAt + 7200; // añado 1 hora --> ¿2 horas creo?
        $serverName = SERVER;

        // crea el array data para usuario
        // almaceno los datos del usuario para identificarlo 

        
        $datos = [
            'id' => $contrasena,
            'name' => $usuario
        ];

        // almaceno algunos datos para saber lo que puede editar
        // y no tener que consultar en la base de datos para cada operacion
        /*if ($tipo == "alumno") {
            $datos['idHabilidad'] = $usuario->getIdHabilidad();
            $datos['idPuntoMapa'] = $usuario->getIdPuntoMapa();
            $datos['idClase'] = $usuario->getIdClase();
            $datos['idGrupo'] = $usuario->getidGrupo();
        }*/

        $payload = [
            'iat' => $issuedAt, // cuando se genero el token
            'jti' => $tokenId, // identificador del token
            'iss' => $serverName, // servidor
            //'nbf' => $notBefore, // se podra usar no antes de
            'exp' => $expire, // cuando expira
            'data' => $datos
        ];

        //¿La clave secreta es SECRET_KEY siempre?
        $secretKey = base64_decode(SECRET_KEY);

            //¿Como pasa por encode si no tiene estos parametros exactos?
        $jwt = JWT::encode(
                        $payload, //Data to be encoded in the JWT
                        $secretKey // The signing key
                        
        );
        //Esta variable $jwt] es el token generado
        //Si ponemos en vez de $unencodedArray = ['jwt' => $jwt];

        $tokenJWT = 'Bearer '.$jwt;

        return $tokenJWT;
    }

    public static function verTokenCaducados($tokens){
            $tokensCaducados = JWT::verTokensCaducados($tokens);
        return $tokensCaducados;
    }
}