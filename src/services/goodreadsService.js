const { resolve } = require("url");
const { rejects } = require("assert");
const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadService');

const parser = xml2js.Parser({ explicitArray: false });
function goodreadsService () {
    function getBookById (id) {
        return new Promise ((resolve, reject) => {
            axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=kR4PTCaT3Y8ww3BGU6AwsQ`)
                .then((response) => {
                    parser.parseString(response.data, (err, result) => {
                        if (err) {
                            console.debug(err);
                        } else {
                            console.debug(result);
                            resolve(result.GoodreadsResponse.book);
                        }
                    })
                })
                .catch((error) => {
                    reject(error);
                    console.debug(error);
                })

        });
    }
    return { getBookById };
}

module.exports = goodreadsService;