import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react"
import TwoLine from "./svgs/TwoLine"
import Close from "./svgs/Close"
import useSettings from "../hooks/useSettings"

const SettingPopup = () => {
  const { deadline, slippage, setDeadline, setSlippage } = useSettings()

  const warning =
    slippage < 0.5
      ? "Your transaction may fail"
      : slippage >= 50
      ? "Enter a valid slippage percentage"
      : slippage >= 2
      ? "Your transaction may be frontrun"
      : undefined

  return (
    <Menu>
      <MenuButton className="flex items-center justify-center w-12 h-12 text-[--color-primary-text] rounded-full border border-[--color-primary-border] hover:bg-[--color-secondary-background] transition-all">
        <TwoLine />
      </MenuButton>
      <Transition
        enter="transition ease-out duration-75"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <MenuItems
          anchor="bottom"
          className="relative mt-2 rounded-xl bg-[--color-secondary-background] border border-[--color-primary-border] shadow-[0px_8px_24px_-8px_rgba(175,178,237,0.24)] w-[375px]"
        >
          <MenuItem>
            {({ close }) => (
              <>
                <h4 className="px-3 py-2 text-[--color-primary-text] border-b border-[--color-primary-border]">
                  Settings
                </h4>
                <button
                  className="flex items-center justify-center absolute top-2 right-2 w-6 h-6 hover:bg-black/5 transition-all rounded-md text-[--color-primary-text]"
                  onClick={close}
                >
                  <Close className="w-2.5 h-2.5" />
                </button>
                <div className="flex flex-col py-4 px-3 space-y-4">
                  <div className="flex flex-col space-y-2">
                    <h4 className="text-[--color-secondary-text] text-sm">
                      Slippage Tolerance
                    </h4>
                    <div className="flex items-center justify-between space-x-2">
                      <div className="flex items-center space-x-1">
                        <button
                          data-active={slippage === 0.1}
                          className="data-[active=true]:bg-[--color-active-button] rounded-xl font-semibold h-10 w-[70px] border border-[--color-primary-border] hover:bg-[--color-primary-border] focus:bg-[--color-active-button] text-[--color-primary-text] transition-all"
                          onClick={() => setSlippage(0.1)}
                        >
                          0.1%
                        </button>
                        <button
                          data-active={slippage === 0.5}
                          className="data-[active=true]:bg-[--color-active-button] rounded-xl font-semibold h-10 w-[70px] border border-[--color-primary-border] hover:bg-[--color-primary-border] focus:bg-[--color-active-button] text-[--color-primary-text] transition-all"
                          onClick={() => setSlippage(0.5)}
                        >
                          0.5%
                        </button>
                        <button
                          data-active={slippage === 1}
                          onClick={() => setSlippage(1)}
                          className="data-[active=true]:bg-[--color-active-button] rounded-xl font-semibold h-10 w-[70px] border border-[--color-primary-border] hover:bg-[--color-primary-border] focus:bg-[--color-active-button] text-[--color-primary-text] transition-all"
                        >
                          1%
                        </button>
                      </div>
                      <div className="relative w-full">
                        <input
                          type="number"
                          value={slippage}
                          onChange={(e) => setSlippage(e.target.valueAsNumber)}
                          onBlur={() =>
                            setSlippage(
                              slippage >= 50 || !slippage ? 0.5 : slippage
                            )
                          }
                          placeholder="0.5"
                          className="w-full h-10 px-4 border font-semibold border-[--color-primary-border] hover:border-[--color-primary-border] rounded-2xl transition-all bg-transparent focus:border-[--color-input-focus-border] focus:shadow-[0px_0px_0px_1px_--color-input-focus-border] text-[--color-primary-text] outline-none placeholder:font-normal [&::-webkit-inner-spin-button]:hidden"
                        />
                        <span className="absolute top-0 right-0 w-10 h-10 flex justify-center items-center text-[--color-primary-text]">
                          %
                        </span>
                      </div>
                    </div>
                    {warning ? (
                      <p
                        className={`${
                          slippage >= 50
                            ? "text-[--color-error-text]"
                            : "text-[--color-warning-text]"
                        } text-sm`}
                      >
                        {warning}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <h4 className="text-[--color-secondary-text] text-sm">
                      Transaction Deadline
                    </h4>
                    <div className="relative w-[210px]">
                      <input
                        type="number"
                        placeholder="30"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.valueAsNumber)}
                        className="w-full h-10 px-4 border font-semibold border-[--color-primary-border] hover:border-[--color-primary-border] rounded-2xl transition-all bg-transparent focus:border-[--color-input-focus-border] focus:shadow-[0px_0px_0px_1px_--color-input-focus-border] text-[--color-primary-text] outline-none placeholder:font-normal [&::-webkit-inner-spin-button]:hidden"
                      />
                      <span className="absolute top-0 right-4 h-10 flex justify-center items-center text-[--color-primary-text]">
                        minutes
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  )
}

export default SettingPopup
