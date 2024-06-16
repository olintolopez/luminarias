let banos   = [false];
let InputsBan  = document.querySelectorAll(".banos_checkbox");

function bano(i){
    
    if(banos[i]==false){
        banos[i] = true;
        InputsBan[i].checked = true;
        if(i===0) {
            document.getElementById('banoHab').innerText="Habilitado";
                          agregarToast(
                            { 
                                tipo: 'info', 
                                titulo: 'INFORMACION', 
                                descripcion: 'Sensor baño habilitado', 
                                autoCierre: true 
                            }
                          );
        }else {
            document.getElementById('banoVac').innerText="Vacio";
            
              agregarToast(
                { 
                    tipo: 'info', 
                    titulo: 'INFORMACION', 
                    descripcion: 'Sensor baño vacio', 
                    autoCierre: true 
                }
              );
        } 
         
    }else{
        banos[i] = false;
        InputsBan[i].checked = false;
        if(i===0) {
            document.getElementById('banoHab').innerText="Inhabilitado";
            
              agregarToast(
                            { 
                                tipo: 'info', 
                                titulo: 'INFORMACION', 
                                descripcion: 'Sensor baño inhabilitado', 
                                autoCierre: true 
                            }
                          );
        }
        else 
        {
            document.getElementById('banoVac').innerText="Ocupado";
            
              agregarToast(
                            { 
                                tipo: 'info', 
                                titulo: 'INFORMACION', 
                                descripcion: 'Sensor baño ocupado', 
                                autoCierre: true 
                            }
                          );
        }
    }
}