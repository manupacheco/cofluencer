/* eslint-disable */
$(document).ready(() => {

  document.getElementById('check-control').addEventListener('click', function (event) {
    event.preventDefault();
    
    $.ajax({
      url: 'http://localhost:3000/:username/campaigns/:_id/follow',
      method: 'POST',
        success: function (res) {
          console.log('hola');
        },
        error: function (error) {
        console.log('error:', error); 
        },
    });
  });
});
/* eslint-enable */
