function resetExpSelect(model) {
    let expSetter = $('#exp-setter').empty();
    let expCount = model._modelSetting.getExpressionCount();
    
    for (let i = 0; i < expCount; i++) {
        let expName = model._modelSetting.getExpressionName(i);
        expSetter.append(
            $('<option>').val(expName).text(expName.split('.')[0]));
    }
    expSetter.unbind('change').change(() => {
        model.setExpression(expSetter.val());
    })
}

function resetMtnSelect(model) {
    let mtnSetter = $('#mtn-setter').empty();
    let mtnCount = model._modelSetting.getMotionGroupCount();
    
    for (let i = 0; i < mtnCount; i++) {
        let mtnName = model._modelSetting.getMotionGroupName(i);
        mtnSetter.append(
            $('<option>').val(mtnName).text(mtnName.split('.')[0]));
    }
    mtnSetter.unbind('change').change(() => {
        model.startMotion(mtnSetter.val(), 0, 2);
    })
}

L2Dsettings.configPath = 'config.json';
L2Dsettings.resourcesPath = 'static/model/';  // 指定资源文件（模型）保存的路径
L2Dsettings.backImageName = ''; // 指定背景图片
L2Dsettings.modelDirs = ''.split(',');
L2Dsettings.canvasId = 'live2d';

L2Dsettings.onModelLoaded = (model) => {
    resetExpSelect(model);
    resetMtnSelect(model);
    model.setExpression("onLoad");
    model.startMotion("onLoad", 0, 2);
};

window.onload = () => {
    $('#loadL2D').click(setupKanban);
}