const btnEnviar = document.querySelector("#btnEnviar");

//varibles de input 
const inputNombre = document.querySelector("#inputNombre");
const inputEmail = document.querySelector("#inputEmail");
const inputMensaje = document.querySelector("#inputMensaje");


eventListener();


function eventListener() {
    document.addEventListener("DOMContentLoader",iniciarApp);

    document.addEventListener("blur",validateForm);
}


function  iniciarApp() {
    btnEnviar.disable= true;
    btnEnviar.classList.add();
}


function validateForm() {
    
    if(e.target.value.length > 0){

    }else {
        e.target.style.borderButtonColor = "red";
        
        mostrarError();
    }
}


function mostrarError() {
    
}