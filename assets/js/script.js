let todo = document.querySelector('.toDo');
let form = document.querySelector('form');
let ul = document.querySelector('.list-item');
let root = document.querySelector('.root');
let taskName = document.querySelector('.taskname');
let taskTimer = document.querySelector('.tasktimer');
let min = document.querySelector('.min');
let sec = document.querySelector('.sec');
let display = document.querySelector('.display');
let videoProgress = document.querySelector("video");

let userInfo = JSON.parse(localStorage.getItem("userInfo")) || [];
let pomodoroStart = null;
let pomodoroObj = {
    workM: null,
    workS: null,
    breakM: null,
    breakS: null,
};
function inputHandler(event) {
  event.preventDefault();
  if (
    form.elements.name.value !== '' &&
    (form.elements.hour.value !== '' || form.elements.min.value !== '')
  ) {
    let todo = {
      name: form.elements.name.value,
      hour: +form.elements.hour.value,
      min: +form.elements.min.value,
      second: +form.elements.second.value,
      isDone: false,
      clicked: 0,
    };
    userInfo.push(todo);
    form.elements.name.value = '';
    form.elements.hour.value = '';
    form.elements.min.value = '';
    localStorage.setItem("userInfo",JSON.stringify(userInfo));
    createUi(userInfo);
  }
  isTodo();
}

// on click deleting the

function deleteHandle(event) {
    let id = event.target.dataset.id;
    userInfo.splice(id, 1);
    localStorage.setItem("userInfo",JSON.stringify(userInfo));
    createUi(userInfo);
    min.innerText = "00";
    sec.innerText = "00";
    taskName.innerText = `READY!`;
    clearInterval(pomodoroStart);
}

// timer

let startTimer = null;

function timer(event, index) {
  // console.log(event,index,"from timer");
  if (
    userInfo[index].hour == 0 &&
    userInfo[index].min == 0 &&
    userInfo[index].second == 0
  ) {
    userInfo[index].hour = 0;
    userInfo[index].min = 0;
    userInfo[index].second = 0;
    userInfo[index].isDone = true;
    ul.children[index].style.backgroundColor = 'tomato';
    min.innerText = "00";
    sec.innerText = "00";
    taskName.innerText = `READY!`;
    clearInterval(pomodoroStart);
    clearInterval(startTimer);
  } else if (userInfo[index].second != 0) {
    userInfo[index].second--;
  } else if (userInfo[index].min != 0 && userInfo[index].second == 0) {
    // pomodoroTimer();
    userInfo[index].second = 59;
    userInfo[index].min--;
  } else if (userInfo[index].hour != 0 && userInfo[index].min == 0) {
    userInfo[index].min = 60;
    userInfo[index].hour--;
  }
  localStorage.setItem("userInfo",JSON.stringify(userInfo));
  event.innerText = `${userInfo[index].hour} : ${userInfo[index].min} : ${userInfo[index].second}`;
  isTodo();
  return;
}
function pomodoroTimer(index) {
    // taskName.innerText = userInfo[index].name;
    if (userInfo[index].hour == 0 && userInfo[index].min <= 24) {
        m = userInfo[index].min;
    } else {
        m = 25;
    }
  s = 61;
  decM();
  pomodoroStart = setInterval(decS, 1000);
}

function decM() {
if (m < 1) {
    m = 5;
    taskName.innerText = 'TAKE BREAK!';
    }
    m--;
    min.innerText = m < 10 ? '0' + m : m;
    pomodoroObj.breakM = m;
    pomodoroObj.breakS = s;
    localStorage.setItem("pomodoroObj",JSON.stringify(pomodoroObj));
    console.log(pomodoroObj);
    console.log(m,s);
}

function decS() {
    if (s <= 1) {
        s = 60;
    }
    if (s == '01') {
        decM();
    }
    s--;
    sec.innerText = s < 10 ? '0' + s : s;
    pomodoroObj.workM = m;
    pomodoroObj.workS = s;
    localStorage.setItem("pomodoroObj",JSON.stringify(pomodoroObj));
}
setInterval(pomodoroTimer, 1800000);

// creating ui dynamically

function createUi(arr) {
  if(userInfo.length > 3) alert("OOPS ! YOU CAN ENTER MAXIMUM 4-TASK.");
  if (userInfo.length > 4) return;
  ul.innerHTML = '';
  arr.forEach((element, index) => {
    let li = document.createElement('li');
    li.classList.add('flex-between');
    let div1 = document.createElement('div');
    div1.classList.add('info-flex');
    let p1 = document.createElement('p');
    p1.innerText = element.name;
    p1.classList.add('taskName');
    let div2 = document.createElement('div');
    div2.classList.add('button', 'flex');
    let p2 = document.createElement('p');
    p2.innerText = `${element.hour} : ${element.min}: ${element.second}`;
    p2.classList.add('taskTime');
    let p3 = document.createElement('p');
    p3.classList.add('play', 'Bttn');
    p3.innerHTML = `<i class="far fa-play-circle"></i>`;
    let p4 = document.createElement('p');
    p4.classList.add('close', 'Bttn');
    p4.innerHTML = `<i class="fas fa-times-circle"></i>`;
    //added event listener on close icon
    p4.addEventListener('click', deleteHandle);
    p4.setAttribute('data-id', index);
    div1.append(p1);
    div2.append(p2, p3, p4);
    li.append(div1, div2);
    ul.append(li);
    root.append(ul);
    // adding event listener on play button
    li.addEventListener('click', function (event) {
        if (event.target.classList.contains('fa-play-circle')) {
        taskName.innerText = p1.innerText;
        // pomodoroTimer( [...ul.children].indexOf(li));
        let liPlaying = document.querySelectorAll(".playing");
        if (liPlaying){
            [...liPlaying].forEach((e) => {
                e.classList.remove("playing");
                clearInterval(startTimer);
                clearInterval(pomodoroStart);
            }
            )}
        event.currentTarget.classList.add("playing");
        let index = [...ul.children].indexOf(li);
        userInfo[index].clicked += 1;
        if (userInfo[index].clicked % 2 != 0) {
          pomodoroTimer(index);
          function startInterval() {
            startTimer = setInterval(function () {
              timer(
                li.querySelector('.taskTime'),
                [...ul.children].indexOf(li)
              );
            }, 1000);
          }
          startInterval();
        } else {
          clearInterval(startTimer);
          clearInterval(pomodoroStart);
        }
        if(userInfo.length == 0) {
            min.innerText = "00";
            sec.innerText = "00";
            taskName.innerText = `READY!`;
            clearInterval(pomodoroStart);
        }
      }
    });
  });
}

form.addEventListener('submit', inputHandler);

createUi(userInfo);

// working on button

// {
//   /* <button>Clear Completed</button> */
// }

let control = document.querySelector('.controls');

function clearButton() {
  console.log('working');
  let button = document.createElement('button');
  button.innerText = 'Completed Clear';
  control.append(button);
  button.addEventListener('click', clear);
}

function clear(event) {
  if (event.target.innerText == 'Completed Clear') {
    [...ul.children].forEach((element, index) => {
      if (userInfo[index].isDone) {
        element.children[0].remove();
        userInfo.splice(index, 1);
        localStorage.setItem("userInfo",JSON.stringify(userInfo));
      }
    });
    createUi(userInfo);
  }
  isTodo();
}

function isTodo() {
  control.innerHTML = '';
  if (userInfo.every((e) => e.isDone == true)) {
    videoProgress.play();
    clearButton();
  }
}

isTodo();
