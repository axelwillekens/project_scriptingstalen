var fetch = require("node-fetch");

function test(){
    let url = 'http://users.ugent.be/~alwillek/cgi-bin/gekleurde_druppels.cgi?met=g';
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log(myJson.board);
        });
}

test();






