/**
 * Created by Natalya on 0/0/2015.
 */

var pl = require('./user');

var player = new pl.Player();
var player2 = new pl.Player();

console.log(player.PointsForPlayer1);


    var  LINE =10,
        COLUMN = 10,
        Field =[],
        AddField = [],
        PointPlayer1 = 0,
        PointPlayer2 = 0;

    for (var i = 0; i < LINE; i++) {
        Field[i] = [];
        for (var j = 0; j < COLUMN; j++) {
            Field[i][j] = 0;
        }
    }

    AddField = Field;

function GetPoints() {
    PointPlayer1=0;
   PointPlayer2=0;
    for (var i = 0; i < LINE; i++) {
        for (var j = 0; j < COLUMN; j++) {
            if (Field[i][j] === 6) {
                PointPlayer1++;
                console.log(PointPlayer1);
            }
            if (Field[i][j] === 7) {
                PointPlayer2++;
                console.log(PointPlayer2);
            }

        }
    }
}


    function PrintField(){
        console.log("Field");
                console.log(Field);

    }

    function ReturnNormalFieldView(play){
        for (var i=0; i<LINE; i++){
            for(var j=0; j<COLUMN; j++){
               if(Field[i][j]===4||Field[i][j]===5) Field[i][j]=play;
            }
        }
    }

    function EqualFields(){
        for (var i=0; i<LINE; i++){
            for(var j=0; j<COLUMN; j++){
               AddField[i][j]=Field[i][j];
            }
        }
    }

    PrintField();

var Flag = true;







var WebSocketServer = new require('ws');

var clients = {};

var webSocketServer = new WebSocketServer.Server({
    port: 8081
});
webSocketServer.on('connection', function(ws) {

    var id = Math.random();
    clients[id] = ws;
    console.log("new connection " + id);

    ws.on('message', function(message) {
        if (Flag===true){
            Flag=false;
        console.log('get message ' + message);//get Lines and Columns


          var  data =  JSON.parse(message);
            player.ChoiseLines=data.ChoiseLines;
            player.ChoiseColumns =data.ChoiseColumns;

            EqualFields();
            if(player.SearchNeighbour(Field, player.ChoiseLines, player.ChoiseColumns, 1)&&player.Point>1){
                console.log("Points for first player " + PointPlayer1 );

            }
            else console.log("Points for first player " + PointPlayer2  );

            ReturnNormalFieldView(1);
            GetPoints();
            console.log(Field);
            var user = {
                Field: Field,
                PointsForPlayer1: PointPlayer1,
                PointsForPlayer2: PointPlayer2
            };

        for (var key in clients) {
            clients[key].send(JSON.stringify(user));
        }}
        else{
            Flag=true;
            console.log('get message ' + message);//get Lines and Columns


            var  data =  JSON.parse(message);
            player2.ChoiseLines=data.ChoiseLines;
            player2.ChoiseColumns =data.ChoiseColumns;

            EqualFields();
            if(player2.SearchNeighbour(Field, player2.ChoiseLines, player2.ChoiseColumns, 2)&&player2.Point>1){
                console.log("Points for second player " + PointPlayer2  );

            }
            else console.log("Points for second player " + PointPlayer2  );

            ReturnNormalFieldView(2);
            GetPoints();
            console.log(Field);
            var user = {
                Field: Field,
                PointsForPlayer1: PointPlayer1,
                PointsForPlayer2: PointPlayer2
            };
            for (var key in clients) {
                clients[key].send(JSON.stringify(user));
            }
        }

    });

    ws.on('close', function() {
        console.log('connection closed ' + id);
        delete clients[id];
    });

});


module.exports.LINE = LINE;
module.exports.COLUMN = COLUMN;
module.exports.Field = Field;
module.exports.PointPlayer1 = PointPlayer1;
module.exports.PointPlayer2 = PointPlayer2;
