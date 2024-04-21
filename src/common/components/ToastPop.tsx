import { IToastProps } from "@common/interface/interface";
import toast from "react-hot-toast";

const ToastPop =(message: string) => {
    toast(message, {
      duration: 3000,
      position: "bottom-center",
      style: {
        cursor: 'pointer',
        borderRadius: '0.8rem',
        padding: '1.6rem',
        background: 'rgba(0,0,0,0.75)',
        color: '#fff',
        textAlign: 'center',
        userSelect: 'none',
      },
    })
}

export default ToastPop;
