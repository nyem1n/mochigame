import { useEffect } from 'react';
import './App.css';
import Game from './phaser/Game';

function App() {
    useEffect(() => {
        const phaserGame = new Game();
    return () => {
        if (phaserGame) {
        phaserGame.destroy(true); // Phaser 메모리 정리
        }
    };
}, []);

    return (
    <div id="game-container" style={{ width: '100vw', height: '100vh' }}>
      {/* 게임이 여기에 렌더링됩니다. */}
        
    </div>
    );
}

export default App;
