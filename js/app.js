

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

var timer = document.querySelector(".timerSec");
var mins,secs;
var totalSecs=0;
var setTime;
function startTimer() {
	setTime = setInterval(calTime,1000);
}
function calTime(){
	console.log("start timeing");
	// ++totalSecs;
	totalSecs++;
	mins = parseInt(totalSecs/60) + " : ";
	secs = totalSecs%60;
	timer.innerHTML = mins + secs;
}

var cards = document.querySelectorAll(".card");

function startGame(){
	var newArray = shuffle(cardArray);
	for(var i=0;i<cards.length;i++){
		var newElement = document.createElement("i");
		newElement.className =newArray[i];
		cards[i].appendChild(newElement);
	}
	startTimer();

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
var matched =0;

cards.forEach (function(card) {
	card.addEventListener('click',function(){
		move++;
		document.getElementById("move_count").textContent =move;
		openedCards.push(card);
		card.classList.add("open","show");

		starsLevel(move);


		if(openedCards.length==2){
			var card1Pattern = openedCards[0].getElementsByTagName("i")[0].getAttribute("class");
			var card2Pattern = openedCards[1].getElementsByTagName("i")[0].getAttribute("class");
			if(card1Pattern==card2Pattern&&openedCards[0]!=openedCards[1]){
				openedCards[0].classList.add("match");
				openedCards[1].classList.add("match");
				matched++;
			}else if(openedCards[0]==openedCards[1]){
				openedCards[0].classList.remove("open","show");
			}
			else {
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
		setTimeout(popupGenerate,2000);

	});
});



var restart = document.querySelector(".restart");

restart.addEventListener("click",function restart(){
	cards.forEach(function(card){
		card.classList.remove("open","show","match");
	});
	document.getElementById("move_count").textContent=0;
	move=0;
	totalSecs=0;
	minute=0;
	second=0;
	clearCard();
	clearTimeout(setTime);
	startGame();
	startTimer();
});

var popup = document.querySelector(".popuptext");
function popupGenerate(){
	if(matched==16){
		console.log("get pop");
		var r = confirm("Congratulations! You Win! Time: " + mins + secs + ". Moves: " + move + " Do you want to start a new game?" )
		if(r==true){
			move=0;
			totalSecs=0;
			minute=0;
			second=0;
			clearCard();
			clearTimeout(setTime);
			startGame();
			startTimer();
		}
	}
}

var stars = document.querySelectorAll("#star");
function starsLevel(move){
	if(move>28&&move<=40){
		stars[0].classList.remove("checked");
	}else if(move>40){
		star[1].classList.remove("checked");
	}
}



