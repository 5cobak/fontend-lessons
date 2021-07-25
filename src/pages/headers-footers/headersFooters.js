import '~/focus-visible/dist/focus-visible.min';

import Header from 'components/header/header';

import './headers-footers.scss';

const headers = document.querySelectorAll('.js-header');

headers.forEach((header) => new Header(header));
