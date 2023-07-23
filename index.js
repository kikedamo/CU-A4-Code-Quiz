const BtnOne = document.getElementById("BtnOne");
const BtnTwo = document.getElementById("BtnTwo");
const BtnThree = document.getElementById("BtnThree");
const BtnFour = document.getElementById("BtnFour");
const Start = document.getElementById("StartBtn");
const Next = document.getElementById("NextBtn");
const Quest = document.getElementById("Question");
const BtnAll = document.getElementById("Buttons");
const web = document.getElementById("WholeSite");
const QuestionArea = document.getElementById("QuestionArea")
const EndGameArea = document.getElementById("EndGame");
const ScoreTable = document.getElementById("scoreTable");
const Btn = document.getElementsByClassName("Btn")
const Timer = document.getElementById("timer");
const scoresButton = document.getElementById("viewScores");
let score  = 0;
let time = 60; // Time in seconds.
let timer;

let CurrentQuestionIndex = -1

// If the high score list hasn't been created yet...
if (localStorage.highScores == null) {
	localStorage.highScores = JSON.stringify([]); // create it.
}

function showScoreList() {
	QuestionArea.classList.add("Hide"); // Hiding question area.
	ScoreTable.classList.remove("Hide"); // Showing score table.

	// If the timer is running, clear it and reset it.
	if (timer != null) {
		clearInterval(timer);
		time = 60;
	}

	// Populating score table.
	var highScores = JSON.parse(localStorage.highScores);

	console.log(highScores);

	// Getting the table body.
	var table = ScoreTable.getElementsByTagName("tbody")[0];

	for (var i = 0; i < highScores.length; i++) {
		// Getting the current score in the index.
		var currentScore = highScores[i];

		// Create a new table row.
		var tableRow = document.createElement("tr");
		tableRow.innerHTML = "<td>" + currentScore.name + "</td><td>" + currentScore.score + "</td>";

		table.appendChild(tableRow);
	}
}

// If they click the high scores button...
scoresButton.addEventListener("click", () => {
	showScoreList();
});

Start.addEventListener("click", StartGame);
Next.addEventListener("click", NextQuestion);
	// BtnOne.addEventListener("click", )
	// BtnTwo.addEventListener("click", )
	// BtnThree.addEventListener("click", )
	// BtnFour.addEventListener("click", )

function StartGame() {
	console.log("Game Started");
	Start.classList.add("Hide");
	Quest.classList.remove("Hide");
	BtnAll.classList.remove("Hide");
	Next.classList.remove("Hide");
	Timer.classList.remove("Hide");
	NextQuestion();

	timer = setInterval(function() {
		time--; // Every 1 seconds, the time is decreased by 1 second.
		Timer.innerHTML = "Timer: " + time;
	},1000);
}

function NextQuestion() {
	ResetQuestion()
	CurrentQuestionIndex++;
	if (CurrentQuestionIndex < QuestionsAll.length) {
		ShowQuestion();
	} else {
		EndGame();
	}
}

function ShowQuestion() {
	let currentQuestion = QuestionsAll[CurrentQuestionIndex];
	console.log("question number",CurrentQuestionIndex+1)
	Quest.innerHTML = currentQuestion.Question;
	currentQuestion.Answers.forEach(Answer =>{
		const BtnTag = document.createElement("button");
		BtnTag.innerHTML = Answer.text;
		BtnTag.value = Answer.correct;
		BtnTag.classList.add("Btn");
		if (Answer.correct){
			BtnTag.dataset.correct = Answer.correct;
		}
		BtnTag.addEventListener("click", SelectAnswer)
		BtnAll.appendChild(BtnTag);
	});
}

function SelectAnswer() {
	for (var i = 0; i < document.getElementsByTagName("button").length; i++) {
		var current = document.getElementsByTagName("button")[i];
	
		if (current.classList.contains("Btn")) {
			current.classList.replace("Btn", "BtnDisabled");
	
			console.log(current);
		}
	}
	
	// If the answer they selected was the right one...
	if (this.value == "true") {
		this.classList.add("Right"); // Highlight their selection as green.
		score++; // Increment their score by 1.
	// If they selected the wrong one...
	} else {
		this.classList.add("Wrong"); // Highlight their selection as red.
		if (time - 10 > 0) {
			time -= 10;
		} else {
			time = 0; // You done goofed.
			EndGame();
			Timer.innerHTML = "Timer: 0";
		}

		// Highlight the correct answer.
		for (var i = 0; i < document.getElementsByClassName("BtnDisabled").length; i++) {
			var current = document.getElementsByClassName("BtnDisabled")[i];
		
			if (current.value == "true") {
				current.classList.add("Right");
			}
		}
	}
}

function ResetQuestion(){
	var answerDiv = document.getElementById("Buttons");

	var i = 0;
	
	do {
		answerDiv.children[i].remove();
	} while (answerDiv.children.length != 0);
}

function EndGame() {
	QuestionArea.classList.add("Hide");
	EndGameArea.classList.remove("Hide");
	clearInterval(timer);

	document.getElementById("submit").addEventListener("click", () => {
		var arr = JSON.parse(localStorage.highScores); // Getting the array from local storage.
		
		arr[arr.length] = {
			name: document.getElementById("nameField").value,
			score: time
		}; // adding the user and their score to the array.

		// Sort the array.
		var sorted = true;
		do {
			sorted = true;

			for (var i = 0; i < arr.length; i++) {
				if (i + 1 < arr.length) {
					var score1 = arr[i].score;
					var score2 = arr[i+1].score;

					if (score1 < score2) {
						sorted = false;
						var temp = arr[i+1];
						arr[i+1] = arr[i];
						arr[i] = temp;
					}
				} else {
					break;
				}
			}
		} while (!sorted);

		// Updating the localStorage array with the newly updated array.
		localStorage.highScores = JSON.stringify(arr);

		// Showing the score list.
		showScoreList();

		// Hiding the input field.
		EndGameArea.classList.add("Hide");
	});
}

const QuestionsAll = [
    {
        Question: "Inside which HTML element do we put the JavaScript?",
        Answers: [{
            text: "javascript",
            correct: false
        }, {
            text: "script",
            correct: true
        }, {
            text: "link",
            correct: false
        }, {
            text: "html",
            correct: false
        }, ]
    },
    {
        Question: "How do you write 'Hello World' in an alert box?",
        Answers: [{
            text: "alertBox('Hello World')",
            correct: false
        }, {
            text: "msg('Hello World')",
            correct: false
        }, {
            text: "console.log('Hello World')",
            correct: false
        }, {
            text: "alert('Hello World')",
            correct: true
        }, ],
    },
    {
        Question: "How do you create a function in JavaScript?",
        Answers: [{
            text: "function myFunction()",
            correct: true
        }, {
            text: "function:myFunction()",
            correct: false
        }, {
            text: "function=myFunction()",
            correct: false
        }, {
            text: "create.myFunction()",
            correct: false
        }, ],
    },
    {
        Question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        Answers: [{
            text: "script name='xxx.js'",
            correct: false
        }, {
            text: "script src='xxx.js'",
            correct: true
        }, {
            text: "script src=xxx.js",
            correct: false
        }, {
            text: "script href='xxx.js'",
            correct: false
        }, ],
    },
    {
        Question: "How can you add a comment in a JavaScript?",
        Answers: [{
            text: "*This is a comment*",
            correct: false
        }, {
            text: "/*This is a comment*/",
            correct: false
        }, {
            text: "//This is a comment",
            correct: true
        }, {
            text: "//This is a comment//",
            correct: false
        }, ],
    },
]