const form = document.querySelector('#loginForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const res = Object.fromEntries(data);
  if (!res.login || !res.password) {
    alert('Введите свои данные!');
  } else {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(res),
      });
      const result = await response.json();
      const msg = document.querySelector('.logMsg');
      if (result.msg) {
        msg.innerText = result.msg;
        msg.style.color = 'green';
        form.remove();
        const h2 = document.querySelector('.hTag');
        h2.remove();
        const header = document.querySelector('.navbar-nav');
        header.remove();
        const newHead = `
        <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link">
              my books
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/logout">
                log out
              </a>
          </li>
        </ul>
        `;
        const navbar = document.querySelector('#navbarNav');
        console.log('navbar:', navbar);
        navbar.insertAdjacentHTML('beforeend', newHead);
      }
      if (result.err) {
        msg.innerText = result.err;
        msg.style.color = 'red';
      }
    } catch (error) {
      console.log('Ошибка авторизации ==>', error);
    }
  }
});
