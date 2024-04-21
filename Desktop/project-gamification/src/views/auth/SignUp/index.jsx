import React from 'react';
import { GlobalContext } from 'contexts/GlobalContext';
import InputField from 'components/fields/InputField';
import Checkbox from 'components/checkbox';

export default function SignUp() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  const { signUp } = React.useContext(GlobalContext);
  const [confirmPassword, setConfirmPassword] = React.useState('');



  const handleSignUp = async () => {
    setLoginError('');
    if (password !== confirmPassword) {
        setLoginError('Passwords do not match.');
        return; // Prevent sign-up attempt
      }
    const error = await signUp(email, password);
    if (error) setLoginError(error);
  }; // Firebase errors

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign Up
        </h4>
        <div className="mt-6">
        </div>
        {/* Email */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="mail@simmmple.com"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Password*"
          placeholder="Min. 8 characters"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <InputField
            variant="auth"
            extra="mb-3"
            label="Confirm Password*"
            placeholder="Re-enter your password"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
/>
        {/* Checkbox */}
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
            <Checkbox />
            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
              Keep me logged In
            </p>
          </div>
        </div>
        <button onClick={handleSignUp} className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Sign Up
        </button>
        <div className="flex mb-3 mt-3">
      <p className={`text-sm font-bold text-red-500`}>{loginError}</p>
    </div>
        <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Already registered?
          </span>
          <a
            href="/auth/sign-in"
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}