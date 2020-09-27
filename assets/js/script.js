let todo = document.querySelector('.toDo');
let form = document.querySelector('form');
let ul = document.querySelector('.list-item');
let root = document.querySelector('.root');
let userInfo = [];

function inputHandler(event) {
    event.preventDefault();
    if(form.elements.name.value !== "" && (form.elements.hour.value !== "" || form.elements.min.value !== "")) {
        let todo = {
            name: form.elements.name.value,
            hour: +form.elements.hour.value,
            min: +form.elements.min.value,
            isDone: false,
        }
        userInfo.push(todo);
        form.elements.name.value = '';
        form.elements.hour.value = '';
        form.elements.min.value = '';
        createUi();
    }
}

function createUi() {
    ul.innerHTML = ''
    userInfo.forEach(element => {
        let li = document.createElement('li');
        li.classList.add('flex-between');
        let div1 = document.createElement('div');
        div1.classList.add('info-flex');
        let p1 = document.createElement('p');
        p1.innerText = element.name;
        p1.classList.add('taskName');
        let div2 = document.createElement('div');
        div2.classList.add('button','flex');
        let p2 = document.createElement('p');
        p2.innerText = `${element.hour} : ${element.min}`;
        p2.classList.add('taskTime');
        let p3 = document.createElement('p');
        p3.classList.add('play','Bttn');
        p3.innerHTML = `<i class="far fa-play-circle"></i>`;
        let p4 = document.createElement('p');
        p4.classList.add('close','Bttn');
        p4.innerHTML = `<i class="fas fa-times-circle"></i>`;

       div1.append(p1);
       div2.append(p2,p3,p4);
       li.append(div1,div2);
       ul.append(li);
        root.append(ul);
    });
}

form.addEventListener('submit',inputHandler);
