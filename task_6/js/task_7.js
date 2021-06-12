const myBtn = document.querySelector('.btn');
const myInput = document.querySelector('#my-input');

myBtn.addEventListener('click', async () => {
        const userId =  myInput.value;
        if (isValidId(userId)) {
            const data = await getData(userId);
            console.log('data', data);
            renderData(data, userId);
        } else {
            message();
        }
    }
);

function getData(userId) {
    const url = `https://jsonplaceholder.typicode.com/users/${userId}/todos`;
    return fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch(()=> console.log('Ошибка'));
}

function isValidId(id) {
    return Number(id) > 0 && Number.isInteger(Number(id));
}

function message() {
    alert('Введите идентификационный номер (целое число большее 0) пользователя.\n')
}

function renderData(data, id) {
    if (document.contains(document.querySelector('.todo-list'))) {
        document.querySelector('.todo-list').remove();
    }
    const container = document.querySelector('.container');
    const todoList = document.createElement('div');
    todoList.className = 'todo-list';
    if (data.length > 0) {
        const ul = document.createElement('ul');
        ul.className = 'list';
        for (item of data) {
            const li = document.createElement('li');
            li.className = 'list__item';
            li.innerHTML = item.completed ? item.title.strike() : item.title;
            ul.appendChild(li);
        };
        container.appendChild(todoList).appendChild(ul);
    } else {
        todoList.innerText = `Пользователь с указанным id ${id} не найден`;
        container.appendChild(todoList);
    }
}