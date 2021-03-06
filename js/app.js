/*
 * Create a list that holds all of your cards
 */
 const deck = document.querySelector('.deck');
 let cards = document.querySelectorAll('.card');
 let iElementCards = new Array();

/* adding i elements into an array */
for (const card of cards){
 iElementCards.push(card.firstElementChild);
}

/*
* Create variable for class name to open and show card
*/
 const openClassName="open";
 const showClassName="show";

/*
* Variable for the opened cards list
*/
let openedCardList = new Array();

/*
* Variable for stars
*/
let stars = 3;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
* Declare variables for counter
*/
let counter=0;
const counterSpan = document.querySelector('.moves');


/*
* Declare variables for timer
*/
let minClass = document.querySelector('.minutes');
let secClass = document.querySelector('.seconds');
var active = false; // keep track timer state


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/**
* @description Shuffle cards and add into html
* @constructor
*/
function shuffleCards ()
{
  deck.innerHTML='';
  iElementCards = shuffle(iElementCards);
  for (let i=0;i<cards.length;i++){
    cards[i].className = 'card';
    cards[i].appendChild(iElementCards[i]);
    deck.appendChild(cards[i]);
  }
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 /**
* @description Open the cards
* @constructor
* @param {html element} pCard - The card of the deck
*/
 function openCard (pCard)
 {
   pCard.classList.add(openClassName);
   pCard.classList.add(showClassName);
 }


/**
* @description Close the cards
* @constructor
* @param {html element} pCard - The card of the deck
*/
function closeCard(pCard)
{
  pCard.className = "card";
}


/**
* @description Compare similarity between cards
* - Firsly, pusd new opened card to the opened card listener
* - Then, increase and update counter
* - Check similarity:
*   + two cards are similar
*   + two cards are not similar: add animation and hide the cards
* @constructor
* @param {html element} pCard - The card of the deck
*/
function compareSimilarity (pCard)
{
  openedCardList.push(pCard);      // add to the list
  if (openedCardList.length >= 2){    //  the list of open card has another list
    counter++;  // increment move counter

    counterSpan.textContent = counter;      //update counter

    // check similarity between two cards
    if (openedCardList[0].firstElementChild.className === openedCardList[1].firstElementChild.className){
      // the cards are same
      openedCardList[0].className = "card match";
      openedCardList[1].className = "card match";

      // remove the card from the list
      removeCardsFromList(openedCardList);
    }
    else{
      // the cards are not same
      // add animation
      openedCardList[0].classList.add("animated");
      openedCardList[0].classList.add("wobble");
      openedCardList[0].classList.add("wrong");
      openedCardList[1].classList.add("animated");
      openedCardList[1].classList.add("wobble");
      openedCardList[1].classList.add("wrong");

      // hide the cards and remove from the list
      setTimeout(function closeOpenedCards() {
          closeCard(openedCardList[0]);
          closeCard(openedCardList[1]);
          removeCardsFromList(openedCardList);
      }, 500);
    }
  }
}

/**
* @description Rating star
* @constructor
* @param {int} pCounter - counter moves
*/
function starRating(pCounter){
    let lStars=0;
    if (pCounter<=10){
        lStars = 3;
    }
    else if (pCounter>10 && pCounter<=16) {
        lStars = 2;
    }
    else{
        lStars = 1;
    }
    return lStars;
}

/**
* @description Display start to html
* @constructor
* @param {int} pStars - number of stars
*/
function displayStar(pStars){
  const starDiv = document.querySelector('.stars');
  const htmlStar = '<li><i class="fa fa-star"></i></li>';
  const htmlNoStar = '<li><i class="fa fa-star-o"></i></li>';
  if (pStars === 3){
    starDiv.innerHTML =htmlStar+htmlStar+htmlStar;
  } else if (pStars === 2){
    starDiv.innerHTML =htmlStar+htmlStar+htmlNoStar;
  }
  else{
    starDiv.innerHTML =htmlStar+htmlNoStar+htmlNoStar;
  }
}

/**
* @description restart the game
* - Shuffle the cards
* - Set counter to 0 and display in html
* - Set star to 3 and display in html
* - Reset timer
* - Restart pop up
* @constructor
*/
function restartGame () {
  stopTimer();
  removeCardsFromList(openedCardList);
  shuffleCards ();
  counter = 0;
  stars = 3;
  counterSpan.textContent = counter;
  displayStar(stars);
  resetTimer();
  restartGamePopup();
}

/**
* @description remove all cards from the list
* @constructor
*/
function removeCardsFromList (array)
{
  while (array.length>0)
  {
    openedCardList.pop();
  }
}


/**
* @description show congratulation message using sweetalert2 library
* - if user want to play again, call restartGame funciton
* @constructor
*/
function congratulationMessage()
{
    // use from sweetalert2 library
    swal({
        type: 'success',
        title: 'Congratulations! You won!',
        html:
        `<p>With ${counter} moves and ${stars} stars</p>
        <p>in ${minClass.innerHTML}:${secClass.innerHTML} minutes</p>
        </p>Woooooo!</p>`,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Play again!'
    }
    ).then((result) => {
        if (result.value) {
            restartGame();
            active = true;
            startTimer();
        }
    });
}

/**
* @description congratulation pop up
* @constructor
*/
function congratulationPopUp()
{
    let checkAllCard = false;
    for (const card of cards){
        if (card.className !== "card match"){
            checkAllCard = false;
            break;
        }
        checkAllCard = true;
    }

    if (checkAllCard === true)
    {
        congratulationMessage();
        stopTimer();
    }
}

/**
* @description start timer
* @constructor
*/
function startTimer ()
{
    if (active){
        var min = minClass.innerHTML;
        var sec = secClass.innerHTML;
        if (sec == 59){
            min++;
            sec = 0;
            if (min<10){
                min ="0"+min;
            }
        } else{
            sec++;
            if (sec<10){
                sec = "0"+sec;
            }
        }

        // update html
        minClass.innerHTML = min;
        secClass.innerHTML = sec;
        setTimeout(startTimer, 1000);   // keep repeating with speed of 1 second
    }
}

/**
* @description reset timer
* @constructor
*/
function resetTimer(){
  // update html
  minClass.innerHTML = "00";
  secClass.innerHTML = "00";
}

/**
* @description stop timer
* @constructor
*/
function stopTimer()
{
  if (active === true){
    active = false;
  }
}

/**
* @description Show pop up start game
* @constructor
*/
function startGamePopup()
{
  // use sweetalert2 library
  swal({
      type: 'info',
      title: 'Welcome to Matching Game',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Start'
  }
  ).then((result) => {
      if (result.value) {
          active = true;
          startTimer();
      }
  });
}


/**
* @description Show pop up restart game
* @constructor
*/
function restartGamePopup()
{
  // use sweetalert2 library
  swal({
      type: 'success',
      title: 'Restart success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'play'
  }
  ).then((result) => {
      if (result.value) {
          active = true;
          startTimer();
      }
  });
}

/**
* Event listener after the page loaed
*   - Shuffle cards
*/
document.addEventListener('DOMContentLoaded', function() {
  shuffleCards ();
  startGamePopup();
}, false);


/**
* The restart button allow the player to reset the game
*/
const restart = document.querySelector('.restart');
restart.addEventListener('click', function(){
  restartGame();
});

/**
* Add event listener to the cards
*   - Open cards
*   - Check similarity
*/
for (let card of cards){
  card.addEventListener('click', function(){
    // if cards havent opened and if length of openedCardList less than 2
    // avoid user click multiple cards in short time
    if (card.className === "card" && openedCardList.length < 2)
    {
      openCard(card);
      compareSimilarity (card);
    }

    // update stars in the html
    stars = starRating(counter);
    displayStar(stars);

    // the player won
    setTimeout(function showCongratuation(){
        congratulationPopUp();
    }, 200);
  });
}
