import Swal from "sweetalert2";

const ToastError = Swal.mixin({
  toast: true,
  icon: "error",
  position: "bottom-end",
  padding: "1.5em",
  width: "fit-content",
  background: "#2d2d2d",
  color: "#fff",
  iconColor: "#ff4444",
  showCloseButton: true,
  showConfirmButton: false,
  timerProgressBar: true,
  timer: 5000,
  customClass: {
    closeButton: "ms-swal-close-btn",
    timerProgressBar: "ms-swal-progress-bar-error"
  },
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer)
    toast.addEventListener("mouseleave", Swal.resumeTimer)
  }
})

export default ToastError;
