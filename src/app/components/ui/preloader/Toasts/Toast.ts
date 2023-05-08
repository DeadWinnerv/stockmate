import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  background: '#3e3e3e',
  showConfirmButton: false,
  timer: 4000,
  color: 'white',
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});
