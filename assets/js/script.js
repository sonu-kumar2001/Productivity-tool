let form = document.querySelector('form');
let root = document.querySelector('ul');
let button = document.querySelector('.button');
let userInfo = JSON.parse(localStorage.getItem('userInfo')) || [];

function handler(event) {
    if(form.elements.text.value !== '') {
        event.preventDefault();
        let todo = {
            name: form.elements.text.value,
            isDone : false,
        };
        userInfo.push(todo);
        form.elements.text.value = '';
        createUi(userInfo);
    }
    isTodo();
    localStorage.setItem('userInfo',JSON.stringify(userInfo));
}

function deleteHAndler(event) {
    let id = event.target.dataset.id;
    userInfo.splice(id,1);
    localStorage.setItem('userInfo',JSON.stringify(userInfo));
    createUi(userInfo);
    isTodo();
}
function toggle(event) {
    let id = event.target.dataset.id;
    userInfo[id].isDone = !userInfo[id].isDone;
    localStorage.setItem('userInfo',JSON.stringify(userInfo));
    createUi(userInfo);
}
function createUi(arr) {
    root.innerHTML = '';
    arr.forEach((element,index) => {
        let li = document.createElement('li');
        let input = document.createElement('input');
        input.type = "checkbox";
        input[name] = "check";
        input.checked = element.isDone;
        input.setAttribute('data-id',index);

        input.addEventListener('input',toggle);

        let p = document.createElement('p');
        p.innerText = element.name;
        let span = document.createElement('span');
        span.innerHTML = '<i class="fas fa-times"></i>';
        span.setAttribute('data-id', index);

        span.addEventListener('click',deleteHAndler);
        li.append(input,p,span);
        root.append(li);
    });
}

form.addEventListener('submit',handler);

function createButton() {
    let all = document.createElement('a');
    all.innerText = 'All';
    all.classList.add('btn');
    let active = document.createElement('a');
    active.innerText = 'Active';
    active.classList.add('btn');
    let completed = document.createElement('a');
    completed.innerText = 'Completed';
    completed.classList.add('btn');
    let clear = document.createElement('a');
    clear.innerText = 'Completed Clear';
    clear.classList.add('btn');

    button.append(all,active,completed,clear);
}

function filter(event) {
    if(event.target.innerText == "All") {
        createUi(userInfo);
    } else if(event.target.innerText == "Active") {
        let activeFilter = userInfo.filter(element => !element.isDone);
        console.log(activeFilter);
        createUi(activeFilter);
    } else if(event.target.innerText == 'Completed') {
        let completedFilter = userInfo.filter(element => element.isDone == true);
        createUi(completedFilter);
    } else if(event.target.innerText == 'Completed Clear') {
        [...root.children].forEach(element => {
           if(element.children[0].checked) {
            element.children[0].remove();
            userInfo.splice(element.children[0].dataset.id,1);
           } 
        });
        createUi(userInfo);
    }
    localStorage.setItem('userInfo',JSON.stringify(userInfo));
    isTodo();
}

button.addEventListener('click',filter);

function isTodo() {
    button.innerHTML = '';
    if(userInfo.length>0) {
        createButton();
    }
}
createUi(userInfo);
isTodo();