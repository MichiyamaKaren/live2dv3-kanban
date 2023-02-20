# Live2Dv3 Kanban

## 构建

- 下载项目代码（由于项目中包含子模块，需要使用`git clone --recursive`）
- 运行`npm install`下载需要的依赖库，再运行`npm run build`编译项目代码，这会在`dist`生成`bundle.js`文件。
- 将Live2D模型目录复制到`Demo/static/model`下，注意目录名需要和`*.model3.json`的前缀一致。再在`Demo/demo.js`中设置`modelDirs`变量的值。
  - 例如，若有模型`karen`和`hikari`，则`Demo/static/model`下的目录结构应如：
  ```
  ├── model
  │   ├── karen
  │   │   ├── karen.model3.json
  │   │   ├── other...
  │   ├── hikari
  │   │   ├── hikari.model3.json
  │   │   ├── other...
  ```
  同时应在`Demo/demo.js`中设置
  ```js
  L2Dsettings.modelDirs = 'karen,hikari'.split(',');
  ```
- 复制看板娘配置文件`Demo/config_example.json`到`Demo/config.json`。
- 运行`npm run serve`启动本地服务，访问`http://localhost:5000/Demo/`即可查看看板娘效果。

## 配置

关于看板娘显示和对话内容的配置信息都写在`Demo/config.json`中，可以自行更改。可更改的内容为：
- `global`：Live2D模型显示相关配置
  - `global.model`
    - `global.model.scale`：模型的缩放率
    - `global.model.scale`：模型在X、Y两个方向的平移量。这里X、Y的坐标范围均为`[-1, 1]`。
  - `global.canvas`
    - `global.canvas.height`：canvas对象的高度，单位px。下面`global`中的长度值都是与这一高度的比值。
    - `global.canvas.ratio`：canvas的宽度
    - `global.canvas.bottom`,`global.canvas.left`：看板娘相对页面底部和左侧的距离
    - `global.canvas.marginLeft`：canvas的CSS `margin-left`属性
  - `global.toolbar`：工具栏的CSS属性
- `tool`：字典，描述工具按键的行为。key为工具名称，value中为相应配置

  通用配置：
  - `icon`：工具按键的图标相应的`class`名，参考[Font Awesome](https://fontawesome.com.cn/v4/icons)
  - `hover`：鼠标悬停在按键上时显示的对话信息

  各个工具按键的自用配置：
  - `randomMsg.message`：列表，每一项为一条对话内容。`text`、`exp`、`mtn`分别对应对话文本、表情和动作。
  - `drag.dragging_icon`：鼠标拖动时改变的图标样式
  - `close.message`、`close.msgTime`、`close.closeTime`：点击关闭后显示对话信息`message`，持续时长`msgTime`，然后向下退出页面，动画时长`closeTime`。时间单位均为毫秒。
- `onCopy`：监听复制页面上的文字时的对话信息

## 引用的项目

`src/live2d`的代码分别来自
- [Live2D/CubismWebFramework](https://github.com/Live2D/CubismWebFramework)  
- [Live2D/CubismWebSamples](https://github.com/Live2D/CubismWebSamples)

更改`src/live2d/lapp`的代码参考了文章：[笔记：live2d4.0 sdk 博客园网页动画](https://blog.csdn.net/weixin_44128558/article/details/104792345)和[live2d web端加载moc3模型](https://www.cnblogs.com/wstong/p/12874732.html)。部分CSS样式参考了项目[live2d-widget](https://github.com/stevenjoezhang/live2d-widget)。

`Demo/static/js/canvas2image.js`来自项目[canvas2image](https://github.com/hongru/canvas2image)。