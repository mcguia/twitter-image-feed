# Twitter Image Feed

> An Instagram-like image gallery for Twitter

Perform search on words as well as hashtags. Use `from: username` to view a user's media tweets.

[View Demo](https://twitter-image-feed-react.herokuapp.com)

Built with the following:

-  [Twitter Search API](https://developer.twitter.com/en/docs)
-  [Create React App](https://github.com/facebook/create-react-app)
-  [Express](https://expressjs.com/)
-  [Twit](https://github.com/ttezel/twit)
-  [Axios](https://github.com/axios/axios)
-  [Styled Components](https://www.styled-components.com/)
-  [Ant Design](https://ant.design)

## Setup

1. [Apply for a Twitter developer account](https://developer.twitter.com/en/apply) and create a Twitter developer app.
2. Generate API keys and add them to a .env file in the root project directory, defined as CONSUMER_KEY and CONSUMER_SECRET.
3. `yarn install`
4. Start server: `yarn run start`
5. Start client: `cd client && yarn run start`

## Deploying to Heroku

1. Create new heroku app

   ```bash
   heroku create app-name
   ```

2. Set Heroku environment variables

   ```bash
   heroku config:set CONSUMER_KEY=XXXXX
   heroku config:set CONSUMER_SECRET=XXXXX
   ```

3. Push to Heroku

   ```bash
   git push heroku master
   ```

4. Add `http://app-name.herokuapp.com/callback` as a Redirect URI in the Twitter application settings
