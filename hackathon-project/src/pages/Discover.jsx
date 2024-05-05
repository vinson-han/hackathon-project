import { React, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import DiscoverTab from "../components/DiscoverTab";
import VideoCard from "../components/VideoCard";

import Divider from "../components/Divider";
import { uiuxData } from "../dummyData/uiuxData";
import { uiuxArticleData } from "../dummyData/uiuxArticleData";
import { uiuxToolsData } from "../dummyData/uiuxToolsData";

function Discovery() {
  const tabs = [
    { name: "UX UI Design", href: "/discover", current: true },
    { name: "Web Development", href: "/discoverWeb", current: false },
    { name: "Cyber Security", href: "/discoverCyber", current: false },
    { name: "Data Analysis", href: "/discoverData", current: false },
  ];

  const [text, setText] = useState("UI UX Design");

  const handleClick = (e) => {
    setText(e.target.innerText);
  };

  return (
    <div className="ml-64 mr-10 h-screen pl-24 flex flex-col justify-between">
      <div className="mt-4 flex justify-center">
        <img src="/text.svg" />
      </div>

      <div className="mt-2 mb-2">
        <Divider />
      </div>
      <DiscoverTab handleClick={handleClick} tabs={tabs} />
      <div className="mt-2">
        <Divider />
      </div>

      <div className="mt-5">
        <VideoCard
          data={uiuxData}
          text={`Recommended videos for you in ${text} `}
        />
      </div>
      <div className="mt-20 mb-10">
        <Divider />
      </div>
      <VideoCard data={uiuxToolsData} text={`Trending Tools for  ${text}`} />
      <div className="mt-20 mb-10">
        <Divider />
      </div>
      <VideoCard
        data={uiuxArticleData}
        text={`Articles & books for  ${text}`}
      />
    </div>
  );
}

export default Discovery;
