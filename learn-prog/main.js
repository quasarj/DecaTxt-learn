let keymap = {"function": "125", "d": "0", "j": "1", "i": "2", "h": "3",
			  "g": "4", "f": "5", "e": "6", "a": "7", "b": "8", "c": "9",
			  "z": "51", "x": "53", "w": "54", "shift": "56", "s": "57",
	          "t": "58", "u": "59", "v": "50", "r": "61", "q": "62", "p": "63",
	          "o": "64", "k": "67", "l": "68", "m": "69", "n": "60", "!": "71",
	          "?": "72", ".": "37", "enter": "74", "tab": "87", ",": "79",
	          "'": "70", " ": "765", "&": "7654", "@": "41", "\"": "42", 
	          "*": "34", "~": "48", ":": "49", ";": "40", "backspace": "456", 
	          "\\": "4563", "|": "81", "`": "82", "-": "83", "capslock": "89", 
	          "numlock": "80", "_": "893", "scrolllock": "897", "pause": "31", 
	          "^": "32", "pageup": "39", "pagedown": "30", ">": "342", 
	          "home": "345", "end": "346", "printscreen": "347", "<": "348", 
	          "%": "91", "control": "92", "#": "90", "$": "902", "down": "903", 
	          "up": "904", "left": "905", "right": "906", "volumeup": "907", 
	          "volumedown": "908", "insert": "21", "delete": "20", "menu": "123", 
	          "windows": "124", "escape": "126", "alternate": "127", 
	          "break": "128", "{": "012", "[": "013", "]": "014", "}": "015", 
	          "=": "016", "+": "017", "(": "018", ")": "019", "f1": "681", 
	          "f2": "682", "f3": "683", "f4": "684", "f5": "687", "f9": "583", 
	          "fspace": "680", "f7": "581", "f8": "582", "f10": "584", 
	          "f11": "587", "f12": "589", "y": "52"};

function turnOnNumber(num) {
  let el = document.getElementById("b" + num);
  el.classList.add("on")
}
function turnOffNumber(num) {
  let el = document.getElementById("b" + num);
  el.classList.add("off");
  el.classList.remove("on");
}

function displayLetter(numstring) {
	for (var i = 0; i < numstring.length; i++) {
	  turnOnNumber(numstring.charAt(i));
	}
}

function showChar(character) {
	displayLetter(keymap[character]);

	if (character == ' ') {
		character = 'space';
	}
	document.getElementById("letter").innerHTML = character;
}

function advanceOneLetter() {
	pos++;
	if (pos >= letterTrain.length) {
		pos = 0;
	}
}

function indicateInputAccepted() {
	let el = document.getElementById("container");
	el.classList.remove("error");
	if (el.classList.contains("alternate")) {
		console.log("Removing alternate");
		el.classList.remove("alternate");
	} else {
		console.log("Adding alternate");
		el.classList.add("alternate");
	}
}

function indicateError() {
	let el = document.getElementById("container");
	el.classList.add("error");
}

function keyHandler(event) {
	let key = event.key;
	let letter = letterTrain.charAt(pos);

	if (key === letter) {
		advanceOneLetter();
		indicateInputAccepted();
		updateDisplay();
	} else {
		indicateError();
	}
}

function resetNumbers() {
	for (var i = 0; i < 10; i++) {
	  turnOffNumber(i);
	}
}

function updateDisplay() {
	resetNumbers();
	let letter = letterTrain.charAt(pos);
	showChar(letter);
	document.getElementById("user_input").focus();

}


const defaultLetterTrain = "this is the default letters pass letters param for custom letters";
const urlParams = new URLSearchParams(window.location.search);
const letterTrain = urlParams.get('letters') || defaultLetterTrain;

let pos = 0;

document.addEventListener("DOMContentLoaded", function(){
	document.getElementById("letter_train_display").innerHTML = letterTrain;
	updateDisplay();
});
