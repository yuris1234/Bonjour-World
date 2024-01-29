import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './index.css';
import { closeModal } from "../../../store/modal";
import { login, clearSessionErrors } from '../../../store/session';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
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
    setEmail("")
    setPassword("")
    
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

    await typingEffect("demo@demo.com", setEmail);
    await typingEffect("password", setPassword);

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
        {/* <label>
          Email */}
          <input
            type="email"
            value={email}
            onChange={update('email')}
            placeholder="Email"
          />
        {/* </label> */}
        <div className="errors">{errors?.password}</div>
        {/* <label>
          Password */}
          <input
            type="password"
            value={password}
            onChange={update('password')}
            placeholder="Password"
          />
        {/* </label> */}
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
