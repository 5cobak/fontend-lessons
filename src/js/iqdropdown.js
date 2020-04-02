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
        totalItems == 0 ? $($this).find(".buttons-actions__clean-off").css('display','none') : $($this).find('.buttons-actions__clean-off').css('display','block');
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
        const $buttonCleanOff = $($this).find('.buttons-actions__clean-off');
        const $buttonApply = $($this).find('.buttons-actions__apply');
        $('.iqdropdown .buttons-actions__clean-off').css('display','none');
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
          $(this).parent().parent().parent().removeClass('menu-open');
          $(this).parent().parent().parent().removeClass('borderBottomFocus');
        });
        $(document).click(function(){
          $('.iqdropdown').removeClass('menu-open');
          $('.iqdropdown').removeClass('borderBottomFocus');
        });
        $('.iqdropdown').click(function(e){

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

  // dropdown for bedrooms

  $('.iqdropdown.bedrooms').iqDropdown({
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
     let item1 = itemCount.item1;
     let item2 = itemCount.item2;
     let item3 = itemCount.item3;
     function declination(n, text_forms){

      n = Math.abs(n) % 100; var n1 = n % 10;
      if (n >= 5 && n < 20) { return text_forms[2]; }
      if (n1 > 1 && n1 <= 4) { return text_forms[1]; }
      if (n1 == 1) { return text_forms[0]; }
      if(n == 0) {return text_forms[3]}

        return text_forms[2];

    };
    let total = [];
    let t1 = item1 + " " + declination(item1,["спальня", "спальни", "спальней", "спальней"]);
    let t2 = item2 + " " + declination(item2,["кровать", "кровати", "кроватей", "кроватей"]);
    let t3 = item3 + " " + declination(item3,["ванная", "ванны", "ванных", "ванных"]);
    if (item1 > 0) {
      total.push(t1); 
    }
    if (item2 > 0) {
      total.push(t2); 
    }
    if (item3 > 0) {
      total.push(t3); 
    }

    // item1 + " " + declination(item1,["спальня", "спальни", "спальней", "спальней"])
    // + ", " + item2 + " " + declination(item2,["кровать", "кровати", "кроватей", "кроватей"])
    // + ", " + item3 + " " + declination(item3,["ванная", "ванны", "ванных", "ванных"]);

    // if (totalItems == 0) return ("Спальни, кровати, ванные комнаты").substr(0,20) + '...';
    // else if(total.length > 20) return total.join(', ').substr(0, 20) + "...";
    // else return total.join(', ');
    if(totalItems > 0) {
      return total.join(', ').length >= 20 ? total.join(', ').substr(0, 20) + "..." : total.join(', ');
    }
    else return ("Спальни, кровати, ванные комнаты").substr(0,20) + '...';
  },
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
  if( $('.button-decrement').next().html() == 0) {
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