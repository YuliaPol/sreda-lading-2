jQuery(function ($) {
    $(document).ready(function () {
        var queenGif = new RandomObjectMover(document.getElementsByClassName('queen_gif')[0], document.getElementsByClassName('queen_wrraperGif')[0]);
        queenGif.setSpeed(100);
        queenGif.start();
        $('.page-wrapper').on('click' ,'.queen_gif ', function(e){
             queenGif.stop();
             $(this).parents('.queen_wrraperGif').remove();
        });

        $('.slider_container').slick({
            infinite: true,
            dots: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1920,
                    settings: {
                      slidesToShow: 3,
                    }
                },
                {
                  breakpoint: 993,
                  settings: {
                    slidesToShow: 2,
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 1,
                  }
                }
            ],
        });
        $('.screenshots_slider').slick({
          infinite: true,
          dots: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          responsive: [
              {
                  breakpoint: 1920,
                  settings: {
                    slidesToShow: 3,
                  }
              },
              {
                breakpoint: 993,
                settings: {
                  slidesToShow: 2,
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                }
              }
          ],
        });
        $('.speaker-slider').slick({
          infinite: true,
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 1,
          customPaging: 50,
          responsive: [
              {
                  breakpoint: 1920,
                  settings: {
                    slidesToShow: 2,
                  }
              },
              {
                breakpoint: 993,
                settings: {
                  slidesToShow: 2,
                }
              },
              {
                breakpoint: 767,
                settings: {
                  slidesToShow: 1,
                }
              }
          ],
      });
    });
});