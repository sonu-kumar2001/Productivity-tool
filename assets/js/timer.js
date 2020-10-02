let min = document.querySelector('.min');
let sec = document.querySelector('.sec');
let btn = document.querySelector('.toggle');
let btn2 = document.querySelector('.pause');
let arr = 0;
let s = 60;
let m = 25;

function main(val) {
  btn.style.display = 'none';
  function decM() {
    if (m < 25) {
      m = 5;
    }
    m--;
    min.innerText = m < 10 ? '0' + m : m;
  }
  function decS() {
    if (s < 1) {
      s = 60;
    }
    if (s == '01') {
      decM();
    }
    s--;
    sec.innerText = s < 10 ? '0' + s : s;
  }
  decS();
  decM();
  setInterval(decS, 1000);
}
btn.addEventListener('click', () => {
  main(true);
});

setInterval(main, 1800000);
