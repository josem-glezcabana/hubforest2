async function getListCharacteristicSample() {

    return peticionBackGeneral('', 'characteristic_sample', 'SEARCH_CHARACTERISTIC_SAMPLE')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaCharacteristicSample(response['resource']) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });   
}

async function getListByParamCharacteristicSample(id_unit, id_characteristic) {
    const characteristic_sample = {
        id_unit: id_unit,
        id_characteristic: id_characteristic
    };

  try {
    const response = await peticionBackGeneral('', 'characteristic_sample', 'SEARCH_BY', characteristic_sample);

    if (response['code'] === "RECORDSET_DATOS") {
      const datos = response['resource'];

      const updatedDatos = await Promise.all(
        datos.map(async (element) => {
          const unit = await getUnitPorId(element.id_unit);
          const characteristic = await getCharacteristicPorId(element.id_characteristic);
          // Crear un nuevo objeto con las propiedades actualizadas
          return {
            ...element,
            name_unit: unit[0].name_unit,
            name_characteristic: characteristic[0].name_characteristic
          };
        })
      );

      return construyeTablaCharacteristicSample(updatedDatos);
    } else {
      return mostrarErrorBusq();
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return null;
  }    
}

async function addCharacteristicSample(id_unit, id_characteristic) {
    const characteristic_sample = {
        id_unit: id_unit,
        id_characteristic: id_characteristic
    };

    return peticionBackGeneral('', 'characteristic_sample', 'ADD', characteristic_sample)
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

async function deleteCharacteristicSample(id_unit, id_characteristic) {
    
    return peticionBackGeneral('', 'characteristic_sample', 'DELETE', {'id_unit': id_unit,'id_characteristic': id_characteristic})
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListUnits(unit) {
    return peticionBackGeneral('', 'unit', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectUnits("id_unit", response['resource'], unit) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListCharacteristics(characteristic) {
    return peticionBackGeneral('', 'characteristic', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectCharacteristics("id_characteristic", response['resource'], characteristic) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getUnitPorId(id_unit) {
    const unit = {
        id_unit: id_unit
    };
    return peticionBackGeneral('', 'unit', 'SEARCH_BY', unit)
        .then(response => response['resource'])
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getCharacteristicPorId(id_characteristic) {
    const characteristic = {
        id_characteristic: id_characteristic
    };
    return peticionBackGeneral('', 'characteristic', 'SEARCH_BY', characteristic)
        .then(response => response['resource'])
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

function construyeTablaCharacteristicSample(filas) {

    let filasTabla = '';
    let element = document.getElementById("datosCharacteristicSample");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    $("#datosCharacteristicSample").html("");
    filas.forEach(fila => {


        filasTabla += '<tr> <td>' + fila.name_unit + 
                '</td> <td>' + fila.name_characteristic + 
                '</td> <td class="text-center"><button class="BotonEliminarCharacteristicSample btn btn-danger" id="borrarSampling" onclick="mostrarBorrarCharacteristicSample(' + fila.id_unit + ',' + fila.id_characteristic  + ')">Eliminar</button>'
                '</td>  </tr>';
    });
    
    recuperarYComprobarUsuarioLogeadoIsAdmin().then(resultado => {
        if (!resultado) {
            let elements = document.getElementsByClassName('BotonEliminarCharacteristicSample');
            for (let e of elements) {
                e.style.display = 'none';
            }
            $("#abrirModal").hide();
        } else {
            let elements = document.getElementsByClassName('BotonEliminarCharacteristicSample');
            for (let e of elements) {
                e.style.display = 'block';
            }
            $("#abrirModal").show();
        }
    });

    $("#datosCharacteristicSample").append(filasTabla);
    cerrarModal();
    setLang();
}

function getAtributos(tipo){
    var id_unit = document.getElementById("id_unit").value
    var id_characteristic= document.getElementById("id_characteristic").value
        switch(tipo){
            case "AñadirCharacteristicSample":
                addCharacteristicSample(id_unit, id_characteristic)
                break;
            case "BuscarCharacteristicSample":
                getListByParamCharacteristicSample(id_unit, id_characteristic)
                break;
        }
    
}

function mostrarModalCharacteristicSample(tipo, id_unit=null, id_characteristic=null){
    // Ventana modal
    document.getElementById("ventanaModal").style.display = "block";
    document.getElementById("Titulo").innerHTML = '<h2 class="'+tipo+'">'+tipo+'</h2>';
    document.getElementById("aceptar").classList.add(tipo);

    getListUnits(id_unit);
    getListCharacteristics(id_characteristic);

        if(tipo.includes("Buscar")){
            document.getElementById("id_unit").required = false;
            document.getElementById("id_characteristic").required = false;

            $("#formCharacteristicSample").attr('action' , 'javascript:getAtributos("BuscarCharacteristicSample");');
        }
        else{
            document.getElementById("id_unit").required =true;
            document.getElementById("id_characteristic").required = true;

            $("#formCharacteristicSample").attr('action' , 'javascript:getAtributos("AñadirCharacteristicSample");');
        }

        $("#id_unit").val('');
        $("#id_characteristic").val('');
    setLang();
    document.getElementById("aceptar").classList.remove(tipo);
}

  function rellenarSelectUnits(tipo, filas, unit) {
    let element = document.getElementById(tipo);
    let option = document.createElement('option');
    
    // Eliminar opciones existentes antes de agregar las nuevas
    element.innerHTML = '';
    
    filas.forEach(fila => {
        option = document.createElement('option');
        option.value = fila.id_unit;
        option.textContent = fila.name_unit;
        element.appendChild(option);
    })
    
    if (unit != null) element.value = unit;
    
  }
  
  function rellenarSelectCharacteristics(tipo, filas, characteristic) {
    let element = document.getElementById(tipo);
    let option = document.createElement('option');
    
    // Eliminar opciones existentes antes de agregar las nuevas
    element.innerHTML = '';
    
    filas.forEach(fila => {
        option = document.createElement('option');
        option.value = fila.id_characteristic;
        option.textContent = fila.name_characteristic;
        element.appendChild(option);
    })
    
    if (characteristic != null) element.value = characteristic;
    
  }

function cerrarModal(){
    // Ventana modal
    var modal = document.getElementById("ventanaModal");
    modal.style.display = "none"
}
function mostrarBorrarCharacteristicSample(id_unit, id_characteristic){
  // Ventana modal
  const attributes = [id_unit, id_characteristic]
  document.getElementById("comprobarBorrar").style.display = "block";
  $("#idBorrar").val(attributes)
  $("#formBorrarCharacteristicSample").attr('action' , 'javascript:borrarCharacteristicSample();');
}

function borrarCharacteristicSample(){
  var ids = $("#idBorrar").val();
  var idArray = ids.split(","); 
    // Obtener los IDs por separado
    var id_unit = idArray[0];
    var id_characteristic = idArray[1];
    
  deleteCharacteristicSample(id_unit, id_characteristic)
}