let xp = 0;
let rodHealth = 100;
let money = 50;
let currentRod = 0;
let catching;
let fishStamina;
let inventory = ["Stick & Line"];
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const rodhealthText = document.querySelector("#rodhealthText");
const moneyText = document.querySelector("#moneyText");
const fishStats = document.querySelector("#fishStats");
const fishName = document.querySelector("#fishName");
const fishStaminaText  = document.querySelector("#fishStamina");
const rods = [
    {
        name: "Stick & Line",
        power: 5
    },
    {
        name: "Fly rod",
        power: 15
    },
    {
        name: "Spinning rod",
        power: 35
    },
    {
        name: "Casting rod",
        power: 100
    }
]
const fish = [
    {
        name: "Sunfish", 
        level: 2, 
        stamina: 30
    },
    {
        name: "Bass", 
        level: 8, 
        stamina: 100
    },
    {
        name: "Musky", 
        level: 20, 
        stamina: 500
    },
  ];
const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to lake", "Catch Musky",],
        "button functions":[goStore, goLake, catchMusky],
        text: "You are in the town square. You see a sign that says \"Store\"."
    },
    {
        name: "store",
        "button text": ["Fix your rod (10 dollars)", "Buy new rod (30 dollars)", "Go to town square"],
        "button functions": [buyRodHealth, buyRod, goTown],
        text: "You enter the store." 
    },
    {
        name: "lake",
        "button text":["Catch sunfish", "Catch bass", "Go to town square"],
        "button functions": [catchSunFish, catchBass, goTown],
        text: "You've arrived at the lake, you see some swirling in the water"
    },
    {
        name: "catch",
        "button text": ["Reel in", "Let run", "Leave"],
        "button functions": [reelIn, letRun, goTown],
        text: "You are fighting a fish."
    },
    {
        name: "catch fish",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, goTown],
        text: "You've caught the fish. you gain exerience points and sell the fish in town for money."
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "The fish got away."
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You've caught the musky! YOU WIN THE GAME!"  
    }
]
button1.onclick = goStore;
button2.onclick = goLake;
button3.onclick = catchMusky;
function update(location) {
    fishStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button1.onclick = location["button functions"][0];
    button2.innerText = location["button text"][1];
    button2.onclick = location["button functions"][1];
    button3.innerText = location["button text"][2];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}
function goTown(){
    update(locations[0]);
}
function goStore(){
    update(locations[1]);
}
function goLake(){
    update(locations[2]);
}
function buyRodHealth(){
    if(money >= 10){
        money -= 10;
        rodHealth += 10;
        moneyText.innerText = money;
        rodhealthText. innerText = rodHealth;
    }
    else{
        text.innerText = "You do not have enough money to fix your rod. Go catch fish to earn more money.";
    }
}
function buyRod(){
    if (currentRod < rods.length - 1){
        if(money >= 30){
            money -= 30;
            currentRod ++;
             moneyText.innerText = money;
            let newRod = rods[currentRod].name;
            text.innerText = "You now have a " + newRod + ".";
            inventory.push(newRod);
            text.innerText += " In your inventory you have: " + inventory;
        }
        else{
            text.innerText = "You do not have enough money to buy a new Rod. Go catch fish to earn more money."; 
        }
    }
    else{
        text.innerText = "You already have the best rod!";
        button2.innerText = "Sell rod for 15 dollars";
        button2.onclick = sellRod; 
    }
}
function sellRod(){
    if(inventory > 1){
        money += 15;
        moneyText.innerText = money;
        let currentRod = inventory.shift();
        text.innerText = "You sold a " + currentRod + ".";
        text.innerText += " In your inventory you have: " + inventory;
    }
    else{
        text.innerText = "Don't sell your only rod!";
    }
}
function catchSunFish(){
    catching = 0;
    goCatch(); 
}
function catchBass(){
    catching = 1;
    goCatch();
}
function catchMusky (){
    catching = 2;
    goCatch();
}
function goCatch(){
    update(locations[3]);
    fishStamina = fish[catching].stamina;
    fishStats.style.display = "block";
    fishName.innerText = fish[catching].name;
    fishStaminaText.innerText = fishStamina;
}
function reelIn(){
    text.innerText = "You set the hook on " + fish[catching].name + " .";
    text.innerText += " You attempting to catch it with your " + rods[currentRod].name + ".";
    rodHealth -= getFishAttackValue(fish[catching].level);
    if (isFishHit()){
        fishStamina -= rods[currentRod].power +  Math.floor(Math.random() * xp) + 1;
    }
    else{
        text.innerText += " You miss."; 
    }
    rodhealthText.innerText = rodHealth;
    fishStaminaText.innerText = fishStamina;
    if(rodHealth <= 0){
        lose()
    }
    else if(fishStamina <= 0){
        catching === 2 ? winGame() : defeatFish();
      }
    if(Math.random() <= .1){
        text.innerText += " Your " + inventory.pop() + " breaks.";
        currentRod--;
      }
}
function getFishAttackValue(level) {
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit > 0 ? hit : 0;
}
function isFishHit(){
    return Math.random() > .2 || rodHealth < 20;
 } 
function letRun(){
    text.innerText = "You let the " + fish[catching].name + " run to pervent snapping off."
}
function defeatFish(){
    money += Math.floor(fish[catching].level * 6.7);
    xp += fish[catching].level;
    moneyText.innerText = money;
    xpText.innerText = xp;
    update(locations[4]);
}
function lose(){
    update(locations[5]);
}
function winGame(){
    update(locations[6]);
  }
function restart(){
    xp =  0;
    rodHealth = 100;
    money = 50;
    currentRod = 0;
    inventory = ["Stick & Line"];
    xpText.innerText = xp;
    rodhealthText.innerText = rodHealth;
    moneyText.innerText = money;
    goTown();
}
