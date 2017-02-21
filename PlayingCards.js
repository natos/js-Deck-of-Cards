const Suits = [{
        C: 'Clubs'
    },
    {
        D: 'Diamonds'
    },
    {
        H: 'Hearts'
    },
    {
        S: 'Spades'
    }
]
const Ranks = [{
        num: '2',
        long: 'Two'
    },
    {
        num: '3',
        long: 'Three'
    },
    {
        num: '4',
        long: 'Four'
    },
    {
        num: '5',
        long: 'Five'
    },
    {
        num: '6',
        long: 'Six'
    },
    {
        num: '7',
        long: 'Seven'
    },
    {
        num: '8',
        long: 'Eight'
    },
    {
        num: '9',
        long: 'Nine'
    },
    {
        num: '10',
        long: 'Ten'
    },
    {
        num: 'J',
        long: 'Jack'
    },
    {
        num: 'Q',
        long: 'Queen'
    },
    {
        num: 'K',
        long: 'King'
    },
    {
        num: 'A',
        long: 'Ace'
    }
];

const SuitsArray = ["Clubs","Diamonds","Hearts","Spades"];
const RankArray = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];

const Joker = {
    num: 'JK',
    long: 'Joker'
};

//The following two functions are from: http://stackoverflow.com/a/1527820

/** 
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Card {
    constructor(Suit, Rank) {
        this.Suit = Suit;
        this.Rank = Rank;
    }
    Compare(a,b){
        if(RankArray.indexOf(a.Rank)>RankArray.indexOf(b.Rank)){
            return a;
        } else if (RankArray.indexOf(a.Rank)<RankArray.indexOf(b.Rank)){
            return b;
        } else if (RankArray.indexOf(a.Rank)===RankArray.indexOf(b.Rank)){
            if(SuitsArray.indexOf(a.Suit)>SuitsArray.indexOf(b.Suit)){
                return a;
            } else {
                return b;
            }
        }
    }
    CompareWithTrumpNoBowers(a,b,trump){
        if(a.Suit === trump && b.Suit === trump){
            Compare(a,b);
        } else if (a.Suit === trump && b.Suit !== trump){
            return a;
        } else {
            return b;
        }
    }
}

class Deck {
    constructor(hasJokers) {
        this.Stack = [];
        if (hasJokers) {
            this.Stack.push(Joker);
            this.Stack.push(Joker);
        }
        Suits.forEach((suit) => {
            Ranks.forEach((rank) => {
                this.Stack.push(new Card(suit, rank));
            })
        })
        function finishShuffle(newStack){
            this.Stack = newStack;
        }
    }
    GetLength() {
        return this.Stack.length;
    }
    Draw() {
        return this.Stack.pop();
    }
    Shuffle(){
        var stack = this.Stack;
        var that = this;
        return new Promise(function (resolve, reject) {
            for (var i = 0; i < 7; i++) {
                var temp = [];
                for (var j = stack.length; j > 0; j--) {
                    var objInArray = stack.splice(getRandomInt(0, stack.length - 1), 1);
                    temp.push(objInArray[0]);
                }
                stack = temp;
            }
            that.Stack = stack;            
            resolve();
        });
    }
    PickRandom() {
        return this.Stack[getRandomInt(0, this.Stack.length - 1)];
    }
}
