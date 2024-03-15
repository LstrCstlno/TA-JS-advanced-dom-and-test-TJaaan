let btn = document.querySelector(".add");

function dragStart(e){
    e.target.style.opacity = "0.4";
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData('text/html', e.target.innerHTML);
}

function dragEnter(e) {
    e.target.classList.add("over")
    console.log(e.target.classList)
}

function dragLeave(e){ 
    e.target.classList.remove("over")
}

function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dragEffect = "move";
    return false;
}


function dragDrop(e) {
    let gotData = e.dataTransfer.getData('text/html');
    if(gotData != e.target.innerHTML){
        dragSrcEl.innerHTML = e.target.innerHTML;
        e.target.innerHTML = gotData
    }
    return false;
}

function dragEnd(e){
    allDrag.forEach(element => {
        element.classList.remove("over")
    });
    this.style.opacity = 1;
    }

function addEventsDragandDrop(e){
    e.addEventListener("dragstart", dragStart)
    e.addEventListener("dragend", dragEnd)
    e.addEventListener("dragover", dragOver)
    e.addEventListener("drop", dragDrop)
    e.addEventListener("dragenter", dragEnter)
    e.addEventListener("dragleave", dragLeave)
}

let allDrag = document.querySelectorAll(".draggable")
    allDrag.forEach(ele => {
        addEventsDragandDrop(ele)
    })

    function addNewItem() {
        var newItem = document.querySelector('.input').value;
        if (newItem != '') {
          document.querySelector('.input').value = '';
          var li = document.createElement('li');
          var attr = document.createAttribute('draggable');
          var ul = document.querySelector('ul');
          li.className = 'draggable';
          attr.value = 'true';
          li.setAttributeNode(attr);
          li.appendChild(document.createTextNode(newItem));
          ul.appendChild(li);
          addEventsDragandDrop(li);
        }
      }
      
      btn.addEventListener('click', addNewItem);
      