'use strict';

function setCanvasSize(meme, canvas, elMemeImage) {
    elMemeImage.src = meme.imgSrc;

    let originalWidth = canvas.width;
    let biggestSize = (elMemeImage.width > elMemeImage.height)? 'width' : 'height';
    let smallestSize = (elMemeImage.width < elMemeImage.height)? 'width' : 'height';
    let imageRetio = elMemeImage[smallestSize] / elMemeImage[biggestSize];

    canvas[biggestSize] = originalWidth;
    canvas[smallestSize] = originalWidth*imageRetio;
}

function renderMeme(meme, canvas, elMemeImage) {
    elMemeImage.src = meme.imgSrc;

    let ctx = canvas.getContext('2d')

    elMemeImage.onload = function() {
        ctx.closePath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(elMemeImage, 0, 0, elMemeImage.width, elMemeImage.height, 
                                   0, 0, canvas.width, canvas.height);
        ctx.stroke();
        ctx.beginPath();

        var txts = meme.texts;
        for (let i = 0; i < txts.length; i++) {
            ctx.fillStyle = txts[i].fontColor;
            ctx.strokeStyle = txts[i].fontOutlineColor;
            ctx.strokeWidth = '100px';
            ctx.lineWidth = txts[i].outlineWidth;
            ctx.font = `${txts[i].fontSize}px ${txts[i].fontFamily}`;
            ctx.textAlign = 'center';
            ctx.fillText(txts[i].txt, txts[i].pos.x, txts[i].pos.y);
            ctx.strokeText(txts[i].txt, txts[i].pos.x, txts[i].pos.y);
        }
    };
}


function renderImagesToModal(imagesSrcsToShow) {
    var htmlStr = imagesSrcsToShow.map(imgSrc => {
        return `<img onclick="onChangeCurrImg(this)" src="${imgSrc}" alt="">`
    }).join('');
    document.querySelector('.modal-items-container').innerHTML = htmlStr;
}


function renderMemesGallery() {
    let elItemsContainer = document.querySelector('.modal-items-container')
    let elCanvasesContainer = document.querySelector('.gallery-memes-canvas-container');
    elCanvasesContainer.innerHTML = null;
    getAllMemes().forEach((meme, idx) => {
        elCanvasesContainer.innerHTML += `<canvas width="${gElCanvas.width}" height="${gElCanvas.height}"></canvas>`;
        let elCanvas = elCanvasesContainer.children[elCanvasesContainer.children.length-1];
        let elImg = new Image();
        setCanvasSize(meme, elCanvas, elImg);
        renderMeme(meme, elCanvas, elImg);
        setTimeout(() => {
            let canvasImgsURL = elCanvas.toDataURL();
            elItemsContainer.innerHTML += `<img src="${canvasImgsURL}" onclick="onChangeMeme(${idx})"/>`;
        }, 300);
    });
}


function renderEmogies() {
    let emogiesToShow = getEmogiesToShow();
    let htmlStr = emogiesToShow.map((emogie, idx) => {
        return `<div onClick="onAddEmogie(${idx+getPrevEmogiesCount()})">${emogie}</div>`
    }).join('');
    document.querySelector('.emogies-container').innerHTML = htmlStr;
}


function selectTxt(idx) {
    var txt = getMeme().texts[idx];
    
    changeCurrTxtIdx(idx);
    
    renderMeme(getMeme(), gElCanvas, gElMemeImage);
    
    gCtx.strokeStyle = 'black';
    let txtBorderWidth =  (txt.fontSize*txt.txt.length)/2;
    let txtxBorderHeight = (txt.fontSize);
    gCtx.rect(txt.pos.x-(txtBorderWidth/2), txt.pos.y+(txtxBorderHeight/8), txtBorderWidth, -txtxBorderHeight);
    gCtx.fillStyle = '#fffac480';
    gCtx.fillRect(txt.pos.x-(txtBorderWidth/2), txt.pos.y+(txtxBorderHeight/8), txtBorderWidth, -txtxBorderHeight);
    gCtx.stroke();
    
    document.querySelector('.change-txt').value = txt.txt;
    document.querySelector('.change-txt-color').value = txt.fontColor;
    document.querySelector('.change-txt-outline-color').value = txt.fontOutlineColor;
    document.querySelector('.change-txt-size').value = txt.fontSize;
    document.querySelector('.change-font').value = txt.fontFamily;
}

function resetInputs() {
    document.querySelector('.change-txt').value = null;
    document.querySelector('.change-txt-color').value = '#000000';
    document.querySelector('.change-txt-outline-color').value = '#000000';
    document.querySelector('.change-txt-size').value = null;
    document.querySelector('.change-font').value = null;
}

function doMoveTxt(event) {
    event.preventDefault();
    if (!getIsCanvasClick()) return;
    if (getCurrTxtIdx() === undefined) return
    let pos = (event.offsetX)? {x: event.offsetX, y: event.offsetY} : {x: event.touches[0].clientX-event.touches[0].target.offsetLeft, 
                                                                       y: event.touches[0].clientY-event.touches[0].target.offsetTop};
    getMeme().texts[getCurrTxtIdx()].pos = pos;
    renderMeme(getMeme(), gElCanvas, gElMemeImage);
}

function doChangeTxtObjAtrr(atrr, selector) {
    if (getCurrTxtIdx() === undefined) return;
    let elTxt = document.querySelector(selector);
    getMeme().texts[getCurrTxtIdx()][atrr] = elTxt.value;
    renderMeme(getMeme(), gElCanvas, gElMemeImage);
    selectTxt(getCurrTxtIdx());
}

