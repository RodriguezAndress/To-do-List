//Variables
const formulario= document.querySelector('#formulario');
const listaTareas= document.querySelector('#lista-tareas');
let tareas= [];

//Listeners
eventListeners();

function eventListeners(){
    formulario.addEventListener('submit', agregarTarea);

    document.addEventListener('DOMContentLoaded', ()=> {
        tareas=JSON.parse(localStorage.getItem('tareas')) || [];
        console.log(tareas);

        crearHTML();
    })
}


//Funciones

function agregarTarea(e){
    e.preventDefault();

    //texarea donde el usuario escribe

    const tarea= document.querySelector('#tarea').value;
    if(tarea === ''){
        mostrarError('Una tarea no puede ir vacia.');
        return;
    } 

    const tareaObj = {
        id: Date.now(),
        tarea
    }
        //añadiendo al arreglo de tareas
    tareas = [...tareas, tareaObj];

   //una vez hecho se crea el html
   crearHTML();

   formulario.reset();
}

//Mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error'); //Crear una apartado para los estilos de esta clase en css

    //insertar el mensaje
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function crearHTML(){
    limpiarHTML();

    if(tareas.length > 0){
        tareas.forEach( tarea =>{
            //agg btn de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('delete') // esto va en comillas --crear el estilo para esta clase
            btnEliminar.innerText = '  X';

            //añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTarea(tarea.id);
            }

            //Se crea el html
            const li = document.createElement('li');
            //añadir el texto
            li.innerText = tarea.tarea;

            //asignar el btn
            li.appendChild(btnEliminar);
            //insertarlo en el html
            listaTareas.appendChild(li);
        });
    }
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function borrarTarea(id){
    tareas = tareas.filter( tarea => tarea.id !== id);

    crearHTML();
}

function limpiarHTML(){
    while(listaTareas.firstChild){
        listaTareas.removeChild(listaTareas.firstChild);
    }
}
