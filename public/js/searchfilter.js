const btns = document.querySelectorAll('button');

btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    console.log(e.target);
    console.log(btn.classList);
    if (e.target.classList.value.includes('btn-dark')) {
      e.target.classList.remove('btn-dark');
      e.target.classList.add('btn-outline-dark');
    } else if (e.target.classList.value.includes('btn-outline-dark')) {
      e.target.classList.remove('btn-outline-dark');
      e.target.classList.add('btn-dark');
    }
  });
});
