//Created by: Edem Dumenu
//Date: 5/30/2018
//Description:

//Initializing playing status 
var playing = false;
var score = 0;
var numTrialsLeft;
var sports = 'sports';
var fruits = 'fruits';
var items_sports = ['basketball','soccer','tennis', 'pool', 'baseball','bowling','cricket','football', 'volleyball'];
var items_fruits = ['apple','banana','cherry', 'lemon', 'mango','orange','pear','pineapple', 'strawberry'];
var step;
var action;   //Set inteval function
var item;


$(function(){
    
//Checkbox 
$( "input" ).checkboxradio();    
    
//Click on start/reset button
$("#beginGame").click(function(){

  //yes, we are playing
  if(playing == true){

       //reload the page
       location.reload();
       item = '';
     }else{
         
         //no, we are not playing 
         playing = true; //Initializing the game
         score = 0;
         item = '';
         
          //Hide game over box
         $("#gameOver").hide();
         //Displaying score box
         $("#score").show();
         $("#scorevalue").html(score);
         //Display the number of trials left in the box
         $("#trialsLeft").show();
         //Display the player information box
         $("#playerInfo").show();

         //Set the number of trials left
         numTrialsLeft = 5;
         //calling a function to add a number of trials
         addTrials(numTrialsLeft);
         
         //Click on the start game button
         $("#startReset").click(function(){
         
         //Checking to see if the checkboxes have values
         if($(".radio1").prop('checked') == true && $(".radio2").prop('checked') == true){
             
            alert('You can only select one item');
             
            } else if($(".radio1").prop('checked') == true){
             
                //change button text to "reset game"
                $("#beginGame").html('Reset Game');
                item = fruits;
                //Start dropping items
                startDropping(); 
              
            }else if($(".radio2").prop('checked') == true){
                 
                //change button text to "reset game"
                $("#beginGame").html('Reset Game');
                 item = sports;
                //Start dropping items
                startDropping();
              
                }else{
                    
                    alert('One item has to be selected');
                }     
         });
     }    
});
   
//Hover over the item    
$('#items').mouseover(function(){
   //Increasing the value of the score and displaying it  
   score++;
   $('#scorevalue').html(score); 
    //Playing a sound when you hover over an item
    document.getElementById("slice_sound").play();
    
    //Stop item from going down
    clearInterval(action);
    
    //Slicing the item
    $('#items').hide('explode', 500);
    
    //Drop a new item
    setTimeout(startDropping,800);
});    

//Function to add number of trials
function addTrials(numTrialsLeft){
    
    //Empty the trials box
    $("#trialsLeftValue").empty();
    
    //Hide game over box
    $("#gameOver").hide();
    
    for(i = 0; i < numTrialsLeft; i++){
    //Adding stars to the trials box 
    $("#trialsLeftValue").append('<img src="img/star.png" class="star" alt="trials">');
  }    
    
}

//Drop items    
function startDropping(){
    
    //Remove player info box
    $("#playerInfo").hide();
    
    //Display an item in the item box
    $("#items").show();
    
    //Obtaining the width of the item container
    var itemContainerWidth = $('#itemContainer').width();
    itemContainerWidth = (itemContainerWidth - 50);
    
    //Calling the choose item function to obtain items
    chooseItem(item);
    
    $("#items").css({
        //Setting the position of the items dropping
        'left': Math.floor(Math.random() * itemContainerWidth),
        'top': -10
    })
    
    //Generate a random step
    step = Math.floor(Math.random() * 5) + 1;
    
    //Move item every 10 milisecond 
    action = setInterval(function(){
        
        //Increasing the steps of 
        $("#items").css('top', $("#items").position().top + step);
        
        //Check if item is too low
        if( $("#items").position().top > $("#itemContainer").height()){
            
             //Checking to see if there are any trials left
             if(numTrialsLeft > 1){
                 
                 //If there's annother trial left display an item in the item box
                $("#items").show();
                
                //Obtaining the width of the item container
                var itemContainerWidth = $('#itemContainer').width();
                itemContainerWidth = (itemContainerWidth - 50);
                 
                 //Calling the choose item function to obtain items
                chooseItem(item);
                 
                $("#items").css({
                    //Setting the position of the items dropping
                    'left': Math.floor(Math.random() * itemContainerWidth),
                    'top': -10
                });
                 
              //Generate a random step
              step = Math.floor(Math.random() * 5) + 1;

             //Reduce trials by one
             numTrialsLeft--;
                 
             //Display the number of trials left
             addTrials(numTrialsLeft);

            }else{
                //Game over because there are no trials left
               playing = false;
               //Change from reset game to start game  
               $("#beginGame").html('Reset Game');
               //Display the game over box   
               $("#gameOver").show();
               $("#gameOver").html("<h1 class='text-center'>Game Over!</h1><h1 class='text-center'>Your score is: " + score + " </h1><div class='col-md-14 text-center'><button id='resetGame' class='btn btn-primary btn-lg center-block'>Reset Game</button></div>");   
               //Hide trials box
               $("#trialsLeft").hide(); 
                //Hide score box
               $("#score").hide();    
               $("#beginGame").hide();    
               //Stop the set Interval    
                stopAction();
                
                $("#resetGame").click(function(){
                //reload the page
                location.reload();
                }); 
            }
        }
    }, 10);
}

//Function will generate a random fruit
function chooseItem(item){
    
    if(item == 'sports'){
        
        //Randomly generating images to be dropped
       $("#items").attr("src","img/sports/" + items_sports[Math.floor(Math.random() * 8)] + ".png"); 
       }else{
           
          //Randomly generating images to be dropped
          $("#items").attr("src","img/fruits/" + items_fruits[Math.floor(Math.random() * 8)] + ".png");   
       }
}

//Stop dropping fruits
function stopAction(){
    
    clearInterval(action);
    //Hide the items
    $("items").hide();
}   
    
});    