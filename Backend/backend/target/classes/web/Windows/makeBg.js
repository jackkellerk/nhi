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
    grd.addColorStop(1, 'rgba(41, 79, 79, 1)');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, quality, 1);

    return PIXI.Texture.from(canvas);
}
  
  
  function w_hoverCloseButton(event) {
    this.alpha = 1;
  }
  
  function w_hoverCloseButtonOff(event) {
    this.alpha = 0.5;
  }
  
  function w_disablePopup(event) {
    app.stage.removeChild(w_PopupContainer);
  }
  