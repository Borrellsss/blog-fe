import Swal from "sweetalert2";

const ToastSuccess = Swal.mixin({
  toast: true,
  icon: "success",
  position: "bottom-end",
  padding: "1.5em",
  width: "fit-content",
  background: "#2d2d2d",
  color: "#fff",
  iconColor: "#00c851",
  showCloseButton: true,
  showConfirmButton: false,
  timerProgressBar: true,
  timer: 5000,
  customClass: {
    closeButton: "ms-swal-close-btn",
    timerProgressBar: "ms-swal-progress-bar-success"
  },
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer)
    toast.addEventListener("mouseleave", Swal.resumeTimer)
  }
})

export default ToastSuccess;
