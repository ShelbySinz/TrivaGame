$(document).ready(function () {

    var questions = [{
            question: "In what movie did Chris farley Sing 'Fat Guy In A Little Coat'?",
            choice: ["BlackSheep", "Tommy Boy", "Billy Maddison"],
            answer: 1,
            photo: "assets/images/p-tommy-boy-chris-farley.jpg"
        },

        {
            question: "In what movie did David Spade have a Sick mullet?",
            choice: ["Joe Dirt", "Grown Ups", "BenchWarmers"],
            answer: 0,
            photo: "assets/images/joe-dirt.jpg"
        },

        {
            question: "In what 80's themed movie did Adam Sandler meet Billy Idol?",
            choice: ["Happy Gilmore", "Wedding Singer", "50 first dates"],
            answer: 1,
            photo: "assets/images/weddingSinger.jpg"
        },

        {
            question: "In what movie does Steve Martin own a Shoe Company",
            choice: ["Father of the bride", "The Jerk", "The Pink Panther"],
            answer: 0,
            photo: "assets/images/FatherOfTheBride.jpg"
        },

        {
            question: "In what Movie does Jack Black 'teach' Rock and Roll",
            choice: ["Nacho Libre", "school of rock", "Shallow Hal"],
            answer: 1,
            photo: "assets/images/JackBlack.jpg"
        },

        {
            question: "In what movie does Jim Carey solve the kidnapping of snowflake?",
            choice: ["Ace Ventura-pet detective", "Ace Ventura- When Nature calls", "dumb and dumber"],
            answer: 0,
            photo: "assets/images/ace.jpg"
        }

    ];

   

    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess = "";
    var running = false;
    var qCount = questions.length;
   
    var index = 0;

    
                         
   //var index;
   var pick =  questions[index];

    $("#reset").hide();

    $("#start").click(function () {
        $("#start").hide();
        displayQuestion();
        runTimer();
        
    });


    $("#reset").click(function () {

        index = 0;
        $("#answer").html("");
        $("#reset").hide();
        displayQuestion();
        runTimer();
         
    });


    function displayQuestion() {
    
     // index =  Math.floor(Math.random()*questions.length);
         //for (var j = 0; j < pick.question.length; j++){
        //Math.floor(Math.random()* question);
        pick = questions[index];

        
        /*   if (holder === pick.question){
            Math.floor(Math.random()*questions.length);
           }
           else{
           } */
          $("#question").html("<h2>" + pick.question + "</h2>");
           
          
        
         console.log(pick);
       
            for (var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<button>");
                userChoice.addClass("answerchoice");
                userChoice.text(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answer").append(userChoice);

            }

            


            $(".answerchoice").on("click", function () {

                userGuess = parseInt($(this).attr("data-guessvalue"));

                //correct guess or wrong guess outcomes
                if (userGuess === pick.answer) {
                    stop();
                    correctCount++;
                    userGuess = "";
                    $("#answer").html("<p>Correct!</p>");

                    $("#picture").html("<img src=" + pick.photo + " width ='200px' height= '200px'>");
                    keepgoing();

                } else {
                    stop();
                    wrongCount++;
                    userGuess = "";
                    $("#answer").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                    keepgoing();
                }


            });
            
    
    }

    



    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer--;

        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answer").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            keepgoing();
        }
    }

    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }


    function keepgoing() {
    

        setTimeout(function () {
            $("#answer").empty();
            $("#picture").empty();
            index++;
            timer = 20;
            

            //run the score screen if all questions answered
            if ((wrongCount + correctCount + unanswerCount) === qCount) {
                $("#timeleft").html("");
                $("#question").empty();

                $("#question").html("<h3>Game Over!  Here's how you did: </h3>");
                $("#answer").append("<h4> Correct: " + correctCount + "</h4>");
                $("#answer").append("<h4> Incorrect: " + wrongCount + "</h4>");
                $("#answer").append("<h4> Unanswered: " + unanswerCount + "</h4>");
                $("#reset").show();

                correctCount = 0;
                wrongCount = 0;
                unanswerCount = 0;
                $("#reset").show();

            } else {

                runTimer();
                displayQuestion();

            }

        }, 4000);
    }



});