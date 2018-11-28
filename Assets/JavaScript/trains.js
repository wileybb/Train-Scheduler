
  var config = {
    apiKey: "AIzaSyD9FLuFcsWOunllO9Dzkgd2ctHyFQD5cAk",
    authDomain: "newproject-d6b81.firebaseapp.com",
    databaseURL: "https://newproject-d6b81.firebaseio.com",
    projectId: "newproject-d6b81",
    storageBucket: "",
    messagingSenderId: "780005316004"
  };
  firebase.initializeApp(config);

// 1. Initialize Firebase
var database = firebase.database()
  
  // 2. Button for adding Trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
    // console.log("I DID IT")
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "HH/mm").format("HH/mm");
    var trainRate = $("#rate-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: destination,
      start: trainStart,
      rate: trainRate
    };
     
    // Uploads train data to the database
    database.ref().push(newTrain);
    
        // database.ref().set({test: "hello"});
    // Logs everything to console
    // console.log(newTrain.name);
    // console.log(newTrain.destination);
    // console.log(newTrain.start);
    // console.log(newTrain.rate);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
  });
  
  // 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    // console.log("Ok");
//     // Store everything into a variable.
    var trnName = childSnapshot.val().name;
    var trnDestination = childSnapshot.val().destination;
    var trnStart = childSnapshot.val().start;
    var trnRate = childSnapshot.val().rate;
  
//     // Train Info
    // console.log(trnName);
    // console.log(trnDestination);
    // console.log("YES");
    console.log(trnStart);
    console.log(trnRate);
    
    //time conversion equations---->

      // First Time (pushed back 1 year to make sure it comes before current time)

    var startTimeConverted = moment(trnStart, "HH:mm").subtract(1, "years");
    // console.log(startTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(startTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

     // Time apart (remainder)
     var tFrequency = trnRate;
     var tRemainder = diffTime % tFrequency;
     console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
//     // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trnName),
      $("<td>").text(trnDestination),
      $("<td>").text(trnRate),
      $("<td>").text(moment(nextTrain).format("hh:mm A MM/DD/YYYY")),
      $("<td>").text(tMinutesTillTrain),
    //   $("<td>").text(empBilled)
    );
  
//     // Append the new row to the table
    $("#train-table").append(newRow);
  });
  

  // --------------------------------------------------
  