

var Sentiment = require('sentiment');
var sentiment = new Sentiment();

var options = {
    extras: {
        //based on zillow data
        'luxurious': 15,
        'captivating': 12,
        'impeccable' : 12,
        'stainless': 9,
        'landscaped': 9,
        'granite': 6,
        'remodeled': 3,
        'beautiful': 3,
        'beautifully': 3,
        'tile': 3,
        'upgraded': 3,
        'updated' : 3,
        'renovated': 3,

        //airbnb project
        'backyard': 6,
        'yard': 6,
        'garden': 6,
        'deck': 6,

        //arbitrary
        //random adjectives: 1
        //features : 2 or 3
        'large': 6,
        'amazing': 3,
        'great' : 3,
        'perfect': 3,
        'perfectly': 3,
        'stunning' : 3,
        'new' : 3,
        'full': 6,
        'fully': 6,
        'spacious': 6,
        'modern': 6,
        'spotless': 9,
        'bright': 6,
        'view': 6,
        
        //neutralizing block
        'block': 0,
        
        //Zillow data
        'fixer': -15,
        'tlc': -15,
        'cosmetic': -15,
        'investment': -12,
        'potential': -6,
        'bargain': -6,
        'opportunity': -3,
        'nice': -3
    }
};





function analyzeSent() {
    var text = document.getElementById("inputText").value;
    console.log("found the text");
    var result = sentiment.analyze(text, options);
    console.log(result);
    var score = result.score;
    var compScore = result.comparative;
    var wordCount = 0;

    // score+= addExclamations(result.tokens);
    score += addPhrases(result.tokens);

    wordCount = result.tokens.length;

    document.getElementById("suggestion").innerHTML = "";
    document.getElementById("score").innerHTML = "Listing Grade: ";
    document.getElementById("score").innerHTML += grade(score);

    document.getElementById("wordScore").innerHTML = "Length: ";
    document.getElementById("wordScore").innerHTML += analyzeLength(wordCount);

    document.getElementById("moreinfo").innerHTML = "";
    document.getElementById("moreinfo").innerHTML += "Sentiment: " + score + ", " +
        "Average Sentiment: " + compScore.toFixed(2) + ", " + "Word Count: " + wordCount;
}




/* 
ensures that all html content is loaded before analyzeSent called
so that button is found
*/
window.addEventListener('DOMContentLoaded', (event) => {
    var button = document.getElementById("btn"); // add id="my-button" into html
    if (button) {
        button.addEventListener('click', analyzeSent);
        console.log("found");
    }
});




/*
function addExclamations(wordArr){
    var score = 0;
    wordArr.forEach(function(token) {
        console.log("ayy");
        if(token.charAt(token.length-1) == '!'){
            score+=4;
        }
    });
    return score;
}
*/




/*
Handles phrases
*/
function addPhrases(wordArr) {
    var score = 0;
    for (i = 0; i < wordArr.length - 1; i++) {
        if (wordArr[i].toLowerCase() == "walking" && wordArr[i + 1] == "distance") {
            score += 6;
        } else if (wordArr[i].toLowerCase() == "air" && wordArr[i + 1].toLowerCase() == "conditioning") {
            score += 6;
        } else if (wordArr[i].toLowerCase() == "full" && wordArr[i + 1].toLowerCase() == "bathroom") {
            score += 6;
        } else if (wordArr[i].toLowerCase() == "full" && wordArr[i + 1].toLowerCase() == "bathrooms") {
            score += 6;
        }
    }
    return score;
}




/*
Translates sentiment score into grade
*/
function grade(score) {
    if (score >= 30) {
        document.getElementById("score").style.color = "green";
        return "A"
    } else if (score >= 20 && score < 30) {
        document.getElementById("score").style.color = "#bee512";
        document.getElementById("suggestion").innerHTML = "Word Choice: Consider adding more descriptive words";
        return "B"
    } else {
        document.getElementById("score").style.color = "#ffa879";
        document.getElementById("suggestion").innerHTML = "Word Choice: Consider adding more descriptive words";
        return "C"
    }
}




/*
Grades word count
Note: zillow says keep under 250
*/
function analyzeLength(wordCount) {
    if (wordCount < 50) {
        return "A little short"
    } else if (wordCount >= 50 && wordCount < 150) {
        return "Perfect"
    } else {
        return "A little too long"
    }

}
