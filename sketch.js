//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock;

var feedpet;
var addFood;
var fedTime;
var lastFed;
var foodObj;

function preload()
{
  //load images here
  Dog= loadImage("Dog.png");
  happyDog=loadImage("happydog.png");
}

function setup() {
  database=firebase.database ()
  
  createCanvas(500, 500);
  foodObj= new Food();
  
  dog= createSprite(250,330,10,10);
  dog.addImage(Dog);
  dog.scale=0.2;

  feedpet=createButton("Feed the Dog");
  feedpet.position(500,95);
  feedpet.mousePressed(feedDog)

  addFood= createButton("Add Food");
  addFood.position(600,95);
  addFood.mousePressed(addFoods);


  foodStock= database.ref('Food');
  foodStock.on("value",readStock);

}


function draw() {  
  background(46,139,87)
  
 
  foodObj.display();

  fedTime= database.ref("FeedTime");
  fedTime.on("value", function(data){
    lastFed=data.val();
  });

  fill (255,255,254);
  textSize(15);
  if (lastFed>=12){
    text("Last Fed : " + lastFed%12 + "PM", 200,30);
  }
  else if (lastFed===0){
    text ("Last Fed : 12 AM", 200,30);
  }else {
    text("Last Fed : "+ lastFed + "AM", 200,30);
  }
  
  drawSprites();
  //add styles here
  textSize(20);
  fill ("black");
  text ("Remaining Food: "+ foodS, 150,100);
 



}
//function to read FoodStock
function readStock(data){
  foodS= data.val();
  foodObj.updateFoodStock(foodS);
}

//function to update Food in Stock
function addFoods(){
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}
//function to update foodStock and the last Fed time
function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour ()
  })
}


