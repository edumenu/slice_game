//Initializing playing status 
var playing = false;
var score = 0;
var numTrialsLeft;
var items = ['basketball','soccer','tennis', 'pool', 'baseball','bowling','cricket','football', 'volleyball'];
var step;
var action;   //Set inteval function

$(function(){
    
//Click on start/reset button
$("#startReset").click(function(){

  //yes, we are playing
  if(playing == true){

       //reload the page
       location.reload();
     }else{

         //no, we are not playing 
         playing = true; //Initializing the game
         score = 0;

         //Displaying score box
         $("#score").show();
         $("#scorevalue").html(score);
         //Display the number of trials left in the box
         $("#trialsLeft").show();

         //Set the number of trials left
         numTrialsLeft = 5;
         //calling a function to add a number of trials
         addTrials(numTrialsLeft);

         //change button text to "reset game"
         $("#startReset").html('Reset Game');

         //Start dropping items
         startDropping();
     }    
});
   
//Hover over the item    
$('#items').click(function(){
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
    //Display an item in the item box
    $("#items").show();
    //Obtaining the width of the item container
    var itemContainerWidth = $('#itemContainer').width();
    itemContainerWidth = (itemContainerWidth - 50);
    chooseItem();
    $("#items").css({
        //Setting the position of the items dropping
        'left': Math.floor(Math.random() * itemContainerWidth),
        'top': -10
    })
    
    //Generate a random step
    step = Math.floor(Math.random() * 5) + 1;
    
    //Move item every 10 milisecond 
    action = setInterval(function(){
        //Increasing the steps
        $("#items").css('top', $("#items").position().top + step)
        
        //Check if item is too low
        if( $("#items").position().top > $("#itemContainer").height()){
            
             //Checking to see if there are any trials left
             if(numTrialsLeft > 1){
                 //If there's annother trial left display an item in the item box
                $("#items").show();
                //Obtaining the width of the item container
                var itemContainerWidth = $('#itemContainer').width();
                itemContainerWidth = (itemContainerWidth - 50);
                chooseItem();
                $("#items").css({
                    //Setting the position of the items dropping
                    'left': Math.floor(Math.random() * itemContainerWidth),
                    'top': -10
                })
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
               $("#startReset").html('Start Game');
               //Display the game over box   
               $("#gameOver").show();
               $("#gameOver").html("<h1 class='text-center'>Game Over!</h1><h1 class='text-center'>Your score is: " + score + " </h1>");   
               //Hide trials box
               $("#trialsLeft").hide(); 
                //Hide score box
               $("#score").hide();    
               //Stop the set Interval    
                stopAction();
            }
        }
    }, 10);
}

//Function will generate a random fruit
function chooseItem(){
    //Randomly generating images to be dropped
   $("#items").attr("src","img/sports/" + items[Math.floor(Math.random() * 8)] + ".png"); 
}

//Stop dropping fruits
function stopAction(){
    clearInterval(action);
    $("items").hide();
}
    
});    