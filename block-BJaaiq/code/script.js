let root = document.querySelector("ul");

let max = 3;
let index = 0;

function getQuote(){
    for (let i = 0; i < max; i++) {
        let li = document.createElement("li");
        let blockquote = document.createElement("blockquote");
        let cite = document.createElement("cite");
        blockquote.innerText = quotes[index].quoteText;
        cite.innerText = quotes[index].quoteAuthor;
        li.append(blockquote, cite);
        root.append(li);
        index++;
    }
}


document.addEventListener("scroll" , () => {
    let scrolltop = document.documentElement.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight;
    let clientHeight = document.documentElement.clientHeight;
    if(clientHeight + scrolltop >= scrollHeight && index < quotes.length){
        getQuote();
    }
})

window.addEventListener("DOMContentLoaded", () => {
    alert ("The content of the DOM is loaded");
    getQuote();
})


