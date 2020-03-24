
window.addEventListener('DOMContentLoaded', (event) => {
  // Init of variables
  const objOfOptions = {r: "rock", p: "paper", s: "scissors"};
  const arrOfOptions = Object.keys(objOfOptions);
  const options = document.querySelector(".options");
  let pScore = 0;
  let cScore = 0;


  const handleGame = () => { 

    // Populate option buttons
    const populateOptions = () => {
      let html = arrOfOptions.reduce((html, option) => html + `<button data-id="${option}" class="${objOfOptions[option]}">${objOfOptions[option]}</button>`, '');
      options.innerHTML = html;
    }

    //Start the Game
    const startGame = () => {
      const playBtn = document.querySelector(".intro button");
      const introScreen = document.querySelector(".intro");
      const match = document.querySelector(".match");
  
      playBtn.addEventListener("click", () => {
        introScreen.classList.add("fadeOut");
        match.classList.add("fadeIn");
      });
    };

    //Play Match
    const playMatch = () => {
      const playerHand = document.querySelector(".player-hand");
      const computerHand = document.querySelector(".computer-hand");
      const hands = document.querySelectorAll(".hands img");
      const btnOptions = document.querySelectorAll(".options button");
  
      // Removes animation everytime animation ends
      hands.forEach(hand => {
        hand.addEventListener("animationend", function(event) {
          this.style.animation = "";
        });
      });

      //Choosing an option
      btnOptions.forEach(btn => {
        btn.addEventListener("click", function() {
          // start with default conditon of hands on every click
          playerHand.src = `./assets/rock.png`;
          computerHand.src = `./assets/rock.png`;

          //Computer Choice
          const computerNumber = Math.floor(Math.random() * arrOfOptions.length);   
          const computerChoice = arrOfOptions[computerNumber];

          // Player Choice
          const playerChoice = this.getAttribute('data-id');
          
          setTimeout(() => {
            //Here is where we call compareResults
            compareResults(playerChoice, computerChoice);
            //Update Images
            playerHand.src = `./assets/${objOfOptions[playerChoice]}.png`;
            computerHand.src = `./assets/${objOfOptions[computerChoice]}.png`;
          }, 2000);
          //Animation
          playerHand.style.animation = "shakePlayer 2s ease";
          computerHand.style.animation = "shakeComputer 2s ease";
        });
      });
    };
  
    const updateScore = () => {
      const playerScore = document.querySelector(".player-score p");
      const computerScore = document.querySelector(".computer-score p");
      playerScore.textContent = pScore;
      computerScore.textContent = cScore;
    };
  
  // function comparing feedbacks passed and rendering the result
    const compareResults = (p, c) => {
      let result = 0;
      const winner = document.querySelector(".winner");
      
      if (p !== c) {
          const gData = {
          'sr': -1,
          'sp': 1,
          'rs': 1,
          'rp': -1,
          'ps': -1,
          'pr': 1
          };    

          result = gData[p.trim()+c.trim()];
      }
  
      // Passing result to switch cases
      switch(result) {
          case 1:
              pScore++;
              updateScore();
              winner.textContent = 'Player Wins';
              break;
          case -1: 
              cScore++;
              updateScore();
              winner.textContent = 'Computer Wins';
              break;
          case 0:
              winner.textContent = 'It is a tie';
              break;     
      }
    }
  
    
  
    //Inner functions call
    populateOptions();
    startGame();
    playMatch();
  };
  
  //start the game function
  handleGame();
  
});



