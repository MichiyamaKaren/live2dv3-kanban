export { showMessage, hideMessage };

function showMessage(text, overwrite = false, lasttime = 2000) {
    if(overwrite || sessionStorage.getItem('waifu-text') === '' || sessionStorage.getItem('waifu-text') === null){
        if(overwrite) sessionStorage.setItem('waifu-text', text);
        $('.live2d-tips').stop();
        $('.live2d-tips').html(text).fadeTo(200, 1);
        if (lasttime >= 0) {
            window.setTimeout(hideMessage, lasttime)
        }
    }
}

function hideMessage(){
    $('.live2d-tips').stop().css('opacity', 1);
    sessionStorage.removeItem('waifu-text');
    $('.live2d-tips').fadeTo(200, 0);
}
