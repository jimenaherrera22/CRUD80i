import { validarInputRequerido, validarInputDescripcion, validarInputPrecio, validarInputUrl, validarTodo, obtenerCodigoAleatorio } from "./hellpers.js";

let arrayProductos=JSON.parse(localStorage.getItem("productos"))||[]
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

let esEdicion=false;
function GuardarProducto(e) { //e=event
    e.preventDefault();
    if (validarTodo(inputCodigo, inputNombre, inputDescripcion, inputPrecio, inputImgURL)) {
        if (esEdicion) {
            GuardarProductoEditado();
        }else{
        CrearProducto(); }
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
    arrayProductos.push(nuevoProducto);
    Swal.fire({
        title: "Exito",
        text: "El producto se guardo correctamente",
        icon: "success"
      });
    LimpiarFormulario();
    ListarProductos();
};

function GuardarProductoEditado() {
    let indexProducto=arrayProductos.findIndex((element)=>{
        return element.codigo===inputCodigo.value
    });
    if (indexProducto !== -1) {
        Swal.fire({
            title: "¿Estas seguro?",
            text: "Vas a cambiar los datos de un producto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Guardar!",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
                arrayProductos[indexProducto].codigo=inputCodigo.value;
                arrayProductos[indexProducto].nombre=inputNombre.value;
                arrayProductos[indexProducto].descripcion=inputDescripcion.value;
                arrayProductos[indexProducto].precio=inputPrecio.value;
                arrayProductos[indexProducto].imgUrl=inputImgURL.value;
                esEdicion=false;
                Swal.fire({
                    title: "Exito",
                    text: "El producto se actualizo correctamente",
                    icon: "success"  });
                LimpiarFormulario();
                ListarProductos();
            }else{
                esEdicion=false;
                LimpiarFormulario();
            }
          });
    }else{
        console.log("entro en el else de guardar producto por que el codigo no existe dentro el arrProductos");
    }
 }
//con esta forma declaramos una funcion global
window.LimpiarFormulario=function() {
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
    localStorage.setItem("productos", JSON.stringify(arrayProductos));
}

function ListarProductos() {
    bodyTabla.innerHTML="";
    arrayProductos.forEach(element => {
        bodyTabla.innerHTML += `<tr>
        <th scope="row">${element.codigo}</th>
        <td>${element.nombre}</td>
        <td>${element.descripcion}</td>
        <td>${element.precio}</td>
        <td> <a href="${element.imgUrl}" target="blank" title="Ver Imagen">${element.imgUrl}</a></td>
        <td>
        <div class="d-flex">
        <a href='#titulo' class="btn btn-warning mx-1" onclick="PrepararEdicion('${element.codigo}')">Editar</a>
            <button type="button"  class="btn btn-danger mx-1">Eliminar</button>
        </div>
        </td>
       </tr>`
    });
};

window.PrepararEdicion=function(codigo) {
    const productoAEditar=arrayProductos.find((element)=>{
        return element.codigo===codigo;
    });
    if (productoAEditar !== undefined) {
        inputCodigo.value=productoAEditar.codigo;
        inputNombre.value=productoAEditar.nombre;
        inputDescripcion.value=productoAEditar.descripcion;
        inputPrecio.value=productoAEditar.precio;
        inputImgURL.value=productoAEditar.imgUrl;
    }
    esEdicion=true;
}

