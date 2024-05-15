/*****
	SE DEFINEN LOS FORMULARIOS CON CADA UNO DE SUS ELEMENTOS
*****/
let formulario = document.formulario_registro,
	elementos  = formulario.elements;
let formLogin  = document.form_user_login,
    elemLogin  = formLogin.elements; 
let formReg    = document.form_user_register,
    elemReg    = formReg.elements;


//ESTA FUNCIOM ES PARA VALIDAR QUE LOS CAMPOS ESTEN LLENOS	
const validarInputs = function(){
	for (let i = 0; i < elementos.length; i++) {
		//SE IDENTIFCA SI EL ELEMENTO ES DE TIPO: TEXT, TEXAREA.ENAIL, PASSWORD, RADIO O CHECJBOX 
		if (elementos[i].type == "text"  || 
		    elementos[i].type == "email" ||
			elementos[i].type == "textarea" || 
			elementos[i].type == "password") {
			// SI ES DE TIPO TEXTO, EMAIL O PASSWORD SE CHEQUEA QUE LOS CAMPOS ESTEN LLENOS
			if (elementos[i].value.length == 0) {
				if(elementos[i].name === 'username')
					alert('El campo usuario Esta vacio');
				else
				   alert('El campo ' + elementos[i].name + ' Esta vacio');
				elementos[i].className = elementos[i].className + " error";
				return false;
			} else {
				elementos[i].className = elementos[i].className.replace(" error", "");
			}
		}
	}

	// AQUI SE COMPARAN LOS DOS PASSWORD INTRODUCIDOS  //	
	if (elementos.pass && elementos.pass.value !== elementos.pass2.value) {
		elementos.pass.value = "";
		elementos.pass2.value = "";
		elementos.pass.className = elementos.pass.className + " error";
		elementos.pass2.className = elementos.pass2.className + " error";
	} else if(elementos.pass) {
		elementos.pass.className = elementos.pass.className.replace(" error", "");
		elementos.pass2.className = elementos.pass2.className.replace(" error", "");
	}

	return true;
};

// ESTA FUNCION ES PARA VALIDAR EL INICIO DE SESION 
const validateInputsLogin = function(){
	
	for (let i = 0; i < elemLogin.length; i++) {
		// SE IDENTIFCA SI LA ENTRADA ES DE TIPO TEXTO, PASSWORD
		
		if (elemLogin[i].type == "text"  ||  
			elemLogin[i].type == "password") {
			// SI ES DE YIPO TEXTO, EMAIL O PASSWORD SE CHEQUEA QUE LOS CAMPOS ESTEN LLENOS
			
			if (elemLogin[i].value.length === 0) {
				
				//alert('El campo ' + elemLogin[i].name + ' esta vacio');
				elemLogin[i].className = elemLogin[i].className + " error";
				
			} else {
				elemLogin[i].className = elemLogin[i].className.replace(" error", "");
				
			}
		}
	}

	return true;
};

/*********
	  ESTA FUNCION ES PARA VALIDAR LOS RADIOS BOTONES
*********/

const validarRadios = function(){
	if(!document.getElementsByName('status')) return true;

	const opciones = document.getElementsByName('status');
	let	resultado  = false;
    
	for (let i = 0; i < elementos.length; i++) {
		if(elementos[i].type == "radio" && elementos[i].name == "status"){
			// SE CHEQUEA CADA UNO DE LOS RADIOS BOTONES
			for (let o = 0; o < opciones.length; o++) {
				if (opciones[o].checked) {
					resultado = true;
					break;
				}
			}

			if (resultado == false) {
				elementos[i].parentNode.className = elementos[i].parentNode.className + " error";
				alert('El capo status no esta marcado');
				return false;
			} else {
				elementos[i].parentNode.className = elementos[i].parentNode.className.replace(" error", "");
				return true;
			}
		}
	}
};

/*********
	  ESTA FUNCION ES PARA VALIDAR LOS CHECKBOX
*********/
const validarCheckbox = function(){
	
	if(!document.getElementsByName('terminos')) return true;

	const opciones = document.getElementsByName('terminos');
	let resultado  = false;

	for (let i = 0; i < elementos.length; i++) {
		if(elementos[i].type == "checkbox"){
			for (let o = 0; o < opciones.length; o++) {
				if (opciones[o].checked) {
					resultado = true;
					break;
				}
			}

			if (resultado == false) {
				elementos[i].parentNode.className = elementos[i].parentNode.className + " error";
				console.log('El campo checkbox no esta marcado');
				return false;
			} else {
				// We remove the Error class from the checkbox
				elementos[i].parentNode.className = elementos[i].parentNode.className.replace(" error", "");
				return true;
			}
		}
	}
};

/*********
	  ESTA FUNCION ES PARA NOTIFICAR QUE LA DARA SERA ENVIADA A LOCALSTORAGE
*********/
const enviar = function(e){
	if (!validarInputs()) {
		console.log('HAY UN CAMPO VACIO.. POR FAVOR REVISE');
	} else if (!validarRadios()) {
		console.log('TODOS LOS CAMPOS TIPOS RADIO NO ESTAN MARCADOS ');
	} else {
		console.log('LA DATA SERA ENVIADA A LOCALSTORAGE!.... ');
	}
};

const loginFunction = (e)=>{
	if (!validateInputsLogin()) {
		console.log('HAY UN CAMPO VACIO EN EL FORMULARIO DE INICIO DE SESION.. POR FAVOR REVISE');
	}  else {
		console.log('LA DATA EL USUARIO SERA COMPARADA CON LA QUE ESTA EN LOCALSTORAGE.... ');
	}
}

/*********
	  ESTA FUNCION ES PARA HACER "FOCUS" EM LOS CAMPOS TEXT Y TEXTAREA
*********/
const focusInput = function(){
	this.parentElement.children[1].className = "label active";
	this.parentElement.children[0].className = this.parentElement.children[0].className.replace("error", "");
};

/*********
\	  ESTA FUNCION ES PARA HACER "BLUR" EM LOS CAMPOS TEXT Y TEXTAREA
*********/
const blurInput = function(){
	if (this.value <= 0) {
		this.parentElement.children[1].className = "label";
		this.parentElement.children[0].className = this.parentElement.children[0].className + " error";
	}
};

/********* 
	  ESTA FUNCION ES CUANDO SE PULSA EL BOTON SUBMIT Y GUARDAR LA DATA EN LOCALSOTARGE
*********/
formulario.addEventListener("submit",(e)=>{
	e.preventDefault();
	enviar(e);
},true);


/*********
	  ESTE CICLO ES PARA HACER "FOCUS" Y "BLUR" EN CADA CAMPO DEL FORMULARIO
*********/
for (let i = 0; i < elementos.length; i++) {
	if (elementos[i].type == "text"  || 
	    elementos[i].type == "email" ||
		elementos[i].type == "textarea" || 
		elementos[i].type == "password") {
		elementos[i].addEventListener("focus", focusInput);
		elementos[i].addEventListener("blur", blurInput);
	}
}

/******* 
	ESTA FUNCION REINICIA EL FORMULARIO PARA AGREGAR NVA DATA DE UN LIBRO
*******/ 
const resetForm=()=>{

	const dataId = document.getElementById('data__id');
	dataId.value="";

	const titleForm = document.querySelector('#title_form');
	titleForm.textContent = "Add Book's data ";
	/******* 
       AQUI SE INICIALIZA EL ATRIBUTO "SRC" DEL OBJETO IMG
	*******/
	document.getElementById('img-preview').src="./assets/images/image-upload.png";
    
	/******* 
       AQUI SE CAPTURA EL CAMPO "TITULO" Y SE REINICIA EN VACIO
	*******/
	const title  = document.getElementById('title'); 
	title.value  = "";
	
	/******* 
       AQUI SE CAPTURA EL CAMPO "AUTOR" Y SE REINICIA EN VACIO 
    *******/
	const author = document.getElementById('author')
	author.value="";

	/******* 
       AQUI SE CAPTURA EL CAMPO DESCRIPCION Y SE REINICIA EN VACIO
	*******/
	const description = document.getElementById('description'); 
	description.value="";

	/******* 
	   AQUI SE DESENFOCAN LOS CAMPOS
    *******/
	title.parentElement.children[1].className = "label";  
    author.parentElement.children[1].className = "label";
    description.parentElement.children[1].className = "label";
	
    /******* 
	   AQUI SE DESMARCAN LOS CAMPOS RADIO PARA DEFINIR EL STATUS
    *******/ 
	document.getElementById('read').checked=false;
	document.getElementById('notread').checked=false;		
}

/********* 
	  ESTE EVENTO ES CUANDO SE HACE SUBMIT EM EL FORMULARIO 
	  DE INICIO PARA COMPARAR LA DATA AL INICIAR SESION, 
*********/
formLogin.addEventListener("submit",(e)=>{
	e.preventDefault();
	loginFunction(e);
},true);


/*********
	  ESTE SENTENCIAS ES PARA HACER FOCUS Y BLUR EN CADA CAMO DEL 
	  FORMULARIO DE INICIO DE SESION 
*********/

for (let i = 0; i < elemLogin.length; i++) {
	if (elemLogin[i].type == "text"  || 
	    elemLogin[i].type == "password") {
		elemLogin[i].addEventListener("focus", focusInput);
		elemLogin[i].addEventListener("blur", blurInput);
	}
}

/*********
    ESTA FUNCION VERIFICA QUE EL FORMULARIO DE INICIO DE SESION ESTE LLENO
*********/
const filledFormLogin=()=>{
  

	/******* 
       SE CAPTURA EL VALOR DEL CAMPO USERNAME
    *******/
	const username  = document.getElementById('username').value;
	   
	/******* 
		  SE CAPTURA EL VALOR DEL CAMPO PASSWORD 
	*******/
	const pass = document.getElementById('pass').value;
	
    if(username!=="" && pass!=="") return true; else return false;  


}

/*********
    ESTA FUNCION REINICIA EL FORMULARIO DE INICIO DE SESION
*********/
const resetFormLogin=()=>{

	/******* 
       AQUI SE REINICIA EL CAMPO USERNAME A VACIO 
    *******/
	const username  = document.getElementById('username'); 
	username.value  = "";
	
	/******* 
       AQUI SE REINICIA EL CAMPO PASSWORD A VACIO 
    *******/
	const pass = document.getElementById('pass');
	pass.value = "";

	/******* 
       AQUI DESENFOCAMOS LOS DOS CAMPOS
    *******/
	username.parentElement.children[1].className = "label";  
    pass.parentElement.children[1].className = "label";
	
	return false;
}

/*********************
    FUNCIONES PARA GESTIONAR EL REGISTRO DE USUARIOS 
**********************/
const validateInputsRegister = function(){

	for (let i = 0; i < elemReg.length; i++) {
		// SE IDENTICICA SE EL ELEMENTO ES DE TIPO: TEXT, TEXTAREA, EMAIL PASSWURD, RADIO O CHECKBOX
		if (elemReg[i].type == "text"  || 
			elemReg[i].type == "password") {
			// SI ES DE TIPO TEXT, PASSWORD SE CHEQUEA QUE ESTEN LLENOS
			if (elemReg[i].value.length == 0) {
				if(elemReg[i].name === 'fullname')
					alert('El campo "Nombre completo" esta vacio');
				else if(elemReg[i].name === 'userReg')
					alert('El campo "Usuario" esta vacio');
				else if(elemReg[i].name === 'passReg')
					alert('El campo "Password" esta vacio');
				else
				    alert('El campo ' + elemReg[i].name + ' esta vacio');
				elemReg[i].className = elemReg[i].className + " error";
				return false;
			} else {
				elemReg[i].className = elemReg[i].className.replace(" error", "");
			}
		}
	}

	// SE COMPARAN LOS PASSWORDS  //	
	if (elemReg.pass && elemReg.pass.value !== elemReg.pass2.value) {
		elemReg.pass.value = "";
		elemReg.pass2.value = "";
		elemReg.pass.className = elemReg.pass.className + " error";
		elemReg.pass2.className = elemReg.pass2.className + " error";
		return false;
	} else if(elemReg.pass === '') {
		elemReg.pass.className = elemReg.pass.className.replace(" error", "");
		elemReg.pass2.className = elemReg.pass2.className.replace(" error", "");
		return false;
	}

	return true;
};

/*********************
    FUNCION PARA EJECUTAR EL REGISTRO DE USUARIOS 
**********************/
const RegisterFunction = (e)=>{
	
	
	if (!validateInputsRegister()) {
		console.log('Hay un campo vacio en el formulario registro.. Por favor revise');
	    //alert('Hay un campo vacio en el formulario registro.. Por favor revise');
	}  else {
		console.log('LA DATA DEL USUARIO SERA ENVIADA A LOCALSTORAGE.... ');
		//alert('LA DATA DEL USUARIO SERA ENVIADA A LOCALSTORAGE.... ');
	}
	return false;
}

/********* 
      ESTE EVENTO SE EJECUTA CUANDO SE PRESIONA EL BOTON SUBMIT DEL FORMULARIO REGISTRO
*********/
formReg.addEventListener("submit",(e)=>{
	e.preventDefault();
	RegisterFunction(e);
},true);


/*********
	  ESTE CICLO ES PARA HACER "FOCUS" Y "BLUR" EN CADA ELEMENTO DEL FORMULARIO REGISTRO 
*********/
for (let i = 0; i < elemReg.length; i++) {
	if (elemReg[i].type == "text"  || 
	    elemReg[i].type == "password") {
		elemReg[i].addEventListener("focus", focusInput);
		elemReg[i].addEventListener("blur", blurInput);
	}
}

/*********
	  ESTE FUNCION ES PARA VERIFICAR QUE EL FORMULARIO REGISTRO ESTE LLENO
*********/
const filledFormReg=()=>{
  

	/******* 
        AQUI SE CAPTURA EL VALOR DEL CAMPO FULLNAME 
    *******/
	const fullname  = document.getElementById('fullname').value;
	
    /******* 
        AQUI SE CAPTURA EL VALOR DEL CAMPO USERNAME
    *******/
	const userReg  = document.getElementById('userReg').value;

	/******* 
		  AQUI SE CAPTURA EL VALOR DEL CAMPO PASSWORD 
	*******/
	const passReg = document.getElementById('passReg').value;
	
    if(fullname!=="" && userReg!=="" && passReg!=="") return true; else return false;  


}

/*********
	  ESTE FUNCION ES PARA REINICIAR EL FORMULARIO REGISTRO 
*********/
const resetFormReg=()=>{

	/******* 
        SE REINICIA EEL CAMPO FULLNAME 
    *******/
	const fullname  = document.getElementById('fullname'); 
	fullname.value  = "";

	/******* 
        SE REINICIA EL CAMPO USERNAME 
    *******/
	const userReg  = document.getElementById('userReg'); 
	userReg.value  = "";
	
	/******* 
        SE REINIICIA EL CAMPO PASSWORD 
    *******/
	const passReg = document.getElementById('passReg');
	passReg.value = "";

	/******* 
         SE DESEMFUCA CADA UNO DE LOS CAMPOS DEL FORMNULARIO REGISTRO
    *******/
	fullname.parentElement.children[1].className = "label";  
    userReg.parentElement.children[1].className = "label";
	passReg.parentElement.children[1].className = "label";
	
	return false;
}


