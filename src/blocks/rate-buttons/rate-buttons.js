$(document).ready(() => {
  const rateButtons = document.querySelectorAll('.rate-buttons');

  rateButtons.forEach((item) => {
    const inputs = item.querySelectorAll('input');

    inputs.forEach((item) => {
      function paintStars(e) {
        inputs.forEach((item) => {
          item.checked = false;
        });
        e.target.checked = true;
        for (let i = 0; i < 5; i += 1) {
          if (inputs[i] === e.target) break;
          else inputs[i].checked = true;
        }
      }
      item.addEventListener('change', paintStars);
    });
  });
});
