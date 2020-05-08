$(document).ready(() => {
  // air-datePicker
  const start1 = $('.datepicker-here.date-start-1');
  const end1 = $('.date-end-1');
  const start2 = $('.datepicker-here.date-start-2');
  const end2 = $('.date-end-2');

  // const myDatepicker1 = $start.datepicker().data('datepicker');
  const myDatepicker2 = $('.datepicker-here.date-dropdown-2').datepicker().data('datepicker');
  const myDatepickerStart1 = $('.datepicker-here.date-start-1').datepicker().data('datepicker');
  const myDatepickerStart2 = $('.datepicker-here.date-start-2').datepicker().data('datepicker');

  // double input date-picker
  const isPickerVisible1 = false;
  const isPickerVisible2 = false;

  function setDatePicker(start, end, isVisible) {
    start.datepicker({
      clearButton: true,
      range: true,
      onSelect(fd) {
        let commonVal = start.val();
        start.val(commonVal.slice(0, 10));
        end.val(commonVal.slice(10));
        maskForRangeDate(start,end);
        commonVal = '';
      },
      multipleDatesSeparator: '',
      onShow(dp, complete) {
        if (complete) { isVisible = true; }
      },
      onHide(dp, complete) {
        // console.log(start.val());
        // console.log(end.val());
        if (complete) isVisible = false; 
      },
    });

    $(start).on('click', () => {
      if (isVisible) {
        start.data('datepicker').hide();
      } else {
        start.data('datepicker').show();
      }
    });
    $(end).on('click', () => {
      if (isVisible) { start.data('datepicker').hide(); } else // invisibile
      { start.data('datepicker').show(); }
    });
  }
  // set double input date-picker

  setDatePicker(start1, end1, isPickerVisible1);
  setDatePicker(start2, end2, isPickerVisible2);


  $('.card.datepicker-here').datepicker({
    // minDate: new Date()
    inline: true,
    clearButton: true,
    range: true,
  });

  $('.datepicker-here.date-dropdown-2').datepicker({
    // minDate: new Date()
    clearButton: true,
    range: true,
    dateFormat: 'd M',
    multipleDatesSeparator: ' - ',
    onShow() {
      myDatepicker2.$datepicker.hasClass('active') ? myDatepicker2.$el.parent().find('svg.expand-more').addClass('expand-more_active')
        : myDatepicker2.$el.parent().find('svg.expand-more').removeClass('expand-more_active');
    },
    onHide() {
      myDatepicker2.$datepicker.hasClass('active') ? myDatepicker2.$el.parent().find('svg.expand-more').addClass('expand-more_active')
        : myDatepicker2.$el.parent().find('svg.expand-more').removeClass('expand-more_active');
    },

  });


  $('.datepicker').find('.datepicker--button-apply').click(() => {
    myDatepickerStart1.hide();
    // myDatepicker2.hide();
    myDatepickerStart2.hide();
  });

  // keypress off on filter date dropdown
  $('.date-dropdown-2').keypress(() => false);

  // add style for range elements in

  $('.datepicker--cells').click(() => {
    console.log($(this).find('div.-range-from-').text());
    if($(this).find('.-range-to-').hasClass('-selected-')) {
      $(this).find('.-range-from-').addClass('after-range-from');
    }else $(this).find('.-range-from-').removeClass('after-range-from');
  });

  $('.iqdropdown-selection').focus(() => {
    $(this).parent().find('svg').css('fill', 'rgba(31, 32, 65, 0.75)');
  });
  $('.iqdropdown-selection').blur(() => {
    $(this).parent().find('svg').css('fill', 'rgba(31, 32, 65, 0.5)');
  });
  // esline-disable-next-line
  
  $(document).ready(() => {
     $('.datepicker').each(function(){
      $(this).width($('.wrap-element_inline').width());
    });
  });
 
  //mask for range input

  function maskForRangeDate(input1, input2) {
    input1.mask('00.00.0000');
    input2.mask('00.00.0000');

    input1.focus(() => {
      /* запускаем нашу функцию проверки. Передаем идентификатор input и шаблон выражения */
      if (input1.val() !== '' && input2.val() !== '') {
        input1.parent().parent().find('.bad-value').remove();
        input1.parent().parent().find('.br').remove();
      } else {
        input1.parent().parent().find('.bad-value').remove();
        input1.parent().parent().find('.br').remove();
        input1.parent().parent().append('<br class="br"><span class="bad-value">Заполните все поля.<span>');
      }
    });
  }
});
