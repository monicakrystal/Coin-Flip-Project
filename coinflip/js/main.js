// main.js file
const flipButton = document.querySelector('#flip-Movement');
const audioElement = new Audio('/audio/coinflip.mp3');
const coinImage = document.querySelector('.coins img');

let coins = document.querySelector(".coins");
let heads = 0;
let tails = 0;

function playSound() {
  audioElement.play();
}

flipButton.addEventListener("click", () => {
  playSound();

  fetch('http://localhost:8080/flipcoin')
    .then(response => response.json())
    .then(data => {
      console.log(data.result);
      if (data.result === 'heads') {
        coinImage.src = '/images/heads.png';
      } else if (data.result === 'tails') {
        coinImage.src = '/images/tails.png';
      }
      
      // Wait for the new image to load before starting the animation
      coinImage.onload = () => {
        let i = Math.floor(Math.random() * 2);
        coins.style.animation = "none";
        if (i) {
          setTimeout(function() {
            coins.style.animation = "spin-heads 2s forwards";
          }, 100);
          heads++;
        } else {
          setTimeout(function() {
            coins.style.animation = "spin-tails 2s forwards";
          }, 100);
          tails++;
        }
      };
    })
    .catch(error => {
      console.error('Error:', error);
    });
});




