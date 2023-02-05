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

const deal = (deck) => {
    let card = deck[0]
    deck.splice(0,1)
    return card
    
}

const total = (hand) => {
    var sum = 0
    hand.forEach(element => sum += value(element))
    return sum
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

// console.log(cards())
// console.log(shuffle(cards()))
// console.log(cards()[randInt(0,52)])

// console.log(cards().pop(randInt(0,52)))

// cards().forEach(element => console.log(element,value(element)))

var deck = shuffle(cards())
// console.log(deck) 
var hand = []
var dealer = []

for (var i = 0; i < 2; i++){
    hand.push(deal(deck))
    dealer.push(deal(deck))
}

let gameover = false;
let turn = 0
var delt;
while (!gameover){
    delt = deal(deck)
    if (turn%2){
        hand.push(delt)
    }

    console.log(hand, total(hand))
    console.log(dealer, total(dealer))

    if (total(hand) > 21 || total(dealer) > 21){
        gameover = true;
        console.log("gameover")
    }

    turn +=1
}
