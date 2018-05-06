var fetch = require("node-fetch");

let geg = fetch('http://users.ugent.be/~alwillek/cgi-bin/gekleurde_druppels.cgi?met=g')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        return myJson;
    });




