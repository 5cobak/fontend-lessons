import '~/focus-visible/dist/focus-visible.min';
import '~/inputmask/dist/jquery.inputmask.min';

import Header from 'components/header/header';

import './sign-in.scss';

const headers = document.querySelectorAll('.js-header');

headers.forEach((header) => new Header(header));
