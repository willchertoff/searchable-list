var Faker = require('faker');
var _ = require('lodash');

function generateListings() {
  var listings = [];

  _.times(50, function() {
    let listing = {
      first_name: Faker.name.firstName(),
      last_name: Faker.name.lastName(),
      email: Faker.internet.email(),
    }
    listings.push(listing);
  })

  return { "listings": listings };
}

module.exports = generateListings;
