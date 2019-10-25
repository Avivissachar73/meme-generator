'use strict';


let gElCanvas;
let gCtx;
let gElMemeImage = new Image();

let gGalleryMemesImages = [];

function init() {
    setCanvas();
    renderMeme(getMeme(), gElCanvas, gElMemeImage);
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

function canvasClicked(event) {
    event.preventDefault();
    if (!onChangeSelectedTxtIdx(event)) {
        resetCurrTxtIdx();
        resetInputs();
        renderMeme(getMeme(), gElCanvas, gElMemeImage);
    }
}


function onChangeMeme(idx) {
    updateCurrMeme(getAllMemes()[idx]);
    renderMeme(getAllMemes()[idx], gElCanvas, gElMemeImage);
    onClose();
}


function onSearchImages() {
    let searchStr = document.querySelector('.images-search-line').value;
    let imagesSrcsToShow = getImagesSrcsToShow(searchStr);
    renderImagesToModal(imagesSrcsToShow)
}


function onToggleIsCanvasClick() {
    toggleIsCanvasClick();
}

function onCanvasClick(event) {
    event.preventDefault()
    canvasClick()
    document.querySelector('.meme-canvas').classList.add('clicked')
}

function onCanvasUnClick(event) {
    event.preventDefault();
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

    renderMeme(getMeme(), gElCanvas, gElMemeImage);
    selectTxt(txts.length-1);
}


function onChangeSelectedTxtIdx(event) {
    var txts = getMeme().texts;

    let clickedPos = (event.offsetX)? {x: event.offsetX, y: event.offsetY} : {x: event.touches[0].clientX-event.touches[0].target.offsetLeft,
                                                                              y: event.touches[0].clientY-event.touches[0].target.offsetTop}; 

    for (let i = 0; i < txts.length; i++) {
        if (clickedPos.x < txts[i].pos.x+150 && clickedPos.x > txts[i].pos.x-150 &&
            clickedPos.y < txts[i].pos.y+5 && clickedPos.y > txts[i].pos.y-50) {

            selectTxt(i);
            return txts[i];
        }
    }
    return false;
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

function onRenderImagesToModal() {
    renderImagesToModal(getImagesSrcs());
    document.body.classList.toggle('show-modal');
    document.querySelector('.main-nav').classList.remove('open');
}


function onRenderMemesToGallery() {
    document.querySelector('.modal-title').innerText = 'Your Memes';

    let elContainer = document.querySelector('.modal-items-container')
    elContainer.innerHTML = null;
    if (getAllMemes().length === 0) elContainer.innerHTML = 'No Memes to show..';

    else getAllMemes().forEach((meme, idx) => {
        // let canvasesImgsContainer = document.querySelector('.canvases-images-container');
        // canvasesImgsContainer.innerHTML = null;
        // canvasesImgsContainer.innerHTML += `<img>`;
        // let elMemeImage = canvasesImgsContainer.children[canvasesImgsContainer.children.length-1];
        elContainer.innerHTML += `<canvas onclick="onChangeMeme(${idx})" width="100" height="100"><canvas>`;
        gGalleryMemesImages[idx] = new Image();
        let elCanvas = document.querySelector('.modal-items-container').children[document.querySelector('.modal-items-container').children.length-1]
        renderMeme(meme, elCanvas, gGalleryMemesImages[idx]);
    });
    showModal();
}

function onDownloadMeme() {
    document.querySelector('.download-link').href = gElCanvas.toDataURL();
    document.querySelector('.main-nav').classList.remove('open');
}

function onChangeCurrImg(elImg) {
    getMeme().imgSrc = elImg.src;
    renderMeme(getMeme(), gElCanvas, gElMemeImage);
    onRenderImagesToModal();
}

function onRemoveTxt() {
    if (getCurrTxtIdx() === undefined) return;
    getMeme().texts.splice(getCurrTxtIdx(), 1);
    resetCurrTxtIdx();
    resetInputs();
    renderMeme(getMeme(), gElCanvas, gElMemeImage);
}

function onSaveMeme() {
    updateMemes();
    saveMemeToStorage();
    document.querySelector('.main-nav').classList.remove('open');
    document.body.classList.remove('open');
}
