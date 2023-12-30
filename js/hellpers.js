export function validarInputRequerido(input) {
    if (input.value.trim().length > 0) {
        input.className="form-control is-valid";
        return true
    }else{
        input.className="form-control is-invalid"
        return false
    }
};

export function validarInputDescripcion(input) {
    if (input.value.trim().length >= 10 && input.value.trim().length <= 200) {
        input.className="form-control is-valid";
        return true
    }else{
        input.className="form-control is-invalid"
        return false
    }
};

export function validarInputPrecio(input) {
    const regExPrecio=/^(\d{1,9}(?:\,\d{1,2})?|\d{1,2}(?:\,\d{1,2})?)$/;
    if (regExPrecio.test(input.value)) {
        input.className="form-control is-valid"
        return true
    }else{
        input.className="form-control is-invalid"
        return false
    }  
    
};

export function validarInputUrl(input) {
    const regExURL=/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    if (regExURL.test(input.value)) {
        input.className="form-control is-valid"
        return true
    }else{
        input.className="form-control is-invalid"
        return false
    }   

};

export function validarTodo(inpCodigo, inpNombre, inpDescripcion, inpPrecio, inpUrl) {
    if (validarInputRequerido(inpCodigo)&&validarInputRequerido(inpNombre)&&validarInputDescripcion(inpDescripcion)&&validarInputPrecio(inpPrecio)&&validarInputUrl(inpUrl)) {
        return true
    }else{
        return false
    }
}