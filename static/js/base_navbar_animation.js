
function randomInt(range) {
    return Math.floor((Math.random() * range));
}

function replacePhrase(text) {
    let header = document.querySelector(".phrase");

    header.textContent = text;
}

function UpdateNavBar() {
    let textIndex = randomInt(contentArray.length);
    let phraseOfDay = contentArray[textIndex];

    replacePhrase(phraseOfDay);
}

UpdateNavBar();
