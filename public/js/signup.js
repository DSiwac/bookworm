const form = document.querySelector('#regForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const res = Object.fromEntries(data);
  if (!res.login || !res.password) {
    alert('Введите свои данные!');
  } else {
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(res),
      });
      const result = await response.json();
      if (result.msg) {
        window.location.href = '/';
      }
      if (result.err) {
        const msg = document.querySelector('.regMsg');
        msg.innerText = result.err;
        msg.style.color = 'red';
      }
    } catch (error) {
      console.log('Ошибка регистрации ==>', error);
      alert('Ошибка регистрации!!!');
    }
  }
});
