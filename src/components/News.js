import React, { useEffect } from "react";
import { useGetCryptoNewsQuery } from "../redux/services/cryptoNewsApi";
import moment from "moment";
import Loader from "../images/loader.gif";
import DemoNewsImage from "../images/news.png";
import { scrollToTopAfterPageRender } from "../utils/scrollToTop";

const News = ({ simplified }) => {
  const { data: cryptoNews, isLoading } = useGetCryptoNewsQuery({
    newsCategory: "crypto",
    from: "2024-05-18",
    sortBy: "publishedAt",
    count: simplified ? 6 : 45,
  });

  useEffect(() => {
    scrollToTopAfterPageRender();
  }, []);

  if (isLoading) {
    return (
      <div className="flex bg-black w-screen h-screen justify-center items-center">
        <img className="w-[80px]" src={Loader} alt="loader" />
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-24 bg-black overflow-auto">
      {!simplified && (
        <div className="pb-10">
          <h2 className="text-md lg:text-2xl font-md mt-20 lg:mt-24 text-white page-text">
            News
          </h2>
          <div className="w-full h-[0.5px] mt-2 lg:mt-2 bg-[#313131]"></div>
        </div>
      )}
      <div className="news-container">
        {cryptoNews?.articles?.map((news, i) => (
          <div key={i} className="news-card">
            <a
              href={news?.url}
              target="_blank"
              rel="norefferer"
              className="news-box"
            >
              <div className="flex justify-between">
                <h3 className="news-head">
                  {news.title.length >= 60
                    ? news.title.substring(0, 60) + "..."
                    : news.title}{" "}
                </h3>
              </div>
              <p className="news-para">
                {news.description.length >= 175
                  ? news.description.substring(0, 175) + "..."
                  : news.description}
              </p>
              <div className="flex justify-between items-center news-bottom">
                <div className="flex justify-between">
                  <div className="w-10 h-10 rounded-full">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={news?.urlToImage || DemoNewsImage}
                      alt="icon"
                    />
                  </div>
                  <p className="text-xs mt-2 text-[#ffffff]">
                    {news?.source?.name}
                  </p>
                </div>
                <div className="news-time-div">
                  <p className="news-time-text">
                    {moment(news.publishedAt).format("Do MMMM, YYYY")}
                  </p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
