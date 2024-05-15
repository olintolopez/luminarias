
/* SE DEFINEN LAS VARIABLES GLOBALES  */
let menu    = document.querySelector('#menu-bar');
let navbar  = document.querySelector('.navbar');


/* CUANDO HACEMOS CLIC EN EL BOTÓN MENÚ */
menu.onclick = () =>{
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');

}


/* CUANDO NOS DESPLAZAMOS EN PANTALLA */
window.onscroll = () =>{
 
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  
}
  

