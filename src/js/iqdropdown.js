(function ($) {
  const defaults = {
    maxItems: Infinity,
    minItems: 0,
    selectionText: 'item',
    textPlural: 'items',
    controls: {
      position: 'right',
      displayCls: 'iqdropdown-content',
      controlsCls: 'iqdropdown-item-controls',
      counterCls: 'counter',
    },
    items: {},
    onChange: () => {},
    beforeDecrement: () => true,
    beforeIncrement: () => true,
    setSelectionText (itemCount, totalItems) {
      const usePlural = totalItems !== 1 && this.textPlural.length > 0;
      const text = usePlural ? this.textPlural : this.selectionText;
      return `${totalItems} ${text}`;
    }
  };

  $.fn.iqDropdown = function (options) {
    this.each(function () {
      const $this = $(this);
      const $selection = $this.find('p.iqdropdown-selection').last();
      const $menu = $this.find('div.iqdropdown-menu');
      const $items = $menu.find('div.iqdropdown-menu-option');
      const dataAttrOptions = {
        selectionText: $selection.data('selection-text'),
        textPlural: $selection.data('text-plural'),
      };
      const settings = $.extend(true, {}, defaults, dataAttrOptions, options);
      let itemCount = {};
      let totalItems = 0;

      function updateDisplay () {
        totalItems == 0 ? $('.guests .buttons-actions__clean-off').css('display','none') : $('.guests .buttons-actions__clean-off').css('display','block');
        $selection.html(settings.setSelectionText(itemCount, totalItems));
      }

      function setItemSettings (id, $item) {
        const minCount = Number($item.data('mincount'));
        const maxCount = Number($item.data('maxcount'));

        settings.items[id] = {
          minCount: Number.isNaN(Number(minCount)) ? 0 : minCount,
          maxCount: Number.isNaN(Number(maxCount)) ? Infinity : maxCount,
        };
      }


      function addControls (id, $item) {
        const $controls = $('<div />').addClass(settings.controls.controlsCls);
        const $decrementButton = $(`
          <button class="button-decrement">
            <i class="icon-decrement"></i>
          </button>
        `);
        const $incrementButton = $(`
          <button class="button-increment">
            <i class="icon-decrement icon-increment"></i>
          </button>
        `);
        const $counter = $(`<span>${itemCount[id]}</span>`).addClass(settings.controls.counterCls);
        const $buttonsActions = $('.buttons-actions');
        const $buttonCleanOff = $('.buttons-actions__clean-off');
        const $buttonApply = $('.buttons-actions__apply');
        $('.guests .buttons-actions__clean-off').css('display','none');
        $buttonsActions.click(function(e){
          e.stopPropagation();
        });
        $buttonCleanOff.click(function(e){
          totalItems = 0;
          itemCount[id] = 0;
          $counter.html(itemCount[id]);
          updateDisplay();

          
          // $('.iqdropdown.guests').removeClass('menu-open');
        });
        $buttonApply.click(function(e){
          $('.iqdropdown.guests').removeClass('menu-open');
          $('.iqdropdown.guests').removeClass('borderBottomFocus');
        });
        $(document).click(function(){
          $('.iqdropdown.guests').removeClass('menu-open');
          $('.iqdropdown.guests').removeClass('borderBottomFocus');
        });
         $('.iqdropdown.guests').click(function(e){
          e.stopPropagation();
        });


        $item.children('div').addClass(settings.controls.displayCls);
        $controls.append($decrementButton, $counter, $incrementButton);

        if (settings.controls.position === 'right') {
          $item.append($controls);
        } else {
          $item.prepend($controls);
        }

        $decrementButton.click((event) => {
          const { items, minItems, beforeDecrement, onChange } = settings;
          const allowClick = beforeDecrement(id, itemCount);

          if (allowClick && totalItems > minItems && itemCount[id] > items[id].minCount) {
            itemCount[id] -= 1;
            totalItems -= 1;
            $counter.html(itemCount[id]);
            updateDisplay();
            onChange(id, itemCount[id], totalItems);
          }

          event.preventDefault();
        });

        $incrementButton.click((event) => {
          const { items, maxItems, beforeIncrement, onChange } = settings;
          const allowClick = beforeIncrement(id, itemCount);

          if (allowClick && totalItems < maxItems && itemCount[id] < items[id].maxCount) {
            itemCount[id] += 1;
            totalItems += 1;
            $counter.html(itemCount[id]);
            updateDisplay();
            onChange(id, itemCount[id], totalItems);
          }

          event.preventDefault();
        });

        $item.click(event => event.stopPropagation());

        return $item;
      }

      $this.click(() => {
        $this.toggleClass('menu-open');
      });

      $items.each(function () {
        const $item = $(this);
        const id = $item.data('id');
        const defaultCount = Number($item.data('defaultcount') || '0');

        itemCount[id] = defaultCount;
        totalItems += defaultCount;
        setItemSettings(id, $item);
        addControls(id, $item);
      });
      updateDisplay();
    });

    return this;
  };
}(jQuery));



// initialization 

$(document).ready(() => {
  $('.iqdropdown.guests').iqDropdown({
  // max total items
  maxItems: Infinity,
  // min total items
  minItems: "",
  // text to show on the dropdown override data-selection-text attribute
  selectionText: 'гость',
  // text to show for multiple items
  textPlural: 'гостей',
  // optionally can use setSelectionText function to override selectionText
  setSelectionText: (itemCount, totalItems) => {
     // line declination function
        function declination(n, text_forms){

          n = Math.abs(n) % 100; var n1 = n % 10;
          if (n >= 5 && n < 20) { return text_forms[2]; }
          if (n1 > 1 && n1 <= 4) { return text_forms[1]; }
          if (n1 == 1) { return text_forms[0]; }
          if(n == 0) {return text_forms[3]}

          return text_forms[2];

      };
      if (totalItems == 0) return declination(totalItems, ["гость", "гостя", "гостей", "Сколько гостей"]);
      else return totalItems + " " +declination(totalItems, ["гость", "гостя", "гостей", "Сколько гостей"]);

  },
  cleanOff: () => {},
  controls: {
    counterCls: 'counter'
  },
  // buttons to increment/decrement

  // fires when an item quantity changes
  onChange: (id, count, totalItems) => {

  },
  // return false to prevent an item decrement
  // beforeDecrement: (id, itemCount) => {},
  // return false to prevent an item increment
  // beforeIncrement: (id, itemCount) => {}
    

  });

  // disabled button-decrement/increment, change opacity from 1 to .5
  if( $('.button-decrement').next().html() ==0) {
      $('.button-decrement').addClass('disabled-button')
    }
    else $('.button-decrement').removeClass('disabled-button');
  if( $('.button-increment').prev().html() == 10) {
      $('.button-increment').addClass('disabled-button')
    }
    else $('.button-increment').removeClass('disabled-button');
  

  $('.button-decrement').click(function(){
    if( $(this).next().html() == 0) {
      $(this).addClass('disabled-button')
    }
    else {
      $(this).removeClass('disabled-button');
      $(this).next().next().addClass('disabled-button');
    }
  });

  $('.button-increment').click(function(){
    if( $(this).prev().html() > 0) {
      $(this).prev().prev().removeClass('disabled-button')
    }
    else $(this).prev().prev().removeClass('disabled-button');
    if( $(this).prev().html() == 10) {
      $(this).addClass('disabled-button');
    }
    else $(this).removeClass('disabled-button');
  });
  $('.buttons-actions__clean-off').click(function(){
    $(".button-increment").removeClass('disabled-button');
    $(".button-decrement").addClass('disabled-button');
  });

  $('.iqdropdown').click(function(){
    $(this).toggleClass('borderBottomFocus')
  });
});