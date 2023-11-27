import LoginFormPage from "../SessionForms/LoginFormPage";
import SignupFormPage from "../SessionForms/SignupFormPage";
import { closeModal } from "../../store/modal";
import "./modal.css";
import { useDispatch, useSelector } from "react-redux";

const Modal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal?.modal);

  if (!modal) {
    return null;
  }

  let component;
  let modalClass = "modal-child";

  switch (modal) {
    case "login":
      component = <LoginFormPage modal={"null"} />;
      break;
    case "signup":
      component = <SignupFormPage modal={"null"} />;
      break;
    default:
      return null;
  }

  return (
    <div
      className="modal-background"
      onClick={() => dispatch(closeModal("null"))}
    >
      <div className={modalClass} onClick={(e) => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
};

export default Modal;