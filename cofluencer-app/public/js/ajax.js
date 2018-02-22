/* eslint-disable */
$(document).ready(() => {

  $('li').on('click', '#check', function () {
    let idCampaign = $(this).attr('value');
    let username = $(this).attr('user');
    $.ajax({
      url: `http://localhost:3000/${username}/campaigns/${idCampaign}/follow`,
      method: 'POST',
        success: function (res) {
          console.log(res);
        },
        error: function (error) {
        console.log('error:', error); 
        },
    });
  });
});

