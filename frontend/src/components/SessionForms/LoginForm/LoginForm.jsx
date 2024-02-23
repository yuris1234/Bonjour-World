import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './index.css';
import { closeModal } from "../../../store/modal";
import { login, clearSessionErrors } from '../../../store/session';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
      dispatch(clearSessionErrors());
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(login({ email, password }));
    if (res.ok) {
      dispatch(closeModal());
      history.push('/events');
    }
  };

  const handleGuestLogin = async () => {
    dispatch(clearSessionErrors());
    setEmail("")
    setPassword("")
    setShowPassword(false)

    // typing effect
    const typingEffect = async (credential, setCredential) => {
      for (const char of credential) {
        // typing in the credential one char at a time
        await new Promise((resolve) => setTimeout(() => {
          setCredential((prev) => prev + char);
          resolve();
        }, 30)); 
      }
    };

    await typingEffect("bonjour@guest.com", setEmail);
    await typingEffect("guestpassword1234", setPassword);

    // login guest after typing effect is complete
    const guestCredentials = {
      email: "demo@demo.com",
      password: "password"
    };
    await new Promise((resolve) => setTimeout(resolve, 300)); // short pause 
    dispatch(login(guestCredentials));
    dispatch(closeModal());
    history.push('/events');
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Log In</h2>

      <div className="inputs">
        <div className="errors">{errors?.email}</div>
          <input
            type="email"
            value={email}
            onChange={update('email')}
            placeholder="Email"
          />
        <div className="errors">{errors?.password}</div>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={update('password')}
            placeholder="Password"
          />
          <i className={showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} onClick={() => setShowPassword((prev) => !prev)}/>
      </div>

      <div className="button-container">
        <button
          type="submit"
          disabled={!email || !password}
          className='login-button'
        >
          Log In
        </button>
        <button type="button" onClick={handleGuestLogin} className='login-as-guest-button'>
          Login as Guest
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
