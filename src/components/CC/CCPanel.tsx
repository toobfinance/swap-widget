import { useEffect, useState } from "react"

import { Amount, TOOB, Type, USDC } from "../../packages/currency"
import SwapSide from "../Swap/SwapSide"
import CCFiatSide from "./CCFiatSide"
import { ChainId } from "../../packages/chain"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { isAddress, parseUnits } from "viem"
import toast from "react-hot-toast"
import CustomToast from "../CustomToast"
import WertWidget from "@wert-io/widget-initializer"
import Spinner from "../Spinner"
import { useDebounce } from "../../hooks/useDebounce"
import MasterCard from "../../assets/master_card.svg"
import Visa from "../../assets/visa.svg"
import AmEx from "../../assets/amex.png"
import JCB from "../../assets/jcb.svg"
import Discover from "../../assets/Discover.png"
import { SWAP_FEE } from "../../constants"
import { fetchTokenInfo } from "../../utils/token"
import { TokenType } from "../../packages/config"

interface CCPanelProps {
  amount?: string
  outputToken?: TokenType
}

const CCPanel: React.FC<CCPanelProps> = ({ amount, outputToken }) => {
  const [fiatAmount, setFiatAmount] = useState("")
  const [tokenOut, setTokenOut] = useState<Type>(TOOB[ChainId.ARBITRUM_ONE])
  const [recipient, setRecipient] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setFiatAmount(amount ?? "")
  }, [amount])

  useEffect(() => {
    if (outputToken) {
      setTokenOut(fetchTokenInfo(outputToken) ?? TOOB[ChainId.ARBITRUM_ONE])
    }
  }, [outputToken])

  const debouncedAmount = useDebounce(fiatAmount, 200)

  const { data: convertedAmount, refetch } = useQuery({
    queryKey: ["buy-converter", debouncedAmount],
    queryFn: async () => {
      try {
        if (
          !debouncedAmount ||
          Number(debouncedAmount) < 10 ||
          Number(debouncedAmount) > 1000
        )
          return 0

        const { data } = await axios.post(
          "https://widget.wert.io/api/v3/partners/convert",
          {
            from: "USD",
            network: "arbitrum",
            to: "USDC",
            amount: Number(debouncedAmount),
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-Partner-ID": "01HYJMVRGMMH6C99JJK70K0VMS",
            },
          }
        )
        return data?.body?.commodity_amount
          ? data?.body?.commodity_amount - 0.1
          : 0
      } catch (err) {
        console.log(err)
      }
    },
    refetchInterval: 20000,
  })

  const { data: amountOut } = useQuery({
    queryKey: ["buy-estimation", convertedAmount, tokenOut.wrapped.address],
    queryFn: async () => {
      if (!convertedAmount) return "0"
      if (tokenOut.equals(USDC[ChainId.ARBITRUM_ONE])) {
        return convertedAmount.toString()
      }
      const { data } = await axios.get(
        `https://aggregator-api.kyberswap.com/arbitrum/api/v1/routes?tokenIn=0xaf88d065e77c8cc2239327c5edb3a432268e5831&tokenOut=${
          tokenOut.isNative
            ? "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
            : tokenOut.address
        }&amountIn=${(
          (parseUnits(convertedAmount.toString(), 6) * (10000n - SWAP_FEE)) /
          10000n
        ).toString()}&gasInclude=true`
      )
      console.log(data)
      return Amount.fromRawAmount(
        tokenOut,
        data?.data?.routeSummary?.amountOut ?? 0
      ).toExact()
    },
    refetchInterval: 20000,
  })

  const onBuy = async () => {
    try {
      setLoading(true)
      await refetch()
      const { data } = await axios.post("https://toob.finance/api/purchase", {
        recipient,
        amount: convertedAmount,
        token: tokenOut.isNative
          ? "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
          : tokenOut.address,
      })
      if (!data) {
        return
      }
      const wertWidget = new WertWidget({
        partner_id: "01HYJMVRGMMH6C99JJK70K0VMS",
        origin: "https://widget.wert.io",
        ...data,
        extra: {
          item_info: {
            image_url:
              "https://raw.githubusercontent.com/Toobdog/media/main/logo-network.svg",
            name: "Toob Finance",
          },
        },
      })
      wertWidget.open()
    } catch (err) {
      console.log(err)
      toast.custom((t) => (
        <CustomToast t={t} type="error" text={`Failed to buy the assets`} />
      ))
    } finally {
      setLoading(false)
    }
  }

  const invalidAddress = !isAddress(recipient)
  const invalidAmount =
    !fiatAmount || Number(fiatAmount) < 10 || Number(fiatAmount) > 1000

  return (
    <>
      <div className="bg-[--color-secondary-background] relative p-4 md:p-8 mt-4 border border-[--color-primary-border] rounded-lg md:rounded-[32px]">
        <CCFiatSide amount={fiatAmount} setAmount={setFiatAmount} />
        <div className="border border-[--color-primary-border] w-full my-5"></div>
        <SwapSide
          side="To"
          token={tokenOut}
          amount={amountOut ?? ""}
          setToken={setTokenOut}
          hideSide
          hideBalance
          primaryTokens
          disabled
        />
        <div className="border border-[--color-primary-border] w-full my-5"></div>
        <div>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full h-12 max-sm:data-[fast=true]:h-[72px] outline-none text-[30px] bg-transparent text-[--color-input-text] font-semibold placeholder:text-[--color-secondary-text]"
            placeholder="Recipient Address"
          />
        </div>
        <button
          className="flex items-center justify-center h-12 w-full bg-[--color-primary-button] text-[--color-primary-text] border-b-2 border-[--color-secondary-border] enabled:hover:bg-[--color-secondary-border] enabled:hover:border-[--color-secondary-button] transition-all rounded-full font-semibold disabled:opacity-70 disabled:cursor-not-allowed mt-8"
          disabled={invalidAddress || invalidAmount || loading}
          onClick={onBuy}
        >
          {loading ? (
            <Spinner className="w-5 h-5 mr-2" />
          ) : invalidAmount ? (
            !fiatAmount.length ? (
              "Input Amount to Buy"
            ) : Number(fiatAmount) < 10 ? (
              "Should be Greater Than 10"
            ) : (
              "Should be Less Than 1000"
            )
          ) : invalidAddress ? (
            "Invalid Address"
          ) : (
            "Buy"
          )}
        </button>
      </div>
      <div className="flex items-center space-x-3 justify-center mt-6">
        <a
          href={"https://www.mastercard.us/en-us.html"}
          target="_blank"
          rel="noreferrer"
        >
          <img src={MasterCard} alt="MasterCard" className="w-10" />
        </a>
        <a href={"https://usa.visa.com/"} target="_blank" rel="noreferrer">
          <img src={Visa} alt="Visa" className="w-10" />
        </a>
        <a
          href={"https://www.americanexpress.com/"}
          target="_blank"
          rel="noreferrer"
        >
          <img src={AmEx} alt="AmEx" className="w-8" />
        </a>
        <a
          href={"https://www.global.jcb/en/products/cards/index.html"}
          target="_blank"
          rel="noreferrer"
        >
          <img src={JCB} alt="JCB" className="w-10" />
        </a>
        <a href={"https://www.discover.com"} target="_blank" rel="noreferrer">
          <img src={Discover} alt="Discover" className="w-10" />
        </a>
      </div>
    </>
  )
}

export default CCPanel
