window.onload=function(){
	setCTime();
	changeColor();
	pageLoad();
}
function pageLoad(){
	var sum = document.getElementById("cal");
	sum.onclick = calc;
	var ok = document.getElementById("check");
	ok.onclick = guess;
	var re = document.getElementById("restart");
	re.onclick = replay;
	var change = document.getElementById("push");
	change.onclick = changeImage;
	var print = document.getElementById("ctCreate");
	print.onclick = createColorTable;	
	var remove = document.getElementById("ctRemove");
	remove.onclick = removeColorTable;
	var st = document.getElementById("stop");
	st.onclick = stopTextColor;
	var mo = document.getElementById("move");
	mo.onclick = myMove;
	var guessbtn = document.getElementById("guessbutton");
	guessbtn.onclick = guessLetter;
	var ne = document.getElementById("new");
	ne.onclick = newGame;
}

// <덧셈 계산기>
function calc(){
	var x = document.getElementById("x").value;
	var y = document.getElementById("y").value;	
	var sum;
	sum = parseInt(x) + parseInt(y);
	document.getElementById("sum").value = sum;
}
	
// <숫자 맞추기 게임>	
var computerNumber = Math.floor(Math.random()*100+1); 	//정답
var nGuesses = 0;							//추측 횟수
function guess(){
	var user = document.getElementById("user").value;
	if(user>computerNumber){
		nGuesses++;
		document.getElementById("result").value = "정답보다 커요";
	}
	else if(user<computerNumber){
		nGuesses++;
		document.getElementById("result").value = "정답보다 작아요";
	}
	else{
		nGuesses++;
		document.getElementById("result").value = "정답!";
	}
	document.getElementById("guesses").value = nGuesses;
	document.getElementById("answer").value = computerNumber;
}
function replay(){
	computerNumber = Math.floor(Math.random()*100+1);
	nGuesses = 0;
	document.getElementById("user").value = "";
	document.getElementById("guesses").value = "";
	document.getElementById("result").value = "";	
	document.getElementById("answer").value = computerNumber;
}	

// <현재 시간>
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
function setCTime(){
	var now = new Date();
	var s = monthNames[now.getMonth()] +' ' + now.getDate() + ', ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
	document.getElementById('ctime').innerHTML = s;
	setTimeout('setCTime()',1000);
}

// <이미지 변경하기>
function changeImage(){
	var bimg = document.getElementById("image");
	var sarray = bimg.src.split("/");
	var str = sarray[sarray.length-1];
	if(str=="do1.jpg")
		bimg.src="do2.jpg";
	else
		bimg.src="do1.jpg";
}

//<색상 테이블 출력하기>
var colorNames=["maroon","red","orange","yellow","olive","purple","fuchsia","white","lime","green","navy","blue","aqua","teal","black","silver","gray"];
function createColorTable(){
	var colordiv = document.getElementById("colorTable");
	for(var i=0; i<colorNames.length; i++){
		var ndiv = document.createElement("div");
		ndiv.setAttribute("class","ctbox");
		ndiv.innerHTML = colorNames[i];
		ndiv.style.display = "inline-block";
		ndiv.style.width = "60px";
		ndiv.style.padding = "10px";
		ndiv.style.backgroundColor = colorNames[i];
		colordiv.appendChild(ndiv);
	}
}
function removeColorTable(){
	var parent = document.getElementById("colorTable");
	var child = parent.getElementsByTagName("div");
	//var child = parent.getElementsByClassName("ctbox");
	//var child = parent.childNodes;
	while(child[0])
		parent.removeChild(child[0]);
}

// 초당 색상 바꾸기
var id;
function changeColor(){
	id = setInterval(flashText,1000);
	function flashText(){
		var elem = document.getElementById("target");
		elem.style.color = (elem.style.color == "red")?"blue":"red";
		elem.style.backgroundColor = (elem.style.backgroundColor == "green")?"yellow":"green";
	}
}
function stopTextColor(){
	clearInterval(id);
}

// 상자 이동하기
function myMove(){
	var elem = document.getElementById("animate");
	var pos = 0;
	var id = setInterval(frame, 5);
	function frame(){
		if(pos==350){
			clearInterval(id);
		} else{
			pos++;
			elem.style.top = pos+'px';
			elem.style.left = pos+'px';
		}
	}
}



// <hangman>
//constants
var POSSIBLE_WORDS = ["obdurate", "verisimilitude", "defenestrate", "obsequious", "dissonant", "toady", "idempotent"];
var MAX_GUESSES = 6;
//global variables
var guesses = ""; //입력해본문자나열
var guessCount = MAX_GUESSES; //기회1씩감소
var word; //정답
function newGame(){
   var randomIndex = parseInt(Math.random()*POSSIBLE_WORDS.length); //0~6랜덤값
   word = POSSIBLE_WORDS[randomIndex];
   guessCount = MAX_GUESSES;
   guesses = "";
   var guessButton = document.getElementById("guessbutton");
   guessButton.disabled = false; //버튼활성화
   updatePage();
}
function updatePage(){
	//update clue string
	var clueString = "";
	for (var i = 0; i < word.length; i++){
		var letter = word.charAt(i); //word속 한글자, word[0]==word.charAt(0)
		if(guesses.indexOf(letter)>=0){ //letter has been guessed
			clueString += letter + "";
		} else{							//not guessed
			clueString += "_ "; 
		}
	}
	var clue = document.getElementById("clue"); //press->_
	clue.innerHTML = clueString;
	//update guess string
	var guessArea = document.getElementById("guessstr");
	if(guessCount==0){
		guessArea.innerHTML = "You lose";
	} else if(clueString.indexOf("_")<0){
		guessArea.innerHTML = "You win!!!";
	} else{
		guessArea.innerHTML = "Guesses: " + guesses;
	}
	//update hangman image
	var image = document.getElementById("hangmanpic");
	image.src = "hangman" + guessCount + ".gif";
}
function guessLetter(){
	var input = document.getElementById("hguess");
	var letter = input.value; //입력값
	var clue = document.getElementById("clue");
	if(guessCount==0 || clue.innerHTML.indexOf("_")<0 || guesses.indexOf(letter)>=0){ //패, 승, 입력해본문자나열에 입력값이있을때
		return; //함수종료
	}
	guesses += letter; //concat
	if(word.indexOf(letter)<0){ //입력값(letter)이 word에 포함x
		guessCount--; //an incorrect guess
	}
	updatePage();
}


