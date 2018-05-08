//listeners moeten als eerste in de file
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
    fetch('http://users.ugent.be/~alwillek/cgi-bin/gekleurde_druppels.cgi?met=g')
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
function changecanvas(rooster) {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    let n = rooster[0].length;
    let d = canvas.offsetWidth/n;
    for (let i = 0; i < n; i++){
        for (let j = 0; j < n; j++){
            ctx.beginPath();
            let x = d/2 + i*d;
            let y = d/2 + j*d;
            ctx.arc(x,y,d/2,0,2*Math.PI);
            ctx.fill();
            //volgorde van de kleuren klopt langs geen kanten!!
            if (i === 0 && j === 0){
                ctx.fillStyle = String(document.getElementById("dropdownbutton").style.color);
            } else {
                ctx.fillStyle = rooster[j][i];
            }
        }
    }
}





