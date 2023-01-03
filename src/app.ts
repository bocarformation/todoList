// ON VA RECUPERER LES ELEMENTS DU DOM

const btnSubmit = document.querySelector(".todo-btn") as HTMLButtonElement;
const inputTask = document.querySelector(".todo-input") as HTMLInputElement;
const formTask = document.querySelector(".todo-form") as HTMLFormElement
const taskList = document.querySelector(".todo-list") as HTMLElement;
const btnDeleteAll = document.querySelector(".todo-delete-all") as HTMLButtonElement

interface TaskInterface {
        date: Date,
        task: string,
        completed: boolean
    }

// On créé un tableau pour stocker toutes les nouvelles tâches
const tasks: TaskInterface[] = JSON.parse(localStorage.getItem("task") || "[]")

window.addEventListener("DOMContentLoaded",()=>{
    tasks.forEach(task => appendTask(task))
})

// Fonction qui sauvegarde les éléments dans le local Storage
const saveTasks = () =>{
    localStorage.setItem("task", JSON.stringify(tasks))
}


formTask.addEventListener("submit", (e: Event) => handleSubmit(e))

const handleSubmit = (e: Event) => {
    e.preventDefault();

    const newTask: TaskInterface = {
        date: new Date(),
        task: inputTask.value,
        completed: false
    }
    // Envoie de la tâche dans le local storage
    tasks.push(newTask);

    // Ajout de la fonction newTask
    appendTask(newTask)
    
    // Ma fonction qui push dans le local Storage les infos 
    saveTasks();

    // On vide l'input
    inputTask.value = ""

console.log("Formulaire envoyé");

}

// Fonction d'ajout d'une nouvelle tâche

const appendTask =  (newTask: TaskInterface) =>{

    const newLi = document.createElement("li")
    const checkB = document.createElement("input")
    checkB.type = "checkbox";
    checkB.addEventListener("change", () => {
        newTask.completed = checkB.checked
        // On met à jour le localstorage
        saveTasks();
    })
    newLi.append(newTask.task, checkB)
    taskList.prepend(newLi);

}


const clearTasks = () =>{

    const confirmDel: boolean = confirm("Êtes vous sûr de vouloir tous supprimer?")
   if(confirmDel){
      tasks.length = 0;
    // Je remets à jour le local storage
    saveTasks();
    taskList.textContent = "";
   }
  
}

btnDeleteAll.addEventListener("click", clearTasks)