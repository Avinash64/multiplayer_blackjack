import random

def shuffle(deck):
    new_deck = []
    for i in range(len(deck)):
        new_deck.append(deck.pop(deck.index(random.choice(deck)))) 
    # print(new_deck)
    return new_deck


def value(card):
    face = card[:-1]
    if face not in "AJQK":
        return(int(face))
    if face == "A":
        return 11
    if face:
        return 10

def total(hand):
    sum = 0
    for i in hand:
        sum += value(i)
    return sum

def deal(deck):
    delt = ''
    if len(deck):
        delt = deck.pop(0)
    return delt, deck
def cards():
    suits = [i for i in 'HSCD']
    faces = [i for i in "A23456789JQK"] + ["10"]
    cards2 = [face+suit for suit in suits for face in faces]
    return cards2
# print(shuffle(cards))
deck = shuffle(cards())
delt = ""
# while deck != []:
#     delt, deck = deal(cards)

#     print(delt, value(delt), total(deck))

# print(cards)
deck = shuffle(cards())
# print(deck)
hand = []
dealer = []

for i in range(4):
    delt, deck = deal(deck)
    if i%2:
        hand.append(delt)
    else:
        dealer.append(delt)


gameover = False
turn = 0
while not gameover:
    delt, deck = deal(deck)
    if turn%2:
        hand.append(delt)
    else:
        dealer.append(delt)

    print(hand, total(hand))
    print(dealer, total(dealer))

    if total(hand) > 21 or total(dealer) > 21:
        gameover = True
        print("gameover")

    turn += 1