import { PRIMARY_TOKEN_LIST, TokenType } from "../packages/config"
import { Native, Token } from "../packages/currency"
import { ChainId } from "../packages/chain"

export const fetchTokenInfo = (tokenType: TokenType) => {
  const token = PRIMARY_TOKEN_LIST.find((item) => item.symbol === tokenType)
  if (!token) return undefined
  return "native" in token
    ? Native.onChain(ChainId.ARBITRUM_ONE)
    : new Token({
        address: token.address,
        chainId: ChainId.ARBITRUM_ONE,
        decimals: token.decimals,
        name: token.name,
        symbol: token.symbol,
        icon: token.icon,
      })
}
