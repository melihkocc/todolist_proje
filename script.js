const form = document.querySelector("#formControl")
const input = document.querySelector("#exampleInputEmail1")
const ul = document.querySelector(".list-group")
const firstCardBody = document.querySelectorAll(".card-body")[0]
const secondCardBody = document.querySelectorAll(".card-body")[1]
const clearButton = document.querySelector("#clearButton")
const filter = document.querySelector("#examplefilter")
let todos = [];

runEvents()

function runEvents(){
    filter.addEventListener("keyup",filterTodo)
    clearButton.addEventListener("click",removeAllTodo)
    secondCardBody.addEventListener("click",removeTodoToUI)
    form.addEventListener("submit",addTodo)
    document.addEventListener("DOMContentLoaded",pageLoaded)

}


function filterTodo(e){

    const filterValue = e.target.value.toLowerCase().trim()
    const todolar = document.querySelectorAll(".list-group-item")

    if(todolar.length>0){
        todolar.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                todo.setAttribute("style","display : flex !important")
                todo.setAttribute("style","justify-content: space-between !important")     //classlardaki d-flex yüzünden olmaz ama !important yapınca illa benimkini kullan diyorsun!!!
            }
            else{
                todo.setAttribute("style","display : none !important")
            }
        })
    }
    else{
        showAlert("warning","Filtreleme için en az 1 todo olmalıdır!")
    }

}



function removeAllTodo(){
    const todolistesi = document.querySelectorAll(".list-group-item")
    if(todolistesi.length>0){
        //ekrandan silme
        todolistesi.forEach(function(todolar){
            todolar.remove();
        })
        //storageden silme
        todos = [];
        localStorage.setItem("todos",JSON.stringify(todos))
    }
    else{
        showAlert("warning","Silmek için en az 1 tane todo olmalıdır!")
    }
}


function removeTodoToUI(e){
    if(e.target.className=="fa fa-remove"){
        removeTodo = e.target.parentElement.parentElement;
        removeTodo.remove();

        removetodoToStorage(removeTodo.textContent)
        showAlert("danger","Todo Silindi...")
    }
}

function removetodoToStorage(text){
    checkTodosFromStorage();
    todos.forEach(function(todo,index){
        if(text==todo){
            todos.splice(index,1)
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos))
}



function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function addTodo(e) {
    e.preventDefault()
    const inputText = input.value.trim();
    if(inputText==null || inputText==""){
        showAlert("warning","Lütfen Bir Değer Giriniz !")
    }
    else{
        //ARAYÜZE EKLEME
        addTodoToUI(inputText);
        //Storage Ekleme
        addtodoToStorage(inputText);
        showAlert("success","Todo Başarıyla Eklendi...")
    } 

}

function addTodoToUI(text){

    const li = document.createElement("li")
    li.className = "list-group-item d-flex justify-content-between"
    li.textContent = text

    const a = document.createElement("a")
    a.href = "#"
    a.className = "delete-item"

    const i = document.createElement("i")
    i.className = "fa fa-remove"

    a.appendChild(i)
    li.appendChild(a)
    ul.appendChild(li)

    input.textContent = "";

}   


function addtodoToStorage(text){
    checkTodosFromStorage()
    todos.push(text)
    localStorage.setItem("todos",JSON.stringify(todos))
}


function checkTodosFromStorage(){
    if(localStorage.getItem("todos")===null){
        todos = []
     }
     else{
        todos = JSON.parse(localStorage.getItem("todos"))
     }
}

function showAlert(renk, message){

    const div = document.createElement("div")
    div.className = `alert alert-${renk}`
    div.role = "alert"
    div.textContent = message;

    firstCardBody.appendChild(div)
    
    setTimeout(function(){
        div.remove();

    },1500);

}   

