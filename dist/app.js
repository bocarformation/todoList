"use strict";
// ON VA RECUPERER LES ELEMENTS DU DOM
const btnSubmit = document.querySelector(".todo-btn");
const inputTask = document.querySelector(".todo-input");
const formTask = document.querySelector(".todo-form");
const taskList = document.querySelector(".todo-list");
const btnDeleteAll = document.querySelector(".todo-delete-all");
// On créé un tableau pour stocker toutes les nouvelles tâches
const tasks = JSON.parse(localStorage.getItem("task") || "[]");
window.addEventListener("DOMContentLoaded", () => {
    tasks.forEach(task => appendTask(task));
});
// Fonction qui sauvegarde les éléments dans le local Storage
const saveTasks = () => {
    localStorage.setItem("task", JSON.stringify(tasks));
};
formTask.addEventListener("submit", (e) => handleSubmit(e));
const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
        date: new Date(),
        task: inputTask.value,
        completed: false
    };
    // Envoie de la tâche dans le local storage
    tasks.push(newTask);
    // Ajout de la fonction newTask
    appendTask(newTask);
    // Ma fonction qui push dans le local Storage les infos 
    saveTasks();
    // On vide l'input
    inputTask.value = "";
    console.log("Formulaire envoyé");
};
// Fonction d'ajout d'une nouvelle tâche
const appendTask = (newTask) => {
    const newLi = document.createElement("li");
    const checkB = document.createElement("input");
    checkB.type = "checkbox";
    checkB.addEventListener("change", () => {
        newTask.completed = checkB.checked;
        // On met à jour le localstorage
        saveTasks();
    });
    newLi.append(newTask.task, checkB);
    taskList.prepend(newLi);
};
const clearTasks = () => {
    const confirmDel = confirm("Êtes vous sûr de vouloir tous supprimer?");
    if (confirmDel) {
        tasks.length = 0;
        // Je remets à jour le local storage
        saveTasks();
        taskList.textContent = "";
    }
};
btnDeleteAll.addEventListener("click", clearTasks);
