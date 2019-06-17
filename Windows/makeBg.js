function createGradTexture() {
    // adjust it if somehow you need better quality for very very big images
    const quality = 256;
    const canvas = document.createElement('canvas');
    canvas.width = quality;
    canvas.height = 1;

    const ctx = canvas.getContext('2d');

    // use canvas2d API to create gradient
    const grd = ctx.createLinearGradient(0, 0, quality, 0);
    grd.addColorStop(0, 'rgba(0, 0, 0, 1)');
    grd.addColorStop(1, 'cyan');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, quality, 1);

    return PIXI.Texture.from(canvas);
}