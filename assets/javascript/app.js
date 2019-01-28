$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAvmIZA3fQEBhBE74Is4KW5F26C6eoN5bs",
        authDomain: "train-df49c.firebaseapp.com",
        databaseURL: "https://train-df49c.firebaseio.com",
        projectId: "train-df49c",
        storageBucket: "train-df49c.appspot.com",
        messagingSenderId: "592341351968"
    };

    firebase.initializeApp(config);

    var database = firebase.database().ref().child('trains');

    //Button for adding Trains
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        var trainName = $("#train-name-input").val();
        var trainDest = $("#dest-input").val();
        var firstTrain = $("#firstTrain-input").val();
        var trainFreq = $("#freq-input").val();

        var newTrain = {
            name: trainName,
            destination: trainDest,
            start: firstTrain,
            frequency: trainFreq
        };

        database.push(newTrain);

        $("#train-name-input").val("");
        $("#dest-input").val("");
        $("#firstTrain-input").val("");
        $("#freq-input").val("");
    });


    database.on("child_added", function (childSnapshot) {

        console.log(childSnapshot.val());


        var trainName = childSnapshot.val().name;
        var trainDest = childSnapshot.val().destination;
        var firstTrain = childSnapshot.val().start;
        var trainFreq = childSnapshot.val().frequency;



        var trainFreq;

        var firstTime = 0;

        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);


        var currentTime = moment();
        console.log("current time: " + moment(currentTime).format("HH:mm"));


        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("difference in time: " + diffTime);


        var tRemainder = diffTime % trainFreq;
        console.log(tRemainder);


        var tMinutesTillTrain = trainFreq - tRemainder;
        console.log("minutes til next train: " + tMinutesTillTrain);


        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        


        $("#train-table").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq +
            "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");

    });

});