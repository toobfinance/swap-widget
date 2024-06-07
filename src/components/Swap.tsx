// @ts-nocheck

import { useEffect, useState } from "react"
import SettingPopup from "./SettingPopup"
import SwapPanel from "./Swap/SwapPanel"
import CCPanel from "./CC/CCPanel"
import { SwapWidgetProps } from "../SwapWidget"

const Swap = ({
  amount,
  inputToken,
  mode,
  outputToken,
  width,
  theme,
}: SwapWidgetProps) => {
  const [selectedTab, setSelectedTab] = useState(1)
  useEffect(() => {
    setSelectedTab(mode === "swap" ? 0 : 1)
  }, [mode])

  useEffect(() => {
    const styles = {
      "--color-primary-text": theme?.colorPrimaryText,
      "--color-secondary-text": theme?.colorSecondaryText,
      "--color-input-text": theme?.colorInputText,
      "--color-gray-text": theme?.colorGrayText,
      "--color-link-text": theme?.colorLinkText,
      "--color-mail-text": theme?.colorMailText,
      "--color-primary-background": theme?.colorPrimaryBackground,
      "--color-secondary-background": theme?.colorSecondaryBackground,
      "--color-dialog-header-background": theme?.colorDialogHeaderBackground,
      "--color-dialog-body-background": theme?.colorDialogBodyBackground,
      "--color-input-background": theme?.colorInputBackground,
      "--color-primary-border": theme?.colorPrimaryBorder,
      "--color-secondary-border": theme?.colorSecondaryBorder,
      "--color-input-focus-border": theme?.colorInputFocusBorder,
      "--color-active-button": theme?.colorActiveButton,
      "--color-link-button": theme?.colorLinkButton,
      "--color-primary-button": theme?.colorPrimaryButton,
      "--color-primary-hover-button": theme?.colorPrimaryHoverButton,
      "--color-secondary-button": theme?.colorSecondaryButton,
      "--color-secondary-hover-button": theme?.colorSecondaryHoverButton,
      "--color-light-button": theme?.colorLightButton,
      "--color-light-hover-button": theme?.colorLightHoverButton,
      "--color-light-active-button": theme?.colorLightActiveButton,
      "--color-success-background": theme?.colorSuccessBackground,
      "--color-error-background": theme?.colorErrorBackground,
      "--color-info-background": theme?.colorInfoBackground,
      "--color-error-text": theme?.colorErrorText,
      "--color-warning-text": theme?.colorWarningText,
    }

    document.documentElement.setAttribute(
      "style",
      Object.keys(styles)
        .filter((item) => styles[item])
        .map((item) => `${item}: ${styles[item]}`)
        .join("; ")
    )
  }, [theme])

  return (
    <div
      id="toob-finance-widget"
      className="p-2.5 bg-[--color-primary-background] w-fit h-fit rounded-xl"
      style={{
        width: `${width ?? 480}px`,
        fontFamily: "Roobert, sans-serif",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            data-active={selectedTab === 1}
            className="bg-transparent border border-[--color-primary-border] rounded-full text-[--color-secondary-text] data-[active=true]:text-[--color-primary-text] py-3 px-4 data-[active=true]:bg-[--color-secondary-background] font-semibold"
            onClick={() => setSelectedTab(1)}
          >
            Buy
          </button>
          <button
            data-active={selectedTab === 0}
            className="bg-transparent border border-[--color-primary-border] rounded-full text-[--color-secondary-text] data-[active=true]:text-[--color-primary-text] py-3 px-4 data-[active=true]:bg-[--color-secondary-background] font-semibold"
            onClick={() => setSelectedTab(0)}
          >
            Swap
          </button>
        </div>
        {selectedTab === 0 ? <SettingPopup /> : null}
      </div>
      {selectedTab === 0 ? (
        <SwapPanel
          amount={amount}
          inputToken={inputToken}
          outputToken={outputToken}
        />
      ) : selectedTab === 1 ? (
        <CCPanel amount={amount} outputToken={outputToken} />
      ) : null}
    </div>
  )
}

export default Swap
