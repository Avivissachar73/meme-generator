'use strict';




function renderMeme(meme, canvas, elMemeImage) {
    elMemeImage.src = meme.imgSrc;
    elMemeImage.style.width = canvas.width;
    elMemeImage.style.height = canvas.height;
    elMemeImage.style.objectFit = 'cover';
    let gCtx = canvas.getContext('2d')

    elMemeImage.onload = function() {
        gCtx.closePath();
        gCtx.clearRect(0, 0, canvas.width, canvas.height);
        gCtx.drawImage(elMemeImage, 0, 0, elMemeImage.width, elMemeImage.height, 
                                    0, 0, canvas.width, canvas.height);
        // gCtx.drawImage(elMemeImage, 0, 0, elMemeImage.width, elMemeImage.height);
        gCtx.stroke();
        gCtx.beginPath();
    
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


function doRenderImagesToModal() {
    renderImagesToModal()
}

function renderImagesToModal(imagesSrcsToShow) {
    document.querySelector('.modal-title').innerText = 'Choose a Picture';
    var htmlStr = imagesSrcsToShow.map(imgSrc => {
        return `<img onclick="onChangeCurrImg(this)" src="${imgSrc}" alt="">`
    }).join('');

    document.querySelector('.modal-items-container').innerHTML = htmlStr;
}


function renderEmogies() {
    let emogiesToShow = getEmogiesToShow();
    let htmlStr = emogiesToShow.map((emogie, idx) => {
        return `<div onClick="onAddEmogie(${idx+getPrevEmogiesCount()})">${emogie}</div>`
    }).join('');
    document.querySelector('.emogies-container').innerHTML = htmlStr;
}

// function onSwitchLines() {
//     var txts = getMeme().texts;

//     if (txts.length > 1) {
//         switchLines(txts[0], txts[1]);
//         renderMeme(getMeme(), gElCanvas, gElMemeImage);
//     }
// }

// function onUploadImage() {
//     var elImgSrc = document.querySelector('.image-upload');
//     getImagesSrcs().unshift(elImgSrc.value);
//     saveImagesToStorage();
//     renderImagesToModal();

//     elImgSrc.value = null;
// }


function selectTxt(idx) {
    var txt = getMeme().texts[idx];
    
    changeCurrTxtIdx(idx);
    
    renderMeme(getMeme(), gElCanvas, gElMemeImage);
    
    gCtx.strokeStyle = 'black';
    gCtx.rect(txt.pos.x-150, txt.pos.y+5, 300, -55);
    gCtx.fillStyle = '#fffac480';
    gCtx.fillRect(txt.pos.x-150, txt.pos.y+5, 300, -55);
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

