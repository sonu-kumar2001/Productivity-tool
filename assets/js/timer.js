


{/* 
<input id="hour" type="number" max="99" min="0" value="0" class="time"><p id="p1" class="semicolon">:</p>

<input id="minute" type="number" max="60" min="0" value="0" class="time"><p id="p2" class="semicolon">:</p>

<input id="sec" type="number" max="60" min="0" value="0" class="time">

*/}

var start = document.getElementById('start');

var h = document.getElementById("hour"); // defined ->
var m = document.getElementById("minute"); // defined ->
var s = document.getElementById("sec"); // add in script -> set

var startTimer = null;

start.addEventListener('click', function(){
    function startInterval(){
        startTimer = setInterval(function() {
            timer();
        }, 1000);
    }
    startInterval();
})

start.addEventListener('dblclick', function(){
    h.value = 0;
    m.value = 0;
    s.value = 0;
    stopInterval()
})

function timer(){
    if(h.value == 0 && m.value == 0 && s.value == 0){
        h.value = 0;
        m.value = 0;
        s.value = 0;
    } else if(s.value != 0){
        s.value--;
    } else if(m.value != 0 && s.value == 0){
        s.value = 59;
        m.value--;
    } else if(h.value != 0 && m.value == 0){
        m.value = 60;
        h.value--;
    }
    return;
}
function stopInterval() {
    clearInterval(startTimer);
}