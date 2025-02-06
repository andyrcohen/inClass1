var jwt = require('jsonwebtoken');

var myStructure = { name: 'andy', role: 'PI', id: 0}
var mySecret = 'practice'

function signToken(myStructure, mySecret) {
    var token = jwt.sign(myStructure,mySecret)
    return token
}

module.exports = {signToken}
