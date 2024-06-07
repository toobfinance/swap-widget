import React, { useEffect } from "react"
import { Toast, toast, useToaster } from "react-hot-toast"
import ExternalLink from "./svgs/ExternalLink"
import Spinner from "./Spinner"
import Close from "./svgs/Close"

interface CustomToastProps {
  t: Toast
  type: "success" | "info" | "error"
  text: string
  hash?: string
}

const CustomToast: React.FC<CustomToastProps> = ({ t, type, text, hash }) => {
  const { toasts } = useToaster()

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .slice(1)
      .forEach((t) => toast.dismiss(t.id))
  }, [toasts])

  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } min-w-[300px] max-w-[400px] py-3 px-4 flex items-center justify-between rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] ${
        type === "info"
          ? "bg-[--color-info-background]"
          : type === "success"
          ? "bg-[--color-success-background]"
          : "bg-[--color-error-background]"
      }`}
    >
      <div
        className={`mr-4 ${
          type === "info"
            ? "text-[--color-primary-text]"
            : type === "success"
            ? "text-white"
            : "text-white"
        }`}
      >
        <div className="font-semibold">{text}</div>
        {hash ? (
          <a
            href={`https://arbiscan.io/tx/${hash}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center opacity-75 hover:opacity-50 hover:underline transition-all mt-1"
          >
            View on Arbiscan <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        ) : null}
      </div>
      {type === "info" ? (
        <Spinner className="text-[--color-primary-text]" />
      ) : (
        <button
          className="flex items-center justify-center rounded-full w-[30px] h-[30px] hover:bg-white/5 transition-all"
          onClick={() => toast.dismiss(t.id)}
        >
          <Close className="w-2.5 h-2.5 text-white" />
        </button>
      )}
    </div>
  )
}

export default CustomToast
