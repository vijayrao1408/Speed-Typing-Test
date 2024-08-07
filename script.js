let speedTypingTestEl = document.getElementById("speedTypingTest");
let timerEl = document.getElementById("timer");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let quoteInputEl = document.getElementById("quoteInput");
let resultEl = document.getElementById("result");
let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");
let spinnerEl = document.getElementById("spinner");

let count = 0; 
let value = null;
let intervalId;

function timer(){
   setInterval(function(){
    count = count+1;
    timerEl.textContent = count+" " + "seconds";
}, 1000); 
}

function getRandomJokes(){
    quoteInputEl.value = "";
    
    let url = "https://apis.ccbp.in/random-quote";
    let options = {
        method: "GET"
    };
    spinnerEl.classList.remove("d-none");
    fetch(url, options)
    .then(function(response){
        return response.json();
    })
    .then(function(jsonData){
        spinnerEl.classList.add("d-none");
        let {content} = jsonData;
        quoteDisplayEl.textContent = content;
        value = content;
    });
}


submitBtnEl.addEventListener("click", function(){
    let quoteInputVal = quoteInputEl.value;
    if (value === quoteInputVal){
        resultEl.textContent = "You typed in " + count + " seconds";
        clearInterval(intervalId);
    }
    if (value !== quoteInputVal){
        resultEl.textContent = "You typed incorrect sentence";
    }
});
getRandomJokes();
timer();
resetBtnEl.addEventListener("click", function(){
    quoteDisplayEl.textContent = "";
    getRandomJokes();
    count = -1;
    clearInterval(intervalId);
});
