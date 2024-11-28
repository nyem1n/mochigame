import Phaser from 'phaser';
import '../App.css';


export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }


    preload(){
        this.load.image('excitedham', '/src/assets/32_excitedham.png');
        
    }
    create() {
        // 배경 색 설정 
        this.cameras.main.setBackgroundColor('#FFF8DC');
    
        const score = this.registry.get('score'); // 점수 불러오기
    
        // 햄찌 이미지 추가 및 클릭 이벤트 설정
        this.excitedham = this.add.image(this.scale.width / 2 + 450, this.scale.height / 2, 'excitedham')
        .setScale(0.4)
        .setInteractive() 
        .on('pointerover', () => { 
        this.excitedham.setScale(0.45); // 커서를 갖다댔을 때 크기 증가
        })
        .on('pointerout', () => {
        this.excitedham.setScale(0.4); // 벗어나면 원래 크기로 돌아감
        })
        .on('pointerdown', () => {
        this.scene.start('LoadingScene'); // 'LoadingScene'으로 이동
        });

            
        // 게임 오버 메시지
        this.add.text(this.scale.width / 2, this.scale.height / 2 - 50, '게임 오버!\n' + score + '점이나 얻었어요', {
            fontSize: '58px',
            color: '#6F4E37',
            fontFamily: 'HakgyoansimDunggeunmisoTTF-B',
            align: 'center'
        }).setOrigin(0.5);
    
        // 처음 페이지로 메시지
        this.add.text(this.scale.width / 2, this.scale.height / 2 + 150, '햄찌를 클릭하면 처음으로 돌아가요!', {
            fontSize: '28px',
            color: '#8BB381',
            fontFamily: 'yg-jalnan',
            align: 'center'
        }).setOrigin(0.5);
    }
    
}
