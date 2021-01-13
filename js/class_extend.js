class Animal{
    constructor(leg){ //python def __init__이랑 똑같당
        this.leg = leg
    }
    printAnimal(){
        console.log(this.name+"은"+String(this.leg)+"개의 다리를 가진다.")
    }
}

class Lion extends Animal{
    constructor(name,leg){ //must hava super constructor
        super(leg) //부모 constructor의 인풋이다
        this.name = name
    }
    getName(){
        console.log("내이름은"+this.name)
    }
}
myLion = new Lion("King",4)
myLion.getName()
myLion.printAnimal()

// output
// 내이름은King
// King은4개의 다리를 가진다.