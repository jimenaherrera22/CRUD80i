import { validarInputRequerido, validarInputDescripcion, validarInputPrecio, validarInputUrl, validarTodo } from "./hellpers.js";
let arrProductos=JSON.parse(localStorage.getItem("productos"))||[]

let inputCodigo=document.getElementById("codigo");
let inputNombre=document.getElementById("nombre");
let inputDescripcion=document.getElementById("descripcion");
let inputPrecio=document.getElementById("precio");
let inputImgURL=document.getElementById("imgURL");

let form=document.querySelector("form");

console.log(form);

form.addEventListener("submit", GuardarProducto);

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
};

function LimpiarFormulario() {
    form.reset();
    inputCodigo.className="form-control"
    inputNombre.className="form-control"
    inputDescripcion.className="form-control"
    inputPrecio.className="form-control"
    inputImgURL.className="form-control"
    GuardarLocalStorage();
};

function GuardarLocalStorage() {
    localStorage.setItem("productos", JSON.stringify(arrProductos));
}

