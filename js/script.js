let canvas = document.getElementById('game')
let context = canvas.getContext('2d')

let grid = 8

let count = 0

let snake = {
	x: 160,
	y: 160,
	dX: grid,
	dY: 0,
	cells: [],
	maxCells: 1
}

let meat = {
	x: 320,
	y: 320
}

let getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min

function loop() {
	requestAnimationFrame(loop)

	if (++count < 4) {
		return;
	}
	count = 0
	context.clearRect(0, 0, canvas.width, canvas.height)
	snake.x += snake.dX
	snake.y += snake.dY

	if (snake.x < 0) {
		snake.x = canvas.width - grid
	}
	else if (snake.x >= canvas.width) {
		snake.x = 0
	}

	if (snake.y < 0) {
		snake.y = canvas.height - grid
	}
	else if (snake.y >= canvas.height) {
		snake.y = 0
	}
	snake.cells.unshift({
		x: snake.x, y: snake.y
	})

	if (snake.cells.length > snake.maxCells) {
		snake.cells.pop();
	}
	context.fillStyle = 'red'

	context.fillRect(meat.x, meat.y, grid, grid)
	context.fillStyle = 'blue'
	snake.cells.forEach(function (cell, index) {
		context.fillRect(cell.x, cell.y, grid - 1, grid - 1)
		if (cell.x === meat.x && cell.y == meat.y) {
			snake.maxCells++
			meat.x = getRandomInt(0, 50) * grid;
			meat.y = getRandomInt(0, 50) * grid;
		}
		for (let i = index + 1; i < snake.cells.length; i++) {
			if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
				snake.x = 160
				snake.y = 160
				snake.cells = []
				snake.maxCells = 4
				snake.dX = grid
				snake.dY = 0

				meat.x = getRandomInt(0, 25) * grid;
				meat.y = getRandomInt(0, 25) * grid;
			}
		}
	})
}
//=================
document.addEventListener('keydown', function (e) {
	if (e.which === 37 && snake.dX === 0) {
		snake.dX = -grid
		snake.dY = 0
	}
	else if (e.which === 38 && snake.dY === 0) {
		snake.dY = -grid
		snake.dX = 0
	}
	else if (e.which === 39 && snake.dX === 0) {
		snake.dX = grid
		snake.dY = 0
	}
	else if (e.which === 40 && snake.dY === 0) {
		snake.dY = grid
		snake.dX = 0
	}

	//Points
	if ((snake.dX == meat.x) && (snake.dY == meat.y))
		getPoints()

	function getPoints() {
		console.log('Get')
	}
})



requestAnimationFrame(loop);



// function palindrome(word) {
// 	//if (typeof (word) == "string") return word.split("").reverse()
// 	let letter = word.split("")
// 	let count = letter.length - 1
// 	for (let i = 0; i < letter.length; i++) {
// 		let time = letter[i]
// 		letter[i] = letter[count]
// 		letter[count] = time
// 		if (count > i) count--
// 		else return letter
// 	}
// 	return letter
// }
// console.log(palindrome("Pozitronium"))