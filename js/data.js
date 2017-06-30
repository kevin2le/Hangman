/*----- constants -----*/
/*----- app's state (variables) -----*/
var catagory
var guess 
var guessed 
var words
var letterSelected 
/*----- cached element references -----*/
/*----- event listeners -----*/


$('table').on('click',letter);
    
/*----- functions -----*/
function letter(event) {
    letterSelected = event.target.innerHTML
     console.log(event.target.innerHTML)
}
