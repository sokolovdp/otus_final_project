
function randomInt(range) {
    return Math.floor((Math.random() * range));
}

// function getJsonData(idName) {
//     let jsonData = document.getElementById(idName).innerHTML;
//
//     return JSON.parse(jsonData)
// }

function replacePhrase(text) {
    let header = document.querySelector(".phrase");

    header.textContent = text;
}

function UpdateNavBar() {
    // let contentArray = getJsonData("contentJson");
    let textIndex = randomInt(contentArray.length);
    let phraseOfDay = contentArray[textIndex];

    replacePhrase(phraseOfDay);
}

UpdateNavBar();
