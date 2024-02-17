import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearError, selectErrorMassage } from '../redux/slices/errorSlice';
import { useEffect } from 'react';

const Error = () => {
  const error = useSelector(selectErrorMassage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error, {
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        closeButton: false,
        draggablePercent: 50,
        onClose: () => dispatch(clearError()),
      });
    }
  }, [error, dispatch]);

  return <ToastContainer position="top" />;
};

export default Error;
