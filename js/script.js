jQuery(function ($) {
    $(document).ready(function () {

          $.fn.inputFilter = function(inputFilter) {
            return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
              if (inputFilter(this.value)) {
                  this.oldValue = this.value;
                  this.oldSelectionStart = this.selectionStart;
                  this.oldSelectionEnd = this.selectionEnd;
                  } else if (this.hasOwnProperty("oldValue")) {
                  this.value = this.oldValue;
                  this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                  } else {
                  this.value = "";
              }
            });
        };

        $.fn.isInViewport = function() {
          var elementTop = $(this).offset().top;
          var elementBottom = elementTop + $(this).outerHeight();
          var viewportTop = $(window).scrollTop();
          var viewportBottom = viewportTop + $(window).height();
          return elementBottom > viewportTop && elementTop < viewportBottom;
        };

        $('.mobile-menu').click(function(e){
          $(this).find('.icon-menu').toggleClass('active');
          $(this).parents('.nav-menu-wrapper').find('.nav-menu').toggleClass('active');
        });

        $(document).click(function(event) { 
            var $target = $(event.target);
            if(!$target.parents('.nav-menu-wrapper').length && 
            $('.nav-menu').hasClass('active')){
              $('.mobile-menu').click();
            }       
        });

        function checkBlockIntoView(){
          let menuItems = $('.nav-menu .menu-item');
          for( let i = 0; i < menuItems.length; i++ ) {
            let blockId =  $(menuItems[i]).find('a').attr('href');
            if ($(blockId).isInViewport()) {
              $('.nav-menu .menu-item').removeClass('active');
              $(menuItems[i]).addClass('active');
            }
          }
        }
        checkBlockIntoView();
        $(window).scroll(function(){
          checkBlockIntoView();
        });

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

        $('.feedback').on('change', '.email-wrapper input', function(e){
          let email = $(this).val();
          if(email){
            if(!validateEmail(email)){
              $('.form-valid .email-wrapper input').parents('.form-group').find('.error-message').html('Неправильный электронный адрес');
              $('.form-valid .email-wrapper input').parents('.form-group').addClass('has-error');
              $('.form-valid .email-wrapper input').focus(function (e) {
                $('.form-valid .email-wrapper input').parents('.form-group').removeClass('has-error');
              });
            }
          }
        });

        $(".feedback .phone-wrapper input").inputFilter(function(value) {
            return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 9999999999999);
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

      //customselect
      customSelectActive();
      function customSelectActive(){
          $('.customselect').each(function(){
              if(!$(this).hasClass('select-hidden')){
                  $(this).parent().addClass('customselect-wrapper');
                  var $this = $(this),
                  numberOfOptions = $(this).children('option').length;
                  $this.addClass('select-hidden'); 
                  $this.wrap('<div class="select"></div>');
                  $this.after('<div class="select-styled"></div>');
                  var $styledSelect = $this.next('div.select-styled');
                  if($this.find('option:selected').length>0){
                      $styledSelect.text($this.find('option:selected').text());
                  }
                  else {
                      $styledSelect.text($this.children('option').eq(0).text());
                  }
              
                  var $list = $('<ul />', {
                      'class': 'select-options'
                  }).insertAfter($styledSelect);
              
                  for (var i = 0; i < numberOfOptions; i++) {
                    if(!$this.children('option').eq(i).attr('disabled')){
                      $('<li />', {
                        text: $this.children('option').eq(i).text(),
                        rel: $this.children('option').eq(i).val()
                    }).appendTo($list);
                    }
                  }
              
                  var $listItems = $list.children('li');
              
                  $styledSelect.click(function(e) {
                      e.stopPropagation();
                      $('div.select-styled.active').not(this).each(function(){
                          $(this).removeClass('active').next('ul.select-options').hide();
                      });
                      $(this).toggleClass('active').next('ul.select-options').toggle();
                  });
              
                  $listItems.click(function(e) {
                      e.stopPropagation();
                      $styledSelect.text($(this).text()).removeClass('active');
                      $this.val($(this).attr('rel'));
                      $list.hide();
                      $this.change();
                  });
              
                  $(document).click(function() {
                      $styledSelect.removeClass('active');
                      $list.hide();
                  });
              }
          });   
      }
    });

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').on('click', function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });
});
document.onreadystatechange = function() { 
  if (document.readyState !== "complete") { 
    $('.page-wrapper').fadeIn(300);
    $('.loader-wrapper').fadeOut(300);
  } else { 
    $('.page-wrapper').fadeIn(0);
    $('.loader-wrapper').fadeOut(0);
  } 
}; 