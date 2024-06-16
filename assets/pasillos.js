let pasillos   = [false];
let inputsPas  = document.querySelectorAll(".pasillos_checkbox");

function pasillo(i){
    
    if(pasillos[i]==false){
        pasillos[i] = true;
        inputsPas[i].checked = true;
        if(i===0) {
            document.getElementById('pasilloHab').innerText="Habilitado";
                          agregarToast(
                            { 
                                tipo: 'info', 
                                titulo: 'INFORMACION', 
                                descripcion: 'Sensor pasillo habilitado', 
                                autoCierre: true 
                            }
                          );
        }else {
            document.getElementById('PasilloVac').innerText="Vacio";
            
              agregarToast(
                { 
                    tipo: 'info', 
                    titulo: 'INFORMACION', 
                    descripcion: 'Sensor pasillo vacio', 
                    autoCierre: true 
                }
              );
        } 
         
    }else{
        pasillos[i] = false;
        inputsPas[i].checked = false;
        if(i===0) {
            document.getElementById('pasilloHab').innerText="Inhabilitado";
            
              agregarToast(
                            { 
                                tipo: 'info', 
                                titulo: 'INFORMACION', 
                                descripcion: 'Sensor pasillo Inhabilitado', 
                                autoCierre: true 
                            }
                          );
        }
        else 
        {
            document.getElementById('PasilloVac').innerText="Ocupado";
            
              agregarToast(
                            { 
                                tipo: 'info', 
                                titulo: 'INFORMACION', 
                                descripcion: 'Sensor pasillo ocupado', 
                                autoCierre: true 
                            }
                          );
        }
    }
}