import Phaser from 'phaser';
import LoadingScene from './LoadingScene';
import MainGameScene from './MainGameScene';
import GameOverScene from './GameOverScene';

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    resolution: window.devicePixelRatio,
    scene: [LoadingScene, MainGameScene, GameOverScene],
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
    
};

const game = new Phaser.Game(config);

export default game;
