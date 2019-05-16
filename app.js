const Dragon = require('./models/Dragon')
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var express = require('express')

server.listen(80);


io.on('connection', socket => {
    // console.log(socket)
    socket.on('dragons.index', respond => {
        Dragon.findAll()
            .then( dragons => {
                respond(dragons)
            })
    })

    socket.on('dragons.update', async params => {
        let dragon = await Dragon.findByPk(params.id)
        await dragon.update(params)
        let dragons = await Dragon.findAll()
        io.emit('dragons.update', dragons)
    })


   
})



const cors = require('cors')
const bodyParser = require('body-parser')


app.use(cors())
app.use(bodyParser.json())

app.get('/dragons', (req, res) => {
    Dragon.findAll()
        .then( dragons => {
            res.json(dragons)
        })
})

app.get('/dragons/:id', (req, res) => {
    Dragon.findByPk(req.params.id)
        .then( dragon => {
            res.json(dragon)
        })
})

app.patch('/dragons/:id', async (req, res) => {
    let dragon = await Dragon.findByPk(req.params.id)
    console.log(req.body)
    dragon.update(req.body)
})

app.use('/', express.static('public'))
// eval(pry.it)