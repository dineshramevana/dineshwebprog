var w; 

var user;

var grid = [
	
	{x:1, y:0, ocp:"checker-white", king:false},
	{x:3, y:0, ocp:"checker-white", king:false},
	{x:5, y:0, ocp:"checker-white", king:false},
	{x:7, y:0, ocp:"checker-white", king:false},
	{x:0, y:1, ocp:"checker-white", king:false},
	{x:2, y:1, ocp:"checker-white", king:false},
	{x:4, y:1, ocp:"checker-white", king:false},
	{x:6, y:1, ocp:"checker-white", king:false},
	{x:1, y:2, ocp:"checker-white", king:false},
	{x:3, y:2, ocp:"checker-white", king:false},
	{x:5, y:2, ocp:"checker-white", king:false},
	{x:7, y:2, ocp:"checker-white", king:false},

	
	{x:0, y:3, ocp:"", king:false},
	{x:2, y:3, ocp:"", king:false},
	{x:4, y:3, ocp:"", king:false},
	{x:6, y:3, ocp:"", king:false},
	{x:1, y:4, ocp:"", king:false},
	{x:3, y:4, ocp:"", king:false},
	{x:5, y:4, ocp:"", king:false},
	{x:7, y:4, ocp:"", king:false},

	
	{x:0, y:5, ocp:"checker-red", king:false},
	{x:2, y:5, ocp:"checker-red", king:false},
	{x:4, y:5, ocp:"checker-red", king:false},
	{x:6, y:5, ocp:"checker-red", king:false},
	{x:1, y:6, ocp:"checker-red", king:false},
	{x:3, y:6, ocp:"checker-red", king:false},
	{x:5, y:6, ocp:"checker-red", king:false},
	{x:7, y:6, ocp:"checker-red", king:false},
	{x:0, y:7, ocp:"checker-red", king:false},
	{x:2, y:7, ocp:"checker-red", king:false},
	{x:4, y:7, ocp:"checker-red", king:false},
	{x:6, y:7, ocp:"checker-red", king:false}
];

var chosen = {ocp:"", x:0, y:0, king:false};
var turn = 'white';
var white;
var red;

function GameLoad()
{
	displayGrid();
	workFlow();
	checkmov = document.getElementById('checkmov');
	checkmov.style.position = "relative";
	animateCSS(checkmov, 200, 100,
		{
			left: function(frame,time)
			{
				if (frame <= 50)
				{
					return frame + "px";
				}
				else if (frame > 100 && frame <= 150)
				{
					count = (frame-150) * (-1);
			                 return count;
				}
			},
			top: function(frame,time)
			{
				if (frame > 50 && frame <= 100)
				{
					return (frame-50) + "px";
				}
				else if (frame > 150 && frame <= 200)
				{
					count = (frame-200) * (-1);
					return count;
				}
			}
		});
}

function displayGrid()
{
	var board = document.getElementById('gamegrid');
	var html = "<table class='grid'>";

	for (var i = 0; i < grid.length; i++)
	{
		if (grid[i].x == 0 || grid[i].x == 1)
		{
			html += "<tr>";
		}
		if (grid[i].x%2 == 1)
		{
			html += "<td class='greycell'></td>";
		}

		html += "<td class='bluestonecell'><div id=" + grid[i].ocp + "></div></td>";

		if (grid[i].x%2 == 0 && grid[i].x != 7)
		{
			html += "<td class='greycell'></td>";
		}
		if (grid[i].x == 6)
		{
			html += "</tr>";
		}
		if (grid[i].x == 7)
		{
			html += "</tr>";
		}
	}

	html += "</table>";
	board.innerHTML = html;
}


function workFlow()
{
	var gridDiv = document.getElementById('gamegrid');
	var tds = gridDiv.getElementsByTagName('td');

	for (var i = 0; i < tds.length; i++)
	{
		tds[i].onclick = pieceflow;
	}
}
function gameOver()
{
	var white_exists = false;
	var red_exists = false;
	for (var i = 0; i < grid.length; i++)
	{
		if (grid[i].ocp == 'checker-white' || grid[i].ocp == 'king-white')
		{
			white_exists = true;
		}
		else if (grid[i].ocp == 'checker-red' || grid[i].ocp == 'king-red')
		{
			red_exists = true;
		}
	}

	if (!white_exists)
	{
		alert('Player 2 wins Congratulations!!!!');
		location.reload(true);
	}
	else if (!red_exists)
	{
		alert('Player 1 wins Congratulations!!!!');
		location.reload(true);
	}

	return false;
}


function pieceflow()
{
	cell = this;
	x = cell.cellIndex;
	y = cell.parentNode.rowIndex;
	gp = getgp(x, y);
	
	if (chosen.ocp == "" && gp && gp.ocp.indexOf(turn) != -1)
	{
		chosen.ocp = gp.ocp;
		chosen.king = gp.king;
		chosen.x = x;
		chosen.y = y;
		gp.ocp = "";

		cell.innerHTML = "<div id=''></div>";
		cell.onclick = pieceflow;
	}
	else if (chosen.ocp.indexOf('white') != -1)
	{
		if (y == 7)
		{
			chosen.king = true;
			chosen.ocp = 'king-white';
		}
		//Move
		if ((x == chosen.x-1 || x == chosen.x+1) && (y == chosen.y+1) && (gp.ocp == ""))
		{
			cell.innerHTML = "<div id=" + chosen.ocp + "></div>";
			cell.onclick = pieceflow;
			gp.ocp = chosen.ocp;
			gp.king = chosen.king;
			chosen.ocp = "";
			chosen.king = false;
			chosen.x = 0;
			chosen.y = 0;
			turn = 'red';
		}
		else if ((x == chosen.x-2) && (y == chosen.y+2) && (getgp(x, y).ocp == ""))
		{
			moved = getgp(x+1, y-1);
			if (moved.ocp.indexOf('white') == -1 && moved.ocp != "")
			{
				jmove = getGridCell(x+1, y-1);
				cell.innerHTML = "<div id=" + chosen.ocp + "></div>";
				cell.onclick = pieceflow;
				gp.ocp = chosen.ocp;
				gp.king = chosen.king;
				moved.ocp = "";
				jmove.innerHTML = "<div id=''></div>";
				jmove.onclick = pieceflow;
				chosen.ocp = "";
				chosen.king = false;
				chosen.x = 0;
				chosen.y = 0;
				turn = 'red';
				gameOver();
			}
		}
		else if ((x == chosen.x+2) && (y == chosen.y+2) && (gp.ocp == ""))
		{
			moved = getgp(x-1, y-1);
			if (moved.ocp.indexOf('white') == -1 && moved.ocp != "")
			{
				jmove = getGridCell(x-1, y-1);
				cell.innerHTML = "<div id=" + chosen.ocp + "></div>";
				cell.onclick = pieceflow;
				gp.ocp = chosen.ocp;
				gp.king = chosen.king;
				moved.ocp = "";
				jmove.innerHTML = "<div id=''></div>";
				jmove.onclick = pieceflow;
				chosen.ocp = "";
				chosen.king = false;
				chosen.x = 0;
				chosen.y = 0;
				turn = 'red';
				gameOver();
			}
		}
		else if (x == chosen.x && y == chosen.y)
		{
			gp.ocp = chosen.ocp;
			gp.king = chosen.king;
			chosen.ocp = '';
			chosen.king = false;
			chosen.x = 0;
			chosen.y = 0;

			cell.innerHTML = "<div id=" + gp.ocp + "></div>";
			cell.onclick = pieceflow;
		}
		else if ((x == chosen.x-1 || x == chosen.x+1) && (y == chosen.y-1) && (gp.ocp == "") && chosen.king)
		{
			cell.innerHTML = "<div id=" + chosen.ocp + "></div>";
			cell.onclick = pieceflow;
			gp.ocp = chosen.ocp;
			gp.king = chosen.king;
			chosen.ocp = "";
			chosen.king = false;
			chosen.x = 0;
			chosen.y = 0;
			turn = 'red';
		}
		else if ((x == chosen.x-2) && (y == chosen.y-2) && (getgp(x, y).ocp == "") && chosen.king)
		{
			moved = getgp(x+1, y+1);
			if (moved.ocp.indexOf('white') == -1 && moved.ocp != "")
			{
				jmove = getGridCell(x+1, y+1);
				cell.innerHTML = "<div id=" + chosen.ocp + "></div>";
				cell.onclick = pieceflow;
				gp.ocp = chosen.ocp;
				gp.king = chosen.king
				moved.ocp = "";
				jmove.innerHTML = "<div id=''></div>";
				jmove.onclick = pieceflow;
				chosen.ocp = "";
				chosen.king = false;
				chosen.x = 0;
				chosen.y = 0;
				turn = 'red';
				gameOver();
			}
		}
		else if ((x == chosen.x+2) && (y == chosen.y-2) && (gp.ocp == "") && chosen.king)
		{
			moved = getgp(x-1, y+1);
			if (moved.ocp.indexOf('white') == -1 && moved.ocp != "")
			{
				jmove = getGridCell(x-1, y+1);
				cell.innerHTML = "<div id=" + chosen.ocp + "></div>";
				cell.onclick = pieceflow;
				gp.ocp = chosen.ocp;
				gp.king = chosen.king;
				moved.ocp = "";
				jmove.innerHTML = "<div id=''></div>";
				jmove.onclick = pieceflow;
				chosen.ocp = "";
				chosen.king = false;
				chosen.x = 0;
				chosen.y = 0;
				turn = 'red';
				gameOver();
			}
		}
	}
	else if (chosen.ocp.indexOf('red') != -1)
	{
		if (y == 0)
		{
			chosen.king = true;
			chosen.ocp = 'king-red';
		}
		
		if ((x == chosen.x-1 || x == chosen.x+1) && (y == chosen.y-1) && (gp.ocp == ""))
		{
			cell.innerHTML = "<div id=" + chosen.ocp + "></div>";
			cell.onclick = pieceflow;
			gp.ocp = chosen.ocp;
			gp.king = chosen.king;
			chosen.ocp = "";
			chosen.king = false;
			chosen.x = 0;
			chosen.y = 0;
			turn = 'white';
		}
		else if ((x == chosen.x-2) && (y == chosen.y-2) && (getgp(x, y).ocp == ""))
		{
			moved = getgp(x+1, y+1);
			if (moved.ocp.indexOf('red') == -1 && moved.ocp != "")
			{
				jmove = getGridCell(x+1, y+1);
				cell.innerHTML = "<div id=" + chosen.ocp + "></div>";
				cell.onclick = pieceflow;
				gp.ocp = chosen.ocp;
				gp.king = chosen.king
				moved.ocp = "";
				jmove.innerHTML = "<div id=''></div>";
				jmove.onclick = pieceflow;
				chosen.ocp = "";
				chosen.king = false;
				chosen.x = 0;
				chosen.y = 0;
				turn = 'white';
				gameOver();
			}
		}
		else if ((x == chosen.x+2) && (y == chosen.y-2) && (gp.ocp == ""))
		{
			moved = getgp(x-1, y+1);
			if (moved.ocp.indexOf('red') == -1 && moved.ocp != "")
			{
				jmove = getGridCell(x-1, y+1);
				cell.innerHTML = "<div id=" + chosen.ocp + "></div>";
				cell.onclick = pieceflow;
				gp.ocp = chosen.ocp;
				gp.king = chosen.king;
				moved.ocp = "";
				jmove.innerHTML = "<div id=''></div>";
				jmove.onclick = pieceflow;
				chosen.ocp = "";
				chosen.king = false;
				chosen.x = 0;
				chosen.y = 0;
				turn = 'white';
				gameOver();
			}
		}
		else if (x == chosen.x && y == chosen.y)
		{
			gp.ocp = chosen.ocp;
			gp.king = chosen.king;
			chosen.ocp = '';
			chosen.king = false;
			chosen.x = 0;
			chosen.y = 0;

			cell.innerHTML = "<div id=" + gp.ocp + "></div>";
			cell.onclick = pieceflow;
		}
		else if ((x == chosen.x-1 || x == chosen.x+1) && (y == chosen.y+1) && (gp.ocp == "") && chosen.king)
		{
			cell.innerHTML = "<div id=" + chosen.ocp + "></div>";
			cell.onclick = pieceflow;
			gp.ocp = chosen.ocp;
			gp.king = chosen.king;
			chosen.ocp = "";
			chosen.king = false;
			chosen.x = 0;
			chosen.y = 0;
			turn = 'white';
		}
		else if ((x == chosen.x-2) && (y == chosen.y+2) && (getgp(x, y).ocp == "") && chosen.king)
		{
			moved = getgp(x+1, y-1);
			if (moved.ocp.indexOf('red') == -1 && moved.ocp != "")
			{
				jmove = getGridCell(x+1, y-1);
				cell.innerHTML = "<div id=" + chosen.ocp + "></div>";
				cell.onclick = pieceflow;
				gp.ocp = chosen.ocp;
				gp.king = chosen.king;
				moved.ocp = "";
				jmove.innerHTML = "<div id=''></div>";
				jmove.onclick = pieceflow;
				chosen.ocp = "";
				chosen.king = false;
				chosen.x = 0;
				chosen.y = 0;
				turn = 'white';
				gameOver();
			}
		}
		else if ((x == chosen.x+2) && (y == chosen.y+2) && (gp.ocp == "") && chosen.king)
		{
			moved = getgp(x-1, y-1);
			if (moved.ocp.indexOf('red') == -1 && moved.ocp != "")
			{
				jmove = getGridCell(x-1, y-1);
				cell.innerHTML = "<div id=" + chosen.ocp + "></div>";
				cell.onclick = pieceflow;
				gp.ocp = chosen.ocp;
				gp.king = chosen.king;
				moved.ocp = "";
				jmove.innerHTML = "<div id=''></div>";
				jmove.onclick = pieceflow;
				chosen.ocp = "";
				chosen.king = false;
				chosen.x = 0;
				chosen.y = 0;
				turn = 'white';
				gameOver();
			}
		}
	}
}



function getgp(x, y)
{
	for (var i = 0; i < grid.length; i++)
	{
		if (grid[i].x == x && grid[i].y == y)
		{
			return grid[i];
		}
	}
}

function getGridCell(x, y)
{
	var brd = document.getElementById('gamegrid');
	var gridTable = brd.getElementsByTagName('table');
	return gridTable[0].rows[y].cells[x];
}


