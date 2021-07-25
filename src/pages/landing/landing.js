import '~/focus-visible/dist/focus-visible.min';

import Header from 'components/header/header';
import 'components/card-selection/card-selection';

import './landing.scss';

const headers = document.querySelectorAll('.js-header');

headers.forEach((header) => new Header(header));
