// Rover Object Goes Here
// ======================

var rover = {
  roverName: "Rover",
  direction:"N",
  x: 0,
  y: 0,
  travelLog : [],
  moveCheck : function (xy,pos) {
    console.log(xy+"-"+pos);
    if (this.direction == "E" || this.direction == "S") {      
      if (parseInt(pos) > 9 || parseInt(pos) < 0) {
        alert("Watch out! You are going to leave the safe area !");
        return Boolean(false);
      }

    } else {      
      if (parseInt(pos) < 0 || parseInt(pos) > 9) {
        alert("Watch out! You are going to leave the safe area !");
        return Boolean(false);
      }
    }
    
    //check if obstacle
    switch (xy) {
      case "x":
      if(map[pos][this.y] == "R"){
        console.log("Can't move there: ROVER found!");
        alert("Can't move there: ROVER found!");
        return Boolean(false);
      }else if (map[pos][this.y] == "X") {
        console.log("Can't move there: OBSTACLE found!");
        alert("Can't move there: OBSTACLE found!");
        return Boolean(false);
      }else{
        return Boolean(true);
      }
        break;

      case "y":
      if(map[this.x][pos] == "R"){
        console.log("Can't move there: ROVER found!");
        alert("Can't move there: ROVER found!");
        return Boolean(false);
      }else if (map[this.x][pos] == "X") {
        console.log("Can't move there: OBSTACLE found!");
        alert("Can't move there: OBSTACLE found!");
        return Boolean(false);
      }else{
        return Boolean(true);
      }
        break;
    
      default:
        break;
    }
  }
};

//Create other Rover
var rover2 = Object.create(rover);
    rover2.roverName = "Rover 2"
    rover2.x = 5;
    rover2.y = 5;
    rover2.travelLog = [];

var rover3 = Object.create(rover);
    rover3.roverName = "Rover 3"
    rover3.x = 3;
    rover3.y = 5;
    rover3.travelLog = [];



//MAP

var map = [
  ["R", null, null, "X", null, null, "X", null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  ["X", null, null, null, null, null, null, "X", null, null],
  [null, "X", null, null, null, null, null, null, null, null],
  [null, null, null, "X", null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, "X", null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, "X"],
];

document.addEventListener('DOMContentLoaded', function(){ 
  createTable(map);
}, false);


// ======================

document.addEventListener("keypress", checkPress);


function checkPress(e) {
  var key = e.which || e.keyCode;
  
  switch (key) {
    case 119:
      // W pressed -> moveForward
      //console.log(key);
      moveForward(rover);
      break;
    
      case 97:
      // A pressed -> turnLeft
      //console.log(key);
      turnLeft(rover);
      break;
    
      case 100:
      // D pressed -> turnRight
      //console.log(key);
      turnRight(rover);
      break;

      case 115:
      // S pressed -> turnRight
      //console.log(key);
      moveBackward(rover);
      break;
  
    default:
    if(key != 119 || key != 97 || key !=  100 || key !=  115){
      console.log("To move you can use W or S or A or D");
      return;
    }
      break;
  }

  console.log("Current direction: " + rover.direction);
  console.log("Current position: X" + rover.x + " Y" + rover.y);
  console.log("Movement "+rover.roverName+" tracking: " + rover.travelLog);

  //Table Refresh
  var mapTable = document.querySelector('table');
  mapTable.parentNode.removeChild(mapTable);
  createTable(map);
}

function turnLeft(rover){
  console.log("turnLeft was called!");
  //based on current direction update direction.
  switch (rover.direction) {
    case "W":
    rover.direction = "S";
      break;
    
    case "E":
    rover.direction = "N";
      break;
    
    case "S":
    rover.direction = "E";
      break;
  
    default:
    rover.direction = "W";
      break;
  }
  return rover.direction;
}

function turnRight(rover){
  console.log("turnRight was called!");
  //based on current direction update direction.
  switch (rover.direction) {
    case "W":
    rover.direction = "N";
      break;
    
    case "E":
    rover.direction = "S";
      break;
    
    case "S":
    rover.direction = "W";
      break;
  
    default:
    rover.direction = "E";
      break;
  }
  return rover.direction;
}

function moveForward(rover){
  console.log("moveForward was called");
  var currentPosition = [rover.x+"."+rover.y];

  switch (rover.direction) {
    case "W":
    if(rover.moveCheck("y",(rover.y - 1))){
      map[rover.x][rover.y] = null;//move is granted --> update map.
      rover.y -= 1; //move is granted, update cords.
      map[rover.x][rover.y] = "R"; //moved --> update map
      var track = Boolean(true);
    }
      break;
    
    case "N":
    
    if(rover.moveCheck("x", (rover.x - 1))){     
      map[rover.x][rover.y] = null;//move is granted --> update map.
      rover.x -= 1; //move is granted, update cords.
      map[rover.x][rover.y] = "R"; //moved --> update map
      var track = Boolean(true);
    }

      break;
    
    case "S":      
        if(rover.moveCheck("x",(rover.x + 1))){
          map[rover.x][rover.y] = null;//move is granted --> update map.
          rover.x += 1;
          map[rover.x][rover.y] = "R"; //moved --> update map
          var track = Boolean(true);
        }
      
    
    
    
      break;
    
    case "E":      
        if(rover.moveCheck("y",(rover.y + 1))){
          map[rover.x][rover.y] = null;//move is granted --> update map.
          rover.y += 1;
          map[rover.x][rover.y] = "R"; //moved --> update map
          var track = Boolean(true);
        }
      break;

    default:
    
      break;
  }

  //if moved update travelLog
  if (track) {
    rover.travelLog.push(rover.x+"."+rover.y);
  }else{
    console.log("Travel log not updated: For some reason the rover couldn't move.")
  }
  
  
}

//Move BackWards
function moveBackward(rover){
  console.log("moveBackward was called");
  var currentPosition = [rover.x+"."+rover.y];

  switch (rover.direction) {
    case "W":
    if(rover.moveCheck("y",(rover.y + 1))){
      map[rover.x][rover.y] = null;//move is granted --> update map.
      rover.y += 1; //move is granted, update cords.
      map[rover.x][rover.y] = "R"; //moved --> update map
      var track = Boolean(true);
    }
      break;
    
    case "N":
    
    if(rover.moveCheck("x", (rover.x + 1))){     
      map[rover.x][rover.y] = null;//move is granted --> update map.
      rover.x += 1; //move is granted, update cords.
      map[rover.x][rover.y] = "R"; //moved --> update map
      var track = Boolean(true);
    }

      break;
    
    case "S":      
        if(rover.moveCheck("x",(rover.x - 1))){
          map[rover.x][rover.y] = null;//move is granted --> update map.
          rover.x -= 1;
          map[rover.x][rover.y] = "R"; //moved --> update map
          var track = Boolean(true);
        }
      
    
    
    
      break;
    
    case "E":      
        if(rover.moveCheck("y",(rover.y - 1))){
          map[rover.x][rover.y] = null;//move is granted --> update map.
          rover.y -= 1;
          map[rover.x][rover.y] = "R"; //moved --> update map
          var track = Boolean(true);
        }
      break;

    default:
    
      break;
  }

  //if moved update travelLog
  if (track) {
    rover.travelLog.push(rover.x+"."+rover.y);
  }else{
    console.log("Travel log not updated: For some reason the rover couldn't move.")
  }
  
  return rover.direction;
}



///Extra Functions

function roverCommand(rovers, cmd) {
  for (var i = 0; i < cmd.length; i++) {
    
    if (cmd[i] == "r") {
      turnRight(rovers);
    } else if (cmd[i] == "l") {
      turnLeft(rovers);
    } else if (cmd[i] == "f") {
      moveForward(rovers);
    } else if (cmd[i] == "b") {
      moveBackward(rovers);
    } else {
      console.log("Input command not valid: skipped. Use: f, r, b, or l.")
    }
    
  }
  console.log("AutoMove " +rovers.roverName+ " Tracking: " + rovers.travelLog);
}

function createTable(tableData) {
  var table = document.createElement('table');
  var row = {};
  var cell = {};

  tableData.forEach(function(rowData) {
    row = table.insertRow(-1);
    rowData.forEach(function(cellData) {
      cell = row.insertCell();
      if (cellData === null) {
        cell.innerHTML = '<div class="cell"></div>';
      }else if (cellData == "R"){
        cell.innerHTML = '<div class="cell rover">'+cellData+'</div>';
      }else if (cellData == "X"){
        cell.innerHTML = '<div class="cell obstacle">'+cellData+'</div>';
      }
      
      
    });
  });  
  document.body.appendChild(table);
}


//Rover Commands:
roverCommand(rover2, "rffrfflff");
roverCommand(rover3, "rrflffflfffbf");
