const express = require('express');
const router = express.Router();
const FB = require('fb');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { titles: '-', followers: 0, pics: [] });
});

router.post('/', (req, res, next) => {
  const user = req.body;

  FB.api(
    '/17841407080190618',
    {
      fields: `business_discovery.username( ${user.name} ){username,biography,website,followers_count,media_count,media{caption, comments_count,like_count, media_url, media_type}}`,
      // incluir token en variable actual caduca 13 de abril de 2018.
      access_token: 'EAAZAp8OJ3y18BAAcfi7TMWZBVXkw8uHZAitgIQUWCvUI7hEbaNpeGTXLXyuZB9huheP84iiz1w8vY3ZC0tpxcoJOdWRilc9NPzNAo3zf9hpZC59fghyRRzG6c6KbzjFeYKVRD0GywHFhFQwYMMnZAO7PW5roFrcuTtLr0f0GihCh5QhghFdfPte',
    },
    (iguser) => {
      console.log(iguser);
      res.render('index', { titles: iguser.business_discovery.username, followers: iguser.business_discovery.followers_count, pics: iguser.business_discovery.media.data });
    },
  );
});

module.exports = router;
