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

var vorigezet = undefined;
// var url = 'http://localhost:8000/cgi-bin/script.py';
var url = 'http://users.ugent.be/~alwillek/cgi-bin/script.cgi';
var fetch = require("node-fetch");
function startNewGame() {
    fetch(url + '?met=g&size=' + document.getElementById("sizelabel").innerHTML)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            changescore(myJson.score);
            changecanvas(myJson.board, "black");
            vorigezet = myJson;
        }).catch(function (error) {
            alert(error);
        });
}

//voor sizelabel
function increasesizelabel() {
    let size = Number(document.getElementById("sizelabel").innerHTML);
    if (size < 10){
        document.getElementById("sizelabel").innerHTML = String(size+1);
    }
}

function decreasesizelabel() {
    let size = Number(document.getElementById("sizelabel").innerHTML);
    if (size > 5){
        document.getElementById("sizelabel").innerHTML = String(size-1);
    }
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
function changecanvas(rooster, firstcolor) {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let n = rooster[0].length;
    let d = canvas.width/n;
    for (let i = 0; i < n; i++){
        for (let j = 0; j < n; j++){
            ctx.beginPath();
            let x = d/2 + i*d;
            let y = d/2 + j*d;
            ctx.arc(x,y,d/2,0,2*Math.PI);
            ctx.fill();
            if (i === 0 && j === 0){
                ctx.fillStyle = firstcolor;
                ctx.fill();
            } else {
                ctx.fillStyle = rooster[j][i];
                ctx.fill();
            }
        }
    }
}

function mouseClicked(event) {
    if (event !== undefined){
        let canvas = document.getElementById("myCanvas");
        let b = canvas.width;
        let h = canvas.height;
        let clickx = event.x - canvas.offsetLeft;
        let clicky = event.y - canvas.offsetTop;
        let color = String(document.getElementById("dropdownbutton").style.backgroundColor);
        if (clickx < b/5 && clicky < h/5) {
            fetch(url + '?met=m&zet=' + color.charAt(0) + "&data=" + JSON.stringify(vorigezet))
                .then(function(response) {
                    return response.json();
                })
                .then(function(myJson) {
                    changescore(myJson.score);
                    changecanvas(myJson.board, color);
                    if(myJson.message !== ""){
                        alert(myJson.message);
                    }
		    vorigezet = myJson;
                }).catch(function (error) {
                    alert(error);
                });
        }
    }
}





