import Phaser from 'phaser';
import '../App.css';



class MainGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainGameScene' });

        this.number = [
            { id: 3, imageKey: 'three' },
            { id: 2, imageKey: 'two' },
            { id: 1, imageKey: 'one' },
            { id: 0, imageKey: 'start' },
        ];

        this.customers = [
            { id: 1, name: "딸기 손님", order: "딸기 모찌", timeLimit: 6000, score: 700, isSpecial: false, imageKey: 'strawcus' },
            { id: 2, name: "포도 손님", order: "포도 모찌", timeLimit: 6000, score: 700, isSpecial: false, imageKey: 'grapecus' },
            { id: 3, name: "귤 손님", order: "귤 모찌", timeLimit: 6000, score: 700, isSpecial: false, imageKey: 'tangcus' },
            { id: 4, name: "망고 손님", order: "망고 모찌", timeLimit: 6000, score: 700, isSpecial: false, imageKey: 'mangocus' },
            { id: 5, name: "특별한 손님", order: "아무거나", timeLimit: 5000, score: 1400, isSpecial: true, imageKey: 'specus' },
            { id: 6, name: "화난 손님", order: "아무거나", timeLimit: 6000, score: 0, isSpecial: false, imageKey: 'angrycus'}
        ];
    }

    preload() {
        // 이미지 로드
        this.load.image('background2', '/src/assets/24_background2.png');
        this.load.image('board', '/src/assets/04_board.png');
        this.load.image('redbeanspoon', '/src/assets/06_redbeanspoon.png')
        this.load.image('ricedoughspoon', '/src/assets/07_ricedoughspoon.png')
        this.load.image('ricedoughbowl', '/src/assets/09_ricedoughbowl.png');
        this.load.image('redbeanpastebowl', '/src/assets/10_redbeanpastebowl.png');
        this.load.image('flatdough', '/src/assets/12_flatdough.png')
        this.load.image('doughwithpaste', '/src/assets/13_doughwithpaste.png')
        this.load.image('tray', '/src/assets/14_tray.png')
        this.load.image('strawberry', '/src/assets/15_strawberry.png');
        this.load.image('grape', '/src/assets/16_grape.png');
        this.load.image('tangerine', '/src/assets/17_tangerine.png');
        this.load.image('mango', '/src/assets/18_mango.png');
        this.load.image('scoreboard', '/src/assets/19_scoreboard.png');
        this.load.image('gaugebar', '/src/assets/21_gaugebar.png');
        this.load.image('curtain', '/src/assets/22_curtain.png')
        this.load.image('openedcurtain', '/src/assets/23_openedcurtain.png')
        this.load.image('monitor', '/src/assets/25_monitor.png')
        this.load.image('strawcus', '/src/assets/26_strawcus.png')
        this.load.image('grapecus', '/src/assets/27_grapecus.png')
        this.load.image('tangcus', '/src/assets/28_tangcus.png')
        this.load.image('mangocus', '/src/assets/29_mangocus.png')
        this.load.image('angrycus', '/src/assets/30_angrycus.png')
        this.load.image('specus', '/src/assets/31_specus.png')
        this.load.image('excitedham', '/src/assets/32_excitedham.png')
        this.load.image('strawdough', '/src/assets/34_strawdough.png')
        this.load.image('grapedough', '/src/assets/35_grapedough.png')
        this.load.image('tangerdough', '/src/assets/36_tangerdough.png')
        this.load.image('mangodough', '/src/assets/37_mangodough.png')
        this.load.image('order', '/src/assets/38_order.png')
        this.load.image('strawmochi', '/src/assets/39_strawmochi.png');
        this.load.image('grapemochi', '/src/assets/40_grapemochi.png');
        this.load.image('tangermochi', '/src/assets/41_tangermochi.png');
        this.load.image('mangomochi', '/src/assets/42_mangomochi.png');
        this.load.image('header2', '/src/assets/48_header2.png')
        this.load.image('doughboard', '/src/assets/51_doughboard.png')
        this.load.image('pastedoughboard', '/src/assets/52_pastedoughboard.png')
        this.load.image('three', '/src/assets/54_three.png');
        this.load.image('two', '/src/assets/55_two.png');
        this.load.image('one', '/src/assets/56_one.png');
        this.load.image('start', '/src/assets/57_start.png');
        this.load.audio('pop', '/src/assets/70_pop.mp3');
        this.load.audio('success', '/src/assets/71_success.mp3');
        this.load.audio('bell', '/src/assets/72_bell.mp3');
        this.load.audio('fail', '/src/assets/73_fail.mp3');
    }

    create() {
        const background = this.add.image(this.scale.width / 2, this.scale.height / 2, 'background2');

        // 배경 이미지를 화면 크기에 맞게 조정
        background.setDisplaySize(this.scale.width, this.scale.height);

        this.gaugeBarBackground = this.add.rectangle(805, 300, 360, 23, 0xFF85A2).setOrigin(0.5); // 게이지 바 배경 

        //게이지 바, 간판, 점수판
        this.gaugeBar = this.add.image(800, 300, 'gaugebar').setOrigin(0.5).setScale(0.4); 
        this.add.image(750, 100 ,'header2').setOrigin(0.5).setScale(0.6); 
        this.scoreboard = this.add.image(750, 200, 'scoreboard').setOrigin(0.5).setScale(0.4); 

        this.add.image(150, 525, 'tray').setScale(0.6, 0.8); //쟁반

        //과일 배치
        this.strawberry = this.add.image(110, 490, 'strawberry').setInteractive().setScale(0.15)
        .on('pointerover', () => { 
            this.strawberry.setScale(0.17); 
        }).on('pointerout', () => {
            this.strawberry.setScale(0.15); 
        });
        this.grape = this.add.image(250, 490, 'grape').setInteractive().setScale(0.15)
        .on('pointerover', () => {
            this.grape.setScale(0.17);
        }).on('pointerout', () => {
            this.grape.setScale(0.15); 
        });
        this.tangerine = this.add.image(110, 610, 'tangerine').setInteractive().setScale(0.15)
        .on('pointerover', () => {
            this.tangerine.setScale(0.17);
        }).on('pointerout', () => {
            this.tangerine.setScale(0.15); 
        });
        this.mango = this.add.image(250, 610, 'mango').setInteractive().setScale(0.15)
        .on('pointerover', () => {
            this.mango.setScale(0.17);
        }).on('pointerout', () => {
            this.mango.setScale(0.15); 
        });

        //도마, 통 배치
        this.board = this.add.image(750, 560, 'board').setScale(0.7, 1.15);
        this.ricedoughbowl = this.add.image(1220, 430, 'ricedoughbowl').setInteractive().setScale(0.3)
        .on('pointerover', () => {
            this.ricedoughbowl.setScale(0.33);
        }).on('pointerout', () => {
            this.ricedoughbowl.setScale(0.3); 
        });
        this.redbeanpastebowl = this.add.image(1220, 640, 'redbeanpastebowl').setInteractive().setScale(0.3)
        .on('pointerover', () => {
            this.redbeanpastebowl.setScale(0.33);
        }).on('pointerout', () => {
            this.redbeanpastebowl.setScale(0.3); 
        });

        //모니터 배치
        this.add.image(1200, 150, 'monitor').setOrigin(0.5).setScale(0.4);
        //this.add.image(1270, 130, 'order').setOrigin(0.5).setScale(0.2);

        //커튼 배치
        this.curtain = this.add.image(200, 200, 'curtain').setOrigin(0.5).setScale(0.4);
        this.openedcurtain = this.add.image(200, 200, 'openedcurtain').setVisible(false).setScale(0.4);

        //손님 안 보이게 배치
        this.strawcus = this.add.image(1120, 170, 'strawcus').setVisible(false).setScale(0.18);
        this.grapecus = this.add.image(1120, 170, 'grapecus').setVisible(false).setScale(0.18);
        this.tangcus = this.add.image(1120, 170, 'tangcus').setVisible(false).setScale(0.18);
        this.mangocus = this.add.image(1120, 170, 'mangocus').setVisible(false).setScale(0.18);

        //게임 요소 안 보이게 배치 
        this.flatdough = this.add.image(750, 560, 'flatdough').setVisible(false).setScale(0.3);
        this.doughwithpaste = this.add.image(750, 560, 'doughwithpaste').setVisible(false).setScale(0.3);
        this.strawMochi = this.add.image(750, 560, 'strawmochi').setVisible(false).setScale(0.3);
        this.tangerineMochi = this.add.image(750, 560, 'tangermochi').setVisible(false).setScale(0.3);
        this.grapeMochi = this.add.image(750, 560, 'grapemochi').setVisible(false).setScale(0.3);
        this.mangoMochi = this.add.image(750, 560, 'mangomochi').setVisible(false).setScale(0.3);

        this.input.on('pointerdown', this.handlePointerDown, this);

        // 게임 타이머 설정
        this.totalTime = 100;
        this.timeLeft = this.totalTime;
        this.timerEvent = null;  // 타이머는 아직 시작하지 않음

        this.startCountdown();

        this.mochiStage = 0; // 0: 반죽, 1: 팥, 2: 과일

        this.score = 0;
        this.scoreText = this.add.text(800, 192, '0', { fontSize: '32px', fill: '#000' });

        this.spawnCustomer();
    }

    update() {
        const pointer = this.input.activePointer;
        this.handleCurtainHover(pointer);
    }

    startCountdown() {
        this.number.forEach((item, index) => {
            this.time.delayedCall(index * 1000, () => {
                if (this.currentCountdownImage) {
                    this.currentCountdownImage.destroy();
                }
                this.currentCountdownImage = this.add.image(this.scale.width / 2, this.scale.height / 2, item.imageKey)
                    .setOrigin(0.5)
                    .setScale(0.8);
            });
        });
    
        this.time.delayedCall(this.number.length * 1000, () => {
            if (this.currentCountdownImage) {
                this.currentCountdownImage.destroy();
                this.currentCountdownImage = null; 
            }
    
            // 게임을 시작합니다.
            this.startGame();
        });
    }
    
    startGame() {
        this.isGameActive = true;
        this.remainingTime = this.totalTime;
        
        // 첫 번째 손님 표시
        this.spawnCustomer();
    
        // 타이머 이벤트 시작 (게임 전체 타이머)
        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateGaugeBar,
            callbackScope: this,
            loop: true
        });
    }

    updateGaugeBar() {
        this.timeLeft -= 1;
    
        // 게이지 바 배경의 너비를 남은 시간 비율에 따라 조정
        let scaleX = this.timeLeft / this.totalTime;
    
        // 게이지 바 배경의 너비를 조정하고 위치를 고정
        const originalWidth = 360; // 원래의 배경 너비
        this.gaugeBarBackground.displayWidth = originalWidth * scaleX;
    
        // 게이지 바 배경의 x 위치를 조정하여 왼쪽이 고정된 상태에서 오른쪽으로 줄어들게 함
        this.gaugeBarBackground.x = 800 - (originalWidth * (1 - scaleX)) / 2;
    
        // 시간이 다 되면 GameOverScene으로 이동
        if (this.timeLeft <= 0) {
            // 게임이 종료되었을 때 점수를 저장하고 GameOverScene으로 이동
            this.sound.play('bell');
            this.registry.set('score', this.score);
            this.scene.start('GameOverScene');
        }
    }

    
    handlePointerDown(pointer) {
        if (this.isWithinBounds(pointer, this.strawberry)) {
            this.pickUpItem('strawberry');
        } else if (this.isWithinBounds(pointer, this.grape)) {
            this.pickUpItem('grape');
        } else if (this.isWithinBounds(pointer, this.tangerine)) {
            this.pickUpItem('tangerine');
        } else if (this.isWithinBounds(pointer, this.mango)) {
            this.pickUpItem('mango');
        } else if (this.isWithinBounds(pointer, this.ricedoughbowl)) {
            this.pickUpItem('ricedoughspoon');
        } else if (this.isWithinBounds(pointer, this.redbeanpastebowl)) {
            this.pickUpItem('redbeanspoon');
        } else if (this.isWithinBounds(pointer, this.strawMochi) && this.strawMochi.visible) {
            this.pickUpItem('strawmochi');
        } else if (this.isWithinBounds(pointer, this.grapeMochi) && this.grapeMochi.visible) {
            this.pickUpItem('grapemochi');
        } else if (this.isWithinBounds(pointer, this.tangerineMochi) && this.tangerineMochi.visible) {
            this.pickUpItem('tangermochi');
        } else if (this.isWithinBounds(pointer, this.mangoMochi) && this.mangoMochi.visible) {
            this.pickUpItem('mangomochi');
        } else if (this.isWithinBounds(pointer, this.board)) {
            this.placeItemOnBoard();
        } else if (this.isWithinBounds(pointer, this.curtain) && this.currentItem && this.currentItem.includes('mochi')) {
            // 커튼 열기 및 점수 증가 처리
            this.openedcurtain.setVisible(true);
            this.curtain.setVisible(false);
    
            // 현재 손님이 요청한 모찌와 준비된 모찌 비교
            let correctMochi = false;
            switch (this.currentCustomerData.name) {
                case '딸기 손님':
                    correctMochi = this.currentItem === 'strawmochi';
                    break;
                case '포도 손님':
                    correctMochi = this.currentItem === 'grapemochi';
                    break;
                case '귤 손님':
                    correctMochi = this.currentItem === 'tangermochi';
                    break;
                case '망고 손님':
                    correctMochi = this.currentItem === 'mangomochi';
                    break;
                case '특별한 손님':
                    correctMochi = true; // 특별한 손님은 아무 모찌나 가능
                    break;
            }
    
            if (correctMochi) {
                // 올바른 모찌 전달 시 점수 추가
                this.score += this.currentCustomerData.score;
                this.scoreText.setText(this.score);
                this.sound.play('success');
    
                // 현재 손님 타이머 제거
                if (this.customerTimer) {
                    this.customerTimer.remove();
                }
    
                // 현재 아이템 제거 및 다음 손님 표시
                this.clearCurrentItem();
                this.spawnCustomer();
            } else {
                // 잘못된 모찌를 전달했을 때 angrycus 이미지를 표시
                this.showAngryCustomer(() => {
                    this.clearCurrentItem();
                    this.spawnCustomer(); // 다음 손님 호출
                });
                this.score = Math.max(0, this.score - 1000);
                this.scoreText.setText(this.score);
            }
    
            // 커튼 닫기
            this.time.delayedCall(1000, () => {
                this.openedcurtain.setVisible(false);
                this.curtain.setVisible(true);
            });
        }
    }

    showAngryCustomer(callback) {
        if (this.angryCustomer) {
            this.angryCustomer.destroy(); // 기존 화난 손님 이미지 제거
        }
        this.sound.play('fail');
        this.angryCustomer = this.add.image(1200, 170, 'angrycus').setScale(0.2).setVisible(true);
        
        // 1초 후에 angrycus 이미지를 제거하고 콜백 함수 호출 (다음 손님 호출)
        this.time.delayedCall(1000, () => {
            if (this.angryCustomer) {
                this.angryCustomer.destroy(); // 화난 손님 이미지 제거
                this.angryCustomer = null;
            }
            if (callback) {
                callback(); // 다음 손님 호출을 위한 콜백 함수 실행
            }
        });
    }

    placeOnCurtain(mochiSprite) {
        mochiSprite.setPosition(this.curtainPosition.x, this.curtainPosition.y);
        mochiSprite.setInteractive();

        this.input.setDraggable(mochiSprite);
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
    }
    
    isWithinBounds(pointer, sprite) {
        let bounds = sprite.getBounds();
        return Phaser.Geom.Rectangle.Contains(bounds, pointer.x, pointer.y);
    }

    pickUpItem(item) {
        if (this.currentItemImage) {
            this.currentItemImage.destroy();
        }
    
        this.sound.play('pop');
    
        this.currentItem = item;
        // 도마에서 아이템 제거 (모찌가 이미 완성된 경우)
        switch (this.currentItem) {
            case 'strawmochi':
                this.strawMochi.setVisible(false);
                break;
            case 'tangermochi':
                this.tangerineMochi.setVisible(false);
                break;
            case 'grapemochi':
                this.grapeMochi.setVisible(false);
                break;
            case 'mangomochi':
                this.mangoMochi.setVisible(false);
                break;
            default:
                break;
        }
    
        this.currentItemImage = this.add.image(this.input.activePointer.x, this.input.activePointer.y, item).setDepth(1).setScale(0.3);
    
        // 기존의 드래그 리스너 제거 (포인터 움직임 이벤트)
        this.input.off(Phaser.Input.Events.POINTER_MOVE);
    
        // 커서에 따라 이미지가 이동하도록 설정
        this.input.on(Phaser.Input.Events.POINTER_MOVE, (pointer) => {
            if (this.currentItemImage) {
                this.currentItemImage.setPosition(pointer.x, pointer.y);
            }
        });
    }
    
    spawnCustomer() {
        if (!this.isGameActive) return;  // 게임이 시작되기 전에는 손님을 등장시키지 않음
    
        if (this.currentCustomer) {
            this.currentCustomer.destroy(); // 이전 손님 이미지를 제거
        }
        if (this.currentCustomerOrder) {
            this.currentCustomerOrder.destroy(); // 이전 손님 주문 이미지를 제거
        }
    
        // 일반 손님들은 배열에 2번씩 추가, 특별한 손님은 한 번만 추가
        const weightedCustomers = [
            this.customers[0], // 딸기 손님
            this.customers[0], // 딸기 손님
            this.customers[1], // 포도 손님
            this.customers[1], // 포도 손님
            this.customers[2], // 귤 손님
            this.customers[2], // 귤 손님
            this.customers[3], // 망고 손님
            this.customers[3], // 망고 손님
            this.customers[4]  // 특별한 손님
        ];
    
        // 가중치가 적용된 배열에서 랜덤으로 손님 선택
        const randomCustomer = Phaser.Utils.Array.GetRandom(weightedCustomers);
        this.currentCustomerData = randomCustomer; // 현재 손님 데이터를 저장
        this.currentCustomer = this.add.image(1200, 170, randomCustomer.imageKey).setScale(0.18);
    
        // 손님 주문에 맞는 과일 표시
        let orderFruitKey;
        switch (randomCustomer.name) {
            case '딸기 손님':
                orderFruitKey = 'strawberry';
                break;
            case '포도 손님':
                orderFruitKey = 'grape';
                break;
            case '귤 손님':
                orderFruitKey = 'tangerine';
                break;
            case '망고 손님':
                orderFruitKey = 'mango';
                break;
            default:
                orderFruitKey = null; // 특별한 손님이나 화난 손님일 경우 표시하지 않음
                break;
        }
    
        if (orderFruitKey) {
            this.currentCustomerOrder = this.add.image(1300, 110, orderFruitKey).setScale(0.13);
        } else {
            this.currentCustomerOrder = null; // 특별한 손님일 경우 표시를 건너뜀
        }
    
        // 손님 시간 제한 타이머 설정 (게임이 시작된 이후에만 작동)
        if (this.customerTimer) {
            this.customerTimer.remove(); // 이전 타이머 제거
        }
    
        this.customerTimer = this.time.delayedCall(this.currentCustomerData.timeLimit, () => {
            if (this.currentCustomer) {
                // 손님이 제한 시간 내에 서비스를 받지 못했을 경우 화난 손님 표시
                this.showAngryCustomer(() => {
                    this.clearCurrentItem();
                    this.spawnCustomer(); // 다음 손님 호출
                });
            }
        });
    }
    
    
    startCustomerTimer() {
        if (this.customerTimer) {
            this.customerTimer.remove(); // 이전 손님 타이머 제거
        }
        this.customerTimer = this.time.delayedCall(this.currentCustomerData.timeLimit, () => {
            this.spawnCustomer(); // 제한 시간 초과 시 다음 손님으로 교체
        });
    }

    clearCurrentItem() {
        if (this.currentItemImage) {
            this.currentItemImage.destroy(); // 현재 아이템 이미지 제거
            this.currentItemImage = null;
        }
        this.currentItem = null;
    }
    

    placeItemOnBoard() {
        if (!this.currentItem) return;
    
        switch (this.currentItem) {
            case 'ricedoughspoon':
                if (this.mochiStage === 0) { // 반죽 단계
                    this.flatdough.setVisible(true);
                    this.mochiStage++; // 다음 단계로 진행
                }
                break;
            case 'redbeanspoon':
                if (this.mochiStage === 1) { // 팥 단계
                    this.doughwithpaste.setVisible(true);
                    this.mochiStage++; // 다음 단계로 진행
                }
                break;
            case 'strawberry':
            case 'tangerine':
            case 'grape':
            case 'mango':
                if (this.mochiStage === 2) { // 과일 단계
                    switch (this.currentItem) {
                        case 'strawberry':
                            this.strawMochi.setVisible(true);
                            break;
                        case 'tangerine':
                            this.tangerineMochi.setVisible(true);
                            break;
                        case 'grape':
                            this.grapeMochi.setVisible(true);
                            break;
                        case 'mango':
                            this.mangoMochi.setVisible(true);
                            break;
                    }
    
                    // 반죽과 팥 이미지를 숨김
                    this.flatdough.setVisible(false);
                    this.doughwithpaste.setVisible(false);
    
                    // 모찌 완성 후 단계 초기화
                    this.mochiStage = 0;
                }
                break;
            default:
                break;
        }
    
        // 아이템 초기화
        this.currentItem = null;
        if (this.currentItemImage) {
            this.currentItemImage.destroy();
            this.currentItemImage = null;
        }
    }
    
    handleCurtainHover(pointer) {
        if (this.isWithinBounds(pointer, this.curtain)) {
            if (this.currentItem && this.currentItem.includes('mochi')) {
                // 커튼 열림 이미지로 변경
                this.openedcurtain.setVisible(true);
                this.curtain.setVisible(false);
            }
        } else {
            // 커튼 기본 이미지로 복구
            this.openedcurtain.setVisible(false);
            this.curtain.setVisible(true);
        }
    }
    
    handleCurtainClick(pointer) {
        if (this.isWithinBounds(pointer, this.openedcurtain) && this.currentItem && this.currentItem.includes('mochi')) {
            // 점수 추가
            this.score += 700;
            this.scoreText.setText(this.score);
    
            // 모찌 이미지 제거
            if (this.currentItemImage) {
                this.currentItemImage.destroy();
                this.currentItemImage = null;
            }
            this.currentItem = null;
    
            // 커튼 닫기
            this.openedcurtain.setVisible(false);
            this.curtain.setVisible(true);
        }
    }
    
    
}

export default MainGameScene;
