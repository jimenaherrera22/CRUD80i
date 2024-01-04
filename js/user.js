import { saveUserLog, getRolUserLog } from "./hellpers.js";

let inputEmail=document.getElementById("email");
let inputPassword=document.getElementById("password");
let formLogin=document.getElementById("formLogin");
let adminLi=document.getElementById("adminLi");
formLogin.addEventListener("submit",Login);

checkOrSaveAdmin();

function Login(e) {
    e.preventDefault();
    console.log("Desde login");
    const usuariosRegistrados=JSON.parse(localStorage.getItem("users"));
    if (usuariosRegistrados.length >0 && usuariosRegistrados!== null ) {
        console.log("Existen usuarios Registrados");
        const usuarioEncontrado=usuariosRegistrados.find((element)=>element.email===inputEmail.value);
        if (usuarioEncontrado!==undefined) {
            if (usuarioEncontrado.password===inputPassword.value) {
                const savedUser={
                    email:usuarioEncontrado.email,
                    role:usuarioEncontrado.role
                };
                saveUserLog(savedUser);
                checkAdmin(adminLi);
                formLogin.reset();
                $("#exampleModal").modal("hide")
            }else{
                console.log("Email o pasword incorrectos");
            }
        }else{
            console.log("Email o password incorrectos");
        }
    }else{
        console.log("No existen usuarios registrados");
    }
}

window.LogOut=function(){
    sessionStorage.removeItem("user");
    adminLi.className="nav-item d-none"
    window.location.replace("/index.html")
  }
  export function checkAdmin(adminLi) {
    const role=getRolUserLog();
  
    if (role==="Admin") {
      adminLi.className="nav-item"
    }
  }

  function checkOrSaveAdmin(){
    const arrUsers=JSON.parse(localStorage.getItem("users"));
    const userAdmin={
    
    email:"comision80i@gmail.com",
    role:"Admin",
    password:"Password_123",


};
if (arrUsers===null) {
        const users=[userAdmin];      
        localStorage.setItem("users", JSON.stringify(users));
    
  }else if (arrUsers.length===0) {
    const users=[userAdmin];     
    localStorage.setItem("users", JSON.stringify(users));
  }
   }