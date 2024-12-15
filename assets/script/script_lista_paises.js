document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');

  images.forEach(image => {
    image.addEventListener('click', function() {
      if (this.src.includes('nao_favorito.png')) {
        this.src = this.src.replace('nao_favorito.png', 'favorito.png');
      } else if (this.src.includes('favorito.png')) {
        this.src = this.src.replace('favorito.png', 'nao_favorito.png');
      }
    });
  });
});
