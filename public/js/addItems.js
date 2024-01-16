const form = document.querySelector('#addForm');
const list = document.querySelector('#addList');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const res = Object.fromEntries(data);
  try {
    const response = await fetch('/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(res),
    });
    const result = await response.json();
    const addedBook = document.createElement('li');
    addedBook.innerHTML = `
    <div class="card" style="width: 18rem;">
    <div class="card-body">
    <div class="d-flex justify-content-between">
    <h5 class="card-title">${result.newBook.name} by ${result.newBook.author}</h5>
    <button type="button" data-bs-dismiss="toast" class="btn-close" aria-label="Close" />
    </div>
    <p class="card-text">${result.newBook.description}</p>
    <span class="badge text-bg-success">${result.newItem.status}</span>
    </div>
    </div>
    `;
    list.appendChild(addedBook);
    e.target.name.value = '';
    e.target.author.value = '';
  } catch (error) {
    console.log(error);
  }
});

list.addEventListener('click', async (e) => {
  const response = await fetch(`/profile/${e.target.id}`, {
    method: 'DELETE',
  });

  if (response.status === 200) {
    const targetEl = e.target.closest(`#profile${e.target.id}`);
    list.removeChild(targetEl);
  }
});
