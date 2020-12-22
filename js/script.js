jQuery(function ($) {
    $(document).ready(function () {
        var queenGif = new RandomObjectMover(document.getElementsByClassName('queen_gif')[0], document.getElementsByClassName('queen_wrraperGif')[0]);
        queenGif.setSpeed(100);
        queenGif.start();
        $('.page-wrapper').on('click' ,'.queen_gif ', function(e){
             queenGif.stop();
             $(this).parents('.queen_wrraperGif').remove();
        });

        $('.feedback input').focus(function(e){
          $(this).parents('.input-wrapper').addClass('focus');
        });
        $('.feedback textarea').focus(function(e){
          $(this).parents('.input-wrapper').addClass('focus');
        });
        $('.feedback input').blur(function(e){
          $(this).parents('.input-wrapper').removeClass('focus');
        });
        $('.feedback textarea').blur(function(e){
          $(this).parents('.input-wrapper').removeClass('focus');
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
        $('.reviews_slider').slick({
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
                breakpoint: 601,
                settings: {
                  slidesToShow: 1,
                }
              }
          ],
        });

        

        //validation
        var formValid = $('.valid-form-send').parents('form');
        $('.valid-form-send').click(function () {
            $(this).parents('form').submit(function (e) {
                e.preventDefault();
                if($(formValid).hasClass('sended')) {
                  $('#sended-form').fadeIn(300)
                }
                else {
                  var el = document.querySelectorAll('.form-valid [data-reqired]');
                  var erroreArrayElemnts = [];
                  for (var i = 0; i < el.length; i++) {
                      if (el[i].value === '' || el[i].value === ' ' || el[i].value === '-') {
                          erroreArrayElemnts.push(el[i]);
                          $(el[i]).parents('.form-group').addClass('has-error');
                          if($(el[i]).parents('.name-wrapper').length>0){
                            $(el[i]).parents('.form-group').find('.error-message').html('Введите имя');
                          }
                          if($(el[i]).parents('.email-wrapper').length>0){
                            $(el[i]).parents('.form-group').find('.error-message').html('Введите электронный адрес');
                          }
                          if($(el[i]).parents('.message-wrapper').length>0){
                            $(el[i]).parents('.form-group').find('.error-message').html('Введите cообщение');
                          }
                          $(el[i]).focus(function (e) {
                              $(e.target).parents('.form-group').removeClass('has-error');
                          });
                      }
                  }
                  if($('.form-valid .email-wrapper input').val() !== ''){
                    var email = $('.form-valid .email-wrapper input').val();
                    if(!validateEmail(email)){
                      erroreArrayElemnts.push($('.form-valid .email-wrapper input')[0]);
                      $('.form-valid .email-wrapper input').parents('.form-group').find('.error-message').html('Неправильный электронный адрес');
                      $('.form-valid .email-wrapper input').parents('.form-group').addClass('has-error');
                      $('.form-valid .email-wrapper input').focus(function (e) {
                        $('.form-valid .email-wrapper input').parents('.form-group').removeClass('has-error');
                      });
                    }
                  }
                  if (erroreArrayElemnts.length == 0) {

                    // modal
                    // $('#thankyou-modal').fadeIn(300)
                    // setTimeout(function(){ $(formValid).addClass('sended'); }, 1000);

                    //hide form and show text
                    var url = formValid.attr('action'); // the script where you handle the form input.
                    $.ajax({
                      type: "POST",
                      url: url,
                      data: $(formValid).serialize(), // serializes the form's elements.
                      dataType: "json",
                      }).done(function (data) {
                        // данные сохранены
                        $('.feedback .form-sended').fadeIn(300);
                        formValid.fadeOut(0);
                      }).fail(function (data) {
                          // не удалось выполнить запрос к серверу
                          console.log(data);
                          console.log('Запрос не принят');
                      });
                    return false; // avoid to execute the actual submit of the form.
                      // formValid.submit();
                  }
                  if (erroreArrayElemnts.length > 0) {
                      console.log(erroreArrayElemnts);
                      console.log('Valid error');
                      return false;
                  }
                }
            });
        });

        function validateEmail(email) {
          const re = /^(([^<>()[\]\\,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(email).toLowerCase());
      }

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target !== $('.modal')) {
          $('.modal').fadeOut(300);
        }
      }
      $('.modal .close').click(function(e){
        $('.modal').fadeOut(300);
      });

      //scroll to element on anchor click
      $(document).on('click', 'a[href^="#"]', function (event) {
          event.preventDefault();
      
          $('html, body').animate({
              scrollTop: $($.attr(this, 'href')).offset().top
          }, 1000);
      });

    });
});