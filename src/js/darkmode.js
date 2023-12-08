const body = document.querySelector('body');
const darkmodeBtn = document.getElementById('darkMode');
const darkmodeDropdown = document.querySelector('#darkModeDropdown');
console.log(darkmodeDropdown);

var mode = localStorage.getItem('mode');
if (mode === 'dark') {
  body.classList.add('dark');
}

darkmodeBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  if (mode === 'normal') {
    localStorage.setItem('mode', 'dark');
    mode = 'dark';
    darkmodeBtn.innerHTML = 'Light Mode';
    darkmodeDropdown.innerHTML = 'Light Mode';
  } else {
    localStorage.setItem('mode', 'normal');
    mode = 'normal';
    darkmodeBtn.innerHTML = 'Dark Mode';
    darkmodeDropdown.innerHTML = 'Dark Mode';
  }
});

darkmodeDropdown.addEventListener('click', () => {
  body.classList.toggle('dark');
  if (mode === 'normal') {
    localStorage.setItem('mode', 'dark');
    mode = 'dark';
    darkmodeBtn.innerHTML = 'Light Mode';
    darkmodeDropdown.innerHTML = 'Light Mode';
  } else {
    localStorage.setItem('mode', 'normal');
    mode = 'normal';
    darkmodeBtn.innerHTML = 'Dark Mode';
    darkmodeDropdown.innerHTML = 'Dark Mode';
  }
});
