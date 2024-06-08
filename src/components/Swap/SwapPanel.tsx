import Exchange from "../svgs/Exchange"
import SwapSide from "./SwapSide"
import useSwapParams from "../../hooks/useSwapParams"
import SwapButton from "./SwapButton"
import useSwapTrade from "../../hooks/useSwapTrade"
import { Amount } from "../../packages/currency"
import SwapDetails from "./SwapDetails"
import SwapTrades from "./SwapTrades"
import React, { useEffect } from "react"
import { fetchTokenInfo } from "../../utils/token"
import { TokenType } from "../../packages/config"

interface SwapPanelProps {
  amount?: string
  inputToken?: TokenType
  outputToken?: TokenType
}

const SwapPanel: React.FC<SwapPanelProps> = ({
  amount,
  inputToken,
  outputToken,
}) => {
  const {
    amountIn,
    setAmountIn,
    tokenIn,
    tokenOut,
    setTokenIn,
    setTokenOut,
    switchToken,
  } = useSwapParams()

  useEffect(() => {
    setAmountIn(amount ?? "")
  }, [amount])

  useEffect(() => {
    if (inputToken) {
      setTokenIn(fetchTokenInfo(inputToken))
    }
  }, [inputToken])

  useEffect(() => {
    if (outputToken) {
      setTokenOut(fetchTokenInfo(outputToken))
    }
  }, [outputToken])

  const trade = useSwapTrade()

  return (
    <div className="bg-[--color-primary-background] relative p-4 md:p-8 mt-4 border border-[--color-primary-border] rounded-lg md:rounded-[32px]">
      <SwapSide
        side="From"
        token={tokenIn}
        setToken={setTokenIn}
        amount={amountIn}
        setAmount={setAmountIn}
        price={trade.data?.[0]?.amountInValue}
      />

      <div className="flex items-center w-full justify-center">
        <div className="border border-[--color-primary-border] w-full"></div>
        <button
          className="flex items-center justify-center rounded-full h-10 min-w-10 w-10 hover:bg-[--color-primary-background] transition-all mx-1"
          onClick={switchToken}
        >
          <Exchange className="h-4 w-4 text-[--color-primary-text]" />
        </button>
        <div className="border border-[--color-primary-border] w-full"></div>
      </div>

      <SwapSide
        side="To"
        token={tokenOut}
        setToken={setTokenOut}
        disabled
        amount={
          trade.data?.[0]?.amountOut && tokenOut && amountIn.length > 0
            ? Amount.fromRawAmount(
                tokenOut,
                trade.data?.[0]?.amountOut
              ).toExact()
            : undefined
        }
        price={trade.data?.[0]?.amountOutValue}
      />
      <SwapDetails trade={trade} />
      <SwapTrades trades={trade.data} />
      <SwapButton trade={trade} />
    </div>
  )
}

export default SwapPanel
