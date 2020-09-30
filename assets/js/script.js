let todo = document.querySelector('.toDo');
let form = document.querySelector('form');
let ul = document.querySelector('.list-item');
let root = document.querySelector('.root');
let userInfo = [{hour: 0,
    isDone: false,
    min: 0,
    name: "Sonu",
    second: 10,
    clicked: 0,
}];

function inputHandler(event) {
    event.preventDefault();
    if(form.elements.name.value !== "" && (form.elements.hour.value !== "" || form.elements.min.value !== "")) {
        let todo = {
            name: form.elements.name.value,
            hour: +form.elements.hour.value,
            min: +form.elements.min.value,
            second: +form.elements.second.value,
            isDone: false,
            clicked: 0,
        }
        userInfo.push(todo);
        form.elements.name.value = '';
        form.elements.hour.value = '';
        form.elements.min.value = '';
        createUi(userInfo);
    }
    isTodo();
}
// on click deleting the
function deleteHandle(event) {
    let id = event.target.dataset.id;
    userInfo.splice(id,1);
    createUi(userInfo);
}
// timer

let startTimer = null;

function timer(event,index){
    if(userInfo[index].hour == 0 && userInfo[index].min == 0 && userInfo[index].second == 0){
        userInfo[index].hour = 0;
        userInfo[index].min = 0;
        userInfo[index].second = 0;
        userInfo[index].isDone = true;
        clearInterval(startTimer);
    } else if(userInfo[index].second != 0){
        userInfo[index].second--;
    } else if(userInfo[index].min != 0 && userInfo[index].second == 0){
        userInfo[index].second = 59;
        userInfo[index].min--;
    } else if(userInfo[index].hour != 0 && userInfo[index].min == 0){
        userInfo[index].min = 60;
        userInfo[index].hour--;
    }
    event.innerText = `${userInfo[index].hour} : ${userInfo[index].min} : ${userInfo[index].second}`
    isTodo();
    return;
}

// creating ui dynamically
function createUi(arr) {
    if(userInfo.length > 4) return
    ul.innerHTML = ''
    arr.forEach((element,index) => {
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
        p2.innerText = `${element.hour} : ${element.min}: ${element.second}`;
        p2.classList.add('taskTime');
        let p3 = document.createElement('p');
        p3.classList.add('play','Bttn');
        p3.innerHTML = `<i class="far fa-play-circle"></i>`;
        let p4 = document.createElement('p');
        p4.classList.add('close','Bttn');
        p4.innerHTML = `<i class="fas fa-times-circle"></i>`;
        //added event listener on close icon
        p4.addEventListener('click',deleteHandle);
        p4.setAttribute("data-id", index);

       div1.append(p1);
       div2.append(p2,p3,p4);
       li.append(div1,div2);
       ul.append(li);
        root.append(ul);
         // adding event listener on play button
        li.addEventListener('click', function(event){
            if(event.target.classList.contains('fa-play-circle')) {
                let index = [...ul.children].indexOf(li);
                userInfo[index].clicked += 1;
                if(userInfo[index].clicked % 2 != 0) {
                    function startInterval(){
                        startTimer = setInterval(function() {
                            timer(li.querySelector('.taskTime'),[...ul.children].indexOf(li));
                        }, 1000);
                    }
                    startInterval();
                } else {
                    clearInterval(startTimer);
                }

            }

        });
    });
}
// event listener on input elements
form.addEventListener('submit',inputHandler);

createUi(userInfo);

// working on button 
{/* <button>Clear Completed</button> */}
let control = document.querySelector('.controls');

function clearButton() {
    console.log('working');
    let button = document.createElement('button');
    button.innerText = 'Completed Clear'
    control.append(button);
    button.addEventListener('click',clear);
}


function clear(event) {
    if(event.target.innerText == 'Completed Clear') {
        [...ul.children].forEach((element,index) => {
           if(userInfo[index].isDone) {
            element.children[0].remove();
            userInfo.splice(index,1);
           }
        });
        createUi(userInfo);
    }
    isTodo();
}
function isTodo() {
    control.innerHTML = '';
    if(userInfo.every(e => e.isDone)) {
        clearButton();
    }
}
isTodo();