/**
 * Created by Natalya on 9/26/2015.
 */

/**
 * Created by Natalya on 9/26/2015.
 */

var m = require('./Main');



function Player() {
    var ChoiseLines = 0,
        ChoiseColumns =0;
    this.ChoiseLines= ChoiseLines;
    this.ChoiseColumns = ChoiseColumns;

    var   Flag,
        FlagPlayer;

    var  StartX=0 ,
        StartY =0;

    var End =0;
    //module.exports.Flag = Flag;

    var Field2 = [];
    for (var i = 0; i < m.LINE; i++) {
        Field2[i] = [];
        for (var j = 0; j < m.COLUMN; j++) {
            Field2[i][j] = 0;
        }
    }

    var stackField = [],
        stackX = [],
        stackY = [];




    var Point = 0;
    this.Point = Point;
    var FlagEnd = false,
        counter = 0;

//this.PointsForPlayer1 = PointsForPlayer1;
    //  this.PointsForPlayer2 = PointsForPlayer2;

    function GetPoints() {
        m.PointPlayer1=0;
        m.PointPlayer2=0;
        for (var i = 0; i < m.LINE; i++) {
            for (var j = 0; j < m.COLUMN; j++) {
                if (m.Field[i][j] === 6) {
                    //    Player.PointsForPlayer1++;
                    m.PointPlayer1++;
                    console.log(m.PointPlayer1);
                }
                if (m.Field[i][j] === 7) {
                    m.PointPlayer2++;
                    console.log(m.PointPlayer2);
                }

            }
        }
    }


    function Function(i, FirstColumn, SecondColumn) {
        for (var k = FirstColumn + 1; k <= SecondColumn - 1; k++) {
            if ((SecondColumn - FirstColumn) <= 1) {
                break;
            }
            if (m.Field[i][k] !== 4) {
                if (Flag === true) {
                    m.Field[i][k] = 6;
                }
                if (Flag === false) {
                    m.Field[i][k] = 7;
                }

            }
        }
        GetPoints();
    }

    function Search(currentField, player) {
        var l = 0,
            FirstColumn,
            SecondColumn,
            Col1 = 0;
        if (player===1) Flag=true;
        else Flag=false;

        for (var i = 0; i < m.LINE; i++) {
            for (var j = 0; j < m.COLUMN; j++) {
                if ((j + 1) === 10 && (l === 1)) {
                    l = 0;
                }
                if (currentField[i][j] === 4) {
                    l++;
                    if (l === 1) {
                        Col1 = j;
                    }
                    if (l === 2) {
                        SecondColumn = j;
                        l = 0;
                        FirstColumn = Col1;
                        if ((SecondColumn - FirstColumn) <= 1) {
                            FirstColumn = SecondColumn;
                            l = 1;
                        }
                        else {
                            Function(i, FirstColumn, SecondColumn);
                            FirstColumn = SecondColumn;
                            l = 1;
                        }
                    }
                }
            }
        }
    }


    Player.prototype.SearchNeighbour = function SearchNeighbour(currentField, x, y, player) {
        if (End===0){
            StartX=x;
            StartY=y;
            End++;
        }

        if (currentField[x][y] != 5) currentField[x][y] = 4;
        else currentField[x][y] = 5;
        FlagEnd = false;

        for (var i = x - 1; i <= (x + 1); i++) {
            if (i >= m.LINE || i < 0) continue;
            for (var j = (y - 1); j <= y + 1; j++) {
               if (j >= m.COLUMN || j < 0) continue;

                if (currentField[i][j] === player) {
                    stackField.push(currentField);
                    stackX.push(x);
                    stackY.push(y);
                    SearchNeighbour(currentField, i, j, player);
                }

            }
       }

        counter = 0;

        if (FlagEnd === true) return true;

        if (!SearchNeighbour1(currentField, x, y, player) && counter >= 2 && FlagPlayer === true) {
            Point = 0;
            for (var k1 = 0; k1 < 10; k1++) {
                for (var l1 = 0; l1 < 10; l1++) {
                    FlagPlayer = false;
                    if (currentField[k1][l1] === 4) {
                        ++Point;
                        FlagEnd = true;
                        console.log("Point++   " + Point);
                    }
                }
            }
            Search(currentField, player);
            End=0;
            return true;
        }

        else if (!SearchNeighbour1(currentField, x, y, player) && stackField.length===0) {
            counter = 0;
            FlagEnd = false;
            End=0;
            return false;
        }
        else if (!SearchNeighbour1(currentField, x, y, player)) {
            counter = 0;
            currentField[x][y] = 5;
            Field2 = PopField();
            Field2[x][y] = 5;
            x = PopX();
            y = PopY();
            SearchNeighbour1(Field2, x, y, player);
            FlagEnd = false;
            End=0;
            return false;
        }
        return true;

    }

    FlagPlayer = false;

    function SearchNeighbour1(currentField, x, y, player) {
        counter = 0;
        FlagPlayer = false;
        if (!CheckField(currentField, x - 1, y - 1, player) && !CheckField(currentField, x - 1, y, player) && !CheckField(currentField, x - 1, y + 1, player) && !CheckField(currentField, x, y - 1, player) && !CheckField(currentField, x, y + 1, player) && !CheckField(currentField, x + 1, y - 1, player) && !CheckField(currentField, x + 1, y, player) && !CheckField(currentField, x + 1, y + 1, player)) {
            return false;
        }
        return true;


    }

    function CheckField(currentField, x, y, player) {
        if (x < 0 || x >= m.LINE || y < 0 || y >= m.COLUMN) return false;
        if (currentField[x][y] === player) {
            return true;
        }
        if (currentField[x][y] === 4) {
            counter++;
            if (x === StartX && y === StartY) {
                FlagPlayer = true;
            }
            return false;
        }
        return false;
    }

    function PopField() { //??????? ???? ?? ?????

        var something = stackField.pop();
        var Field = something;
        return Field;
    }

    function PopX() { //??????? ?????????? ?? ?????.

        var something = stackX.pop();
        var Field = something;
        return Field;
    }

    function PopY() { //??????? ?????????? ? ?? ?????

        var something = stackY.pop();
        var Field = something;
        return Field;
    }

    module.exports = function () {
        return {
            // Flag: Flag,
            //  S: "Hello",
            StartX: StartY,
            StartY: StartX,
            ChoiseLines: ChoiseLines,
            ChoiseColumns: ChoiseColumns,
            Point: Point,
           PointsForPlayer1: m.PointPlayer1,
            PointsForPlayer2: m.PointPlayer2,
            SearchNeighbour: SearchNeighbour

        }
    }
};
Player.prototype.PointsForPlayer1 = 0;
Player.prototype.PointsForPlayer2 = 0;

module.exports.Player = Player;
