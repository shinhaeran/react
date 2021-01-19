class A{
    
    b(){
        console.log("bb")
    }
    c(){
        this.b()
        console.log('cc')
    }
    
}


temp = new A()
temp.c()