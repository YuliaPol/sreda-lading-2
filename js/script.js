jQuery(function ($) {
    $(document).ready(function () {
        var queenGif = new RandomObjectMover(document.getElementsByClassName('queen_gif')[0], document.getElementsByClassName('queen_wrraperGif')[0]);
        queenGif.setSpeed(100);
        queenGif.start();
        $('.page-wrapper').on('click' ,'.queen_gif ', function(e){
             queenGif.stop();
             $(this).parents('.queen_wrraperGif').remove();
        })
    });
});