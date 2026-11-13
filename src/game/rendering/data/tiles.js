// Carrega todos os tiles de imagem do mapa e os organiza por número de ID para o renderizador usar em qualquer parte do jogo.
const tiles = import.meta.glob(
    '../../../assets/farm/*.png',
    {
        eager: true,
        query: '?url',
        import: 'default'
    }
);

const loadSprite = (src) => {
    const img = new Image();
    img.src = src;
    return img;
};

const sprites = {};

for (const [path, src] of Object.entries(tiles)) {
    const match = path.match(/tile_(\d+)\.png$/);
    if (match) {
        sprites[Number(match[1])] = loadSprite(src);
    }
}
const spritesLoaded = Promise.all(
    Object.values(sprites).map((sprite) => sprite.decode())
);

export { sprites, spritesLoaded };