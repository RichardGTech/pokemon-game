// Gamestate
var gameState = {
    userPokemon: "",
    rivalPokemon: "",
    pokemonDB: [
      {
        name: "charmander",
        type: "fire",
        hp: 39,
        attack: 52,
        defense: 43,
        level: 1,
        img: "http://www.smogon.com/dex/media/sprites/xy/charmander.gif"
      },
      {
        name: "bulbasaur",
        type: "grass",
        hp: 45,
        attack: 49,
        defense: 49,
        level: 1,
        img: "http://www.smogon.com/dex/media/sprites/xy/bulbasaur.gif"
      },
      {
        name: "squirtle",
        type: "water",
        hp: 44,
        attack: 48,
        defense: 65,
        level: 1,
        img: "http://www.smogon.com/dex/media/sprites/xy/squirtle.gif"
      }
    ],
    elements: {
      pokemonsEl: document
        .querySelector(".select-screen")
        .querySelectorAll(".character"),
      battleScreenEl: document.getElementById("battle-screen"),
      attackBtnsEl: document
        .getElementById("battle-screen")
        .querySelectorAll(".attack")
    },
    init: function() {
      // Elements
  
      console.log(gameState.elements.attackBtnsEl);
  
      // Initial Loop
      var i = 0;
      while (i < gameState.elements.pokemonsEl.length) {
        // Add function to all characters on Screen Select
        gameState.elements.pokemonsEl[i].onclick = function() {
          // Current Selected Pokemon's Name
          var pokemonName = this.dataset.pokemon;
  
          // Elements for Images on Battle Screen
          var player1Img = document
            .querySelector(".player1")
            .getElementsByTagName("img");
          var player2Img = document
            .querySelector(".player2")
            .getElementsByTagName("img");
  
          // Save Current Pokemon
          gameState.userPokemon = pokemonName;
  
          // CPU Picks a Pokemon
          gameState.cpuPick();
          // Change to Battle Scene
          gameState.elements.battleScreenEl.classList.toggle("active");
  
          // Select Data from User Pokemon
          gameState.currentPokemon = gameState.pokemonDB.filter(function(
            pokemon
          ) {
            return pokemon.name == gameState.userPokemon;
          });
          player1Img[0].src = gameState.currentPokemon[0].img;
  
          // Select Data from CPU Pokemon
          gameState.currentRivalPokemon = gameState.pokemonDB.filter(function(
            pokemon
          ) {
            return pokemon.name == gameState.rivalPokemon;
          });
          player2Img[0].src = gameState.currentRivalPokemon[0].img;
  
          // Current User & CPU Pokemon Health
          gameState.currentPokemon[0].health = gameState.calcInitHealth(
            gameState.currentPokemon
          );
          gameState.currentPokemon[0].originalHealth = gameState.calcInitHealth(
            gameState.currentPokemon
          );
  
          gameState.currentRivalPokemon[0].health = gameState.calcInitHealth(
            gameState.currentRivalPokemon
          );
          gameState.currentRivalPokemon[0].originalHealth = gameState.calcInitHealth(
            gameState.currentRivalPokemon
          );
  
          console.log(gameState);
        };
        i++;
      }
      var a = 0;
      while (a < gameState.elements.attackBtnsEl.length) {
        gameState.elements.attackBtnsEl[a].onclick = function() {
          var attackName = this.dataset.attack;
          gameState.currentUserAttack = attackName;
  
          gameState.play(attackName, gameState.cpuAttack());
        };
        a++;
      }
    },
    cpuAttack: function() {
      var attacks = ["rock", "paper", "scissors"];
  
      return attacks[gameState.randomNumber(0, 3)];
    },
    calcInitHealth: function(user) {
      return 0.2 * Math.sqrt(user[0].level) * user[0].defense * user[0].hp;
    },
  
    attackMove: function(attack, level, stack, critical, enemy, attacker) {
      console.log(enemy.name + " before: " + enemy.health);
      var attackAmount = attack * level * (stack + critical);
      enemy.health = enemy.health - attackAmount;
  
      var userHP = document.querySelector('.player1').querySelector('.stats').querySelector('.health').querySelector('.health-bar').querySelector('.inside')
  
      var cpuHP = document.querySelector('.player2').querySelector('.stats').querySelector('.health').querySelector('.health-bar').querySelector('.inside')
      // console.log(userHP)
      if(enemy.owner == 'user') {
        var minusPercent = ((enemy.health * 100) / enemy.originalHealth)
        console.log(userHP)
        userHP.style.width = ((minusPercent < 0) ? 0 : minusPercent) + '%'
      } else {
        var minusPercent = ((enemy.health * 100) / enemy.originalHealth)
        console.log(cpuHP)
        cpuHP.style.width = ((minusPercent < 0) ? 0 : minusPercent) + '%'
      }
      gameState.checkWinner(enemy, attacker);
      console.log(enemy.name + " after: " + enemy.health);
    },
    checkWinner: function(enemy, attacker) {
      if (enemy.health <= 0) {
        console.log("Whassup Gamer?" + attacker.name);
      }
    },
  
    randomNumber: function(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
  
    cpuPick: function() {
      do {
        gameState.rivalPokemon =
        gameState.elements.pokemonsEl[
          gameState.randomNumber(0, 3)
        ].dataset.pokemon;
        console.log('looping ' + gameState.rivalPokemon )
      }
      while (gameState.userPokemon == gameState.rivalPokemon)
        
    },
    play: function(userAttack, cpuAttack) {
      var currentPokemon = gameState.currentPokemon[0];
      var currentRivalPokemon = gameState.currentRivalPokemon[0];
      currentPokemon.owner = 'user'
      currentRivalPokemon.owner = 'cpu'
      switch (userAttack) {
        case "rock":
          if (cpuAttack == "paper") {
            if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
              // user
              gameState.attackMove(
                currentPokemon.attack,
                currentPokemon.level,
                0.8,
                0.5,
                currentRivalPokemon,
                currentPokemon
              );
              if (currentRivalPokemon.health >= 1) {
                // cpu
                gameState.attackMove(
                  currentRivalPokemon.attack,
                  currentRivalPokemon.level,
                  0.8,
                  2,
                  currentPokemon,
                  currentRivalPokemon
                );
              }
            }
          }
          if (cpuAttack == "scissors") {
            if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
              // user
              gameState.attackMove(
                currentPokemon.attack,
                currentPokemon.level,
                0.8,
                2,
                currentRivalPokemon,
                currentPokemon
              );
              if (currentRivalPokemon.health >= 1) {
                // cpu
                gameState.attackMove(
                  currentRivalPokemon.attack,
                  currentRivalPokemon.level,
                  0.8,
                  0.5,
                  currentPokemon,
                  currentRivalPokemon
                );
              }
            }
          }
          if (cpuAttack == "rock") {
            if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
              // user
              gameState.attackMove(
                currentPokemon.attack,
                currentPokemon.level,
                0.8,
                0.1,
                currentRivalPokemon,
                currentPokemon
              );
              if (currentRivalPokemon.health >= 1) {
                // cpu
                gameState.attackMove(
                  currentRivalPokemon.attack,
                  currentRivalPokemon.level,
                  0.8,
                  1,
                  currentPokemon,
                  currentRivalPokemon
                );
              }
            }
          }
          break;
        case "paper":
          if (cpuAttack == "paper") {
            if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
              // user
              gameState.attackMove(
                currentPokemon.attack,
                currentPokemon.level,
                0.8,
                1,
                currentRivalPokemon,
                currentPokemon
              );
              if (currentRivalPokemon.health >= 1) {
                // cpu
                gameState.attackMove(
                  currentRivalPokemon.attack,
                  currentRivalPokemon.level,
                  0.8,
                  1,
                  currentPokemon,
                  currentRivalPokemon
                );
              }
            }
          }
          if (cpuAttack == "scissors") {
            if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
              // user
              gameState.attackMove(
                currentPokemon.attack,
                currentPokemon.level,
                0.8,
                0.5,
                currentRivalPokemon,
                currentPokemon
              );
              if (currentRivalPokemon.health >= 1) {
                // cpu
                gameState.attackMove(
                  currentRivalPokemon.attack,
                  currentRivalPokemon.level,
                  0.8,
                  2,
                  currentPokemon,
                  currentRivalPokemon
                );
              }
            }
          }
          if (cpuAttack == "rock") {
            if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
              // user
              gameState.attackMove(
                currentPokemon.attack,
                currentPokemon.level,
                0.8,
                2,
                currentRivalPokemon,
                currentPokemon
              );
              if (currentRivalPokemon.health >= 1) {
                // cpu
                gameState.attackMove(
                  currentRivalPokemon.attack,
                  currentRivalPokemon.level,
                  0.8,
                  0.5,
                  currentPokemon,
                  currentRivalPokemon
                );
              }
            }
          }
          break;
        case "scissors":
          if (cpuAttack == "paper") {
            if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
              // user
              gameState.attackMove(
                currentPokemon.attack,
                currentPokemon.level,
                0.8,
                2,
                currentRivalPokemon,
                currentPokemon
              );
              if (currentRivalPokemon.health >= 1) {
                // cpu
                gameState.attackMove(
                  currentRivalPokemon.attack,
                  currentRivalPokemon.level,
                  0.8,
                  0.5,
                  currentPokemon,
                  currentRivalPokemon
                );
              }
            }
          }
          if (cpuAttack == "scissors") {
            if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
              // user
              gameState.attackMove(
                currentPokemon.attack,
                currentPokemon.level,
                0.8,
                1,
                currentRivalPokemon,
                currentPokemon
              );
              if (currentRivalPokemon.health >= 1) {
                // cpu
                gameState.attackMove(
                  currentRivalPokemon.attack,
                  currentRivalPokemon.level,
                  0.8,
                  1,
                  currentPokemon,
                  currentRivalPokemon
                );
              }
            }
          }
          if (cpuAttack == "rock") {
            if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
              // user
              gameState.attackMove(
                currentPokemon.attack,
                currentPokemon.level,
                0.8,
                0.5,
                currentRivalPokemon,
                currentPokemon
              );
              if (currentRivalPokemon.health >= 1) {
                // cpu
                gameState.attackMove(
                  currentRivalPokemon.attack,
                  currentRivalPokemon.level,
                  0.8,
                  2,
                  currentPokemon,
                  currentRivalPokemon
                );
              }
            }
          }
          break;
      }
    }
  };
  gameState.init();