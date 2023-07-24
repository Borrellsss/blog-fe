import Swal from "sweetalert2";

const ToastSuccess = Swal.mixin({
  toast: true,
  icon: "warning",
  position: "bottom-end",
  padding: "1.5em",
  width: "fit-content",
  background: "#2d2d2d",
  color: "#fff",
  iconColor: "#ffbb33",
  showCloseButton: true,
  showConfirmButton: false,
  timerProgressBar: true,
  timer: 5000,
  customClass: {
    closeButton: "ms-swal-close-btn",
    timerProgressBar: "ms-swal-progress-bar-warning"
  },
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer)
    toast.addEventListener("mouseleave", Swal.resumeTimer)
  }
})

export default ToastSuccess;
