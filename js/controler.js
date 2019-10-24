'use strict';

let gElCanvas;
let gCtx;
let elMemeImage = new Image();

function init() {
    setCanvas();
    renderImagesToModal();
    renderMeme();
    document.querySelector('.meme-canvas').addEventListener('touchmove', function(event) {
        event.preventDefault();
        brushMove();
    },false);
}

function setCanvas() {
    let elContainer = document.querySelector('.canvas-container');
    gElCanvas = document.querySelector('.meme-canvas');

    gCtx = gElCanvas.getContext('2d');

    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetWidth;
    // gElCanvas.height = elContainer.offsetHeight;

    gCtx.fillStyle = '#fff';
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);

    document.querySelector('.download-link').href = gElCanvas.toDataURL();
}

function renderMeme() {
    let meme = getMeme();
    elMemeImage.src = meme.imgSrc;
    // elMemeImage.style.objectFit = 'cover';

    elMemeImage.onload = function() {
        gCtx.closePath();
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
        gCtx.drawImage(elMemeImage, 0, 0, elMemeImage.width, elMemeImage.height, 
                                    0, 0, gElCanvas.width, gElCanvas.height);
        gCtx.stroke();
        gCtx.beginPath();
        // gCtx.drawImage(elMemeImage, 0, 0, elMemeImage.width, elMemeImage.height);
    
        var txts = meme.texts;
        for (let i = 0; i < txts.length; i++) {
            gCtx.fillStyle = txts[i].fontColor;
            gCtx.strokeStyle = txts[i].fontOutlineColor;
            gCtx.strokeWidth = '100px';
            gCtx.lineWidth = txts[i].outlineWidth;
            gCtx.font = `${txts[i].fontSize}px ${txts[i].fontFamily}`;
            gCtx.textAlign = 'center';
            gCtx.fillText(txts[i].txt, txts[i].pos.x, txts[i].pos.y);
            gCtx.strokeText(txts[i].txt, txts[i].pos.x, txts[i].pos.y);
        }
    };
}

function renderImagesToModal() {
    var htmlStr = getImagesSrcs().map(imgSrc => {
        return `<img onclick="onChangeCurrImg(this)" src="${imgSrc}" alt="">`
    }).join('');

    document.querySelector('.images-container').innerHTML = htmlStr;
}

function canvasClicked(event) {
    // if (getIsAddTxt()) {
    //     doAddTextLine(event);
    //     updateCurrTxtIdx(1);
    //     selectTxt(getCurrTxtIdx());
    //     return;
    // }
    // if (getIsMoveTxt()) {
    //     doMoveTxtLine(event);
    //     selectTxt(getCurrTxtIdx());
    //     return;
    // }
    event.preventDefault();
    if (!onChangeCurrTxtIdx(event)) {
        console.log('wowowow');
        resetCurrTxtIdx();
        resetInputs();
        renderMeme();
    }
}

function onSwitchLines() {
    var txts = getMeme().texts;

    if (txts.length > 1) {
        switchLines(txts[0], txts[1]);
        // [txts[0], txts[1]] = [txts[1], txts[0]];
        // let temp = txts[0];
        // txts[0] = txts[1];
        // txts[1] = temp;
        console.log('wowow')
        renderMeme();
    }
}

function onToggleIsCanvasClick() {
    toggleIsCanvasClick();
}

function onCancasClick() {
    canvasClick()
    document.querySelector('.meme-canvas').classList.add('clicked')
}

function onCanvasUnClick() {
    canvasUnClick();
    document.querySelector('.meme-canvas').classList.remove('clicked')
}

function onAddTxt() {
    let txts = getMeme().texts;
    let pos;
    let splitedCanvasHeight = gElCanvas.height/7;
    if (txts.length === 0) pos = {x: gElCanvas.width/2, y: splitedCanvasHeight*2}
    if (txts.length === 1) pos = {x: gElCanvas.width/2, y: splitedCanvasHeight*6}
    if (txts.length >= 2) pos = {x: gElCanvas.width/2, y: splitedCanvasHeight*4}
    
    txts.push(createTxtLine(pos));

    console.log(txts);

    renderMeme();
    selectTxt(txts.length-1);
}

function onUploadImage() {
    var elImgSrc = document.querySelector('.image-upload');
    console.log(elImgSrc.value)
    getImagesSrcs().unshift(elImgSrc.value);
    saveImagesToStorage();
    renderImagesToModal();

    elImgSrc.value = null;
}

function onChangeCurrTxtIdx(event) {
    var txts = getMeme().texts;

    for (let i = 0; i < txts.length; i++) {
        if (event.offsetX < txts[i].pos.x+150 && event.offsetX > txts[i].pos.x-150 &&
            event.offsetY < txts[i].pos.y+5 && event.offsetY > txts[i].pos.y-50) {

            selectTxt(i);
            return txts[i];
        }
    }
    return false;
}


function selectTxt(idx) {
    var txt = getMeme().texts[idx];
    
    doChangeCurrTxtIdx(idx);
    
    // gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    
    renderMeme();
    
    // gCtx.beginPath();
    gCtx.strokeStyle = 'black';
    gCtx.rect(txt.pos.x-150, txt.pos.y+5, 300, -55);
    gCtx.fillStyle = '#fffac480';
    gCtx.fillRect(txt.pos.x-150, txt.pos.y+5, 300, -55);
    // gCtx.closePath();
    gCtx.stroke();
    
    document.querySelector('.change-txt').value = txt.txt;
    document.querySelector('.change-txt-color').value = txt.fontColor;
    document.querySelector('.change-txt-outline-color').value = txt.fontOutlineColor;
    document.querySelector('.change-txt-size').value = txt.fontSize;
    document.querySelector('.change-font').value = txt.fontFamily;

    document.querySelector('.change-txt').focus();
}

function resetInputs() {
    document.querySelector('.change-txt').value = null;
    document.querySelector('.change-txt-color').value = '#000000';
    document.querySelector('.change-txt-outline-color').value = '#000000';
    document.querySelector('.change-txt-size').value = null;
    document.querySelector('.change-font').value = null;
}

function doChangeCurrTxtIdx(idx) {
    changeCurrTxtIdx(idx);
}

// function doAddTextLine(event) {
//     onToggleIsAddTxt();
//     getMeme().texts.push(createTxtLine({x: event.offsetX, y: event.offsetY}));
//     renderMeme();
// }

// function doMoveTxtLine(event) {
//     onToggleIsMoveTxt();
//     getMeme().texts[getCurrTxtIdx()].pos = {x: event.offsetX, y: event.offsetY};
//     renderMeme();
// }

function doMoveTxt(event) {
    event.preventDefault();
    if (!getIsCanvasClick()) return;
    if (getCurrTxtIdx() === undefined) return
    getMeme().texts[getCurrTxtIdx()].pos = {x: event.offsetX, y: event.offsetY};
    renderMeme();
}

function doChangeTxtObjAtrr(atrr, selector) {
    if (getCurrTxtIdx() === undefined) return;
    let elTxt = document.querySelector(selector);
    getMeme().texts[getCurrTxtIdx()][atrr] = elTxt.value;
    renderMeme();
    selectTxt(getCurrTxtIdx());
}

function onChangeTxt() {
    doChangeTxtObjAtrr('txt', '.change-txt');
}
function onChangeTxtOutlineColor() {
    doChangeTxtObjAtrr('fontOutlineColor', '.change-txt-outline-color');
}
function onChangeTxtColor() {
    doChangeTxtObjAtrr('fontColor', '.change-txt-color');
}
function onChangeTxtSize() {
    doChangeTxtObjAtrr('fontSize', '.change-txt-size');
}
function onChangeFont() {
    doChangeTxtObjAtrr('fontFamily', '.change-font');
}

function onToggleNav() {
    document.querySelector('.main-nav').classList.toggle('open');
    document.body.classList.toggle('open');
}

function onClose() {
    document.querySelector('.main-nav').classList.remove('open');
    document.body.classList.remove('open');
    document.body.classList.remove('show-modal');
}

function onToggleGalleryModal() {
    document.body.classList.toggle('show-modal');
    document.querySelector('.main-nav').classList.remove('open');
}

function onDownloadMeme() {
    document.querySelector('.main-nav').classList.remove('open');
}

function onChangeCurrImg(elImg) {
    getMeme().imgSrc = elImg.src;
    renderMeme();
    onToggleGalleryModal();
}

// function onToggleIsAddTxt() {
//     if (getIsMoveTxt()) onToggleIsMoveTxt();
//     toggleIsAddTxt();
//     document.querySelector('.add-txt-btn').classList.toggle('clicked')
// }

// function onToggleIsMoveTxt() {
//     if (getIsAddTxt()) onToggleIsAddTxt();
//     if (getCurrTxtIdx() === undefined) return;
//     toggleIsMoveTxt();
//     document.querySelector('.move-txt-btn').classList.toggle('clicked')
// }

function onRemoveTxt() {
    if (getCurrTxtIdx() === undefined) return;
    getMeme().texts.splice(getCurrTxtIdx(), 1);
    resetCurrTxtIdx();
    resetInputs();
    renderMeme();
}

function onSaveMeme() {
    saveMemeToStorage();
    document.querySelector('.download-link').href = gElCanvas.toDataURL();
    document.querySelector('.main-nav').classList.remove('open');

}
