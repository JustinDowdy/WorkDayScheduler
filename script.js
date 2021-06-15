var currentDate = ""; 
var currentDateString = ""; //this holds today's date
var currentHour = 9; 
var timeEntries = []; 

const timeEntriesName = "workDaySchedulerList";
const firstEntry = 9; 
const lastEntry = 17; //5PM
const hours = ["12AM","1AM","2AM","3AM","4AM","5AM","6AM","7AM","8AM","9AM","10AM","11AM","12PM",
"1PM","2PM","3PM","4PM","5PM","6PM","7PM","8PM","9PM","10PM","11PM"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
"Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];

setCurrentDateAndHour(); 
buildTimeBlocks();
getTimeEntries();

$(".saveBtn").click(saveClick); //this causes the save button in html to save when you click it

//the following function works to get the current time and date and display on website.
function setCurrentDateAndHour(){
    var today = new Date(); //this loads current date ever time user gets on
    var day = today.getDate(); //this helps variable today find the current date
    var dayEnd = "th"; // these "th's go at the end of every number"

    currentHour = today.getHours(); //this finds the current hour

    //the following if is stating for every number below 10, it will have a 0 in front of it.
    if (day < 10) {
        currentDate = today.getFullYear() + months[today.getMonth()] + "0" + day;
    }
    else {
        currentDate = today.getFullYear() + months[today.getMonth()] + day;
    }

    if ((day === 1) || (day === 21) || (day === 31)) {
        dayEnd = "st";
    }
    else if ((day === 2) || (day === 22)) {
        dayEnd = "nd";
    }
    else if ((day === 3) || (day === 23)) {
        dayEnd = "rd";
    }

    currentDateString = day[today.getDay()] + "," + months[today.getMonth()] + " " +
    day + dayEnd + "," + today.getFullYear(); 
    $("#currentDay").text(currentDateString);
    }

    //the following function creates the chart for our schedule
    function buildTimeBlocks(){
        var containerDiv = $(".container"); 

        for (let hourBlock=firstEntry; hourBlock <= lastEntry; hourBlock++) {
            //the following line 2 lines creates the first column
            var newHtml = '<div class="row time-block"> ' +
            '<div class="col-md-1 hour">' + hourMap[hourBlock] + '</div> ';

            if (hourBlock < currentHour) {
                newHtml = newHtml + '<textarea class="col-md-10 description past" id="text' + 
                    hourMap
                    //comment
                    //justin's awesome
                    
            }


        }
    }




/* $( document ).ready(function() {
    console.log( "ready!" );
    $("#container").append("<div></div>")
});

//display date and time
var dt = new Date();
document.querySelector('#date').innerHTML=dt;
//console.log(dt);
var rtNow = moment().format("MMMM Do, YYYY - hh:mm:ss a");
console.log(rtNow);

//textarea item
var itemlt = document.querySelector('.item');

//button 
var btn = document.querySelector('.btn');

var ni = document.querySelector('#nine');


//audit times
//create a div for each time slot.
//create an input, button, and a spot for the time.
//all the above are going inside of the div.
//this div will go into the container on the page.
//for loop. 

//addEventListener to every class/button
//when the button is hit, get associated input value
//store this^ in local storage
//when page loads, i will get the input values from local storage
//map, loop (dynamically create) the divs that contain the input
*/
