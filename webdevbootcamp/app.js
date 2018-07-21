var faker = require('Faker');
/*var name = faker.name.findName();
var email = faker.internet.email();
var card = faker.commerce.productName();*/
console.log(faker.name.findName());
var randomName = Faker.name.findName(); // Rowan Nikolaus
var randomEmail = Faker.internet.email(); // Kassandra.Haley@erich.biz
var randomCard = Faker.helpers.createCard(); // random contact car

