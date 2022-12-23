import axios from 'axios';

export default async function handler(req, res) {
  const tweets = await fetchTweets()
  if (tweets) {
    res.status(200).json(tweets)
  }
  else {
    res.status(500).json({error: "Error"})
  }
}

const fetchTweets = async () => {
  try {
    const apiKey = process.env.TWEET_KEY;
    const apiSecretKey = process.env.TWEET_SECRET;
    const accessToken = process.env.TWEET_TOKEN;
    const accessTokenSecret = process.env.TWEET_SECRET;

    const response = await axios.get('https://api.twitter.com/2/tweets/search/recent', {
      headers: {
        Authorization: `Bearer ${apiKey}:${apiSecretKey}`,
      },
      params: {
        query: '#reactjs',
        max_results: 10,
        expansions: 'author_id',
        // user.fields: 'username'
      },
    });
    return response
    // setTweets(response.data.data);
  } catch (error) {
    console.error(error);
  }
};
