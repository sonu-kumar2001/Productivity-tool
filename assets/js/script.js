let todo = document.querySelector('.toDo');
let form = document.querySelector('form');
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
    }
}

form.addEventListener('submit',inputHandler);
