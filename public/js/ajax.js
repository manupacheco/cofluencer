$(document).ready(() => {
  $('li').on('click', '#follow', function () {
    let a = $(this).attr('value'),
      b = $(this).attr('user');
    $.ajax({
      url:
        'http://cofluencer.herokuapp.com/' + b + '/campaigns/' + a + '/follow',
      method: 'POST',
      success: function success(c) {
        console.log(c);
      },
      error: function error(c) {
        console.log('error:', c);
      },
    }),
    $(this).attr('id', 'unfollow'),
    $(this).html('Check out!');
  }),
  $('li').on('click', '#unfollow', function () {
    let a = $(this).attr('value'),
      b = $(this).attr('user');
    $.ajax({
      url:
          'http://cofluencer.herokuapp.com/' +
          b +
          '/campaigns/' +
          a +
          'unfollow',
      method: 'POST',
      success: function success(c) {
        console.log(c);
      },
      error: function error(c) {
        console.log('error:', c);
      },
    }),
    $(this).attr('id', 'follow'),
    $(this).html('Check in!');
  }),
  $('#form-search-iguser').on('submit', (a) => {
    a.preventDefault();
    var b = $("#instagram-user").val();
    console.log(b),
    $.ajax({
      url: "http://cofluencer.herokuapp.com/search_instagram/" + b,
      method: "POST",
      success: function success(c) {
        console.log(c);
        var d = c;
        $("#user-info").html(
          '\n          <div class="section-title row justify-content-center">\n            <div class="social-network-column">\n              <ul class="social-data">\n                <li class="social-data-item"><span class="span">@</span>' +
              d.username +
              '</li>\n                <li class="social-data-item"><span class="span">' +
              d.media_count +
              '</span> posts</li>\n                <li class="social-data-item"><span class="span">' +
              d.followers_count +
              '</span> followers</li>\n              </ul>\n            </div>\n          </div>\n          <div class="grid">\n            <div class="item">\n              <div class="content img-container overlay rounded z-depth-2">\n                <img class="img-fluid" src="' +
              d.media.data[0].media_url +
              '" alt="instagram-image-<%=i%>">\n                  <a href="#">\n                    <div class="after">\n                      <div class="positioner">\n                        <span class="icon">\n                          <i class="fa fa-heart">\n                            <span class="icon-data">\n                              ' +
              d.media.data[0].like_count +
              '\n                            </span>\n                          </i>\n                        </span>\n                        <span class="icon">\n                          <i class="fa fa-comment">\n                            <span class="icon-data">\n                              ' +
              d.media.data[0].comments_count +
              '\n                            </span>\n                          </i>\n                        </span>\n                      </div>\n                    </div>\n                  </a>\n                </div>\n              </div>\n              <div class="item">\n              <div class="content img-container overlay rounded z-depth-2">\n                <img class="img-fluid" src="' +
              d.media.data[1].media_url +
              '" alt="instagram-image-<%=i%>">\n                  <a href="#">\n                    <div class="after">\n                      <div class="positioner">\n                        <span class="icon">\n                          <i class="fa fa-heart">\n                            <span class="icon-data">\n                              ' +
              d.media.data[1].like_count +
              '\n                            </span>\n                          </i>\n                        </span>\n                        <span class="icon">\n                          <i class="fa fa-comment">\n                            <span class="icon-data">\n                              ' +
              d.media.data[1].comments_count +
              '\n                            </span>\n                          </i>\n                        </span>\n                      </div>\n                    </div>\n                  </a>\n                </div>\n              </div>\n              <div class="item">\n              <div class="content img-container overlay rounded z-depth-2 mb-10">\n                <img class="img-fluid" src="' +
              d.media.data[2].media_url +
              '" alt="instagram-image-<%=i%>">\n                  <a href="#">\n                    <div class="after">\n                      <div class="positioner">\n                        <span class="icon">\n                          <i class="fa fa-heart">\n                            <span class="icon-data">\n                              ' +
              d.media.data[2].like_count +
              '\n                            </span>\n                          </i>\n                        </span>\n                        <span class="icon">\n                          <i class="fa fa-comment">\n                            <span class="icon-data">\n                              ' +
              d.media.data[2].comments_count +
              "\n                            </span>\n                          </i>\n                        </span>\n                      </div>\n                    </div>\n                  </a>\n                </div>\n              </div>\n          </div>"
        ),
        $(".disabled").removeClass("disabled");
      },
      error: function error(c) {
        console.log("error:", c);
      }
    });
  }),
  $('#add-instagram-account').on('click', () => {
    var a = $("#instagram-user").val();
    console.log("hola", a),
    $.ajax({
      url: "http://cofluencer.herokuapp.com/add_instagram/" + a,
      method: "POST",
      success: function success(b) {
        console.log(a),
        (window.location = "http://cofluencer.herokuapp.com/" + b);
      },
      error: function error(b) {
        console.log("error:", b);
      }
    });
  }),
  $('#send-contact-mail').on('click', () => {
    var a = {
      from: "cofluencer@gmail.com",
      to: $("#EmailModalEx").val(),
      subject: $("#SubjectModalEx").val(),
      text: $("#MessageModalEx").val()
    };
    $.ajax({
      url: "http://cofluencer.herokuapp.com/email",
      method: "POST",
      data: a,
      success: function success() {
        console.log("enviado");
      },
      error: function error(b) {
        console.log("error:", b);
      }
    });
  });
});
