var dog, sadDog, happyDog;
var feed, addFoods;
var foodObj;
var foodS, foodStock;
var fedTime, lastFed;

function preload(){
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happy dog.png");
}

function setup(){
   database = firebase.database();
   createCanvas(1000, 400);
   foodObj = new Food();

   foodStock = database.ref('Food');
   foodStock.on("value", readStock);

  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  feed = createButton("Feed the Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFoods = createButton("Add the Food");
  addFoods.position(800, 95);
  addFoods.mousePressed(addFood);
}

function draw(){
  background(46, 139, 87);
  dog.display();
  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })

  fill(255, 255, 254);
  textSize(15);

  if(lastFed >= 12){
    text("Last Fed : " + lastFed%12 + "PM", 350, 30);
  }
  else if(lastFed === 0){
text("Last Fed : 12 AM", 350, 30);
  }
  else{
    text("Last Fed : " + lastFed + "AM", 350, 30);
  }
  drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFood(){
  foodS++;
database.ref('/').update({
  Food:foodS
})
}