import '~/focus-visible/dist/focus-visible.min';

import 'components/mask/mask';
import Header from 'components/header/header';

import './registration.scss';

const headers = document.querySelectorAll('.js-header');

headers.forEach((header) => new Header(header));
