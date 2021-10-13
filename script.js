const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

ctx.fillStyle = 'white'
ctx.strokeStyle = 'gray'

const gridSize = 35
const cellWidth = 20

let grid = []

const creatures = [
  {i: 1, j: 1},

  {i: 9, j: 0},
  {i: 9, j: 1},
  {i: 9, j: 2},

  {i: 5, j: 1},
  {i: 5, j: 2},
  {i: 4, j: 2},

  {i: 1, j: 5},
  {i: 2, j: 6},
  {i: 2, j: 7},
  {i: 1, j: 7},
  {i: 0, j: 7},

  {i: 13, j: 0},
  {i: 14, j: 0},
  {i: 13, j: 1},
  {i: 15, j: 3},
  {i: 16, j: 2},
  {i: 16, j: 3},

  {i: 8, j: 6},
  {i: 8, j: 5},
  {i: 7, j: 6},
  {i: 9, j: 8},
  {i: 10, j: 7},
  {i: 10, j: 8},

  {i: 21, j: 10},
  {i: 20, j: 11},
  {i: 21, j: 11},
  {i: 22, j: 11},

  {i: 27, j: 10},
  {i: 26, j: 11},
  {i: 27, j: 11},
  {i: 28, j: 11},
]

for (let i = 0; i < gridSize; i++) {
  
  grid.push([])
  
  for (let j = 0; j < gridSize; j++) {
    
    grid[i][j] = {}
    
    grid[i][j].x = cellWidth + cellWidth * i
    grid[i][j].y = cellWidth + cellWidth * j
    grid[i][j].isAlive = false
  }
}

for (creature of creatures) {
  
  grid[creature.i][creature.j].isAlive = true
}


const loop = () => {
  
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  let deathQueue = []
  let borthQueue = []
  
  for (let i = 0; i < gridSize; i++) {
    
    for (let j = 0; j < gridSize; j++) {
      
      ctx.beginPath()
      ctx.rect(grid[i][j].x, grid[i][j].y, cellWidth, cellWidth)
      
      if (grid[i][j].isAlive) {
        ctx.fill()
      }
      
      const beginI = (i - 1) < 0 ? 0 : (i - 1)
      const endI = (i + 1) >= gridSize ? gridSize - 1 : (i + 1)
      const beginJ = (j - 1) < 0 ? 0 : (j - 1)
      const endJ = (j + 1) >= gridSize ? gridSize - 1 : (j + 1)
      
      count = grid[i][j].isAlive ? -1 : 0
      
      for (let k = beginI; k <= endI; k++) {
        
        for (let l = beginJ; l <= endJ; l++) {
          
          if (grid[k][l].isAlive) {
            count++
          }
        }
      }
      
      if (count === 3) {
        borthQueue.push({
          i: i,
          j: j,
        })
      }
      
      if (count < 2 || count > 3) {
        deathQueue.push({
          i: i,
          j: j,
        })
      }
      
      ctx.stroke()
    }
  }
  
  
  for (const born of borthQueue) {
    grid[born.i][born.j].isAlive = true
  }
  
  for (const dead of deathQueue) {
    grid[dead.i][dead.j].isAlive = false
  }
  
  setTimeout(() => {
    requestAnimationFrame(loop)
  }, 400)
}

loop()