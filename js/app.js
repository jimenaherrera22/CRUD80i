import { checkAdmin } from "./user.js";

let adminLi=document.getElementById("adminLi");
checkAdmin(adminLi);
let cardProductos=document.getElementById("cardProductos")
// console.log(cardProductos);

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



