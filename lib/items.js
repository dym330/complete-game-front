import Cookie from "universal-cookie";
const cookie = new Cookie();

export const itemsGet = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/items`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie.get("access_token")}`,
      },
    }
  ).then((res) => {
    if (!res.ok) {
      throw "再度ログインが必要です";
    }
    return res.json();
  });
  return data;
};