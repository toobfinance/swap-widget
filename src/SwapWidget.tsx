import Swap from "./components/Swap"
import Provider from "./provider"
import "./index.css"
import "unfonts.css"
import { TokenType } from "./packages/config"

export type Theme = {
  colorPrimaryText: string
  colorSecondaryText: string
  colorActiveText: string
  colorMailText: string
  colorPrimaryBackground: string
  colorSecondaryBackground: string
  colorHoverBackground: string
  colorLinkBackground: string
  colorPrimaryBorder: string
  colorSecondaryBorder: string
  colorSuccessBackground: string
  colorErrorBackground: string
  colorInfoBackground: string
  colorErrorText: string
  colorWarningText: string
}

export type SwapWidgetProps = {
  width?: number
  mode?: "buy" | "swap"
  inputToken?: TokenType
  outputToken?: TokenType
  amount?: string
  theme?: Theme
}

function SwapWidget(props: SwapWidgetProps) {
  return (
    <Provider>
      <Swap {...props} />
    </Provider>
  )
}

export default SwapWidget
