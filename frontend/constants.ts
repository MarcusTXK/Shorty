export const STATUS_CODE_CREATED = 201;
export const STATUS_CODE_SUCCESS = 200;
export const STATUS_CODE_CONFLICT = 409;
export const STATUS_CODE_BAD_REQUEST = 400;

// BACKEND API
const URI_BACKEND_SERVICE = process.env.URI_BACKEND || "http://localhost:8080";
const PREFIX_BACKEND_SERVICE = "/url";
export const URL_BACKEND_SERVICE = URI_BACKEND_SERVICE + PREFIX_BACKEND_SERVICE;

// FRONTEND
export const URL_FRONTEND_SERVICE =
  process.env.URI_FRONTEND || "http://localhost:3000";

export const URL_NEWS_SERVICE =
  "https://asia-southeast1-seventh-sensor-362822.cloudfunctions.net/get-news";

export const NEWS_CATEGORIES = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

export const MOCK_RESPONSE = [
  {
    source: { id: null, name: "Zee Business" },
    author: "Bharat Upadhyay",
    title:
      "Flipkart iPhone 11 Sale: Never before price! ONLY FOR THESE USERS - Offer details inside from Big Billion D... - Zee Business",
    description:
      "iPhone 11 Flipkart Sale: The iPhone 11 is powered by A13 Bionic, a new Apple-designed processor. It is made on 7nm technology, has 4 power-efficient cores, and 2 high performance cores iPhone 11 comes in three storage variants: 64GB, 128GB, 256GB. It has a 6.…",
    url: "https://www.zeebiz.com/technology/mobiles/news-flipkart-iphone-11-sale-never-before-price-only-for-these-users-offer-details-inside-from-big-billion-days-deal-200087",
    urlToImage:
      "https://cdn.zeebiz.com/sites/default/files/2022/09/22/201604-untitled-design-2022-09-22t125447448.jpg",
    publishedAt: "2022-09-22T07:25:53Z",
    content:
      "iPhone 11 Flipkart Sale: Planning to buy an iPhone! This might be the right time for you. Flipkart is offering massive deals on Apple iPhones during the Flipkart Big Billion Day sale. Now, The Apple … [+1724 chars]",
  },
  {
    source: { id: null, name: "Nintendo Life" },
    author: "Jim Norman",
    title:
      "Octopath Traveler II Is 90% Complete According To Square Enix - Nintendo Life",
    description: "'We are currently in the last stretch'",
    url: "https://www.nintendolife.com/news/2022/09/octopath-traveler-ii-is-90percent-complete-according-to-square-enix",
    urlToImage: "https://images.nintendolife.com/16c4eac0b6f3e/1280x720.jpg",
    publishedAt: "2022-09-22T08:30:00Z",
    content:
      "Image: Square Enix\r\nAnnounced during September's Nintendo Direct Showcase after heavy rumour of its existence, Octopath Traveler II is coming to the Switch in early 2023. In a recent interview with F… [+1260 chars]",
  },
  {
    source: { id: "mashable", name: "Mashable" },
    author: "Stan Schroeder",
    title:
      "Apple's iOS 16.1 beta changes battery icon, fixes copy and paste bug - Mashable",
    description: "Finally, a slightly different battery indicator.",
    url: "https://mashable.com/article/ios-16-1-battery-indicator",
    urlToImage:
      "https://helios-i.mashable.com/imagery/articles/009a3AjRY9VyqdeLwIsJWpy/hero-image.fill.size_1200x675.v1663829814.jpg",
    publishedAt: "2022-09-22T07:11:53Z",
    content: null,
  },
];
