import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import './LoginForm.css';
import { closeModal } from "../../../store/modal";
import { login, clearSessionErrors } from '../../../store/session';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login({ email, password })); 
    dispatch(closeModal("login"))
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Log In</h2>
      <div className="errors">{errors?.email}</div>
      <label>Email
        <input type="text"
          value={email}
          onChange={update('email')}
          placeholder="Email"
        />
      </label>
      <div className="errors">{errors?.password}</div>
      <label>Password
        <input type="password"
          value={password}
          onChange={update('password')}
          placeholder="Password"
        />
      </label>
      <input
        type="submit"
        value="Log In"
        disabled={!email || !password}
      />
    </form>
  );
}

export default LoginForm;