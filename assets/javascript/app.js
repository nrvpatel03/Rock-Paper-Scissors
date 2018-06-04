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

  //initial values
  var name="";
  var wins=0;
  var loss=0;

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
        database.ref("players/p2").push({name:name});
        database.ref("players/trash").remove();
      }else{
        database.ref("players/p1").push({name:name});
        database.ref("players/trash").remove();
      }
    })
  })





})