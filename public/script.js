"use strict";

// vars
const input = document.getElementById("add-input");
const addBlock = document.getElementById("add-block");
const addBtn = document.getElementById("add-btn");
const todo = document.getElementById("todo");
const getTodosBtn = document.getElementById("get-todos");

const COLOR_COUNT = 6;

// functions
function getRandomNumber() {
  return Math.floor(Math.random() * COLOR_COUNT);
}

function getElementsCount() {
  return document.querySelectorAll(".todo__item")?.length || 0;
}

// async function getId(){
//   const data = await fetch("")
// }

function getColor() {
  let el = document.querySelector(".color-radio:checked + label");
  if (!el) {
    el = document.querySelectorAll(".color-radio + label")[getRandomNumber()];
  }
  const color = window.getComputedStyle(el).backgroundColor;

  return color;
}

async function removeElement(id) {
  await fetch(`${window.location.href}todos/${id}`, {
    method: "DELETE",
  });

  const removeEl = todo.querySelector(`#todo-${id}`)
  removeEl.remove()
}

async function createTodoElement(obj) {
  const color = obj.color;
  const id = obj.id;
  const text = obj.text;
  const checked = obj.checked;

  const newElem = document.createElement("li");
  if (checked) {
    newElem.classList.add("checked");
  }
  newElem.classList.add("todo__item");
  newElem.id = `todo-${id}`
  newElem.innerHTML = `
    <p class="todo__item-inner">
        <label style="background-color: ${color}" class="todo__item-checkbox" for="todo-${id}">
            <input id="todo-${id}" class="checkbox" ${
    checked ? "checked" : ""
  } type="checkbox">
        </label>
        <span style="background-color: ${color}" class="todo__item-text">${text}</span>
    </p>
    <button id="remove-${id}" name="removeTodo" class="todo__item-remove">Удалить</button>

`;
  newElem.querySelector(".todo__item-inner").addEventListener("click", async function (e) {
    e.preventDefault()
    await fetch(`/todos/${id}`, {
        method: "POST",
    })
    newElem.classList.toggle("checked");
    newElem.querySelector(".checkbox").toggleAttribute("checked");

  });

  const removeBtn = newElem.querySelector(`#remove-${id}`);
  removeBtn.addEventListener("click", function (element) {
    const removeElementId = +element.target.id[element.target.id.length - 1];
    removeElement(removeElementId);
  });

  todo.append(newElem);
}

async function addNewItem() {
  const text = input.value;
  if (!text) {
    return;
  }

  const obj = {
    color: getColor(),
    id: getElementsCount() + 1,
    text: text,
    checked: false,
  };

  createTodoElement(obj);

  input.value = "";

    await fetch("/todos", {
        method: "POST",
        headers: {
        "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
        color: obj.color,
        id: obj.id,
        text: obj.text,
        checked: obj.checked,
        }),
    });
}

// events...
addBlock.onclick = function () {
  input.focus();
};

document.onkeydown = function (e) {
  if (e.which == "13") {
    e.preventDefault();
    addNewItem();
  }
};

addBtn.onclick = function (e) {
  e.preventDefault();
  addNewItem();
};

async function getTodoElements() {
  const data = await fetch(`${window.location.href}todos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  const dataArr = await data.json();
  dataArr.forEach(function (element) {
    const obj = {
      color: element.color,
      id: element.id,
      text: element.text,
      checked: element.checked,
    };
    createTodoElement(obj)
  });
}

getTodoElements();
