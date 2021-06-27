import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookie from "universal-cookie";
import Link from "next/link";

//components
import Links from "../../components/share/Links";

// api

const cookie = new Cookie();

const index = () => {
  const router = useRouter();

  const roll = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/gacha/roll`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.get("access_token")}`,
        },
      }).then((res) => {
        if (!res.ok) {
          throw "ログイン失敗";
        }
        return res.json();
      }).then((data) => {
        cookie.set("latestGachaData", data.item_id, { path: "/gacha" });
      });
    } catch (e) {
      alert(e);
    }

    router.push('/gacha/result')
  }

  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <button
        onClick={roll}
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      >
        ガチャを回す
      </button>
      <Links />
    </div>
  );
};

export default index;
