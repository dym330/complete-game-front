import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookie from "universal-cookie";

// api
import { itemsGet } from "../../lib/items";

//components
import Alphabet from "../../components/items/alphabet";

const cookie = new Cookie();

const index = () => {
  const router = useRouter();
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    itemsGet()
      .then((data) => {
        setItems(data);
      })
      .catch((e) => {
        alert(e);
        router.push("/");
      });
  }, []);

  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.get("access_token")}`,
        },
      }).then((res) => {
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
        logout
      </button>
      <div className="my-4 text-center">
        <h2>集めたアルファベット</h2>
        <div className="flex">
          {alphabets.map((alphabet) => {
            let possessionStatus = false;
            items.map((item) => {
              if (item.name === alphabet) {
                possessionStatus = true;
              }
            });
            return (
              <Alphabet
                key={alphabet}
                alphabet={alphabet}
                possessionStatus={possessionStatus}
              />
            );
          })}
        </div>
      </div>
      <div className="text-center">
        <h2>ガチャの回数</h2>
        <p>4回</p>
      </div>
      
    </div>
  );
};

export default index;
