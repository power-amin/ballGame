// lunch modal when page start
$('.modal-info').modal({
	keyboard: false,
	backdrop: false
});
$('.continue').click(function() {
	$('.modal-name').modal({
		keyboard: false,
		backdrop: false
	});
});

// get input for modal
var interName = document.getElementById('headerUserName');
var myInputName = document.getElementById('modalUserName');
myInputName.onkeyup = function() {
	interName.innerHTML = myInputName.value;
};

//if game is started
var itIsStarted = false;

// for block the scroll when you press the keyboard
window.addEventListener(
	'keydown',
	function(e) {
		// space and arrow keys
		if ([ 32, 37, 38, 39, 40 ].indexOf(e.keyCode) > -1) {
			e.preventDefault();
		}
	},
	false
);

var MoveTopDown = 0;
var moveRightLeft = 0;
var moveStep = 50;
var countPoints = -1;
var score = 0;
var scorePoints = document.getElementById('scorePoints');

var pointsPosition = [];

// Ball that move on the screen
var ball = document.getElementById('theBall');

// buttons
var myButDown = document.getElementById('btnDown');
var myButTop = document.getElementById('btnTop');
var myButRight = document.getElementById('btnRight');
var myButLeft = document.getElementById('btnLeft');

// get the playground element
var playground = document.getElementById('main-bg');
var ball = document.getElementById('theBall');
var getHeightScreen = screen.height + 'px';
var playHeight = (playground.height = getHeightScreen);

if (getHeightScreen < 500 + 100) {
	var playHeight = (playground.height = getHeightScreen);
}

// to move top by mouse onclick
myButTop.onclick = function() {
	// get step
	var step = calculateTheDestanceForStepTop();

	// move the ball
	MoveTopDown = MoveTopDown - step;
	ball.style.top = MoveTopDown + 'px';

	removePointsInsideBall(ball);
};

// to move right by mouse onclick
myButRight.onclick = function() {

	// get step
	var step = calculateStepForRightBallMovement();

	// move the ball
	moveRightLeft = moveRightLeft + step;
	ball.style.left = moveRightLeft + 'px';

	removePointsInsideBall(ball);
};

// to move down by mouse onclick
myButDown.onclick = function() {
	// get step
	var step = calculateTheDestanceForStepDown();

	// move the ball
	MoveTopDown = MoveTopDown + step;
	ball.style.top = MoveTopDown + 'px';

	removePointsInsideBall(ball);
};

// to move left mouse onclick
myButLeft.onclick = function() {
	// get step
	var step = calculateTheDestanceForStepLeft();

	// move the ball
	moveRightLeft = moveRightLeft - step;
	ball.style.left = moveRightLeft + 'px';

	removePointsInsideBall(ball);
};

// this function to move the ball from the Keyboard
document.onkeydown = function(event) {
	if (!itIsStarted) {
		return;
	}
	// move from Top
	if (event.keyCode == 38) {
		// get step
		var step = calculateTheDestanceForStepTop();

		// move the ball
		MoveTopDown = MoveTopDown - step;
		ball.style.top = MoveTopDown + 'px';

		removePointsInsideBall(ball);
	}

	// for move it right
	if (event.keyCode == 39) {
		// get step
		var step = calculateStepForRightBallMovement();

		// move the ball
		moveRightLeft = moveRightLeft + step;
		ball.style.left = moveRightLeft + 'px';

		removePointsInsideBall(ball);
	}

	// for move it Down
	if (event.keyCode == 40) {
		// get step
		var step = calculateTheDestanceForStepDown();

		// move the ball
		MoveTopDown = MoveTopDown + step;
		ball.style.top = MoveTopDown + 'px';

		removePointsInsideBall(ball);
	}

	// for move it left
	if (event.keyCode == 37) {
		// get step
		var step = calculateTheDestanceForStepLeft();

		// move the ball
		moveRightLeft = moveRightLeft - step;
		ball.style.left = moveRightLeft + 'px';

		removePointsInsideBall(ball);
	}
};

// get random number of points
var pointsNumber = getRandomInt(5, 14);

// create points and add them to playground
var i;
for (i = 0; i <= pointsNumber; i++) {
	// create the balls inside playground
	var createBalls = createBalls();
}

// remove points catch inside ball
function removePointsInsideBall(ball) {
	// get the offsetTop and the offsetHeight
	var ballTopOffsetToTop = ball.offsetTop;

	var ballBottomOffsetToTop = ball.offsetTop + ball.offsetHeight;

	var ballLeftOffsetToLeft = ball.offsetLeft;

	var ballRightOffsetToLeft = ball.offsetLeft + ball.offsetWidth;

	for (var i in pointsPosition) {
		if (!pointsPosition.hasOwnProperty(i)) {
			continue;
		}

		// distance from ball bottom to top must be grater than point offset top
		if (ballBottomOffsetToTop >= pointsPosition[i].offsetTop) {
			// distance from ball top to top must be less than point offset top
			if (ballTopOffsetToTop <= pointsPosition[i].offsetTop) {
				// distance from ball right to left must be grater than point offset left
				if (ballRightOffsetToLeft >= pointsPosition[i].offsetLeft) {
					// distance from ball left to left must be less than point offset left
					if (ballLeftOffsetToLeft <= pointsPosition[i].offsetLeft) {
						var elemId = document.querySelectorAll('[data-id="' + i + '"]');
						// remove element from DOM
						elemId[0].parentNode.removeChild(elemId[0]);
						delete pointsPosition[i];
						// create the balls inside playground
						score++;
						scorePoints.innerHTML = score;
						countPoints++;

						// get the width and height of the ball
						var ballWidth = ball.offsetWidth;
						var ballHeight = ball.offsetHeight;
						// get playground width and height
						var playgroundWidth = playground.offsetWidth;
						var playgroundHeight = playground.offsetHeight;

						//create the elements of the points
						var element = document.createElement('span');
						playground.appendChild(element);
						var text = document.createTextNode('O');
						element.appendChild(text);

						// create classes for the points
						element.setAttribute('class', 'points');

						// create id inside the element
						element.setAttribute('data-id', countPoints);

						// get element offsetTop + offsetLeft
						var elementOffsetLeft = getRandomInt(0, playgroundWidth - element.offsetWidth);
						var elementOffsetTop = getRandomInt(0, playgroundHeight - element.offsetHeight);

						// change elementOffsetTop if offsetLeft is less than ball height
						if (elementOffsetLeft <= ballWidth) {
							// change offsetTop if is necessary ( less than ball height)
							if (elementOffsetTop <= ballHeight) {
								var elementOffsetTop = getRandomInt(
									ballHeight,
									playgroundHeight - element.offsetHeight
								);
							}
						}

						pointsPosition.push({
							offsetLeft: elementOffsetLeft,
							offsetTop: elementOffsetTop
						});

						// position element according to offsetTop and offsetLeft
						element.style.top = elementOffsetTop + 'px';
						element.style.left = elementOffsetLeft + 'px';
					}
				}
			}
		}
	}
}

// get random integer number between min and max
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to create the balls in it
function createBalls() {
	countPoints++;

	// get the width and height of the ball
	var ballWidth = ball.offsetWidth;
	var ballHeight = ball.offsetHeight;
	// get playground width and height
	var playgroundWidth = playground.offsetWidth;
	var playgroundHeight = playground.offsetHeight;

	//create the elements of the points
	var element = document.createElement('span');
	playground.appendChild(element);
	var text = document.createTextNode('');
	element.appendChild(text);

	// create classes for the points
	element.setAttribute('class', 'points');

	// create id inside the element
	element.setAttribute('data-id', countPoints);

	// get element offsetTop + offsetLeft
	var elementOffsetLeft = getRandomInt(0, playgroundWidth - element.offsetWidth);
	var elementOffsetTop = getRandomInt(0, playgroundHeight - element.offsetHeight);

	// change elementOffsetTop if offsetLeft is less than ball height
	if (elementOffsetLeft <= ballWidth) {
		// change offsetTop if is necessary ( less than ball height)
		if (elementOffsetTop <= ballHeight) {
			var elementOffsetTop = getRandomInt(ballHeight, playgroundHeight - element.offsetHeight);
		}
	}

	pointsPosition.push({
		offsetLeft: elementOffsetLeft,
		offsetTop: elementOffsetTop
	});

	// position element according to offsetTop and offsetLeft
	element.style.top = elementOffsetTop + 'px';
	element.style.left = elementOffsetLeft + 'px';

	return createBalls;
}

// This function will calculate maximum step allowed for ball to move
function calculateStepForRightBallMovement() {
	var step = moveStep;

	// get width of the playground
	var playgroundWidth = playground.offsetWidth;

	// get offset of the ball
	var ballOffsetLeft = ball.offsetLeft;

	// get width of the ball
	var ballWidth = ball.offsetWidth;

	// get right edge offset of ball
	var ballRightEdgeOffset = ballOffsetLeft + ballWidth;

	// create logic for stop the ball when hit the right edge
	if (ballRightEdgeOffset + step > playgroundWidth) {
		step = playgroundWidth - ballRightEdgeOffset;
	}

	return step;
}

// This function will calculate maximum step allowed for ball to move
function calculateTheDestanceForStepTop() {
	// local variable for move step
	var step = moveStep;

	// get the offsetTop of the ball
	var ballOffsetTop = ball.offsetTop;

	// create logic for stop the ball when hit the down
	if (ballOffsetTop - step < 0) {
		step = ballOffsetTop;
		if (step < 1) {
		}
	}
	return step;
}

// This function will calculate maximum step allowed for ball to move
function calculateTheDestanceForStepDown() {
	// local variable for move step
	var step = moveStep;

	// get the height of the place
	var playgroundHeight = playground.offsetHeight;

	// get the offsetTop of the ball
	var ballOffsetTop = ball.offsetTop;

	// get the height of the ball
	var ballHeightTop = ball.offsetHeight;

	// get down offset of the ball
	var ballDownEdgeOffset = ballOffsetTop + ballHeightTop;

	// create logic for stop the ball when hit the down
	if (ballDownEdgeOffset + step > playgroundHeight) {
		step = playgroundHeight - ballDownEdgeOffset;
		if (step < 1) {
		}
	}
	return step;
}

// This function will calculate maximum step allowed for ball to move
function calculateTheDestanceForStepLeft() {
	// local variable for move step
	var step = moveStep;

	// get offset of the ball
	var ballOffsetLeft = ball.offsetLeft;

	// create logic for stop the ball when hit the left edge
	if (ballOffsetLeft - moveStep < 0) {
		step = ballOffsetLeft;
		if (step < 1) {
		}
	}
	return step;
}

let timer = 60; // 1 minute timer
let min = 0; // 1 minute
let sec = 0; // 1 second timer

// Start count down
function startTimer() {
	itIsStarted = true;
	min = parseInt(timer / 60);
	sec = parseInt(timer % 60);

	if (timer <= 20) {
		$('#time').removeClass('text-success');
		$('#time').addClass('text-danger');
	}

	if (timer == 0) {
		itIsStarted = false;
		if (score <= 90) {
			modalsResult('#one-star');
		}
		if (score >= 90 && score <= 122) {
			modalsResult('#two-stars');
		}
		if (score > 122) {
			modalsResult('#three-stars');
		}
		return;
	}
	document.getElementById('time').innerHTML = '<b>Time left: </b>' + '0' + min.toString() + ' : ' + sec.toString();
	timer--;
	setTimeout(function() {
		startTimer();
	}, 1000);
}

function modalsResult(result) {
	$(result).modal({
		keyboard: false,
		backdrop: false
	});
	$(result).modal('show');
	$('.btn-start-again').click(function() {
		location.reload();
	});
}

$('.btn-save').click(function() {
	startTimer();
});
