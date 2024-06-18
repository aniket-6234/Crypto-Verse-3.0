import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import Crypto from "./Crypto";
import News from "./News";
import { useGetCryptosQuery } from "../redux/services/cryptoApi";
import millify from "millify";
import { Link } from "react-router-dom";
import Loader from "../images/loader.gif";
import axios from "axios";
import DoghnutChart from "./DoghnutChart";
import TableView from "./TableView";
import { scrollToTopAfterPageRender } from "../utils/scrollToTop";

const columns = [
  { Header: "No.", accessor: "number" },
  { Header: "Name", accessor: "name" },
  { Header: "Symbol", accessor: "symbol" },
  { Header: "Price", accessor: "price" },
  { Header: "Change", accessor: "change" },
  { Header: "Market Cap", accessor: "marketCap" },
  { Header: "BTC Price", accessor: "btCPrice" },
];

const Dashboard = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const [graphData, setGraphData] = useState([]);
  const [doghnutData, setDoghnutData] = useState([]);
  const globalStats = data?.data?.stats;
  const coinData = data?.data?.coins;

  useEffect(() => {
    fetchGraphData();
    grabAndConvertDoughnutData();
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      scrollToTopAfterPageRender();
    }, 700);
  }, []);

  const fetchGraphData = async () => {
    try {
      const response = await axios.get(
        `https://min-api.cryptocompare.com/data/exchange/histoday?tsym=USD&limit=10&api_key=${process.env.REACT_APP_GRAPH_KEY}`
      );
      const graphResp = response?.data?.Data;
      const array = [];
      for (let i = 2; i < 9; i++) {
        array.push(graphResp[i]?.volume.toString().substring(0, 4));
      }
      setGraphData(array);
    } catch (error) {
      setGraphData([]);
      console.log("error: ", error);
    }
  };
  const grabAndConvertDoughnutData = () => {
    setTimeout(() => {
      const result = [];
      for (let i = 0; i < 5; i++) {
        result.push(coinData[i]?.marketCap);
      }
      setDoghnutData(result);
    }, 300);
  };
  if (isFetching) {
    return (
      <div className="flex bg-black w-screen h-screen justify-center items-center">
        <img className="w-[80px]" src={Loader} alt="loader" />
      </div>
    );
  }

  return (
    <>
      <div className="px-4 lg:px-24 bg-black">
        <h2 className="text-3xl lg:text-2xl font-md">Dashboard</h2>
        <h2 className="text-md lg:text-2xl font-md mt-12 lg:mt-16 text-white page-text">
          Dashboard
        </h2>
        <div className="w-full h-[0.5px] mt-2 lg:mt-2 bg-[#313131]"></div>
        <div className="dashboard-container">
          <div className="dashboard-left">
            <div className="grid-box-top-left">
              <div className="flex justify-between">
                <p className="text-[#fff]">Total Exchanges</p>
                <div className="dashboard-box-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.0049 22.0029C6.48204 22.0029 2.00488 17.5258 2.00488 12.0029C2.00488 6.48008 6.48204 2.00293 12.0049 2.00293C17.5277 2.00293 22.0049 6.48008 22.0049 12.0029C22.0049 17.5258 17.5277 22.0029 12.0049 22.0029ZM12.0049 9.00293H8.00488V11.0029H17.0049L12.0049 6.00293V9.00293ZM7.00488 13.0029L12.0049 18.0029V15.0029H16.0049V13.0029H7.00488Z"
                      fill="rgba(234,30,80,1)"
                    ></path>
                  </svg>
                </div>
              </div>
              <p id="value">{globalStats.totalExchanges}</p>
              <div className="daily-growth">+22%</div>
            </div>
            <div className="grid-box-top-right">
              <div className="flex justify-between">
                <p className="text-[#fff]">Market Cap</p>
                <div className="dashboard-box-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"
                      fill="rgba(235,145,23,1)"
                    ></path>
                  </svg>
                </div>
              </div>
              <p id="value">{millify(globalStats.totalMarketCap)}</p>
              <div className="daily-growth">+37%</div>
            </div>
            <div className="grid-box-bot-left">
              <div className="flex justify-between">
                <p className="text-[#fff]">24hrs Volume</p>
                <div className="dashboard-box-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M3.08378 15.2505C1.42044 15.2505 0.483971 13.3382 1.5038 12.0242L10.2099 0.806805C10.794 0.0542043 11.9999 0.467253 11.9999 1.41993V8.75048H20.9159C22.5793 8.75048 23.5157 10.6627 22.4959 11.9767L13.7898 23.1941C13.2057 23.9467 11.9999 23.5337 11.9999 22.581V15.2505H3.08378Z"
                      fill="rgba(69,46,197,1)"
                    ></path>
                  </svg>
                </div>
              </div>
              <p id="value">
                {millify(globalStats.total24hVolume.toLocaleString())}
              </p>
              <div className="daily-growth">+10%</div>
            </div>
            <div className="grid-box-bot-right">
              <div className="flex justify-between">
                <p className="text-[#fff]">Total Markets</p>
                <div className="dashboard-box-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M2.87988 18.0493C4.23015 12.056 7.07526 6.62874 11.003 2.17982C11.1105 2.05802 11.2465 1.90767 11.411 1.72876L11.411 1.72874C11.7101 1.40349 12.2162 1.38227 12.5414 1.68134C12.5579 1.69647 12.5737 1.71229 12.5888 1.72875C12.7553 1.90982 12.8929 2.06189 13.0015 2.18495C16.9268 6.63291 19.7703 12.0583 21.12 18.0493C18.9786 18.5007 16.7797 18.7963 14.5359 18.9238L12.4472 23.1012C12.3237 23.3482 12.0233 23.4483 11.7763 23.3248C11.6796 23.2764 11.6011 23.198 11.5527 23.1012L9.46401 18.9238C7.22018 18.7963 5.02133 18.5007 2.87988 18.0493ZM11.9999 14.9957C13.6568 14.9957 14.9999 13.6525 14.9999 11.9957C14.9999 10.3388 13.6568 8.99565 11.9999 8.99565C10.3431 8.99565 8.99994 10.3388 8.99994 11.9957C8.99994 13.6525 10.3431 14.9957 11.9999 14.9957Z"
                      fill="rgba(219,65,252,1)"
                    ></path>
                  </svg>
                </div>
              </div>
              <p id="value">{globalStats.totalMarkets.toLocaleString()}</p>
              <div className="daily-growth">+54%</div>
            </div>
          </div>
          <div className="dashboard-right">
            <BarChart graphData={graphData} />
          </div>
        </div>
        <div className="mobile-container">
          <h2 className="table-head-text">
            Top 5 Coins Performance and their Statistics
          </h2>
          <div className="dashboard-container-2">
            <div className="dashboard-left-2">
              <TableView header={columns} rowData={coinData} />
            </div>
            <div className="dashboard-right-2">
              <DoghnutChart doghnutData={doghnutData} />
            </div>
          </div>
        </div>
      </div>
      <div className="dash-head-container">
        <h2 className="globe-head-text">
          Top 8 Trending Crypto Currencies in the world
        </h2>
        <h3 className="show-more-text">
          <Link to="/crypto">show more</Link>
        </h3>
      </div>
      <Crypto simplified />
      <div className="mobile-container web-container">
        <div className="dash-head-container">
          <h2 className="globe-head-text">Top 5 Trending Crypto News</h2>
          <h3 className="show-more-text">
            <Link to="/news">show more</Link>
          </h3>
        </div>
      </div>
      <News simplified />
    </>
  );
};

export default Dashboard;
