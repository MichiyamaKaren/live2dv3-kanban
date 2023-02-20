import { showMessage } from "./message.js";

export { windowEvents, autoEvents };

// 监听窗口事件
let windowEvents = {
    copy: function (config, event) {
        event.preventDefault();
        event.stopPropagation();
        showMessage(config.onCopy);
    }
}

// 自动触发
let autoEvents = [];