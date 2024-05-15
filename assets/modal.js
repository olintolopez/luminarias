/******
     SE DEFINEN TODAS LAS VARIABLES GLOBALES 
*******/
let modal               = document.getElementById('miModal');
let flex                = document.getElementById('flex');
let open                = document.getElementById('abrir');

let btnSubmit           = document.getElementById('btn-submit');
let dataId              = document.getElementById('data__id');

let modalUser           = document.getElementById('modal_user');
let userLogin           = document.getElementById('user_sign_in');
let closeUserLogin      = document.getElementById('close_user_login');
let btnSubmitLogin      = document.getElementById('btn-submit-login');
let spanUser            = document.getElementById('span_user');
let myDropdown          = document.getElementById('myDropdown');
let dropbtn             = document.querySelector('.dropdown');
let userSignOut         = document.getElementById('user_sign_out');

let userSignUpModal     = document.getElementById('user_sign_up');
let modalRegister       = document.getElementById('modal_Register');
let closeRegisterUs     = document.getElementById('close_register_user');
let btnSubmitReg        = document.getElementById('btn-submit-Register');

let userProfile         = document.getElementById('user_profile');
let titleUser           = document.querySelector('.title_user_register');

/******
     ESTE EVENTO SE EJECUTA CUANDO SE INICIA SESION 
*******/
btnSubmitLogin.addEventListener('click',function(){
    
    //const dataUser = spanUser.textContent;
    const res      = checkUserData('login');
    const token    = getToken();
    
    if(token === null && !res) {
        
        if(filledFormLogin()) {
           
            agregarToast(
                            { 
                                tipo: 'warning', 
                                titulo: 'ADVERTENCIA', 
                                descripcion: 'Datos incorrectos o usuario no registrado', 
                                autoCierre: true 
                            }
                        );
            resetFormLogin();            
        }
        
        /* modalUser.style.display='none'; */ 
    }else{
        if(res){
            
            agregarToast(
                            { 
                                tipo: 'exito', 
                                titulo: 'BIENVENIDO', 
                                descripcion: 'Inicia sessión el usuario ' + token, 
                                autoCierre: true 
                            }
                        );
            modalUser.style.display='none';
         }else{
            agregarToast(
                            { 
                                tipo: 'error', 
                                titulo: 'ERROR', 
                                descripcion: 'Datos incorrectos o usuario no registrado', 
                                autoCierre: true 
                            }
                        );
            //resetFormLogin();
            /* modalUser.style.display='none'; */            
            
         }
         
    } 
     
})

/******
     ESTE EVENTO SE EJECUTA CUANDO SE REGISTRA LA DATA DE UN USUARIO 
*******/
btnSubmitReg.addEventListener('click',function(){
    
    const res      = checkUserData();
    const token    = getToken();
    /* agregarToast(
                    { 
                        tipo: 'error', 
                        titulo: 'ERROR', 
                        descripcion: 'Este es el token en el submit registro ' + token, 
                        autoCierre: true 
                    }
                ); */
    let titleUser = document.querySelector('.title_user_register');
    //titleUser.textContent="Registrado existosamente la data del usuario"

    if(filledFormReg()) {

        if(token === null && !res) {
        
            agregarToast(
                            { 
                                tipo: 'info', 
                                titulo: 'INFORMACION', 
                                descripcion: 'Se va a agregar un nuevo usuario', 
                                autoCierre: true 
                            }
                        );
            const resp = getDataUserReg();
            //modalRegister.style.display = 'none';    

        }else{
            const res = editProfileUser();
            if(res) 
                
                agregarToast(
                                { 
                                    tipo: 'exito', 
                                    titulo: 'PERFECTO', 
                                    descripcion: 'Se edito existosamente el perfil del usuario', 
                                    autoCierre: true 
                                }
                            ); 
            else 
            agregarToast(
                { 
                    tipo: 'error', 
                    titulo: 'CARAMBA', 
                    descripcion: 'Lamentablemente fallo la ediccion del perfil', 
                    autoCierre: true 
                }
            );
             
        }

        modalRegister.style.display = 'none';
    }
    
})

/******
     ESTE EVENTO SE EJECUTA CUANDO SE VA A EDITAR LA DATA DEL USUARIO 
*******/
userProfile.addEventListener('click',function(e){
    e.preventDefault();
    const token   = getToken();
    let titleUser = document.querySelector('.title_user_register');

    if(token!=="" || token!==null) 
      titleUser.textContent="Editar data del usuario";

    getEditDataUser();
    
    modalRegister.style.display='block';

})

/******
     ESTE EVENTO SE EJECUTA CUANDO SE MUESTRA EL FORMULARIO DE INICIO DE SESION 
*******/
userLogin.addEventListener('click',function(e){
     e.preventDefault();
     //resetFormLogin();
     modalUser.style.display='block';
})

/******
     ESTE EVENTO SE EJECUTA CUANDO SE CIERRA SESION 
*******/
userSignOut.addEventListener('click',function(e){
    e.preventDefault();
    removeToken();
    
    agregarToast(
        { 
            tipo: 'exito', 
            titulo: 'PERFECTO', 
            descripcion: 'Has cerrado sesión correctamente', 
            autoCierre: true 
        }
    );

})

/******
     ESTE EVENTO SE EJECUTA CUANDO SE ABRE EL MENU 
*******/
dropbtn.addEventListener('click',function(e){
    e.preventDefault();
    document.getElementById("myDropdown").classList.add("show");
})
/******
     ESTE ES PARA MOSTRAR EL MENU DE USUARIO 
*******/
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

/****** 
 CIERRRA EL MENU DEL USUARIO PRESIONA FUERA DE ESTE
*******/
window.onclick = (e)=> {
    if (!e.target.matches('.dropbtn')) {
       if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
    }
}
/******
     ESTE EVENTO SE EJECUTA CUANDO SE PRESIONA EL BOTON 
     DE CERRAR EL FORMULARIO DE INICIO DE SESION  
*******/
closeUserLogin.addEventListener('click',function(){
    modalUser.style.display='none';
})


/******
     ESTE EVENTO SE EJECUTA CUANDO SE VA A REGISTRAR O EDITAR LA DATA DEL USUARIO  
*******/
userSignUpModal.addEventListener('click', function(e){
    e.preventDefault();
    resetFormReg();
    let titleUser = document.querySelector('.title_user_register');
    titleUser.textContent="Registro";
    const res = getDataUserReg();
    modalRegister.style.display='block';
})

/******
     ESTE EVENTO SE EJECUTA CUANDO SE PRESIONA EL BOTON 
     DE CERRAR EL FORMULARIO DE REGISTRO  
*******/
closeRegisterUs.addEventListener('click',function(e){
    e.preventDefault();
    modalRegister.style.display='none';
})

/******
     ESTE MUESTRA LA NOTIFICACION QUE EXPLICA QUE DEBE ESTAR REGISTRADO E INICIAR SESION 
     CUANDO SE PULSA EL BOTON HABITACIONES. CUANDO ESTE INICIADO LA SESION REDIRIGE A LA
     VISTA HABITACIONES.HTML. 
*******/
open.addEventListener('click', function(e){
    e.preventDefault();
    const token = getToken();
    if(token===null){
        
          agregarToast(
                            { 
                                tipo: 'info', 
                                titulo: 'IMPORTANTE', 
                                descripcion: 'Debes estar registrado como usuario y si lo estas, puedes iniciar sesión', 
                                autoCierre: false 
                            }
                      );
    }else{
        /**** REDIRIGE A LA VISTA DE HABITACIONES  *****/ 
        document.location.href="habitaciones.html";
    }
    

});


window.addEventListener('click', function(e){
    if(e.target == flex){
        modal.style.display = 'none';
    }
});
