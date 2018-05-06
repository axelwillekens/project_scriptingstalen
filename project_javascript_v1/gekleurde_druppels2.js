var fetch = require("node-fetch");

function startNewGame() {
    fetch('http://users.ugent.be/~alwillek/cgi-bin/gekleurde_druppels.cgi?met=g')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            createCanvas(myJson.board);
            alert("ojamannek");
        });
}

//voor Toggle Button
function toggleDropDown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function changeDropDownColor(color) {
    document.getElementById("dropdownbutton").style.backgroundColor = color;
    document.getElementById("dropdownbutton").innerHTML = String(color);
}

//voor canvas
function createCanvas(rooster) {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");

    let n = 7;
    let d = canvas.offsetWidth/n;
    for (let i = 0; i < n; i++){
        for (let j = 0; j < n; j++){
            ctx.beginPath();
            let x = d/2 + i*d;
            let y = d/2 + j*d;
            ctx.arc(x,y,d/2,0,2*Math.PI);
            ctx.fill();
            // ctx.fillStyle = rooster[i][j];
        }
    }
}





