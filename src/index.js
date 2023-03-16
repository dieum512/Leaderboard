import './style.css';

const name = document.querySelector('.add-name-input');
const score = document.querySelector('.add-sccore-input');
const ul = document.querySelector('.scores-ul');
const refresh = document.querySelector('.refresh-btn');
const form = document.querySelector('.add-form');

const SendData = (name, score) => {
  fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Zl4d7IVkemOTTVg2fUdz/scores/', {
    method: 'POST',
    body: JSON.stringify({ score, user: name }),
    headers: {
      'content-type': 'application/json',
    },
  });
};

const displayData = (storedData) => {
  ul.innerHTML = '';
  storedData.forEach((element) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="score-user-name">${element.user}:</span>
      <span class="score-user-score">${element.score}</span>
    `;

    ul.appendChild(li);
  });
};

const getData = async () => {
  const res = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Zl4d7IVkemOTTVg2fUdz/scores/');
  const data = await res.json();
  const { result } = data;
  displayData(result);
};

const emptyForms = () => {
  name.value = '';
  score.value = '';
};

form.addEventListener('submit', () => {
  SendData(name.value, score.value);
  emptyForms();
});

refresh.addEventListener('click', () => {
  getData();
  window.location.reload();
});

window.addEventListener('load', () => {
  getData();
});