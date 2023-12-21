const Country = require('../models/Country')


async function getCountries() {
    const countries = await Country.find()
    return countries
}
module.exports = { getCountries }