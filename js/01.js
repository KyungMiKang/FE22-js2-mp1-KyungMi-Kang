//1. develope stone-scissor-bag game with a high score list that has 5 highest scores.
//2. User gets one point when  it wins against a computer
//3. User loses if a computer gets even one point
//4. create a firebase-realtimebase
//5.

const userChoice = document.querySelector('.your-choice');
const computerChoice = document.querySelector('.computer-choice');
const arrComputer = ['scissors', 'rock', 'paper'];

const buttons = document.querySelectorAll('.buttons button');
const buttonsContainer = document.querySelector('.buttons');

const resultMess = document.querySelector('.result-mess');

// user  input name -------
const form = document.querySelector('form');
const submitBtn = document.querySelector('#submit-button');
const inputText = document.querySelector('#mess-text');

const userInfo = {};

getAll(); // see the highscor first
function restart() {
  buttonsContainer.classList.remove('disable');
  resultMess.style.visibility = 'visible';
  resultMess.innerText = '';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  restart();

  //const userInfo = {};
  const inputElements = form.childNodes;
  console.log(inputElements);

  inputElements.forEach((node) => {
    console.log(node);
    //if(node.name != null && node.name !== '')
    if (node.name != undefined && node.name !== '') {
      console.log(node.name, node.value);

      userInfo[node.name] = node.value;
      newData.name = node.value;
      //newData['name'] = node.value;

      const { user } = userInfo;
      //console.log({user});
      inputText.innerText = user;
    }
  });
  console.log(userInfo);
});
//console.log(userInfo);

//  create POST with Firebase------------------------------
let newData = {
  name: '',
  score: 0,
};

async function pushInfo(userInfo) {
  const url =
    'https://produkter1-430e9-default-rtdb.europe-west1.firebasedatabase.app/forum.json';

  const init = {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-type': 'application/json; charset=UFT-8',
    },
  };

  const response = await fetch(url, init);
  const data = await response.json();
  console.log(data);
}
console.log(newData);

let userPointCounter = 0;
let computerPointCounter = 0;

let computer = arrComputer[Math.round(Math.random() * 2)];
function createComputer() {
  computer = arrComputer[Math.round(Math.random() * 2)];
}

let userName = '';
//const computerScore = document.querySelector('#computerScore');
const userScore = document.querySelector('#userScore');
const winner = document.querySelector('.result');
// who win, computer or user

buttons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    userChoice.innerText = e.target.id;
    generateGame(e, e.target.id);
    computerChoice.innerText = computer;
  });
});

//  create gamepoints & show user choice and computer choice & show result with message
function generateGame(event) {
  event.preventDefault();

  let message;

  if (
    (event.target.id == 'scissors' && computer == 'scissors') ||
    (event.target.id == 'rock' && computer == 'rock') ||
    (event.target.id == 'paper' && computer == 'paper')
  ) {
    message = 'DRAW!!';
    resultMess.innerText = message;
  } else if (
    (event.target.id == 'scissors' && computer == 'paper') ||
    (event.target.id == 'rock' && computer == 'scissors') ||
    (event.target.id == 'paper' && computer == 'rock')
  ) {
    userPointCounter++;
    newData.score = userPointCounter;

    message = 'USER WIN!!';
    resultMess.innerText = message;
  } else if (
    (event.target.id == 'scissors' && computer == 'rock') ||
    (event.target.id == 'rock' && computer == 'paper') ||
    (event.target.id == 'paper' && computer == 'scissors')
  ) {
    pushInfo(newData);

    userPointCounter = 0;
    newData.score = userPointCounter;

    message = 'COMPUTER WIN!!';
    resultMess.innerText = message;
    buttonsContainer.classList.add('disable');
    getAll();
  }


  //pushInfo(newData);


  
  

  userScore.innerText = `User point : ${userPointCounter}`;
}


function compare(a, b) {
  if (a.score < b.score) {
    return 1;
  }
  if (a.score > b.score) {
    return -1;
  }
  return 0;
}
  //fullfil high score table
  async function getAll() {
    const fruitUrl =
      'https://produkter1-430e9-default-rtdb.europe-west1.firebasedatabase.app/forum.json';
    const response = await fetch(fruitUrl);
    const data = await response.json();
    const highscoreContainer = document.querySelector('.highScoreTable');

    if (document.querySelectorAll('.player')) {
      document.querySelectorAll('.player').forEach((el) => el.remove());
    }

    console.log('get data: ', Object.values(data));

    Object.values(data)
      .sort(compare)
      .splice(0, 5)
      .map((data, index) => {
        let element = ` 
                    <tr class="player">
                        <td>${++index}</td>
                        <td>${data.name}</td>
                        <td>${data.score}</td>
                     </tr>
               `;

        highscoreContainer.innerHTML += element;

        console.log(element);
      });

    }