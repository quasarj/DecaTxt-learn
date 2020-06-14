const keymap = {"function": "125", "d": "0", "j": "1", "i": "2", "h": "3",
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

// utility functions

function GetById(id) {
	return document.getElementById(id);
}

function printableCharName(character) {
	const printmap = {
		" ": "space",
	};
	let lookup = printmap[character];
	if (lookup === undefined) {
		return character;
	} else {
		return lookup;
	}
}

class DecaTxt {
	constructor() {
		this.keypad = new Keypad();
		this.prompt = new Prompt();
		this.ticker = new Ticker();
		this.display = new InputDisplay();

		this.container_el = GetById("container");
		this.input_el = GetById("user_input");

		this.success_count = 0;
		this.error_count = 0;

		this.updateDisplay();
	}
	updateDisplay() {
		this.keypad.resetNumbers();
		this.showChar(this.ticker.currentLetter());
		this.input_el.focus();
	}
	indicateInputAccepted() {
		this.success_count++;
		let el = this.container_el;
		el.classList.remove("error");
		if (el.classList.contains("alternate")) {
			el.classList.remove("alternate");
		} else {
			el.classList.add("alternate");
		}
	}
	indicateError() {
		this.error_count++;
		this.container_el.classList.add("error");
	}
	showChar(character) {
		this.keypad.displayLetter(keymap[character]);
		this.prompt.displayLetter(character);
	}
	hideGuideHandler(event) {
		this.keypad.toggleVisibility();
		// when clicking the button, it will get focus, we don't want that
		this.input_el.focus();
	}
	keyHandler(event) {
		let key = event.key;
		let letter = this.ticker.currentLetter();
		this.display.show(key);

		if (key === letter) {
			this.ticker.nextLetter();
			this.indicateInputAccepted();
			this.updateDisplay();
		} else {
			this.indicateError();
		}
	}
}

class Keypad {
	constructor() {
		this.element = GetById("guide");
		this.hide_button_el = GetById("hide_button");
	}
	toggleVisibility() {
		if (this.element.classList.contains("hidden")) {
			this.element.classList.remove("hidden");
			this.hide_button_el.innerText = "Hide keypad";
		} else {
			this.element.classList.add("hidden");
			this.hide_button_el.innerText = "Show keypad";
		}
	}
	displayLetter(numstring) {
		for (var i = 0; i < numstring.length; i++) {
		  this.turnOnNumber(numstring.charAt(i));
		}
	}
	turnOnNumber(num) {
	  let el = GetById("b" + num);
	  el.classList.add("on")
	}
	turnOffNumber(num) {
	  let el = GetById("b" + num);
	  el.classList.add("off");
	  el.classList.remove("on");
	}
	resetNumbers() {
		document.getElementsByName("number").forEach(
			x => x.classList.remove("on")
		);
	}
}

class Prompt {
	constructor() {
		this.element = GetById("letter");
	}
	displayLetter(letter) {
		this.element.innerHTML = printableCharName(letter);
	}
}

class Ticker {
	constructor() {
		this.element = GetById("letter_train_display");

		let defaultLetterTrain = "default aeiouy";
		let urlParams = new URLSearchParams(window.location.search);
		this.tickerstring = urlParams.get('letters') || defaultLetterTrain;
		this.element.innerHTML = this.tickerstring;
		this.pos = 0;

		this.updateDisplay();
	}
	currentLetter() {
		return this.tickerstring.charAt(this.pos);
	}
	nextLetter() {
		this.pos++;
		if (this.pos >= this.tickerstring.length) {
			this.pos = 0;
		}

		this.updateDisplay();

		return this.tickerstring.charAt(this.pos);
	}
	updateDisplay() {
		let left = this.tickerstring.substring(0, this.pos);
		let current = this.tickerstring.substring(this.pos, this.pos + 1);
		let right = this.tickerstring.substring(this.pos + 1);

		this.element.innerHTML = left + "<span class=\"highlight\">" + 
			current + "</span>" + right;
	}
}

// This is intended for the element that will display the user's
// input, so they know what they just typed (in the event of an error)
class InputDisplay {
	constructor() {
		this.element = GetById("last_input");
	}
	show(character) {
		this.element.innerText = printableCharName(character);
	}
}

let decatxt;

document.addEventListener("DOMContentLoaded", function(){
	decatxt = new DecaTxt();
});
