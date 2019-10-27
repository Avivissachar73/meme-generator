'use strict';


let gElCanvas;
let gCtx;
let gElMemeImage = new Image();

function init() {
    setCanvas();
    setNewMeme();
    renderMeme(getMeme(), gElCanvas, gElMemeImage);
    onOpenImagesModal();
}

function setCanvas() {
    let elContainer = document.querySelector('.canvas-container');
    gElCanvas = document.querySelector('.meme-canvas');

    gCtx = gElCanvas.getContext('2d');

    
    gElCanvas.width = gElCanvas.height = elContainer.offsetWidth;

    // let smallestSize = (elContainer.offsetWidth < elContainer.offsetHeight)? elContainer.offsetWidth : elContainer.offsetHeight;
    // gElCanvas.width = gElCanvas.height = smallestSize;

    // gElCanvas.width = elContainer.offsetWidth;
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
    else document.querySelector('.change-txt').focus(); 
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


function onUploadImage(event) {
    var elImgSrc = document.querySelector('.image-upload');
    
    let fileReader = new FileReader();
    fileReader.onload = () => {
        if (fileReader.readyState === 2) {
            getImagesSrcs().unshift(fileReader.result);
            saveImagesToStorage();
            renderImagesToModal(getImagesSrcs());
            elImgSrc.value = null;
        }
    }
    fileReader.readAsDataURL(event.target.files[0]);
    
}

function onAddImageSrc() {
    var elImgSrc = document.querySelector('.image-upload');
    getImagesSrcs().unshift(elImgSrc.value);
    saveImagesToStorage();
    renderImagesToModal(getImagesSrcs());
    elImgSrc.value = null;
}

function onUpdateCurrEmogiesPage(dif) {
    updateEmogiePage(dif);
    renderEmogies();
}

function onAddEmogie(idx) {
    let emogie = getEmogies()[idx];
    doAddEmogie(emogie);
    onClose();
}

function onChangeMeme(idx) {
    updateCurrMeme(getAllMemes()[idx]);
    // setExistMeme();
    renderMeme(getAllMemes()[idx], gElCanvas, gElMemeImage);
    resetInputs();
    onClose();
}


function doAddEmogie(emogie) {
    let splitedCanvasHeight = gElCanvas.height/7;
    let pos = {x: gElCanvas.width/2, y: splitedCanvasHeight*4}
    let txts = getMeme().texts
    
    txts.push(createTxtLine(pos, emogie));
    renderMeme(getMeme(), gElCanvas, gElMemeImage);
    selectTxt(txts.length-1);
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

    document.querySelector('.change-txt').focus();
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


function onOpenNav() {
    document.querySelector('.main-nav').classList.add('open');
    document.querySelector('.screen').classList.add('open');
}

function onOpenEmogiesModal() {
    updateEmogiePage(0);
    renderEmogies();
    document.querySelector('.emogies-nav-bar-modal').classList.add('open');
    document.querySelector('.screen').classList.add('open');
}

function onClose() {
    document.querySelector('.main-nav').classList.remove('open');
    document.querySelector('.emogies-nav-bar-modal').classList.remove('open');
    document.querySelector('.gallery-modal').classList.remove('open');
    document.querySelector('.screen').classList.remove('open');
}

function onOpenImagesModal() {
    document.querySelector('.gallery-images-options').style.display = 'flex';
    document.querySelector('.modal-title').innerText = 'Choose Picture';
    renderImagesToModal(getImagesSrcs());
    openModal()
}

function onOpenMemesModal() {
    document.querySelector('.gallery-images-options').style.display = 'none';
    document.querySelector('.modal-title').innerText = 'Your Memes';

    let elContainer = document.querySelector('.modal-items-container')
    elContainer.innerHTML = null;
    if (getAllMemes().length === 0) elContainer.innerHTML = 'No Memes to show..';
    
    else renderMemesGallery();
    openModal();
}


function openModal() {
    document.querySelector('.main-nav').classList.remove('open');
    document.querySelector('.screen').classList.add('open');
    document.querySelector('.gallery-modal').classList.add('open');
}

function onDownloadMeme() {
    document.querySelector('.download-link').href = gElCanvas.toDataURL();
    onClose();
}

function onChangeCurrImg(elImg) {
    setCanvas();
    getMeme().imgSrc = elImg.src;
    renderMeme(getMeme(), gElCanvas, gElMemeImage);
    onClose();
}

function onRemoveTxt() {
    if (getCurrTxtIdx() === undefined) return;
    getMeme().texts.splice(getCurrTxtIdx(), 1);
    resetCurrTxtIdx();
    resetInputs();
    renderMeme(getMeme(), gElCanvas, gElMemeImage);
}

function onSaveMeme() {
    if (getIsNewMeme()) updateMemes();
    saveMemesToStorage();
    onClose();
}
