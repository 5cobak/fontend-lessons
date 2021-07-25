import '~/focus-visible/dist/focus-visible.min';

import Header from 'components/header/header';
import 'components/circle-diagram/circle-diagram';
import 'components/dropdown-choose/dropdown-choose';
import 'components/like-button/like-button';
import 'components/card-book/card-book';

import './room-details.scss';

const headers = document.querySelectorAll('.js-header');

headers.forEach((header) => new Header(header));
