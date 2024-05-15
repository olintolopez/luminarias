/*********
   VARIABLES GLOBALES 
*********/
let count=0;
let usersLocal=[];
let uSignUp = document.querySelector('#user_sign_up');
let uSignIn = document.querySelector('#user_sign_in');
let uProfile= document.querySelector('#user_profile');
let uSignOut= document.querySelector('#user_sign_out');

/*********
    SE INICIALIZA LOCALSTORAGE CON LA DATA DEL ARCHIVO USER.JS
*********/
const USERS_LOCAL   = users;

/*********
    SE MUESTRA LA DATA EN LAS TABLAS DE LIBROS Y USUARIOS  
*********/
const listOfUser = document.querySelector(".container-table-body-users");


/*********
    ESTA FUNCION ES PARA CHEQUEAR A LOCALSOTRAGE Y DEFINIR LA VARIABLE: USERS
*********/
const checkUsersLocalStorage = ()=>{
  if (localStorage.getItem("users")) {
       usersLocal = JSON.parse(localStorage.getItem("users"));
  } else {
    usersLocal = USERS_LOCAL;
  }
}

/******* 
    ESTA FUNCION ES PARA INICIALIZAR LA DATA DE USUARIOS EN LOCALSTORAGE
*******/
const startUsersLocalStorage = ()=>{
  if(usersLocal.length===0) {
      console.log("El array de datos user esta vacio. Por favor revise el contenido del archivo users.js");
      return false;
  }
  localStorage.setItem("users", JSON.stringify(usersLocal));
  return true;
}

/******* 
  ESTA FUNCION ES PARA INICIALIZAR EL ARRAY DE DATA DE USUARIOS: USERS
*******/
const startUsersData = ()=>{
  if (localStorage.getItem("users")) {
       usersLocal = JSON.parse(localStorage.getItem("users"));
  } else {
    usersLocal = USERS_LOCAL;
    startUsersLocalStorage();
  }
}

/******* 
    ESTA FUNCION ES PARA OBTENER LA DATA DEL USUARIO DEL FORMULARIO REGISTRO 
*******/
const getDataUserReg=()=>{

  /*********
    AQUI SE OBTIENE TODOS LOS VALORES DEL FORMULARIO
  *********/
  const fullname      = document.getElementById('fullname').value;
  const userReg       = document.getElementById('userReg').value;
  const passReg       = document.getElementById('passReg').value;
  let dataId          = document.getElementById('data_user_id').value;


  let id = 0;
  let res = false;
    
 if(dataId ==="0" || +dataId === 0){
  
  /*********
    AQUI SE OBTIENE EL MAYOR "ID" DE LA DATA DE USUARIOS REGISTRADOS    
  *********/
    id = lastUserId(usersLocal);
    id = id+1;
     
    /*********
      AQUI SE AGREGA LA DATA DEL USUARIO REGISTRADO EN LA VARIABLE USERS DEFINIDA EN LOCALSTORAGE
    *********/
    res = addUser(id,fullname,userReg,passReg);
    if (res) {
      document.getElementById('data_user_id').value = id;
      setToken(userReg);
      showTable();
    }


   }else{
    alert(+dataId === 0);
    alert('En la linea 143 de sever.js : el id_user es '+ dataId); 
    id = dataId.value;
    console.log('LA DATA DEL USUARIO SERA EDITADA');
    //res = editDataUserLocalStorage(id,fullname,userReg,passReg);
  
 }
  
  return res;
}

/******* 
    ESTA FUNCION AGREGA LA DATA AL ARRAY USERS
*******/
const addUser = (idUser,fullnameReg,userReg,passReg)=>{

  if (idUser.length === 0  ||
        fullnameReg.length === 0  ||
        userReg.length === 0 || 
        passReg.length === 0 ) {
      return false;
    }
  
    const newUser = { 
                      id:+idUser,
                      fullname: fullnameReg, 
                      username: userReg,
                      password:passReg 
                    }
    
    usersLocal.push(newUser);
    const res = startUsersLocalStorage();
    
    return res;
}
/********* 
      ESTA FUNCION CAPTURA EL ID_USER MAS GRANDE DE TODOS LA DATA DE USUARIOS 
*********/
const lastUserId = (users)=>{
  let id = 0;
  if(users.length===0) {
    alert('El array de usuarios esta vacio. Por favor introduzca un nuevo array de datos!... ');
    return;
  }else{    
     users.forEach(user=>{
        if(user.id > id) id = user.id;
     })  
  }  
  return id;
}


/******* 
    ESTA FUNCIOM ES PARA EDITAR LA DATA DE LOS USUARIOS
*******/
const editDataUserLocalStorage = (idUser,
                                  fullname,
                                  username,
                                  password)=>{
  
  /******* 
    SE CHEQUEA EL ARRAY DE USUARIOS EN LOCALSTORAGE  
  *******/
    checkUsersLocalStorage();

  /******* 
      SE OBTIENE EL ID_USER DEL USUARIO   
  *******/
    const id = document.getElementById('data_user_id').value;
    if(+idUser !== +id){
      alert("ERROR. SE OBSERVA QUE LOS ID'S SON DIFERENTES. ESTO ES  IMPOSIBLE");
      return false;
    }   

  /******* 
    SI EL ARRAY DE USUARIOS EN LOCALSTORAGE ESTA VACIO, RETORNAMOS  
  *******/
    if (usersLocal.length === 0 || usersLocal === null) {
      alert("ERROR: THE USER'S DATA IS EMPTY. THAT IS IMPOSIBBLE");
      return false;
    }

  /******* 
    EN ESTE CICLO SE REVISA LA DATA DEL USUARIO POR ID Y ACTUALIZAR   
  *******/
    for (const user of usersLocal){
      if (user.id == id) {
            user.fullname       = fullnameUser;
            user.username       = username;
            user.password       = password;;     
      }
    }  

  /******* 
    SE ACTUALIZA LA DATA DE USUARIOS EN LOCALSTORAGE 
  *******/  
    startUsersLocalStorage();

}

/******* 
    ESTA FUNCION ES PARA OBTENER LA DATA DEL USUARIO POR ID  
*******/  
const findUserById = (usersArray,id)=>{
  if (usersArray.length === 0 || usersArray === null) {
    return false;
  }
  
  for (user of usersArray){
    if (user.id == id) {
      return user;
    }
  }
}

/******* 
    ESTA FUNCION ES PARA LLENAR EL FORMYLARIO CON LA 
    DATA DEL USUARIO POR ID PARA EDITARLA. 
*******/
const getEditDataUser=()=>{
  
  /********
        PRIMERO SE REINICIA EN VACIO TODOS LOS CAMPOS DEL FORMULARIO PARA INICIAR 
  *********/
  resetFormReg(); 
  
  /********
        SE OBTIENE LA ID DE LA DATA DEL USUARIO A EDITAR 
  *********/
  const id = document.querySelector('#data_user_id').value;

  /********
        SE OBTIENE LA DATA DEL USUARIO POR EL ID 
  *********/
  const userData = findUserById(usersLocal,id);
  
  /********
        SE OBTIENE EL NOMBRE COMPLETO DEL USUARIO 
  *********/
  const fullname = document.querySelector('#fullname');
  
 /********
        SE OBTIENE EL DATO QUE ESTA EN EL CAMPO "userReg" 
  *********/
  const username = document.getElementById('userReg');
  
  /********
        SE OBTIENE EL DATO QUE ESTA EN EL CAMPO "passReg"  
  *********/
  const password = document.getElementById('passReg');
  
 /********
        SE LLENAN TODOS LOS CAMPOS DEL FORMULARIO  
 *********/

  fullname.value = userData.fullname;
  username.value = userData.username;
  password.value = userData.password;  
 
  /********
        AQUI SE HACE FOCO EN CADA UNO DE LOS CAMPOS DEL FORMULARIO
  *********/
  fullname.parentElement.children[1].className = "label active";  
  username.parentElement.children[1].className = "label active";
  password.parentElement.children[1].className = "label active";
  
}


/********
        FUNCION PARA EDITAR LOS DATOS DEL USUARIO QUE INICIA SESION
*********/
const editProfileUser=()=>{
  
  /********
        SE OBTIEME EL ID DEL USUARIO QUE QUIERE EDITAR LA DATA 
        CON LA QUE ESTA REGISTRADO 
  *********/
  const id = document.querySelector('#data_user_id').value;
  
  /********
        SE OBTIENE LA DATA DEL USUARIO POR EL ID OBTENIDO ANTERIORMENTE 
  *********/
  const userData = findUserById(usersLocal,id);
  
  /******* 
    SE CHEQUEA LA DATA  EN LOCALSTORAGE  
  *******/
    checkUsersLocalStorage();

  /******* 
    SI EL ARRAY DE USUARIOS ESTA VACIO, SE RETORNA
  *******/
    if (usersLocal.length === 0 || usersLocal === null) {
      alert("ERROR: La data del usuario esta vacia. Esto es imposible");
      return false;
    }

   /********
        SE DEFINE LA CONSTANTE "fullname" 
   *********/
   const fullname = document.querySelector('#fullname').value;
  
   /********
          SE DEFINE LA CONSTANTE "username" 
   *********/
   const username = document.getElementById('userReg').value;
         
   /********
        SE DEFINE LA CONSTANTE "password"  
   *********/
  const password = document.getElementById('passReg').value;

  /******* 
    EN ESTE CICLO SE OBTIENE LA DATA DEL USUARIO POR ID Y SE ACTUALIZA   
  *******/
    for (const user of usersLocal){
      if (user.id == id) {
            user.fullname = fullname;
            user.username = username;
            user.password = password;     
      }
    }  

  /******* 
    SE ACTUALIZA EL ARRAY USERS QUE ESTA EN LOCALSTORAGE   
  *******/  
  const res = startUsersLocalStorage();
  removeToken();
  return res;
}

/****** 
     ESTA FUNCION CARGA LA DATA POR DEFECTO
******/
const load = ()=>{
	let mydata = data;
}


const getUserIdByToken=(tokenKey)=>{
   
    if(tokenKey===null) return tokenKey;
    if (usersLocal.length === 0 || usersLocal === null) {
      return tokenKey;
    }
    
    let userId=0;
    for (user of usersLocal){
      if (user.username == tokenKey) {
        userId = user.id;
      }
    }
    
    return userId;

}


const showAllUsers = ()=>{
  startUsersData();
  listOfUser.innerHTML = "";
  usersLocal.forEach((user) => {
    const htmlUsers = `
    <div class="table_row_user" id="fila${user.id}">
      <div class="table__item__user">${user.fullname}</div>
      <div class="table__item__user">${user.username}</div>
    </div> 
      `;
    listOfUser.insertAdjacentHTML("beforeend", htmlUsers);
  });
}


const checkTokenLogin=()=>{
  const spanUser = document.getElementById('span_user');
   
  if(localStorage.getItem('token')) {
    const usern = localStorage.getItem('token');
    uSignUp.classList.add('hide_profile');
    uSignIn.classList.add('hide_profile');
    uSignOut.classList.remove('hide_profile');
    uProfile.classList.remove('hide_profile');
    spanUser.innerHTML = '<i class="fa fa-user-circle"></i>' + usern + '<i class="fa fa-caret-down"></i>';  
  }
}


const setToken =(usern)=>{
  
  const spanUser = document.getElementById('span_user');

  if(usern===null || usern==="" || usern==="undefined") {
    alert('El nombre de usuario esta vacio. Esto es un error!!!..');
    return;
  }

  localStorage.setItem('token', usern);
  
  uSignUp.classList.add('hide_profile');
  uSignIn.classList.add('hide_profile');
  uSignOut.classList.remove('hide_profile');
  uProfile.classList.remove('hide_profile');
  spanUser.innerHTML = '<i class="fa fa-user-circle"></i>' + usern + '<i class="fa fa-caret-down"></i>';
}

const getToken =()=>{
  
  if(localStorage.getItem('token')) {
    return localStorage.getItem('token')
  }else{
    return null;
  }
}

const removeToken = ()=>{
  
  const spanUser = document.getElementById('span_user');
  const userId   = document.getElementById('data_user_id');

  if(localStorage.getItem('token')) {
    localStorage.removeItem('token');
    uSignUp.classList.remove('hide_profile');
    uSignIn.classList.remove('hide_profile');
    uSignOut.classList.add('hide_profile');
    uProfile.classList.add('hide_profile');
    spanUser.innerHTML ='<i class="fa fa-user-friends"></i>' + 'Usuarios' + '<i class="fa fa-caret-down"></i>';
    userId.value = 0;
  }
} 

/******* 
    ESTA FUNCION ES PARA OBTENER LA DATA DEL USUARIO DEL FORMULARIO LOGIN Y COMPARAR
*******/
const checkUserData=(whichForm = "")=>{

  if(whichForm==='login' && localStorage.getItem('token')) removeToken();

  /*********
    SE OBTIENE LA DATA DEL FORMULARIO
  *********/
  let username ="";
  let pass     ="";

  if(whichForm ==='login'){
    username = document.getElementById('username').value;
    pass     = document.getElementById('pass').value;  
  }else{
    username = document.getElementById('userReg').value;
    pass     = document.getElementById('passReg').value;
  }
  
  let ans        = false;
  const userId   = document.getElementById('data_user_id');
  
  let UsersArray = [];
  
  if (localStorage.getItem('users')) {
     UsersArray = JSON.parse(localStorage.getItem('users'));
  }

  
  for (const user of UsersArray){
    console.log(user.username === username && user.password === pass);
    if (user.username === username && user.password === pass) {
          ans = true;
          userId.value = user.id;     
    }
  }

  if (ans) {
   setToken(username);
  }

  return ans;

}

/******* 
    SE INICIALIZA LA DATA DEL ARRAY DE USUARIOS EN LOCALSTORAGE Y SE CHEQUEA EL TOKEN  
*******/  
startUsersData();
checkTokenLogin();

