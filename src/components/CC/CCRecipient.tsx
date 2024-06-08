import { Scanner } from "@yudiel/react-qr-scanner"
import QR from "../svgs/QR"
import { useState } from "react"
import { isAddress } from "viem"

interface CCRecipientProps {
  value: string
  setValue: any
}

const CCRecipient: React.FC<CCRecipientProps> = ({ value, setValue }) => {
  const [qrShow, setQRShow] = useState(false)

  const handleScan = (data: any) => {
    console.log(data)
    if (data) {
      const address = data?.[0]?.rawValue?.replaceAll("Ethereum:", "")
      if (isAddress(address)) setValue(address)
    }
  }

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full h-12 max-sm:data-[fast=true]:h-[72px] outline-none text-[20px] sm:text-[30px] bg-transparent text-[--color-primary-text] font-semibold placeholder:text-[--color-secondary-text] pr-8"
          placeholder="Recipient Address"
        />
        <button
          className="absolute top-1/2 -translate-y-1/2 right-1.5 hover:scale-105 transition-all"
          onClick={() => setQRShow(!qrShow)}
        >
          <QR className="text-[--color-primary-text]" />
        </button>
      </div>
      {qrShow ? (
        <Scanner
          onScan={handleScan}
          formats={["qr_code", "rm_qr_code", "micro_qr_code"]}
          styles={{ container: { aspectRatio: 1 } }}
          paused={!qrShow}
        />
      ) : null}
    </div>
  )
}

export default CCRecipient
