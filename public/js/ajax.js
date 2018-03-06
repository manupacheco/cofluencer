'use strict';

/* eslint-disable */
$(document).ready(function () {

  $('li').on('click', '#follow', function () {
    var idCampaign = $(this).attr('value');
    var username = $(this).attr('user');
    $.ajax({
      url: "http://cofluencer.herokuapp.com/" + username + "/campaigns/" + idCampaign + "/follow",
      method: 'POST',
      success: function success(res) {
        console.log(res);
      },
      error: function error(_error) {
        console.log('error:', _error);
      }
    });
    $(this).attr('id', 'unfollow');
    $(this).html('Check out!');
  });

  $('li').on('click', '#unfollow', function () {
    var idCampaign = $(this).attr('value');
    var username = $(this).attr('user');
    $.ajax({
      url: "http://cofluencer.herokuapp.com/" + username + "/campaigns/" + idCampaign + "unfollow",
      method: 'POST',
      success: function success(res) {
        console.log(res);
        // flash notification añadido correctamente
      },
      error: function error(_error2) {
        console.log('error:', _error2);
      }
    });
    $(this).attr('id', 'follow');
    $(this).html('Check in!');
  });

  $('#form-search-iguser').on('submit', function (event) {
    event.preventDefault();
    var iguser = $('#instagram-user').val();
    console.log(iguser);
    $.ajax({
      url: "http://cofluencer.herokuapp.com/search_instagram/" + iguser,
      method: 'POST',
      success: function success(instagram_user) {
        console.log(instagram_user);
        var iguser = instagram_user;
        $('#user-info').html('\n          <div class="section-title row justify-content-center">\n            <div class="social-network-column">\n              <ul class="social-data">\n                <li class="social-data-item"><span class="span">@</span>' + iguser.username + '</li>\n                <li class="social-data-item"><span class="span">' + iguser.media_count + '</span> posts</li>\n                <li class="social-data-item"><span class="span">' + iguser.followers_count + '</span> followers</li>\n              </ul>\n            </div>\n          </div>\n          <div class="grid">\n            <div class="item">\n              <div class="content img-container overlay rounded z-depth-2">\n                <img class="img-fluid" src="' + iguser.media.data[0].media_url + '" alt="instagram-image-<%=i%>">\n                  <a href="#">\n                    <div class="after">\n                      <div class="positioner">\n                        <span class="icon">\n                          <i class="fa fa-heart">\n                            <span class="icon-data">\n                              ' + iguser.media.data[0].like_count + '\n                            </span>\n                          </i>\n                        </span>\n                        <span class="icon">\n                          <i class="fa fa-comment">\n                            <span class="icon-data">\n                              ' + iguser.media.data[0].comments_count + '\n                            </span>\n                          </i>\n                        </span>\n                      </div>\n                    </div>\n                  </a>\n                </div>\n              </div>\n              <div class="item">\n              <div class="content img-container overlay rounded z-depth-2">\n                <img class="img-fluid" src="' + iguser.media.data[1].media_url + '" alt="instagram-image-<%=i%>">\n                  <a href="#">\n                    <div class="after">\n                      <div class="positioner">\n                        <span class="icon">\n                          <i class="fa fa-heart">\n                            <span class="icon-data">\n                              ' + iguser.media.data[1].like_count + '\n                            </span>\n                          </i>\n                        </span>\n                        <span class="icon">\n                          <i class="fa fa-comment">\n                            <span class="icon-data">\n                              ' + iguser.media.data[1].comments_count + '\n                            </span>\n                          </i>\n                        </span>\n                      </div>\n                    </div>\n                  </a>\n                </div>\n              </div>\n              <div class="item">\n              <div class="content img-container overlay rounded z-depth-2 mb-10">\n                <img class="img-fluid" src="' + iguser.media.data[2].media_url + '" alt="instagram-image-<%=i%>">\n                  <a href="#">\n                    <div class="after">\n                      <div class="positioner">\n                        <span class="icon">\n                          <i class="fa fa-heart">\n                            <span class="icon-data">\n                              ' + iguser.media.data[2].like_count + '\n                            </span>\n                          </i>\n                        </span>\n                        <span class="icon">\n                          <i class="fa fa-comment">\n                            <span class="icon-data">\n                              ' + iguser.media.data[2].comments_count + '\n                            </span>\n                          </i>\n                        </span>\n                      </div>\n                    </div>\n                  </a>\n                </div>\n              </div>\n          </div>');
        $('.disabled').removeClass('disabled');
      },
      error: function error(_error3) {
        // flash notification usuario no disponible
        console.log('error:', _error3);
      }
    });
  });

  $('#add-instagram-account').on('click', function () {
    var iguser = $('#instagram-user').val();
    console.log('hola', iguser);
    $.ajax({
      url: "http://cofluencer.herokuapp.com/add_instagram/" + iguser,
      method: 'POST',
      success: function success(username) {
        console.log(iguser);
        window.location = "http://cofluencer.herokuapp.com/" + username;
      },
      error: function error(_error4) {
        // flash notification usuario no disponible
        console.log('error:', _error4);
      }
    });
  });

  $('#send-contact-mail').on('click', function () {
    var mailOptions = {
      from: 'cofluencer@gmail.com',
      to: $('#EmailModalEx').val(),
      subject: $('#SubjectModalEx').val(),
      text: $('#MessageModalEx').val()
    };
    $.ajax({
      url: "http://cofluencer.herokuapp.com/email",
      method: 'POST',
      data: mailOptions,
      success: function success() {
        console.log('enviado');
      },
      error: function error(_error5) {
        // flash notification usuario no disponible
        console.log('error:', _error5);
      }
    });
  });
});