var firstDice = document.querySelectorAll("img")[0];
var secondDice = document.querySelectorAll("img")[1];
var firstDiceValue = getDiceValue();
var secondDiceValue = getDiceValue();
var header = document.querySelector("h1");
firstDice.setAttribute("src", "images/dice" + firstDiceValue + ".png")
secondDice.setAttribute("src", "images/dice" + secondDiceValue + ".png")
if(firstDiceValue > secondDiceValue){
  header.textContent = "🚩Player 1 Wins";
}
if(secondDiceValue > firstDiceValue){
  header.textContent = "Player 2 Wins🚩";
}
if(firstDiceValue === secondDiceValue){
  header.textContent = "Draw";
}
function getDiceValue(){
  var diceValue = Math.random();
  diceValue *= 6;
  diceValue = Math.floor(diceValue) + 1;
  return diceValue;
}
