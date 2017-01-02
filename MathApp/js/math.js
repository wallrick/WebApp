var resultVar = 0;
var count = 0;
var reset_input = false;

// This keeps the page from being elastic 
function BlockMove(event) {	// Tell Safari not to move the window.
	event.preventDefault();
}

function validate() { // Valdate the result if correct setup new equation
	var result = $('input#math_result').val();
	if (result != resultVar) {
		document.getElementById('math_result').style.backgroundColor = 'red';
		reset_input = true;
	} else {
		count++;
		initEquation();
	}
}

function clearInput() {  // Clears the input
	document.getElementById('math_result').style.backgroundColor = 'white';
	$('input#math_result').val('');
	reset_input = false;
}

function initEquation() { // Sets up a new equation
	var firstVar = 0;
	var secondVar = 0;
	var addsubVar = 0;

	clearInput();

	addsubVar = Math.floor(Math.random() * 2);

	while (firstVar == 0)
		firstVar = Math.floor(Math.random() * 21);

	if (addsubVar == 0) { // 0 - subtraction
		while (secondVar == 0 || secondVar >= firstVar)
			secondVar = Math.floor(Math.random() * 21);
	} else {
		secondVar = Math.floor(Math.random() * 21);
	}

	$('div#first').text(firstVar);
	if (addsubVar == 0) { // 0 - subtraction
		$('div#addsub').text('-');
		resultVar = firstVar - secondVar;
	} else { // 1 - addition
		$('div#addsub').text('+');
		resultVar = firstVar + secondVar;
	}

	$('div#second').text(secondVar);

	$('div#result_total').text(count);
}

function initButtons() { // Configures the buttons to work properly on non touch screen systems
	// Need to make this conditional on the type of browser being used.	
	var cleanUpButtonAction = "onclick";
	
	if (!("ontouchstart" in document.documentElement))
	{
	  cleanUpButtonAction = "ontouchstart";
	}
	
	var buttons = document.getElementsByClassName('num');
	
	for(var i=0, button=buttons[i]; button=buttons[i++];)
	{ 
		button.removeAttribute(cleanUpButtonAction);
	}
	
	$('#math_result').removeAttr(cleanUpButtonAction);
	$('#math_check').removeAttr(cleanUpButtonAction); 
	
}

function update(x) { // Function called when button pressed.
	if (reset_input)
		clearInput();

	if ($('input#math_result').val() < 1)
		$('input#math_result').val(x);
	else
		$('input#math_result').val($('input#math_result').val() + x);
}