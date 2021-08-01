import '~/focus-visible/dist/focus-visible.min';

import 'components/range-slider/range-slider.js';
import 'components/dropdown-choose/dropdown-choose';
import 'components/filter-date/filter-date';
import 'components/card-room/card-room';
import 'js/plugins/simplePagination.js';
import 'components/pagination/pagination';
import Header from 'components/header/header';
import DateDropdown from 'components/date-dropdown/DateDropdown';

import './filter.scss';

const headers = document.querySelectorAll('.js-header');

headers.forEach((header) => new Header(header));

const dateDropdownCollection = document.querySelectorAll('.js-date-dropdown');

dateDropdownCollection.forEach((input) => new DateDropdown(input));
