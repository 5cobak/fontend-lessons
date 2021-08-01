import '~/focus-visible/dist/focus-visible.min';

import Header from 'components/header/header';
import DateDropdown from 'components/date-dropdown/DateDropdown';
import 'components/dropdown-choose/dropdown-choose';

import './landing.scss';

const headers = document.querySelectorAll('.js-header');

headers.forEach((header) => new Header(header));

const dateDropdownCollection = document.querySelectorAll('.js-date-dropdown');

dateDropdownCollection.forEach((input) => new DateDropdown(input));
