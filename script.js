var buttons = document.querySelectorAll(".btn");
var button = document.querySelectorAll(".btn");
var score = document.querySelectorAll(".score")[1];
var scoreText = document.querySelectorAll(".score")[0];

var imageSource = [
  {
    id: 0,
    source: "./assets/burger.png",
    usedCount: 0
  },
  {
    id: 1,
    source: "./assets/donut.png",
    usedCount: 0
  },
  {
    id: 2,
    source: "./assets/fried-chicken.png",
    usedCount: 0
  },
  {
    id: 3,
    source: "./assets/ice-cream.png",
    usedCount: 0
  },
  {
    id: 4,
    source: "./assets/milkshake.png",
    usedCount: 0
  },
  {
    id: 5,
    source: "./assets/muffin.png",
    usedCount: 0
  },
  {
    id: 6,
    source: "./assets/noodles.png",
    usedCount: 0
  },
  {
    id: 7,
    source: "./assets/pizza.png",
    usedCount: 0
  }
]

var img = document.querySelectorAll("img");
var restart = document.querySelector(".restart");

window.addEventListener('DOMContentLoaded' , function() {
  for(var i = 0; i < img.length; i++) {
    img[i].style.zIndex = "-1";
    img[i].src = generateImage();
  }
});


function generateImage() {
  var randomNumber = Math.floor(Math.random() * 10000) % 8;
  while(imageSource[randomNumber].usedCount == 2) {
    randomNumber = Math.floor(Math.random() * 10000) % 8;
  }
  imageSource[randomNumber].usedCount++;
  return imageSource[randomNumber].source;
}


var previousBtn = "";
var latestBtn = "";

var totalMoves = 0;
var successfulMoves = 0;
 
for(var i = 0; i < button.length; i++) {
  button[i].addEventListener("click" , function () {

    totalMoves++;
    var img = this.querySelector("img")
    if(img.style.zIndex === "-1") {
      img.style.zIndex = "2";
      this.disabled = true;
      this.classList.remove("btn-hover");


      if(previousBtn === "") {
        previousBtn = this;
      } else {
        latestBtn = this;

        var latestImg = latestBtn.querySelector("img").src;
        var previousImage = previousBtn.querySelector("img").src;

        if(latestImg == previousImage) {
          previousBtn.disabled = true;
          previousBtn.classList.remove("btn-hover");
          latestBtn.disabled = true;
          latestBtn.classList.remove("btn-hover");


          var temp = [];
          for(var i = 0; i < button.length; i++) {
            if(button[i] !== latestBtn && button[i] !== previousBtn) {
              temp.push(button[i]);
            }
          }

          button = temp;

          previousBtn = "";
          latestBtn = "";
          successfulMoves += 2;

          var scores = Math.ceil((successfulMoves / totalMoves) * 100);
          score.textContent = scores;

          if(successfulMoves == 16) {

            var sound = new Audio("./assets/music/game-over.wav");
            sound.play();
            scores = Math.ceil((successfulMoves / totalMoves) * 100);
            scoreText.textContent = "Final Score :"
          } else {
            var sound = new Audio("./assets/music/correct.wav");
            sound.play();
          }
        } else {
          var sound = new Audio("./assets/music/wrong.wav");
          sound.play();
          for(var i = 0; i < button.length; i++) {
              button[i].disabled = true;
              button[i].classList.remove("btn-hover");
          }
          setTimeout(function() {
            latestBtn.querySelector("img").style.zIndex = -1;
            previousBtn.querySelector("img").style.zIndex = -1;
            latestBtn.disabled = false;
            latestBtn.classList.add("btn-hover");
            previousBtn.disabled = false;
            previousBtn.classList.add("btn-hover");
            previousBtn = "";
            latestBtn = "";
          } , 1000);
          setTimeout(function() {
            for(var i = 0; i < button.length; i++) {
                button[i].disabled = false;
                button[i].classList.add("btn-hover");
            }
          } , 1100);
        }

      }
    } 
  });
}


restart.addEventListener('click' , function() {
  totalMoves = 0;
  successfulMoves = 0;
  previousBtn = "";
  latestBtn = "";
  for(var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
    buttons[i].classList.add("btn-hover");
    buttons[i].querySelector("img").style.zIndex = -1;
  }
  button = buttons;
  for(var i = 0; i < imageSource.length; i++) {
    imageSource[i].usedCount = 0;
  }
  for(var i = 0; i < img.length; i++) {
    img[i].style.zIndex = "-1";
    img[i].src = generateImage();
  }
  score.textContent = "0";
  scoreText.textContent = "Live Score";
});