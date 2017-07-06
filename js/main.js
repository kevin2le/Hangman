/*----- app's state (variables) -----*/
var guess;
var letterWord;
var numWrong;
var letterSelected; 
var words=[["CHOCOLATE", "VANILLA", "STRAWBERRY", "NEAPOLITAN", "MATCHA"],["MILKSHAKES", "SUNDAES", "CAKE"],["SPRINKLES","COOKIES", "MATCHA", "PEANUTS"]];
var wordChoosen;
var messages;
var endGame;
var word;
var used=[];

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
    $('td').removeClass('disable-td');
    cateSelect();
    render();
}

function handleLetterClick(event) {
    if (endGame === true){
       return;
    }
    letterSelected = event.target.innerHTML
    if (used.includes(letterSelected)){
        return;
    } else {
        used.push(letterSelected);
    }

    if (wordChoosen.includes(letterSelected)){
        var place = wordChoosen.indexOf(letterSelected);
            while ( place >= 0) {
            guess =  guess.split('')
            guess[place] = letterSelected
            guess = guess.join('');
            place = wordChoosen.indexOf(letterSelected, place +1);
            }
    } else {
        numWrong+= 1;
        document.getElementById("message").innerHTML=messages.wrong
    } 
  
    $(event.target).attr('disabled', true) 
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
    $('#wrong').html(numWrong ? ' When the score hits 6 it is over!: <span>' + numWrong + '</span>' : '');
    $img.attr('src','images/img' + numWrong + '.png');
    
}
