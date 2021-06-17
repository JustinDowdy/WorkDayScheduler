/*
Justin Dowdy
06-17-2021
ASSIGNMENT DETAILS:
-This javascript processes the calendar dates and color changes.
-Inputs time from 9am to 5pm.
-Detects what ordinals to give certain numbers.
-Created save button to click when user adds tasks to time slot.
*/

var currentDay = ""; 
var currentDayString = ""; //this holds today's date
var currentHour = 9; 
var hourEntries = []; 

const timeEntriesName = "workDaySchedulerList"; // name for localstorage
const firstHour = 9; // first block (9am)
const lastHour = 17; // last block (5pm)
const time = ["12AM","1AM","2AM","3AM","4AM","5AM","6AM","7AM","8AM","9AM","10AM","11AM","12PM",
                "1PM","2PM","3PM","4PM","5PM","6PM","7PM","8PM","9PM","10PM","11PM"]; // map of hours

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; //days of week
const months = ["January", "February", "March", "April", "May", "June", 
                "July", "August", "September", "October", "November", "December"]; //months of year

currentDayAndTime(); 
buildLayout(); 
getHourEntries(); // Look for entries in localstorage and load them

$(".saveBtn").click(clickSaveButton); //this causes the save button in html to save when you click it

//the following function works to get the current time and date and display on website.
function currentDayAndTime() {
    var today = new Date(); //this loads current date ever time user gets on
    var day = today.getDate(); //this helps variable today find the current date
    var dayEnd = "th"; // th goes at the end of every number


    currentHour = today.getHours(); //this finds the current hour

    //the following if is stating for every number below 10, it will have a 0 in front of it.
    if (day < 10) {
        currentDay = today.getFullYear() + months[today.getMonth()] + "0" + day; 
    }
    else {
        currentDay = today.getFullYear() + months[today.getMonth()] + day;
    }

    // this is for the ordinals that won't have 'th' at the end of them
    if ((day === 1) || (day === 21) || (day === 31)) {
        dayEnd = "st";
    }
    else if ((day === 2) || (day === 22)) {
        dayEnd = "nd";
    }
    else if ((day === 3) || (day === 23)) {
        dayEnd = "rd";
    }

    currentDayString = days[today.getDay()] + ", " + months[today.getMonth()] + " " + 
        day + dayEnd + ", " + today.getFullYear(); 
    $("#currentDay").text(currentDayString); 
}

//the following function creates the chart for our schedule
function buildLayout() {
    var containerDiv = $(".container"); 

    //looping from 9am to 5pm
    for (let hourBlock=firstHour; hourBlock <= lastHour; hourBlock++) {
        //the following 2 lines creates the first column
        var newHtml = '<div class="row time-block"> ' +
            '<div class="col-md-1 hour">' + time[hourBlock] + '</div> ';
        
        // setting up the daily schedule to dictate between past, present or future
        if (hourBlock < currentHour) {
            newHtml = newHtml + '<textarea class="col-md-10 description past" id="text' + 
                time[hourBlock] + '"></textarea> ';
        }
        else if (hourBlock === currentHour) {
            newHtml = newHtml + '<textarea class="col-md-10 description present" id="text' + 
                time[hourBlock] + '"></textarea> ';
        }
        else {
            newHtml = newHtml + '<textarea class="col-md-10 description future" id="text' + 
                time[hourBlock] + '"></textarea> ';
        };

      
        newHtml = newHtml + '<button class="btn saveBtn col-md-1" value="' + time[hourBlock] + '">' +
            '<i class="fas fa-save"></i></button> ' +
            '</div>';

        // add newHtml to container
        containerDiv.append(newHtml);
    }
}

//the following fuction will get the saved timeEntries from localstorage
function getHourEntries() {
    var teList = JSON.parse(localStorage.getItem(timeEntriesName));

    if (teList) {
        hourEntries = teList;
    }

    for (let i=0; i<hourEntries.length; i++) {
        // the following if will only load time entries for the current day and update text to put the current hour
        if (hourEntries[i].day == currentDay) {
            $("#text"+hourEntries[i].time).val(hourEntries[i].text); // put text in correct hour
        }
    }
}

// the following empowers the click events to start coming to life
function clickSaveButton() {
    var hourBlock = $(this).val(); 
    var entryFound = false;
    var newEntryIndex = hourEntries.length;
    var newEntry = {day: currentDay, time: hourBlock, text: $("#text"+hourBlock).val()}; 

    // do proper time comparison
    function timeGreater(time1,time2) {
        var number1 = parseInt(time1.substring(0, time1.length-2)); // the first half of the time
        var number2 = parseInt(time2.substring(0, time2.length-2)); // the second half of the time
        var period1 = time1.substr(-2,2); // AM/PM time1
        var period2 = time2.substr(-2,2); // AM/PM time2

        
        if (number1 === 12) {
            number1 = 0;
        }

        if (number2 === 12) {
            number2 = 0;
        }

       
        if (period1 < period2) {
            return false; // AM < PM
        }
        else if (period1 > period2) {
            return true; // PM > AM
        }
        else {
            return (number1 > number2);
        }
    }

    // the following for loops checks if there has already been an entry submitted
    for (let i=0; i<hourEntries.length; i++) {
        if (hourEntries[i].day == currentDay) {
            if (hourEntries[i].time == hourBlock) {
                hourEntries[i].text = newEntry.text; // updates text for entries already submitted
                entryFound = true; // entry exists 
                break;
            }
            // entry does not exist 
            else if (timeGreater(hourEntries[i].time, hourBlock)) {
                newEntryIndex = i;
                break;
            }
        }
        // no entries exist for current day 
        else if (hourEntries[i].day > currentDay) {
            newEntryIndex = i;
            break;
        }
    }

    // If the entry didn't already exist, add it to the proper place
    if (!entryFound) {
        hourEntries.splice(newEntryIndex, 0, newEntry);
    }

    // put in Local Storage
    localStorage.setItem(timeEntriesName, JSON.stringify(hourEntries));
}