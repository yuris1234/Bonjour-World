import { closeModal } from "../../store/modal";
import LoginForm from "../SessionForms/LoginForm/LoginForm";
import SignupForm from "../SessionForms/SignupForm/SignupForm";
import "./modal.css";
import { useDispatch, useSelector } from "react-redux";

const Modal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal?.modal);

  if (!modal) {
    return null;
  }

  let component;
  let modalClass;

  switch (modal) {
    case "login":
      component = <LoginForm modal={"null"} />;
      modalClass = "login-modal"
      break;
    case "signup":
      component = <SignupForm modal={"null"} />;
      modalClass = "signup-modal";
      break;
    default:
      return null;
  }

  return (
    <div className="modal-background" onClick={() => dispatch(closeModal())}>
      <div className={modalClass} onClick={(e) => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
};

export default Modal;
