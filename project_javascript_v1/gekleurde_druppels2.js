//listeners moeten als eerste in de file
document.addEventListener('DOMContentLoaded',createCanvas,false);
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};

var fetch = require("node-fetch");

function startNewGame() {
    let url = 'http://users.ugent.be/~alwillek/cgi-bin/gekleurde_druppels.cgi?met=g';
    changecanvas(null);
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            changescore(myJson.score);
            changecanvas(myJson.board);
        }).catch(function (error) {
            alert(error);
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

//scorelabel
function changescore(score) {
    document.getElementById("scorelabel").innerText = "Score: " + String(score);
}



//voor canvas
function createCanvas() {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    let n = 5;
    let d = canvas.offsetWidth/n;
    for (let i = 0; i < n; i++){
        for (let j = 0; j < n; j++){
            ctx.beginPath();
            let x = d/2 + i*d;
            let y = d/2 + j*d;
            ctx.arc(x,y,d/2,0,2*Math.PI);
            ctx.fill();
            //ctx.fillStyle = rooster[i][j];
        }
    }
}

function changecanvas(rooster) {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    let n = 5;
    let d = canvas.offsetWidth/n;
    for (let i = 0; i < n; i++){
        for (let j = 0; j < n; j++){
            ctx.beginPath();
            let x = d/2 + i*d;
            let y = d/2 + j*d;
            ctx.arc(x,y,d/2,0,2*Math.PI);
            ctx.fill();
            ctx.fillStyle = "red";
        }
    }
}





