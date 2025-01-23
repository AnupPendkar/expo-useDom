"use dom";

import AxiosHttpClient from "@/utils/AxiosHttpClient";
import { useState, useEffect } from "react";
import DamageView from "../DamageView";

export default function HomeScreen() {
  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    AxiosHttpClient.init("http://172.16.120.24:7005/api/");

    setTimeout(() => {
      setAppReady(true);
    }, 100);

    return () => {};
  }, []);

  return <>{isAppReady && <DamageView />}</>;
}
