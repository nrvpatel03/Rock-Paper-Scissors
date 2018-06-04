$(document).ready(function(){
    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBycywjAmwmc1JihB8MNAxU1Z3cHOhJtBI",
    authDomain: "rock-paper-scissors-f82e7.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-f82e7.firebaseio.com",
    projectId: "rock-paper-scissors-f82e7",
    storageBucket: "rock-paper-scissors-f82e7.appspot.com",
    messagingSenderId: "10193950721"
  };
  firebase.initializeApp(config);

  //variable reference to firebase database
  var database = firebase.database();

  function checkifnull(winsorloss, childSnapshot,databaseRef){
    if(!childSnapshot.val().winsorloss){
      winsorloss = 0;
      databaseRef.set(winsorloss)
    }else{
      winsorloss = childSnapshot.val().winsorloss;
    }
    return winsorloss;
  }

  //initial values
  var name="";
  var wins=0;
  var loss=0;
  var player1="";
  var player2="";
  var key1;
  var key2;
  $("#name-input").keypress(function(event){
    if(event.keyCode === 13){
      event.preventDefault();
      $("#submitButton").trigger("click");
    }
  })

  $("#submitButton").click(function(event){
    event.preventDefault();
    name = $("#name-input").val();
    $("#name-input").val("");
    
    database.ref("players/trash").push({name:name});
    database.ref("players").once("value").then(function(snapshot){
      if(snapshot.hasChild("p1") && snapshot.hasChild("p2")){
        database.ref("players/trash").remove();
      }else if(snapshot.hasChild("p1")){
        key2 = database.ref("players/p2").push({name:name}).key;
        database.ref("players/trash").remove();
      }else{
        key1 = database.ref("players/p1").push({name:name}).key;
        database.ref("players/trash").remove();
      }
    });
  })
  database.ref("players/p1").on("child_added",function(childSnapshot){
    player1 = childSnapshot.val().name;
    wins = checkifnull(wins,childSnapshot,database.ref("players/p1/" + key1));
    loss = checkifnull(loss,childSnapshot,database.ref("players/p1/" + key1));
    console.log(player1);
    console.log(wins);
    console.log(loss);
  },function(errorObject){
    console.log("errors: " + errorObject.code);
  })
  database.ref("players/p2").on("child_added",function(childSnapshot){
    player2 = childSnapshot.val().name;
    wins = checkifnull(wins,childSnapshot,database.ref("players/p2/" + key2));
    loss = checkifnull(loss,childSnapshot,database.ref("players/p2/" + key2));
    console.log(player2);
    console.log(wins);
    console.log(loss);
  },function(errorObject){
    console.log("errors: " + errorObject.code);
  })

})