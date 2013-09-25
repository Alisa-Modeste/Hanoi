var discNum = 3;

$(document).ready(function(){
  for (var i =0; i < 3; i++){
    $ul = $("<ul class='pile' id='" + i + "'></ul>").appendTo("body")

    for(var j=0; j < discNum; j++){
      $ul.append("<li></li>")
    }
  }
  drawGame();
  startTurn();
});

function drawGame() {
  $("li").removeClass();
  var towers = Game.towers
  $(".pile").each(function(index,element){
    var tower = towers[index]

     $(element).children().each(function(childIndex, childElement){
       console.log("tower[discNum - childIndex]",tower[discNum - childIndex])
      if (tower[discNum - childIndex -1] !== undefined){
        console.log("Made it in")
        $(childElement).addClass("disc_"+tower[discNum - childIndex-1])
      }

    })
  });
  // $(".pile#0").children().last().toggleClass("disc_2");
}

function startTurn() {
  $(".pile").off('click');
  $('.from').toggleClass('from');
  $(".pile").on("click", function(event) {
    $(".pile").off('click');
    $pile = $(this);
    $pile.toggleClass('from');
    $pile.on("click", startTurn);
    $pile.siblings().on('click', function(event) { sendTowers($(this)) });
  })
}

function sendTowers($pile) {
  var fromId = $(".from").attr('id');
  var toId = $pile.attr('id');
  console.log("from id: ", fromId);
  console.log("to id: ", toId);
  Game.move(fromId, toId);
  drawGame();
  if (Game.isWon()) {
    $('.from').toggleClass('from');
    alert('You win');
    $(".pile").off('click');
  } else {
    startTurn();
  };
}