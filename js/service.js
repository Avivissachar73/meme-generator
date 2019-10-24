'use strict';

const MEMES_STORAGE_KEY = 'my_memes';
const MEME_IMAGES_STORAGE_KEY = 'meme_images_srcs';

let globals = {
    meme: createMeme(),
    memes: loadMemesFromStorage(),
    imagesSrcs: createImagesSrcs(),
    currTxtIdx: undefined,
    isCanvasClick: false,
}

function getAllMemes() {
    return globals.memes;
}

function updateCurrMeme(meme) {
    globals.meme = meme;
}

function updateMemes() {
    globals.memes.push(globals.meme);
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
    // let meme = loadMemesFromStorage();
    // if (meme) return meme;
    // else return {imgSrc: `images/Meme_images/X-Everywhere.jpg`, texts: []};
    return {imgSrc: `images/Meme_images/X-Everywhere.jpg`, texts: []};
}

function createImagesSrcs() {
    let images = loadImagesFromStorage();
    if (images) return images;
    else return getSomeImagesSrcs();
}

function getSomeImagesSrcs() {
    return [`images/Meme_images/meme1.jpg`, 
            `images/Meme_images/One-Does-Not-Simply.jpg`, 
            `images/Meme_images/2.jpg`,
            `images/Meme_images/005.jpg`,
            `images/Meme_images/003.jpg`,
            `images/Meme_images/004.jpg`,
            `images/Meme_images/006.jpg`,
            `images/Meme_images/8.jpg`,
            `images/Meme_images/12.jpg`,
            `images/Meme_images/leo.jpg`,
            `images/Meme_images/patric.jpg`,
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

function resetCurrTxtIdx() {
    globals.currTxtIdx = undefined;
}

function updateCurrTxtIdx(diff) {
    globals.currTxtIdx = (globals.currTxtIdx === undefined)? 0 : globals.currTxtIdx+diff;
}

function createTxtLine(pos) {
    return {txt: `some txt`,
            fontFamily: `Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif`,
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

function loadMemesFromStorage() {
    if (!loadObjFromStorage(MEMES_STORAGE_KEY)) return [];
    return loadObjFromStorage(MEMES_STORAGE_KEY);
}

function saveMemeToStorage() {
    saveObjToStorage(MEMES_STORAGE_KEY, globals.memes);
}
 