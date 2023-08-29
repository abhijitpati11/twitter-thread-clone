import Settings from "@/components/Settings";
import Sidebar from "@/components/Sidebar";
import Trending from "@/components/Trending";
import Head from "next/head";
import React from "react";

const more = () => {
  return (
    <div className="relative max-w-[1400px] mx-auto">
      <Sidebar />
      <div className="flex gap-6">
        <Settings />
        <Trending />
      </div>
    </div>
  );
};

export default more;
