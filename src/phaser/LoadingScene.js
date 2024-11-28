import Phaser from 'phaser';

export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoadingScene' });
        this.instructionVisible = false; // 게임 설명이 현재 보이는지 여부 확인용
    }

    preload() {
        // 이미지 로드
        this.load.image('hamster', '/assets/02_hamster.png');
        this.load.image('fryingpan', '/assets/03_fryingpan.png');
        this.load.image('background6', '/assets/47_background6.jpeg');
        this.load.image('header2', '/assets/48_header2.png');
        this.load.image('instruction', '/assets/58_instruction.png')
    }

    create() {
        // 배경 이미지 배치 (화면 중앙에 맞추기)
        this.background = this.add.image(this.scale.width / 2, this.scale.height / 2, 'background6').setOrigin(0.5);

        // 제목 배치
        this.header = this.add.image(this.scale.width / 2, this.scale.height / 2 - 300, 'header2').setOrigin(0.5).setScale(0.7);

        // 햄찌 이미지 배치
        this.hamster = this.add.image(this.scale.width / 2, this.scale.height / 2, 'hamster').setOrigin(0.5).setScale(0.4);

        // 햄찌 옆에 프라이팬 배치, 클릭 가능하게
        this.leftPan = this.add.image(this.hamster.x - 220, this.hamster.y + 58, 'fryingpan').setOrigin(0.5).setScale(0.15).setInteractive();
        this.rightPan = this.add.image(this.hamster.x + 217, this.hamster.y + 50, 'fryingpan').setOrigin(0.5).setScale(0.15).setInteractive();

        // 이미지에 커서를 갖다대면 모양 바뀜
        this.setInteractiveCursor(this.leftPan);
        this.setInteractiveCursor(this.rightPan);

        // 프라이팬 위에 텍스트 추가
        this.leftText = this.add.text(this.leftPan.x, this.leftPan.y, '게임 방법', {
            fontSize: '20px',
            fontFamily: 'PartialSansKR-Regular',
            fill: '#ffffff'
        }).setOrigin(0.5);

        this.rightText = this.add.text(this.rightPan.x, this.rightPan.y, '게임 시작', {
            fontSize: '20px',
            fontFamily: 'PartialSansKR-Regular',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // 게임 방법 클릭
        this.leftPan.on('pointerdown', () => {
            this.showInstruction();
        });

        // 게임 시작 클릭, startCountdown 실행
        this.rightPan.on('pointerdown', () => {
            this.scene.start('MainGameScene');
        });
        

        // 창 크기가 변경될 때 이벤트 리스너 등록
        this.scale.on('resize', this.resize, this);
    }

    // 커서 모양 변경 함수
    setInteractiveCursor(image) {
        image.on('pointerover', () => {
            this.input.setDefaultCursor('pointer');
        });
        image.on('pointerout', () => {
            this.input.setDefaultCursor('default');
        });
    }

    // 게임 설명 출력
    showInstruction() {
        // 게임 설명이 담긴 이미지를 화면에 추가
        this.instructionImage = this.add.image(this.scale.width / 2, this.scale.height / 2, 'instruction')
            .setOrigin(0.5)
            .setScale(0.7) // 필요에 따라 이미지 크기 조정
            .setInteractive(); // 상호작용 가능하게 설정
    
        this.instructionVisible = true; // 게임 설명 이미지가 표시되고 있음을 나타냄
    
        // 이미지 클릭 시 이미지를 제거하는 이벤트 리스너 추가
        this.instructionImage.on('pointerdown', () => {
            this.instructionImage.destroy(); // 이미지 제거
            this.instructionVisible = false; // 설명이 사라졌음을 나타냄
        });
    }
    
    

    // 창 크기 변경 시 재배치 함수
    resize(gameSize) {
        const width = gameSize.width;
        const height = gameSize.height;
    
        // 화면 크기에 맞게 스케일 계산
        const scaleFactor = Math.min(width / 1280, height / 900); // 800x600은 원래 이미지 기준 크기 예시
    
        // 배경 이미지와 주요 이미지를 다시 배치 및 크기 조절
        this.background.setPosition(width / 2, height / 2).setScale(scaleFactor);
        this.header.setPosition(width / 2, height / 2 - 300 * scaleFactor).setScale(scaleFactor * 0.7);
        this.hamster.setPosition(width / 2, height / 2).setScale(scaleFactor * 0.4);
        this.leftPan.setPosition(this.hamster.x - 220 * scaleFactor, this.hamster.y + 58 * scaleFactor).setScale(scaleFactor * 0.15);
        this.rightPan.setPosition(this.hamster.x + 217 * scaleFactor, this.hamster.y + 50 * scaleFactor).setScale(scaleFactor * 0.15);
        this.leftText.setPosition(this.leftPan.x, this.leftPan.y).setFontSize(20 * scaleFactor);
        this.rightText.setPosition(this.rightPan.x, this.rightPan.y).setFontSize(20 * scaleFactor);
    
        // 게임 설명이 표시되고 있을 경우 설명 이미지도 재배치 및 크기 조절
        if (this.instructionVisible) {
            this.instructionImage.setPosition(width / 2, height / 2).setScale(scaleFactor * 0.8);
        }
    }
    

    
}


