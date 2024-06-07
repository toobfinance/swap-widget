import { DEFAULT_IMAGE_URL } from "../constants"
import { ChainId } from "../packages/chain"
import { Token, Type } from "../packages/currency"
import { usePrice } from "../packages/prices"
import { useAccount, useBalance } from "wagmi"
import TokenImportWarningModal from "./TokenImportWarningModal"
import { useState } from "react"

interface TokenListItemProps {
  token: Type
  onSelectItem: any
  className?: string
}

const TokenListItem: React.FC<TokenListItemProps> = ({
  token,
  onSelectItem,
  className,
}) => {
  const { address } = useAccount()
  const { data: balance } = useBalance({
    address,
    token: token instanceof Token ? token.address : undefined,
    query: { enabled: Boolean(address), refetchInterval: 30000 },
  })
  const [warningOpen, setWarningOpen] = useState(false)

  const { data: price } = usePrice({
    address: token.wrapped.address,
    chainId: ChainId.ARBITRUM_ONE,
    enabled: (balance?.value ?? 0n) > 0n,
  })

  return (
    <>
      <div
        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl hover:bg-[--color-secondary-hover-button] transition-all cursor-pointer ${
          className ?? ""
        }`}
        onClick={
          token.isCustom ? () => setWarningOpen(true) : onSelectItem(token)
        }
      >
        <div className="flex items-center">
          <img
            src={token?.icon ?? DEFAULT_IMAGE_URL}
            width={32}
            height={32}
            alt="token"
            className="h-8 w-8 rounded-full"
          />
          <div className="ml-4">
            <div className="flex items-center">
              <span className="text-[--color-primary-text] font-semibold">
                {token.name}
              </span>
              <span className="text-[--color-primary-text] text-sm ml-2">
                {token.symbol}
              </span>
            </div>
            <div className="text-sm text-[--color-secondary-text]">{token.category}</div>
          </div>
        </div>
        {balance && balance.value > 0n ? (
          <div className="flex flex-col items-end">
            <span className="text-[--color-primary-text] text-sm font-semibold">
              {Number(balance.formatted).toLocaleString("en-US", {
                maximumFractionDigits: 9,
              })}
            </span>
            {price ? (
              <span className="text-[--color-secondary-text] text-sm">
                ${(price * Number(balance.formatted)).toFixed(2)}
              </span>
            ) : undefined}
          </div>
        ) : null}
      </div>

      {token.isCustom ? (
        <TokenImportWarningModal
          open={warningOpen}
          onClose={() => setWarningOpen(false)}
          onConfirm={onSelectItem(token)}
          token={token.wrapped.address}
        />
      ) : null}
    </>
  )
}

export default TokenListItem
