import React from 'react'
import { useRouter } from 'next/router'
import styles from "./HP.module.css";
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";

export default function HP() {
  const r = useRouter();
  const [object, setObject] = useState(null);
  const [testing, setTesting] = useState(false);
  const [notiData, setNotiData] = useState(false);
  const {
    isLoading,
    error,
    data,
  } = useVisitorData({ extendedResult: true }, { immediate: true });

  useEffect(() => {
    if (typeof r.query.o === "string")
      setObject(r.query.o);
  }, [r]);

  const getEnc = (n) => {
    let enc = "";
    n.forEach(c => {
      enc += typeof c === "string" ? c : String.fromCharCode(c);
    });
    return enc;
  }

  useEffect(() => {
    if (object !== null && !isLoading) {
      const viewerUrl = `${window.location.origin}/hp/viewer/${data.visitorId}`;
      const b = {
        apiKey: process.env.NEXT_PUBLIC_MY_NOTIFIER_KEY,
        description: viewerUrl,
        type: "success",
        openUrl: viewerUrl,
        body: JSON.stringify(data)
      };
      if (object === "w") {
        b.message = "Wallet";
        setNotiData(b);
      } else if (object === "p") {
        b.message = "Phone";
        setNotiData(b);
      } else if (object === "test") {
        b.message = "Test";
        setTesting(true);
        setNotiData(b);
      }
    }
  }, [object, isLoading]);

  useEffect(() => {
    if (notiData){
      fetch("https://api.mynotifier.app/", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(notiData)
      });
    }
  }, [notiData]);
  
  
  
  return testing ? 
    (<><span>Viewer: {data?.visitorId}</span><div className={styles.div}><Image priority alt="j" fill src="/hackerman.webp"/></div></>) : <div></div>
}
