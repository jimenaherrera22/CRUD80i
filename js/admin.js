import { validarInputRequerido, validarInputDescripcion, validarInputPrecio, validarInputUrl, validarTodo, obtenerCodigoAleatorio } from "./hellpers.js";

let arrProductos=JSON.parse(localStorage.getItem("productos"))||[]
let bodyTabla=document.querySelector("tbody")
let inputCodigo=document.getElementById("codigo");
let inputNombre=document.getElementById("nombre");
let inputDescripcion=document.getElementById("descripcion");
let inputPrecio=document.getElementById("precio");
let inputImgURL=document.getElementById("imgURL");

let form=document.querySelector("form");

form.addEventListener("submit", GuardarProducto);

inputCodigo.value=obtenerCodigoAleatorio();

inputCodigo.addEventListener("blur",()=>{
    validarInputRequerido(inputCodigo)
});

inputNombre.addEventListener("blur",()=>{
    validarInputRequerido(inputNombre)
});

inputDescripcion.addEventListener("blur",()=>{
    validarInputDescripcion(inputDescripcion)
});

inputPrecio.addEventListener("blur",()=>{
    validarInputPrecio(inputPrecio)
});

inputImgURL.addEventListener("blur",()=>{
    validarInputUrl(inputImgURL)
});
//Llamamos a la funcion Listar Productos para crear filas en nuestra tabla
ListarProductos();

function GuardarProducto(e) { //e=event
    e.preventDefault();
    if (validarTodo(inputCodigo, inputNombre, inputDescripcion, inputPrecio, inputImgURL)) {
        CrearProducto();
    }else{
        Swal.fire({
            title: "Ups",
            text: "Todos los campos son requeridos",
            icon: "error"
          });
    }
}

function CrearProducto() {
    const nuevoProducto={
        codigo: inputCodigo.value,
        nombre: inputNombre.value,
        descripcion: inputDescripcion.value,
        precio: inputPrecio.value,
        imgUrl: inputImgURL.value
    };
    arrProductos.push(nuevoProducto);
    Swal.fire({
        title: "Exito",
        text: "El producto se guardo correctamente",
        icon: "success"
      });
    LimpiarFormulario();
    bodyTabla.innerHTML="";
    ListarProductos();
};

function LimpiarFormulario() {
    form.reset();
    inputCodigo.className="form-control"
    inputCodigo.value=obtenerCodigoAleatorio()
    inputNombre.className="form-control"
    inputDescripcion.className="form-control"
    inputPrecio.className="form-control"
    inputImgURL.className="form-control"
    GuardarLocalStorage();
};

function GuardarLocalStorage() {
    localStorage.setItem("productos", JSON.stringify(arrProductos));
}

function ListarProductos() {
    arrProductos.forEach(element => {
        bodyTabla.innerHTML += `<tr>
        <th scope="row">${element.codigo}</th>
        <td>${element.nombre}</td>
        <td>${element.descripcion}</td>
        <td>${element.precio}</td>
        <td> <a href="${element.imgUrl}" target="blank" title="Ver Imagen">${element.imgUrl}</a></td>
        <td>
            <button type="button" class="btn btn-warning mx-1">Editar</button>
            <button type="button"  class="btn btn-danger mx-1">Eliminar</button>
        </td>
       </tr>`
    });
}

