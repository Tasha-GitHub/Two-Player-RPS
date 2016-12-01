 //----------------------------------------------------------//
//                  load Firebase controls                  //
//----------------------------------------------------------// 
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBdpdHdRbq2i-KVsP_q41gk35jRr3t2myg",
    authDomain: "rps-game-64f6a.firebaseapp.com",
    databaseURL: "https://rps-game-64f6a.firebaseio.com",
    storageBucket: "rps-game-64f6a.appspot.com",
    messagingSenderId: "431489813630"
  };
  firebase.initializeApp(config);

var message;
var choosePlayerOne = false;
var choosePlayerTwo = false;

  // Get a reference to the database service
var database = firebase.database();

//----------------------------------------------------------//
//              player selection controls                   //
//----------------------------------------------------------//
database.ref("/player").on("value", function(snapshot) {

	  message = snapshot.val().message;
      name = snapshot.val().name;
      $("#chatArea").append("<div>"+name+":"+message+"</div>");
 
     }, function(errorObject) {

	// In case of error this will print the error
     console.log("The read failed: " + errorObject.code);
    });



$("#nameButton").on("click", function(event){
    	event.preventDefault();
    	name = $("#nameField").val().trim();
    	 //stops from creating any more than two players
      if(choosePlayerTwo === true){
        return;
      } else {
        //if users doesnt input both values, it will prevent a post
      if(choosePlayerOne === false){
        database.ref("/player").push({
          name: name,
          playerID : "1",
        });
        choosePlayerOne = true;

      } else {
        database.ref("/player").push({
          name: name,
          playerID : "2",
        });
        choosePlayerTwo = true;
      }

      }
      
    });



//----------------------------------------------------------//
//                  chat feature controls                   //
//----------------------------------------------------------//
database.ref("/chat").orderByChild("dateAdded").limitToLast(10).on("child_added", function(childsnapshot) {

	  message = childsnapshot.val().message;
      name = childsnapshot.val().name;
      $("#chatArea").append("<div>"+name+":"+message+"</div>");
 
     }, function(errorObject) {

	// In case of error this will print the error
     console.log("The read failed: " + errorObject.code);
    });


//chat feature
$("#chatSubmit").on("click", function(event){
    	event.preventDefault();
    	message = $("#chatField").val().trim();
    	name = "player1"; 

      //if users doesnt input both values, it will prevent a post
      if(message.length === 0){
        return;

      } else {
      	database.ref("/chat").push({
          name: name,
          message : message,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
      }

    });