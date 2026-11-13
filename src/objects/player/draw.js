// Desenha o sprite do personagem do jogador na posição atual, usando a coordenada interpolada para dar suavidade ao movimento.
function drawPlayer(ctx, player, tamanho, sprites) {
    const sprite = sprites[109];
    const pixelX = (player.renderX ?? player.x) * tamanho;
    const pixelY = (player.renderY ?? player.y) * tamanho;
    if (sprite?.complete && sprite.naturalWidth > 0) {
        ctx.drawImage(
            sprite,
            pixelX,
            pixelY,
            tamanho,
            tamanho
        );
    }
}

export { drawPlayer };