const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.API_KEY);

// Shuffle array randomly
const shuffle = (a) => {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
};

/**
 * Get 3 random headline articles from a category of choice
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.getNews = (req, res) => {
  const query = {
    language: "en",
  };
  if (req.params["0"]) {
    query.category = req.params["0"];
  }
  newsapi.v2.topHeadlines(query).then((response) => {
    /*
       {
         status: "ok",
         articles: [...]
       }
     */
    const allArticles = response.articles || [];
    shuffle(allArticles);
    res.status(200).send(allArticles.slice(0, 3));
  });
};
