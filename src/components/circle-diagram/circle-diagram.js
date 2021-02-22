import CircleDiagram from './CircleDiagram';

$(document).ready(() => {
  const el = document.querySelector('.circle-diagram');
  if (!el) return;
  new CircleDiagram(el);
});
