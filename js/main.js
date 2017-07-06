/*----- app's state (variables) -----*/
var guess;
var letterWord;
var numWrong;
var letterSelected; 
var words=[["CHOCOLATE", "VANILLA", "STRAWBERRY", "NEAPOLITAN"],["MILKSHAKES", "SUNDAES", "CAKE"],["SPRINKLES","COOKIES", "CANDY", "PEANUTS"]];
var wordChoosen;
var messages;
var endGame;
var word;

var cateSelect = function () {
    if (word === words[0]) {
        document.getElementById("selectCatagory").innerHTML = "Ice Cream Flavors";
    } else if (word === words[1]) {
        document.getElementById("selectCatagory").innerHTML = "Food that contains Ice Cream";
    } else if (word === words[2]) {
        document.getElementById("selectCatagory").innerHTML = "Ice Cream Toppings";
    }
}
/*----- cached element references -----*/
var $guess = $('#guess');
var $img = $('#hang-img')
/*----- event listeners -----*/
$('#letters').on('click', handleLetterClick);
$('.reset').on('click', startup);
/*----- functions -----*/
startup();
function startup() {
    numWrong = 0;
    messages = {
        win: "You Get Ice Cream!", 
        wrong: "Don't Drop It!!!",
        lose: "No Ice Cream For YOU!!!"};
    used =[];
    word = words[Math.floor(Math.random() * words.length)];
    wordChoosen = word[Math.floor(Math.random() * word.length)];
    guess = "_".repeat(wordChoosen.length);
    output = document.getElementById("message").innerHTML='';
    endGame= false;
    cateSelect();
    render();
}

function handleLetterClick(event) {
     console.log(wordChoosen)
    if (endGame === true){
       return;
    }
    letterSelected = event.target.innerHTML
     console.log(event)
    if (wordChoosen.includes(letterSelected)){
        var pos = wordChoosen.indexOf(letterSelected);
            while ( pos >= 0) {
            guess =  guess.split('')
            guess[pos] = letterSelected
            guess = guess.join('');
            console.log(guess);
            pos = wordChoosen.indexOf(letterSelected, pos +1)
            }
    } else {
        numWrong+= 1;
        document.getElementById("message").innerHTML=messages.wrong
    } 

    
    $(event.target).prop('disabled', true);
    $('#reset').on('click', startup);
    checkWin();
    render();
}

function checkWin(){
    if (guess.indexOf('_')=== -1){
        document.getElementById('message').innerHTML= "You Get Ice Cream YAY ^_^";
        endGame= true;
    } else if (numWrong === 6) {
        document.getElementById('message').innerHTML = "No Ice Cream For YOU!!!";
        endGame= true;
    }
}

function render() {
    $('.images').hide();
    $guess.html(guess);
    $('#wrong').html(numWrong ? 'Wrong Guesses: <span>' + numWrong + '</span>' : '');
    $img.attr('src','images/img' + numWrong + '.png');
    
}
