// const btn = document.querySelector('#bookForm');

// btn.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const data = new FormData(btn);
//   const res = Object.fromEntries(data);
//   try {
//     const response = await fetch(`/catalogue/${e.target.id}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(res),
//     });
//     const result = await response.json();
//     if (result.msg) {
//       window.location.href = '/catalogue';
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });
