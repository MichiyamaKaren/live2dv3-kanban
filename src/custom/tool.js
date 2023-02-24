import { default as cfg } from "./init.js";

import { showMessage, hideMessage } from "./message.js";
import { getCurrL2DModel } from "./model.js";
import { LAppLive2DManager } from "@L2DApp/lapplive2dmanager";
import { randomChoose } from "./utils.js";

export { tools, toolOnHoverEnter, toolOnHoverLeave };

let tools = {
    randomMsg: {
        click: function (config, event) {
            let message = randomChoose(config.message);
            showMessage(message.text, true);

            let model = getCurrL2DModel();
            if (message.exp !== undefined) model.setExpression(message.exp);
            if (message.mtn !== undefined) model.startMotion(message.mtn, 0, 2);
        }
    },
    randomExp: {
        click: function (config, event) {
            getCurrL2DModel().setRandomExpression();
        }
    },
    changeModel: {
        click: function (config, event) {
            LAppLive2DManager.getInstance().nextScene();
        }
    },
    drag: {
        dragStart: function (config, event) { $('.ui-draggable-handle').removeClass(config.icon).addClass(config.dragging_icon); },
        dragStop: function (config, event) { $('.ui-draggable-handle').removeClass(config.dragging_icon).addClass(config.icon); }
    },
    savePic: {
        click: function (config, event) {
            let canvas = $('canvas#live2d')[0];
            Canvas2Image.saveAsPNG(canvas, canvas.width, canvas.height, config.fileName);
        }
    },
    about: {
        click: function (config, event) {
            open(config.url);
        }
    },
    close: {
        click: function (config, event) {
            showMessage(config.message, true, config.msgTime);
            let l2d_panel = $('.live2d-main');
            let yDown = window.innerHeight - (l2d_panel.offset().top - document.documentElement.scrollTop);
            l2d_panel.animate(
                { 'top': `+=${yDown}px` },
                config.closeTime,
                () => {
                    $('#waifu-toggle').addClass('waifu-toggle-active')
                        .unbind('click').click(function () {
                            let yUp = l2d_panel.height() + cfg.canvas.bottom;
                            l2d_panel.css('left', `${cfg.canvas.left}px`);
                            l2d_panel.animate({ 'top': `-=${yUp}px` }, config.closeTime);
                            $(this).removeClass('waifu-toggle-active');
                        });
                });
        }
    }
}

function toolOnHoverEnter(config, event) {
    let msg = config.hover;
    if (msg) {
        showMessage(msg, false, -1);
    }
}

function toolOnHoverLeave(config, event) {
    if (config.hover) {
        hideMessage();
    }
}
