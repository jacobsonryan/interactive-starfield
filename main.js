const $ = document.querySelector.bind(document)
const canvas = $('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const mouse = { 
    x: 0,
    y: 0 
}

window.addEventListener('mousemove', function(e) {
    mouse.x = e.screenX
    mouse.y = e.screenY

})

function clearScreen() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}


const stars = []
const numStars = 200
const maxSpeed = 30.0
let randomColor = ['#ffffff', '#c5eff7', '#19b5fe']

for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        dist: Math.random(),
        color: randomColor[Math.floor(Math.random() * randomColor.length)]
    })
}

function drawStars() {
    stars.forEach(function (star) {
        ctx.beginPath()
        ctx.arc(star.x, star.y, 3 * star.dist, 0, Math.PI * 2, false)
        ctx.fillStyle = star.color
        ctx.fill()
    })
}

function getXFactor() {
    return (mouse.x - innerWidth / 2) / innerWidth / 2
}

function getYFactor() {
    return (mouse.y - innerHeight / 2) / innerHeight / 2
}


function updateStars() {
    stars.forEach(function (star) {
        star.x += maxSpeed * star.dist * getXFactor()
        star.y += maxSpeed * star.dist * getYFactor()

        if (star.x > innerWidth) {
            star.x = -3
        } else if (star.x < -3) {
            star.x = innerWidth - 3
        }

        if (star.y > innerHeight) {
            star.y = -3
        } else if (star.y < -3) {
            star.y = innerHeight -3
        }
    })

}

function loop() {
    clearScreen()
    drawStars()
    updateStars()
    window.requestAnimationFrame(loop)
}

loop()