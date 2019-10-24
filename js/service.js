'use strict';

const MEME_STORAGE_KEY = 'my_meme';
const MEME_IMAGES_STORAGE_KEY = 'meme_images_srcs';

// let globals.meme = createMeme();
// let globals.imagesSrcs = createImagesSrcs();
// let globals.currTxtIdx;
// let globals.isCanvasClick = false;
// let gIsAddTxt = false;
// let gIsMoveTxt = false;

let globals = {
    meme: createMeme(),
    imagesSrcs: createImagesSrcs(),
    currTxtIdx: undefined,
    isCanvasClick: false,
}

function switchLines(line1, line2) {
    // [line1, line2] = [line2, line1];
    let temp = line1;
    line1 = line2;
    line2 = temp;
}

function toggleIsCanvasClick() {
    globals.isCanvasClick = !globals.isCanvasClick;
}

function canvasClick() {
    globals.isCanvasClick = true;
}
function canvasUnClick() {
    globals.isCanvasClick = false;
}

function getIsCanvasClick() {
    return globals.isCanvasClick;
}

function createMeme() {
    let meme = loadMemeFromStorage();
    if (meme) return meme;
    else return {imgSrc: `images/Meme_images/X-Everywhere.jpg`, texts: []};
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
    return globals.meme;
}

function getImagesSrcs() {
    return globals.imagesSrcs;
}

function getCurrTxtIdx() {
    return globals.currTxtIdx;
}

function changeCurrTxtIdx(idx) {
    globals.currTxtIdx = idx;
}

// function toggleIsAddTxt() {
//     gIsAddTxt = !gIsAddTxt;
// }

// function toggleIsMoveTxt() {
//     gIsMoveTxt = !gIsMoveTxt;
// }

// function getIsAddTxt() {
//     return gIsAddTxt;
// }

// function getIsMoveTxt() {
//     return gIsMoveTxt;
// }

function resetCurrTxtIdx() {
    globals.currTxtIdx = undefined;
}

function updateCurrTxtIdx(diff) {
    globals.currTxtIdx = (globals.currTxtIdx === undefined)? 0 : globals.currTxtIdx+diff;
}

function createTxtLine(pos) {
    return {txt: `some txt`,
            fontFamily: 'IMPACT',
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
    saveObjToStorage(MEME_IMAGES_STORAGE_KEY, globals.imagesSrcs);
}

function loadMemeFromStorage() {
    return loadObjFromStorage(MEME_STORAGE_KEY);
}

function saveMemeToStorage() {
    saveObjToStorage(MEME_STORAGE_KEY, globals.meme);
}
 