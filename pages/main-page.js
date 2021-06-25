import router from "next/router";
import React from "react";
import Cookie from "universal-cookie";

const cookie = new Cookie();

const main_page = () => {
  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.get("access_token")}`,
        },
      })
      .then((res) => {
        if (!res.ok) {
          throw "ログアウトに失敗しました";
        }
      });
      // tokenの削除
      cookie.remove("access_token");

      //ルートに遷移
      router.push("/");
    } catch (e) {
      alert(e);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <button className="bg-blue-200" onClick={logout}>
        ログアウト
      </button>
    </div>
  );
};

export default main_page;
