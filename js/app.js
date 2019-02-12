

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


var cardArray = ["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-leaf","fa fa-bicycle","fa fa-bomb","fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-leaf","fa fa-bicycle","fa fa-bomb"];

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


var cards = document.querySelectorAll(".card");

function startGame(){
	var newArray = shuffle(cardArray);
	for(var i=0;i<cards.length;i++){
		var newElement = document.createElement("i");
		newElement.className =newArray[i];
		cards[i].appendChild(newElement);
	}
}
function clearCard(){
	for(var i=0;i<cards.length;i++){
		cards[i].removeChild(cards[i].firstChild);
	}
}

startGame();

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

var openedCards = [];
var move = 0;

cards.forEach (function(card) {
	card.addEventListener('click',function(){
		move++;
		document.getElementById("move_count").textContent =move;
		openedCards.push(card);
		card.classList.add("open","show");



		if(openedCards.length==2){
			var card1Pattern = openedCards[0].getElementsByTagName("i")[0].getAttribute("class");
			var card2Pattern = openedCards[1].getElementsByTagName("i")[0].getAttribute("class");
			if(card1Pattern==card2Pattern){
				openedCards[0].classList.add("match");
				openedCards[1].classList.add("match");
			}else {
				openedCards[0].classList.add("mismatch");
			 	openedCards[1].classList.add("mismatch");
			}

			setTimeout(function(){
					openedCards.forEach(function(card){
						card.classList.remove("mismatch","open","show");
					});
					openedCards=[];

				},500);			
			
		}

	});
})


var restart = document.querySelector(".restart");

restart.addEventListener("click",function(){
	cards.forEach(function(card){
		card.classList.remove("open","show","match");
	})
	document.getElementById("move_count").textContent=0;
	move=0;
	clearCard();
	startGame();
})


