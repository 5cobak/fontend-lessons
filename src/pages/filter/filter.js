import '~/focus-visible/dist/focus-visible.min';

import 'components/range-slider/range-slider.js';
import 'components/dropdown-choose/dropdown-choose';
import 'components/card-room/card-room';
import 'js/plugins/simplePagination.js';
import 'components/pagination/pagination';
import Header from 'components/header/header';
import FilterDate from 'components/filter-date/FilterDate';

import './filter.scss';

const headers = document.querySelectorAll('.js-header');

headers.forEach((header) => new Header(header));

const inputs = document.querySelectorAll('.js-filter-date__input');

inputs.forEach((input) => new FilterDate(input, { inputId: 'input-filter-dates' }));
