'use strict';

const MEMES_STORAGE_KEY = 'my_memes';
const MEME_IMAGES_STORAGE_KEY = 'meme_images_srcs';

let appData = {
    meme: createMeme(),
    memes: loadMemesFromStorage(),
    imagesSrcs: createImagesSrcs(),
    emogies: getEmogies(),
    currTxtIdx: undefined,
    isCanvasClick: false,
    currEmogiesPage: 0,
    emogiesPerPage: 5,
    isNewMeme: true
}

function getIsNewMeme() {
    return appData.isNewMeme;
}

function setNewMeme() {
    appData.meme = createMeme();
    appData.isNewMeme = true;
}

function unSetIsNewMeme() {
    appData.isNewMeme = false;
}

function getPrevEmogiesCount() {
    return  (appData.currEmogiesPage)*appData.emogiesPerPage;
}

function getCurrEmogiesPage() {
    return appData.currEmogiesPage;
}

function updateEmogiePage(dif) {
    appData.currEmogiesPage = (dif === 0)? 0 : appData.currEmogiesPage+dif;
    if (appData.currEmogiesPage < 0) appData.currEmogiesPage = parseInt((appData.emogies.length-1)/appData.emogiesPerPage);
    if (appData.currEmogiesPage >= appData.emogies.length/appData.emogiesPerPage) appData.currEmogiesPage = 0;
}

function getEmogiesToShow() {
    return appData.emogies.slice(appData.currEmogiesPage*appData.emogiesPerPage, appData.currEmogiesPage*appData.emogiesPerPage+ appData.emogiesPerPage);
}

function getEmogies() {
    return ['😃','😄','😀','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','😍','🤩','😘','😗','☺','🤧','🤯','🤠','😎','🧐','😮','😲','😭','😱','😖','😞','😓','😩','😤','😠','😈','☠','💩']
}

function getAllMemes() {
    return appData.memes;
}

function updateCurrMeme(meme) {
    // var newMeme = meme.slice();
    // newMeme.texts = meme.texts.silce();
    unSetIsNewMeme();
    appData.meme = meme;
}

function updateMemes() {
    appData.memes.push(appData.meme);
}


function toggleIsCanvasClick() {
    appData.isCanvasClick = !appData.isCanvasClick;
}

function canvasClick() {
    appData.isCanvasClick = true;
}
function canvasUnClick() {
    appData.isCanvasClick = false;
}

function getIsCanvasClick() {
    return appData.isCanvasClick;
}

function createMeme() {
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


function getImagesSrcsToShow(str) {
    let strs = str.split(' ');
    return appData.imagesSrcs.filter(imageSrc => {
        for (let i = 0; i < strs.length; i++) {
            if (imageSrc.toLowerCase().includes(str.toLowerCase())) return true;
        }
    })
}

function getMeme() {
    return appData.meme;
}

function getImagesSrcs() {
    return appData.imagesSrcs;
}

function getCurrTxtIdx() {
    return appData.currTxtIdx;
}

function changeCurrTxtIdx(idx) {
    appData.currTxtIdx = idx;
}

function resetCurrTxtIdx() {
    appData.currTxtIdx = undefined;
}

function updateCurrTxtIdx(diff) {
    appData.currTxtIdx = (appData.currTxtIdx === undefined)? 0 : appData.currTxtIdx+diff;
}

function createTxtLine(pos, txt = 'some txt') {
    return {txt: txt,
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
    saveObjToStorage(MEME_IMAGES_STORAGE_KEY, appData.imagesSrcs);
}

function loadMemesFromStorage() {
    if (!loadObjFromStorage(MEMES_STORAGE_KEY)) return [];
    return loadObjFromStorage(MEMES_STORAGE_KEY);
}

function saveMemesToStorage() {
    saveObjToStorage(MEMES_STORAGE_KEY, appData.memes);
}
 