class User {
    constructor(firstName, lastName, age){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age= age;
    }
    login(){
        return `${this.firstName} has just logged in.`
    }
    logout(){
        return `${this.firstName} has just logged out.`
    }

}

class Admin extends User {
    constructor(firstName, lastName, age, title){
        super(firstName, lastName, age);
        this.title = title;
    }

    dateOfBirth(){
      
        return 2020 - this.age;
    }
}
const Keli = new Admin("Keli", "Booster", 29);
const Dela = new User("Dela", "Dogbevi", 20);

console.log(Dela.logout());
console.log(`${Keli.firstName} is born in ${Keli.dateOfBirth()} . `);