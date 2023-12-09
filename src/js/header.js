const btn = document.querySelector('.menuBtn');
const menu = document.querySelector('.menuBtn i');
const dropDown = document.querySelector('.dropdownMenu');

btn.onclick = function () {
  dropDown.classList.toggle('open');
};
