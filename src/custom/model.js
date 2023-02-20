import { LAppLive2DManager } from '@L2DApp/lapplive2dmanager';

export { getCurrL2DModel };

function getCurrL2DModel() {
    return LAppLive2DManager.getInstance()._models.at(0);
}