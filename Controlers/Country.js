const Country = require('../models/Country')


async function getCountries() {
    const countries = await Country.find()
    return countries
}
async function addCountry(data) {
    const newCountry = await Country.create(data)
    return newCountry
}
module.exports = { getCountries, addCountry }