'use strict';

const input = document.getElementById('add-input');
const addBlock = document.getElementById('add-block');
const addBtn = document.getElementById('add-btn');
const todo = document.getElementById('todo');

const COLOR_COUNT = 6;

function getRandomNumber() {
    return Math.floor(Math.random() * COLOR_COUNT);
}

function getColor() {
    let el = document.querySelector('.color-radio:checked + label');
    if (!el) {
        el = document.querySelectorAll('.color-radio + label')[getRandomNumber()];
    }
    const color = window.getComputedStyle(el).backgroundColor;

    return color;
}

async function removeElement(id) {
    try {
        await fetch(`/todos/${id}`, {
            method: 'DELETE',
        });
        const removeEl = todo.querySelector(`#todo-${id}`);
        removeEl.remove();
    } catch (e) {
        console.error(e.reason);
    }
}

async function createTodoElement(obj) {
    const color = obj.color;
    const id = obj._id;
    const text = obj.text;
    const checked = obj.checked;

    const newElem = document.createElement('li');
    if (checked) {
        newElem.classList.add('checked');
    }
    newElem.classList.add('todo__item');
    newElem.id = `todo-${id}`;
    newElem.innerHTML = `
        <p class="todo__item-inner">
            <label style="background-color: ${color}" class="todo__item-checkbox" for="todo-${id}">
                <input id="todo-${id}" class="checkbox" ${checked ? 'checked' : ''} type="checkbox">
            </label>
            <span style="background-color: ${color}" class="todo__item-text">${text}</span>
        </p>
        <button id="remove-${id}" name="removeTodo" class="todo__item-remove">Удалить</button>
    `;
    newElem.querySelector('.todo__item-inner').addEventListener('click', async function (e) {
        e.preventDefault();
        try {
            const data = await fetch(`/todos/${id}`);
            const dataJson = await data.json();
            const checked = dataJson.checked;
            await fetch(`/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    checked: !checked
                }),
            });
            newElem.classList.toggle('checked');
            newElem.querySelector('.checkbox').toggleAttribute('checked');
        } catch (e) {
            console.error(e.reason);
        }
    });

    const removeBtn = newElem.querySelector(`#remove-${id}`);
    removeBtn.addEventListener('click',  (element) => {
        const removeElementId = element.target.id.replace(/remove-/, '');
        removeElement(removeElementId);
    });

    todo.append(newElem);
}

function createLoadingText() {
    const container = document.querySelector('.container');
    const loadingText = document.createElement('p');
    loadingText.id = 'loading-text';
    loadingText.innerText = 'Waiting for todos...';
    loadingText.style.cssText=`
        color: #000;
        text-align: center;
        padding: 20px;
        font-size: 20px;
    `;

    container.prepend(loadingText);
}

function removeLoadingText() {
    const loadingText = document.getElementById('loading-text');
    loadingText.remove();
}

async function addNewItem() {
    const text = input.value;
    if (!text) {
        return;
    }

    const obj = {
        text: text,
        color: getColor(),
    };

    input.value = '';
    try {
        await fetch('/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(obj),
        });
    } catch (e) {
        console.error(e.reason);
    }

    const data = await fetch('/todos/last');
    const dataJson = await data.json();

    console.log(dataJson);
    await createTodoElement(dataJson);
}

addBlock.onclick = function () {
    input.focus();
};

document.onkeydown = function (e) {
    if (e.which == '13') {
        e.preventDefault();
        addNewItem();
    }
};

addBtn.onclick = function (e) {
    e.preventDefault();
    addNewItem();
};

async function getTodoElements() {
    createLoadingText();
    const data = await fetch('/todos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    });
    const dataArr = await data.json();
    if(dataArr) {
        removeLoadingText();
        dataArr.forEach(element => createTodoElement(element));
    } else {
        document.getElementById('loading-text').innerText = 'No todos';
    }
}

getTodoElements();
