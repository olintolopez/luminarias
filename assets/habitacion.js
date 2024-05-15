let ocupadas   = [false];
let inputsHab  = document.querySelectorAll(".hab_checkbox");

function habitacion(i){
    
    if(ocupadas[i]==false){
        ocupadas[i] = true;
        inputsHab[i].checked = true;
        if(i===0) {
            document.getElementById('habOcup').innerText="Inhabilitado";
                          agregarToast(
                            { 
                                tipo: 'info', 
                                titulo: 'INFORMACION', 
                                descripcion: 'Habitación Inhabilitada', 
                                autoCierre: true 
                            }
                          );
        }else {
            document.getElementById('habVac').innerText="Vacante";
            
              agregarToast(
                { 
                    tipo: 'info', 
                    titulo: 'INFORMACION', 
                    descripcion: 'Hay vacante', 
                    autoCierre: true 
                }
              );
        } 
         
    }else{
        ocupadas[i] = false;
        inputsHab[i].checked = false;
        if(i===0) {
            document.getElementById('habOcup').innerText="Habilitado";
            
              agregarToast(
                            { 
                                tipo: 'info', 
                                titulo: 'INFORMACION', 
                                descripcion: 'En este momento la Habitación esta en uso', 
                                autoCierre: true 
                            }
                          );
        }
        else 
        {
            document.getElementById('habVac').innerText="No hay vacante";
            
              agregarToast(
                            { 
                                tipo: 'info', 
                                titulo: 'INFORMACION', 
                                descripcion: 'En este momento no hay vacante disponible', 
                                autoCierre: true 
                            }
                          );
        }
    }
}


