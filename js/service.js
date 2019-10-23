'use strict';

const MEME_STORAGE_KEY = 'my_meme';
const MEME_IMAGES_STORAGE_KEY = 'meme_images_srcs';

let gMeme = createMeme();
let gImagesSrcs = createImagesSrcs();
let gCurrTxtIdx;
let gIsAddTxt = false;
let gIsMoveTxt = false;
let gIsCanvasClick = false;

function toggleIsCanvasClick() {
    gIsCanvasClick = !gIsCanvasClick;
}

function canvasClick() {
    gIsCanvasClick = true;
}
function canvasUnClick() {
    gIsCanvasClick = false;
}

function getIsCanvasClick() {
    return gIsCanvasClick;
}

function createMeme() {
    let meme = loadMemeFromStorage();
    if (meme) return meme;
    else return {imgSrc: '', texts: []};
}

function createImagesSrcs() {
    let images = loadImagesFromStorage();
    if (images) return images;
    else return getSomeImagesSrcs();
}

function getSomeImagesSrcs() {
    return [`images/Meme_images/meme1.jpg`, 
            `images/Meme_images/One-Does-Not-Simply.jpg`, 
            `images/Meme_images/X-Everywhere.jpg`];
}

function getMeme() {
    return gMeme;
}

function getImagesSrcs() {
    return gImagesSrcs;
}

function getCurrTxtIdx() {
    return gCurrTxtIdx;
}

function changeCurrTxtIdx(idx) {
    gCurrTxtIdx = idx;
}

function toggleIsAddTxt() {
    gIsAddTxt = !gIsAddTxt;
}

function toggleIsMoveTxt() {
    gIsMoveTxt = !gIsMoveTxt;
}

function getIsAddTxt() {
    return gIsAddTxt;
}

function getIsMoveTxt() {
    return gIsMoveTxt;
}

function resetCurrTxtIdx() {
    gCurrTxtIdx = undefined;
}

function updateCurrTxtIdx(diff) {
    gCurrTxtIdx = (gCurrTxtIdx === undefined)? 0 : gCurrTxtIdx+diff;
}

function createTxtLine(pos) {
    return {txt: `some txt`,
            fontFamily: 'Arial',
            fontSize: 40,
            fontOutlineColor: '#000000',
            fontColor: '#ffffff',
            outlineWidth: 1,
            pos: pos
    }
}

function loadImagesFromStorage() {
    return loadObjFromStorage(MEME_IMAGES_STORAGE_KEY);
}

function saveImagesToStorage() {
    saveObjToStorage(MEME_IMAGES_STORAGE_KEY, gImagesSrcs);
}

function loadMemeFromStorage() {
    return loadObjFromStorage(MEME_STORAGE_KEY);
}

function saveMemeToStorage() {
    saveObjToStorage(MEME_STORAGE_KEY, gMeme);
}
 