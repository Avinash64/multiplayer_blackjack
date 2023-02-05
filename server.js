const express = require('express')
const app = express()
const port = 3000

let games = {}

const randInt = (start, end) => {
    return Math.floor((Math.random() * (end - start)) + start)
}

const cards = () => {
    var deck = [] 
    var suits = ['H','S','C','D']
    faces = ["A","2","3","4","5","6","7","8","9","J","Q","K", "10"]
    for(let i = 0; i < suits.length; i++)
	{
		for(let x = 0; x < faces.length; x++)
		{
			let card = faces[x]+suits[i];
			deck.push(card);
		}
	}
    console.log("deck = ",deck)
    return deck

}

const shuffle = (deck) => {
    const newDeck = [] 
    const size = deck.length
    for (let index = 0; index < size; index++) {
        var rnum = randInt(0,deck.length)
        var card = deck[rnum]
        deck.splice(rnum, 1)
        newDeck.push(card)
    }
    return newDeck
}

const pick = (deck) => {
    let card = deck[0]
    deck.splice(0,1)
    return card
}


const deal = (games,name,table) => {
    const player = games[table]["players"][name]
    console.log(player)
    card = pick(games[table].deck)
    player.hand.push(card)
}

const reset = (game) => {

    game.inProgress = false
    game.deck = shuffle(cards())
    game.turn = 0
    game.order.forEach((player) => {
        game.players[player].hand = []
        game.players[player].stand = false
        game.players[player].bust= false
})

}

const setup = (games, table) => {
    const game = games[table]
    if (!game) {return}
    game.order.forEach((player) => {
        deal(games,player,table)
        deal(games,player,table)
    }
    )
}

const total = (hand) => {
    var sum = 0
    hand.forEach(element => sum += value(element))
    return sum
}

const update_turn = (game) => {
    const player = game.players[game.order[game.turn]]
    // if (game.inProgress) {
        
    // }
    console.log(game.turn, game.order[game.turn])

    if (player.stand || player.bust){
    game.turn += 1;
    }
    
    if (game.turn == game.order.length){
        game.turn = 0
    }


}

const value = (card)=>{
    var face = card.substring(0,card.length-1)
    if (! "AJQK".includes(face)){
        return(parseInt(face))
    }
    if (face == "A"){
        return 11
    }
    if (face){
        return 10
    }
}

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/setup', (req, res) => {
    var { table } = req.body
    setup(games, table)

    res.json(games[table])
})

app.post('/sit', (req, res) => {
    // console.log(req.body)
    var { name, table } = req.body
    console.log(name, table)
    if (games[table]) {

    }
    else {
        games[table] = {
            inProgress: false,
            deck: shuffle(cards()),
            players: {},
            turn : 0,
            order: [],
            
        }
    }
    if (! games[table].order.includes(name)){
        games[table].players[name] = {
            balence : 0,
            hand : [],
            seat : 0,
            stand : false,
            bust: false
    }
    games[table].order.push(name)
    games[table].players[name].seat = games[table].order.indexOf(name)
    }
    res.json(games)
})

app.post('/pick',(req, res) => {
    var { name, table } = req.body

    deal(games, name, table)

    res.json({card:card, deck: games})

})

app.post('/stand',(req, res) => {
    var { name, table } = req.body
    games[table].players[name].stand = true;

    res.json({player : games[table].players[name]})

})

app.get("/:table/standing",(req, res) => {
    const table = req.params.table
    const game = games[table]
    res.json(game)
})

app.get("/:table/reset",(req, res) => {
    const table = req.params.table
    const game = games[table]
    reset(game)
    res.json(game)
})

app.get("/:table/update",(req, res) => {
    const table = req.params.table
    const game = games[table]
    update_turn(game)
    res.json(game)
})

app.post('/:table/play',(req, res) => {
    var { name , action} = req.body
    const table = req.params.table
    const game = games[table]
    const player = game["players"][name]

    if (name == game.order[game.turn]){
        if (action == "stand"){
        game.players[name].stand = true;
        }
        else {
            deal(games, name, table)
        }

        if (total(player.hand) > 21){
            player.bust = true
        }

        update_turn(game)

    }

    res.json({player : games[table].players[name]})

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})