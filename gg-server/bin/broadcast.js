

const EventEmitter = require('events').EventEmitter

let broadcast = Object.assign({},EventEmitter.prototype)

module.exports = broadcast


