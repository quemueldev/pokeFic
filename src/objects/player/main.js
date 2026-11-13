// Encapsula as funções de desenho e movimento do jogador em um único módulo para uso centralizado no resto do código.
import { drawPlayer } from './draw';
import { UseMove } from './moves';

export default function handlePlayer() {
    return {
        drawPlayer,
        UseMove,
    };
}