"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    TuDongChat: new (key: string) => {
      initial: () => void;
    };
  }
}

const TuDongChat = () => {
  useEffect(() => {
    const initializeChatbot = () => {
      if (typeof window !== "undefined" && window.TuDongChat) {
        const tudong_chatbox = new window.TuDongChat("nc8695U7l9S1ZBVLgCyKR");
        tudong_chatbox.initial();
      }
    };

    setTimeout(initializeChatbot, 1500); // Tránh lỗi nếu script tải chậm
  }, []);

  return <Script src="https://app.tudongchat.com/js/chatbox.js" strategy="lazyOnload" />;
};

export default TuDongChat;
