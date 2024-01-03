import { userAdmin } from "./user.js";
import { saveUserLog, getRolUserLog } from "./hellpers.js";

let adminLi=document.getElementById("adminLi");
checkAdmin();
let cardProductos=document.getElementById("cardProductos")
console.log(cardProductos);

function CrearCards() {
    const arrayProductos=JSON.parse(localStorage.getItem("productos"))||[]
    cardProductos.innerHTML="";
    arrayProductos.forEach(element => {
        cardProductos.innerHTML+=` <div class="card m-3" style="width: 300px;">
        <img src="${element.imgUrl}" class="card-img-top w-100" alt="${element.descripcion}">
        <div class="card-body">
          <h5 class="card-title">${element.nombre}</h5>
          <p class="card-text">${element.descripcion}</p>
          <p class="card-text">${element.precio}</p>
        </div>
      </div>`
    });
};

CrearCards();

window.Login=function() {
  saveUserLog(userAdmin);
 checkAdmin();
};

window.LogOut=function(){
  sessionStorage.removeItem("user");
  adminLi.className="nav-item d-none"
}
function checkAdmin() {
  const role=getRolUserLog();

  if (role==="Admin") {
    adminLi.className="nav-item"
  }
}