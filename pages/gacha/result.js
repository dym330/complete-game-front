import { useState } from "react"
import Cookie from "universal-cookie";

//components
import Links from "../../components/share/Links";

const cookie = new Cookie();

export default function result() {
  const latestResultId = cookie.get("latestGachaData");
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const latestResult = alphabets[latestResultId - 1]

  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <p>⬇今回当たったもの⬇</p>
      <p>{latestResult}</p>
      <Links />
    </div>
  )
}
