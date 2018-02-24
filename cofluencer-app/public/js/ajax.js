/* eslint-disable */
$(document).ready(() => {

  $('li').on('click', '#follow', function () {
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
    $(this).attr('id', 'unfollow');
    $(this).html('Check out!');
  });

  $('li').on('click', '#unfollow', function () {
    let idCampaign = $(this).attr('value');
    let username = $(this).attr('user');
    $.ajax({
      url: `http://localhost:3000/${username}/campaigns/${idCampaign}/unfollow`,
      method: 'POST',
      success: function (res) {
        console.log(res);
        // flash notification añadido correctamente
      },
      error: function (error) {
        console.log('error:', error);
      },
    });
    $(this).attr('id', 'follow');
    $(this).html('Check in!');
  });

  $('#form-search-iguser').on('submit', function (event) {
    event.preventDefault();
    let iguser = $('#instagram-user').val();
    console.log(iguser);
    $.ajax({
      url: `http://localhost:3000/search_instagram/${iguser}`,
      method: 'POST',
      success: function(iguser) {
        console.log(iguser);
        $('#user-info').removeClass('disabled')
      },
      error: function (error){
        // flash notification usuario no disponible
        console.log('error:', error);
      }
    });
  });

  $('#add-instagram-account').on('click', function () {
    let iguser = $('#instagram-user').val();
    $.ajax({
      url: `http://localhost:3000/add_instagram/${iguser}`,
      method: 'POST',
      success: function (username) {
        console.log(iguser);
        window.location = `http://localhost:3000/${username}`;
      },
      error: function (error) {
        // flash notification usuario no disponible
        console.log('error:', error);
      }
    });
  })

});
