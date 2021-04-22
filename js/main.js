document.addEventListener("DOMContentLoaded", function() {
  const menu__item = document.getElementsByClassName("menu__item");
  menu__item.forEach(element => {
    element.addEventListener('click', () => {
      addAndRemoveMenu(element);
    });
    element.addEventListener('keypress', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        addAndRemoveMenu(element);
    }
    });
  });

  function addAndRemoveMenu(element) {
    if (document.querySelector('.drop-down-menu_active')) {
      document.querySelector('.drop-down-menu_active').closest('.menu__item').querySelectorAll('.item-check')[1].classList.remove('item-check_up');
      document.querySelector('.drop-down-menu_active').closest('.menu__item').querySelectorAll('.item-check')[0].classList.add('item-check_down');
      if (document.querySelector('.drop-down-menu_active') === element.querySelector('.drop-down-menu')) {
        document.querySelector('.drop-down-menu_active').classList.remove('drop-down-menu_active');
        return;
      }
      document.querySelector('.drop-down-menu_active').classList.remove('drop-down-menu_active');
    }
    const dorp_down_menu = element.querySelector('.drop-down-menu');
    dorp_down_menu.classList.toggle('drop-down-menu_active');
    dorp_down_menu.closest('.menu__item').querySelector('.menu__choice').focus();
    document.querySelector('.drop-down-menu_active').closest('.menu__item').querySelectorAll('.item-check')[0].classList.remove('item-check_down');
    document.querySelector('.drop-down-menu_active').closest('.menu__item').querySelectorAll('.item-check')[1].classList.add('item-check_up');
  }

  function chekClickOutElement (event) {
    const menu_active = document.querySelector('.drop-down-menu_active');
    if (menu_active) {
      const menu = menu_active.closest('.menu__item');
      if (!menu.contains(event.target)) {
        menu.querySelectorAll('.item-check')[1].classList.remove('item-check_up');
        menu.querySelectorAll('.item-check')[0].classList.add('item-check_down');
        menu_active.classList.remove('drop-down-menu_active');
      };
    }
  };

  document.onclick = chekClickOutElement;
  hideHoverOnMenu();

  function hideHoverOnMenu() {
    const all_drop_down_menu = document.querySelectorAll('.drop-down-menu');
    all_drop_down_menu.forEach(function(element) {
      element.addEventListener('mouseenter', () => {
        element.closest('.menu__item').classList.add('menu__item_nohover');
      });
      element.addEventListener('mouseleave', () => {
        element.closest('.menu__item').classList.remove('menu__item_nohover');
      });
    });
  }

  const searh = document.getElementsByClassName('search__input')[0];
  searh.onfocus = function() {
    document.getElementsByClassName('search__iqon')[0].getElementsByTagName('path')[0].style.fill = 'var(--light-purple-color)';
    document.getElementsByClassName('search__iqon')[0].getElementsByTagName('rect')[0].style.fill = 'var(--light-purple-color)';
  };
  searh.onblur = function() {
    document.getElementsByClassName('search__iqon')[0].getElementsByTagName('path')[0].style.fill = 'var(--white-color)';
    document.getElementsByClassName('search__iqon')[0].getElementsByTagName('rect')[0].style.fill = 'var(--white-color)';
  }

  document.querySelectorAll('.artists__item').forEach(function(artist) {
    artist.addEventListener('click', function(event) {
      const path = event.currentTarget.dataset.path;
      document.querySelector('.country-choice_active').querySelector('.artist_active').classList.remove('artist_active');
      document.querySelector(`[data-target="${path}"]`).classList.add('artist_active');
    });
  });

  document.querySelectorAll('.country-selection__btn').forEach(function(country) {
    country.addEventListener('click', function(event) {
      const path = event.currentTarget.dataset.path;
      document.querySelector('.country-selection__btn_active').classList.add('country-selection__btn_out');
      document.querySelector('.country-selection__btn_active').classList.remove('country-selection__btn_active');
      event.currentTarget.classList.add('country-selection__btn_active');
      if (event.currentTarget.classList.contains('country-selection__btn_out')) event.currentTarget.classList.remove('country-selection__btn_out');
      document.querySelector('.country-choice_active').classList.remove('country-choice_active');
      document.querySelector(`[data-target="${path}"]`).classList.add('country-choice_active');
    });
  });


  const events_btn = document.querySelector('.events__btn');
  events_btn.addEventListener('click', () => {
    const events_items = document.querySelectorAll('.events__item');
    events_items.forEach(element => {
      if(element.classList.contains('events__item_active')) return;
      element.classList.add('events__item_active');
    });
    document.querySelector('.events').style.marginBottom = '30px';
    events_btn.classList.add('events__btn_disable');
  });

  /* ANCHRING */
  function scrollTo(className) {
    $(className).on('click', function(event){
      event.preventDefault();

      let href = $(this).attr('href');

      let offset = $(href).offset().top;

      $('body,html').animate({
        scrollTop: offset,
        }, 900);
    });
  }

  scrollTo('.navigation-list__link');
  scrollTo('.hero__link');

  var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  $( function() {
    for (let i = 1; i <= 5; i++) {
      let tempId = '#accordion' + i;
      $(tempId).accordion({
        collapsible: true,
        active: false,
        heightStyle: 'content',
        header: '.accordion-header',
        icons: false,
        beforeActivate: function(e, ui) {
          if (ui.oldHeader[0]) {
            ui.oldHeader[0].querySelector('.years__tick_down').classList.toggle('years__tick_active');
            ui.oldHeader[0].querySelector('.years__tick_up').classList.toggle('years__tick_active');
          }
          if (ui.newHeader[0]) {
            ui.newHeader[0].querySelector('.years__tick_down').classList.toggle('years__tick_active');
            ui.newHeader[0].querySelector('.years__tick_up').classList.toggle('years__tick_active');
          }
        }
      });
    }
  });

  var selector = document.querySelector("input[type='tel']");
    var im = new Inputmask("+7 (999)-999-99-99");
    im.mask(selector);

    new JustValidate('.contacts-form', {
      rules: {
        name: {
          required: true,
          minLength: 2,
          maxLength: 50
        },
        tel: {
          required: true,
          function: (name, value) => {
            const phone = selector.inputmask.unmaskedvalue();
            return Number(phone) && phone.length === 10;
          }
        },
      },
      messages: {
        name: 'Как Вас зовут?',
        tel: 'Укажите ваш телефон',
      },
    });

  ymaps.ready(init);
  function init(){
      var myMap = new ymaps.Map("map", {
          center: [55.7575313865371,37.637879407684245],
          zoom: 14
      });

      var myPlacemark = new ymaps.Placemark([55.75846306898368,37.601079499999905], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'img/contacts/placemark.svg',
        iconImageSize: [20, 20],
        iconImageOffset: [0, 0]
      });

      myMap.geoObjects.add(myPlacemark);
  }
});
