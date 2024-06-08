# Getting Started with the Widget

This guide walks you through the steps to embed the swap widget in your website in 2 minutes — whether your site is already a decentralized application (dApp) or not.

With the swap widget, your users can buy & trade ERC-20 tokens on the Toob Finance without leaving your site!

## Installing the Widgets Library

To get started, install the widgets library using npm or Yarn.

```
npm install --save @toob-finance/widget
```

## Adding the Widget to Your App

Next, embed the React component in your application.

```
import { SwapWidget } from '@toob-finance/widget'
import '@toob-finance/widget/dist/style.css'

function App() {
  <div>
    <SwapWidget />
  </div>
}
```

## Customizing the Widget

You can set optional parameters to tailor the appearance and functionality of the widget to fit your dApp.

| Param         | Type      | Default   |                  |
| ------------- | --------- | --------- | ---------------- |
| `mode`        | buy/swap  | buy       |                  |
| `width`       | number    | 480       |                  |
| `inputToken`  | TokenType | ETH       | only `swap` mode |
| `outputToken` | TokenType | undefiend |                  |
| `amount`      | string    | undefiend |                  |
| `theme`       | Theme     | undefined |                  |

`TokenType` represents the symbol of the tokens supported by Toob Finance. You can check [Docs](https://docs.toob.finance/developers/token) for the token listing.

```
import { SwapWidget } from '@toob-finance/widget'
import '@toob-finance/widget/dist/style.css'

function App() {
  <div>
    <SwapWidget
      width={500}
      mode="swap"
      inputToken={"ARB"}
      outputToken={"TOOB"}
      amount={"100"}
      theme={{
          colorPrimaryText: "black",
          colorSecondaryText: "#00000099",
          colorActiveText: "white",
          colorMailText: "#6666f1",
          colorPrimaryBackground: "white",
          colorSecondaryBackground: "black",
          colorHoverBackground: "#00000019",
          colorLinkBackground: "#0000007f",
          colorPrimaryBorder: "#0000004c",
          colorSecondaryBorder: "#222",
          colorSuccessBackground: "#71bd98",
          colorErrorBackground: "#fa9f9f",
          colorInfoBackground: "white",
          colorErrorText: "#e53e3e",
          colorWarningText: "#d69e2e"
      }}
    />
  </div>
}
```
