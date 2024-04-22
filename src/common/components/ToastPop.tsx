import toast, { ToastPosition } from 'react-hot-toast';

const ToastPop = (
  message: string,
  duration: number,
  position: ToastPosition | undefined,
  icon: string | null,
  isError: boolean,
) => {
  if (isError) {
    toast.error(message, {
      duration: duration,
      position: position,
      icon: icon,
    });
  } else {
    toast(message, {
      duration: duration,
      position: position,
      style: {
        cursor: 'pointer',
        borderRadius: '0.8rem',
        padding: '1.6rem',
        background: 'rgba(0,0,0,0.75)',
        color: '#fff',
        textAlign: 'center',
        userSelect: 'none',
      },
    });
  }
};

export default ToastPop;
