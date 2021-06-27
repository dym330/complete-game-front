import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookie from "universal-cookie";

// api
import { itemsGet } from "../../lib/items";

//components
import Links from "../../components/share/Links";

const cookie = new Cookie();

const index = () => {
  const router = useRouter();
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [items, setItems] = useState([]);
  console.log(cookie.get("access_token"));

  useEffect(() => {
    itemsGet()
      .then((data) => {
        data.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          } else {
            return -1;
          }
        });
        setItems(data);
      })
      .catch((e) => {
        alert(e);
        router.push("/");
      });
  }, []);

  const allDelete = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/items/delete`, {
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
      });
    } catch (e) {
      alert(e);
    }

    router.push("/items/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <ul>
        {items.map((item) => {
          return (
            <li key={item.name}>
              {item.name} : {item.number}
            </li>
          );
        })}
      </ul>
      <button
        onClick={allDelete}
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      >
        全データ削除
      </button>
      <Links />
    </div>
  );
};

export default index;
