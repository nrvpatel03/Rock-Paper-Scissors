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

  
})