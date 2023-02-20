/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LogLevel } from '@framework/live2dcubismframework';

import { LAppLive2DManager } from './lapplive2dmanager';
import { LAppModel } from './lappmodel';

/**
 * Sample Appで使用する定数
 */

// Canvas width and height pixel values, or dynamic screen size ('auto').
// export const CanvasSize: { width: number; height: number } | 'auto' = 'auto';

// 画面
export let ViewScale = 1.0;
export let ViewTranslateX: number, ViewTranslateY: number;
export const ViewMaxScale = 2.0;
export const ViewMinScale = 0.8;

export const ViewLogicalLeft = -1.0;
export const ViewLogicalRight = 1.0;
export const ViewLogicalBottom = -1.0;
export const ViewLogicalTop = 1.0;

export const ViewLogicalMaxLeft = -2.0;
export const ViewLogicalMaxRight = 2.0;
export const ViewLogicalMaxBottom = -2.0;
export const ViewLogicalMaxTop = 2.0;

export let CanvasId = '';

// 相対パス
export let ResourcesPath = '../../Resources/';

// モデルの後ろにある背景の画像ファイル
export let BackImageName = 'back_class_normal.png';

// 歯車
export const GearImageName = 'icon_gear.png';

// 終了ボタン
export const PowerImageName = 'CloseNormal.png';

// モデル定義---------------------------------------------
// モデルを配置したディレクトリ名の配列
// ディレクトリ名とmodel3.jsonの名前を一致させておくこと
export let ModelDir: string[] = [
  'Haru',
  'Hiyori',
  'Mark',
  'Natori',
  'Rice',
  'Mao'
];
export let ModelDirSize: number = ModelDir.length;

// 外部定義ファイル（json）と合わせる
export const MotionGroupIdle = 'Idle'; // アイドリング
export const MotionGroupTapBody = 'TapBody'; // 体をタップしたとき

// 外部定義ファイル（json）と合わせる
export const HitAreaNameHead = 'Head';
export const HitAreaNameBody = 'Body';

// モーションの優先度定数
export const PriorityNone = 0;
export const PriorityIdle = 1;
export const PriorityNormal = 2;
export const PriorityForce = 3;

// デバッグ用ログの表示オプション
export const DebugLogEnable = true;
export const DebugTouchLogEnable = false;

// Frameworkから出力するログのレベル設定
export const CubismLoggingLevel: LogLevel = LogLevel.LogLevel_Verbose;

// デフォルトのレンダーターゲットサイズ
export const RenderTargetWidth = 1900;
export const RenderTargetHeight = 1000;

export let OnChangeScene = function(manager: LAppLive2DManager) { };
export let OnModelLoaded = function(model: LAppModel) { };

export function initDefine (
  resourcesPath: string, backImageName: string, modelDir: string[], canvasId: string,
  viewScale: number = 1.0, viewTranslate: Array<number> = [0, 0]) {

  ResourcesPath = resourcesPath;
  BackImageName = backImageName;
  ModelDir = modelDir;
  ModelDirSize = modelDir.length;

  CanvasId = canvasId;

  ViewScale = viewScale;
  [ViewTranslateX, ViewTranslateY] = viewTranslate;
}

export function setCallback(onChangeScene, onModelLoaded) {
  OnChangeScene = onChangeScene;
  OnModelLoaded = onModelLoaded;
}