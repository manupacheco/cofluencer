/* eslint-disable */
$(document).ready(() => {
  require('dotenv').config();

  console.log(domain);

  const domain = 'https://cofluencer.herokuapp.com';

  $('li').on('click', '#follow', function () {
    let idCampaign = $(this).attr('value');
    let username = $(this).attr('user');
    $.ajax({
      url: `${domain}/${username}/campaigns/${idCampaign}/follow`,
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
      url: `${domain}/${username}/campaigns/${idCampaign}/unfollow`,
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
    console.log(env);
    $.ajax({
      url: `${domain}/search_instagram/${iguser}`,
      method: 'POST',
      success: function(instagram_user) {
        console.log(instagram_user);
        const iguser = instagram_user;
        $('#user-info').html(`
          <div class="section-title row justify-content-center">
            <div class="social-network-column">
              <ul class="social-data">
                <li class="social-data-item"><span class="span">@</span>${iguser.username}</li>
                <li class="social-data-item"><span class="span">${iguser.media_count}</span> posts</li>
                <li class="social-data-item"><span class="span">${iguser.followers_count}</span> followers</li>
              </ul>
            </div>
          </div>
          <div class="grid">
            <div class="item">
              <div class="content img-container overlay rounded z-depth-2">
                <img class="img-fluid" src="${iguser.media.data[0].media_url}" alt="instagram-image-<%=i%>">
                  <a href="#">
                    <div class="after">
                      <div class="positioner">
                        <span class="icon">
                          <i class="fa fa-heart">
                            <span class="icon-data">
                              ${iguser.media.data[0].like_count}
                            </span>
                          </i>
                        </span>
                        <span class="icon">
                          <i class="fa fa-comment">
                            <span class="icon-data">
                              ${iguser.media.data[0].comments_count}
                            </span>
                          </i>
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div class="item">
              <div class="content img-container overlay rounded z-depth-2">
                <img class="img-fluid" src="${iguser.media.data[1].media_url}" alt="instagram-image-<%=i%>">
                  <a href="#">
                    <div class="after">
                      <div class="positioner">
                        <span class="icon">
                          <i class="fa fa-heart">
                            <span class="icon-data">
                              ${iguser.media.data[1].like_count}
                            </span>
                          </i>
                        </span>
                        <span class="icon">
                          <i class="fa fa-comment">
                            <span class="icon-data">
                              ${iguser.media.data[1].comments_count}
                            </span>
                          </i>
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div class="item">
              <div class="content img-container overlay rounded z-depth-2 mb-10">
                <img class="img-fluid" src="${iguser.media.data[2].media_url}" alt="instagram-image-<%=i%>">
                  <a href="#">
                    <div class="after">
                      <div class="positioner">
                        <span class="icon">
                          <i class="fa fa-heart">
                            <span class="icon-data">
                              ${iguser.media.data[2].like_count}
                            </span>
                          </i>
                        </span>
                        <span class="icon">
                          <i class="fa fa-comment">
                            <span class="icon-data">
                              ${iguser.media.data[2].comments_count}
                            </span>
                          </i>
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
          </div>`);
        $('.disabled').removeClass('disabled');
      },
      error: function (error){
        // flash notification usuario no disponible
        console.log('error:', error);
      }
    });
  });

  $('#add-instagram-account').on('click', function () {
    let iguser = $('#instagram-user').val();
    console.log('hola', iguser);
    $.ajax({
      url: `${domain}/add_instagram/${iguser}`,
      method: 'POST',
      success: function (username) {
        console.log(iguser);
        window.location = `${domain}/${username}`;
      },
      error: function (error) {
        // flash notification usuario no disponible
        console.log('error:', error);
      }
    });
  });

  $('#send-contact-mail').on('click', function () {
    const mailOptions = {
      from: 'cofluencer@gmail.com',
      to: $('#EmailModalEx').val(),
      subject: $('#SubjectModalEx').val(),
      text: $('#MessageModalEx').val(),
    };
    $.ajax({
      url: `${domain}/email`,
      method: 'POST',
      data: mailOptions,
      success: function () {
        console.log('enviado');
      }, 
      error: function (error) {
        // flash notification usuario no disponible
        console.log('error:', error);
      }
    });
  });
});
