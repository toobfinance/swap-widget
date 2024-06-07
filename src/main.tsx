import React from "react"
import ReactDOM from "react-dom/client"
import SwapWidget from "./SwapWidget.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SwapWidget
      mode="swap"
      inputToken="ARB"
      outputToken="TOOB"
      amount="1"
      width={500}
      theme={{ colorPrimaryText: "red", colorActiveButton: 'yellow' }}
    />
  </React.StrictMode>
)
