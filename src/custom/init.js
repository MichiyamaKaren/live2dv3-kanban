import { tools, toolOnHoverEnter, toolOnHoverLeave } from "./tool.js";
import { windowEvents, autoEvents } from "./events.js";
import { partial } from "./utils.js";

import { initDefine, setCallback } from "@L2DApp/lappdefine";
import { initLApp } from "@L2DApp/main";

export { config_global as default };

let config_global = null;

// settings在setup()中开始被引用，即作为window.onload触发，故需要在页面加载之前配置好settings
window.L2Dsettings = {
    configPath: '',
    resourcesPath: '',  // 指定资源文件（模型）保存的路径
    backImageName: '', // 指定背景图片
    modelDirs: [],
    canvasId: '',
    onChangeScene: (manager) => { },
    onModelLoaded: (model) => { }
};

function setup() {
    fetch(L2Dsettings.configPath)
        .then((response) => response.json())
        .then((cfg) => {
            config_global = cfg.global;
            setupL2D(cfg);
        });
}

function setupL2D(config) {
    initDefine(
        L2Dsettings.resourcesPath, L2Dsettings.backImageName, L2Dsettings.modelDirs,
        L2Dsettings.canvasId, config.global.model.scale, config.global.model.translate); // 初始化模型
    setCallback(L2Dsettings.onChangeScene, L2Dsettings.onModelLoaded);
    
    initL2DPanel(config);

    initLApp(); // 初始化L2DAPP需要在canvas对象创建之后进行

    resetToolbar($('.live2d-tool'), tools, config);
    addEventsHandler(windowEvents, autoEvents, config);
}

function addEventsHandler(windowEvents, autoEvents, config) {
    for (let [event, callback] of Object.entries(windowEvents)) {
        $(window).on(event, partial(callback, config));
    }

    for (let event of autoEvents) {
        event(config);
    }
}

function initL2DPanel(config) {
    let height = config.global.canvas.height;
    $(`#${L2Dsettings.canvasId}`).attr({
        'height': `${height}`,
        'width': `${height * config.global.canvas.ratio}`,
        'margin-right': `${height * config.global.canvas.marginRight}`
    })[0].getContext("webgl", { preserveDrawingBuffer: true });

    // 若显示设置bottom，jquery UI的拖拽会为保持其不变而改变元素自身的高度
    let panel_top = window.innerHeight - (config.global.canvas.bottom + config.global.canvas.height);
    $('.live2d-main').css('top', `${panel_top}px`);

    $(document.body).append(
        $('<span>').attr('id', 'waifu-toggle').text('看板娘'));
}

function resetToolbar(toolbar, tools_callback, config) {
    toolbar.empty();

    for (let [name, callback] of Object.entries(tools_callback)) {
        let tool_config = config.tool[name];
        if (tool_config === undefined) {
            console.warn(`tool ${name} load failed because of lacking config item`);
            continue;
        }

        let clickCallback = callback.click ? partial(callback.click, tool_config) : () => { };
        toolbar.append(
            $('<span>').attr('class', tool_config.icon)
                .unbind('click').click(clickCallback).hover(
                    partial(toolOnHoverEnter, tool_config),
                    partial(toolOnHoverLeave, tool_config)
                )
        );
    }

    // 设置拖拽效果
    if (tools_callback.drag && config.tool.drag) {
        let handle = $('.live2d-tool > .' + config.tool.drag.icon.split(' ').join('.'));
        $('.live2d-main').draggable({
            handle: handle,
            start: partial(tools_callback.drag.dragStart, config.tool.drag),
            stop: partial(tools_callback.drag.dragStop, config.tool.drag)
        });
    }

    // 配置CSS样式
    let height = config.global.canvas.height;
    let lineHeight = config.global.toolbar.lineHeight, lineHeightPx;
    let topPx = height * config.global.toolbar.top;
    if (lineHeight) {
        lineHeightPx = height * lineHeight;
    }
    else {
        lineHeightPx = (height - topPx) / toolbar.children().length;
    }
    toolbar.css({
        'top': `${topPx}px`,
        'right': `${height * config.global.toolbar.right}px`,
        'font-size': `${height * config.global.toolbar.fontSize}px`})
        .children().css(
            'line-height', `${lineHeightPx}px`);
}

window.setupKanban = setup;