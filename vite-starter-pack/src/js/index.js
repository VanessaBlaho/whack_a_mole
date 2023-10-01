

const button = document.querySelector('.button');
const scoreContainer = document.querySelector('.score');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');

let score = 0;
let timeUp = false;
const minTime = 1000; // 1 second in milliseconds
const maxTime = 3000; // 3 seconds in milliseconds

const randomTime= (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const randomHole = () => {
    const index = Math.floor(Math.random() * holes.length);
    return holes[index];
  }

  function peep() {
    const time = randomTime(minTime, maxTime);
    const hole = randomHole(holes);
  
    hole.classList.add('active');
  
    setTimeout(() => {
      hole.classList.remove('active');
  
      if (!timeUp) {
        peep(); // Call peep again for the next mole
      }
    }, time);
  }

  button.addEventListener('click', () => {
    score = 0;
    timeUp = false;
    scoreContainer.textContent = score;
    peep(); // Start the game by calling peep

    const whack = () => {
        score++;
        scoreContainer.textContent = score;
    }
     
    const hide = () => {
        holes.forEach((hole) => hole.classList.remove('active'));
    }
     
    moles.forEach((mole) => {
        mole.addEventListener('click', () => {
            whack();
            hide();
        });
    });
     
    button.addEventListener('click', () => {
        score = 0;
        scoreContainer.textContent = 0;
        timeUp = false;
     
        peep();
     
        setTimeout(() => {
            timeUp = true;
        }, 15000);
    });
  });

