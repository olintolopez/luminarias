let encendidas = [false,false,false];
let inputs    = document.querySelectorAll(".onoffswitch-checkbox");
let bombillas = document.querySelectorAll(".bombilla");
let onoffswitch_switch = document.querySelectorAll(".onoffswitch-switch");
  
function encender(i){
    
    if(encendidas[i]==false){
        bombillas[i].classList= "bombilla encendida"+i;
        encendidas[i] = true;
        inputs[i].checked = false;
    }else{
        bombillas[i].classList= "bombilla";
        encendidas[i] = false;
        inputs[i].checked = true; 
    }
}
