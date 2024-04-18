<?php

include_once './Base/mapping.php';

abstract class ModelBase{
	
	private $mapping;

	function SEARCH(){

		$this->mapping = new mapping($this->tabla);
		$result = $this->mapping->SEARCH($this->tabla, $this->listaAtributos, $this->valores, $this->empieza, $this->filaspagina, $this->foraneas);
		$filas = $result['resource'];

		if (!empty($filas)) { $filasenrespuesta = count($filas); } else { $filasenrespuesta = 0; }
		
		$this->mapping1 = new mapping($this->tabla);
		$result1 = $this->mapping1->SEARCH($this->tabla, $this->listaAtributos, $this->valores, 'nulo', 'nulo', $this->foraneas);
		if (!is_array($result1['resource'])) { $total = 0;} else { $total = count($result1['resource']);}

		$feedback = array('ok' => $result['ok'], 'code' => $result['code'], 'resource'=>$filas,'total'=>$total,'empieza'=>$this->empieza, 'filas'=>$filasenrespuesta, 'criteriosbusqueda' => $this->valores);
		
		return $feedback;
	}

	function ADD(){

		$this->mapping = new mapping($this->tabla);
		$result = $this->mapping->ADD($this->tabla, $this->listaAtributos, $this->valores, $this->autoincrement);
		return $result;

	}

	function EDIT(){

		$this->mapping = new mapping($this->tabla);
		$result = $this->mapping->EDIT($this->tabla, $this->listaAtributos, $this->valores, $this->clave);
		return $result;

	}

	function DELETE(){

		$this->mapping = new mapping($this->tabla);
		$result = $this->mapping->DELETE($this->tabla, $this->clave, $this->valores);
		return $result;

	}

	function SEARCH_BY(){
		$this->mapping = new mapping($this->tabla);
		$result = $this->mapping->SEARCH_BY($this->tabla, $this->clave, $this->valores, $this->foraneas);
		return $result;
	}

	

}

?>