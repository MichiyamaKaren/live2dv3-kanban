# Live2Dv3 Kanban

支持Live2D Model3的网页看板娘插件。效果可参考[道山神連的博客](https://michiyamakaren.github.io/)。

## 直接使用

若不需要自行构建，可以直接通过jsDelivr访问打包的js脚本并在项目中引用。

### 引用依赖脚本

在页面的header中引用所需的js脚本和CSS样式文件
```html
<!-- Pollyfill script -->
<script src="https://unpkg.com/core-js-bundle@3.6.1/minified.js"></script>
<!-- Live2DCubismCore script -->
<script src="https://cdn.jsdelivr.net/gh/MichiyamaKaren/live2dv3-kanban@1.1/Demo/static/js/live2dcubismcore.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.3/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jquery-ui@1.13.2/dist/jquery-ui.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<script src="https://cdn.jsdelivr.net/gh/MichiyamaKaren/live2dv3-kanban@1.1/Demo/static/js/canvas2image.js"></script>

<script src="https://cdn.jsdelivr.net/gh/MichiyamaKaren/live2dv3-kanban@1.1/dist/l2dkanban.min.js"></script>

<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/MichiyamaKaren/live2dv3-kanban@1.1/Demo/static/css/live2d.css" />
```

### 设定模型路径

`l2dkanban.min.js`文件为本项目打包生成的文件，引入后会在`window`下注册字典变量`L2DSettings`用于设定模型和配置文件路径等信息，以及加载模型的函数`setupKanban`。

在项目中新建目录（假设目录名为`models`），将Live2D模型文件添加到`models`下，每个模型的目录名要和`*.model3.json`的前缀一致。例如，若有模型`karen`和`hikari`，则`models`下的目录结构应如
```
├── path/to/models
│   ├── karen
│   │   ├── karen.model3.json
│   │   ├── other...
│   ├── hikari
│   │   ├── hikari.model3.json
│   │   ├── other...
```
此时应在header中添加如下js代码进行设定
```html
<script type="text/javascript">
    L2Dsettings.configPath = '/path/to/config.json';  // 设定配置文件路径
    L2Dsettings.resourcesPath = '/path/to/models/';  // 设定模型文件路径
    L2Dsettings.backImageName = '';
    L2Dsettings.modelDirs = 'karen,hikari'.split(',');  // 设定使用的模型名
    L2Dsettings.canvasId = 'live2d';

    L2Dsettings.onModelLoaded = (model) => {  // 应用初始表情和动作，需在live2d模型的model3.json文件中定义onLoad表情和动作组
        model.setExpression("onLoad");
        model.startMotion("onLoad", 0, 2);
    };

    window.onload = setupKanban;  // 自动加载模型
</script>
```

### 插入页面元素

在body中插入看板娘面板的HTML元素
```html
<div class="live2d-main">
    <div class="live2d-tips"></div>
    <canvas id="live2d" class="live2d"></canvas>
    <div class="live2d-tool"></div>
</div>
```
`canvas`对象的`id`属性应与`L2Dsettings.canvasId`变量的值保持一致。

## 构建

- 下载项目代码（由于项目中包含子模块，需要使用`git clone --recursive`）
- 运行`npm install`下载需要的依赖库，再运行`npm run build`编译项目代码，这会在`dist`生成`l2dkanban.js`文件。
  - 运行`npm run build:prod`则会生成压缩的`l2dkanban.min.js`。
- 在`Demo/demo.js`中参考上一节的内容进行相关设置。
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