import { Dialog, DialogPanel, Transition } from "@headlessui/react"
import ExternalLink from "./svgs/ExternalLink"
import Clipboard from "./svgs/Clipboard"
import Alert from "./svgs/Alert"

interface TokenImportWarningModalProps {
  token: string
  onConfirm: any
  open: boolean
  onClose: any
  className?: string
}

const TokenImportWarningModal: React.FC<TokenImportWarningModalProps> = ({
  token,
  onConfirm,
  open,
  onClose,
}) => {
  const onCopy = () => {
    window.navigator.clipboard.writeText(token)
  }

  return (
    <Transition appear show={open}>
      <Dialog
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => {}}
      >
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur"
          aria-hidden="true"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-lg rounded-xl bg-[--color-secondary-background] p-6 backdrop-blur-2xl px-10 py-8">
              <div className="flex justify-center">
                <Alert className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-[--color-input-text] text-center mt-2">
                Buy at your own risk!
              </h3>
              <p className="mt-2 text-sm text-[--color-input-text] text-center">
                Anyone can create a token, including creating fake versions of
                existing tokens that claim to represent projects.
                <br />
                <br />
                <strong>
                  If you purchase this token, you may not be able to sell it
                  back or it might be a scam.
                </strong>
              </p>
              <div className="flex overflow-hidden cursor-pointer bg-[--color-link-button] py-1 px-2 rounded-lg text-[--color-link-text] mt-3">
                <a
                  href={`https://arbiscan.com/token/${token}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center overflow-hidden hover:brightness-75 transition-all"
                >
                  <span className="overflow-hidden text-ellipsis text-sm">
                    https://arbiscan.com/token/{token}
                  </span>
                  <button className="ml-1">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </a>
                <button
                  className="ml-1 hover:brightness-75 transition-all"
                  onClick={onCopy}
                >
                  <Clipboard className="w-4 h-4" />
                </button>
              </div>
              <button
                className="w-full bg-[--color-active-button] py-3 rounded-xl mt-4 hover:brightness-75 transition-all text-[--color-primary-text]"
                onClick={() => {
                  onConfirm()
                  onClose()
                }}
              >
                I understand
              </button>
              <div className="flex justify-center">
                <button
                  className="text-sm mt-2 text-[--color-primary-text]"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default TokenImportWarningModal
