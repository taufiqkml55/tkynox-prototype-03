
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useContext, useEffect } from 'react';
import { auth, googleProvider } from '../services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, updateProfile, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import { audioSystem } from '../services/audioSystem';
import { Language } from '../types';
import { TranslationContext } from '../contexts/TranslationContext';
import { AdminLoginForm } from './login/AdminLoginForm';
import { UserLoginForm } from './login/UserLoginForm';

interface LoginProps {
  onLogin: () => void; 
  onAdminLogin: () => void;
  onCancel: () => void;
  language: Language;
}

const Login: React.FC<LoginProps> = ({ onLogin, onAdminLogin, onCancel }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'verifying' | 'success'>('idle');
  const [loginMethod, setLoginMethod] = useState<'email' | 'google' | 'phone' | 'admin' | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Phone Auth State
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [phoneStep, setPhoneStep] = useState(1); // 1 = Enter Phone, 2 = Enter OTP

  // Admin State
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  const { login: t } = useContext(TranslationContext);

  const getFriendlyErrorMessage = (code: string) => {
      const projectId = auth.app.options.projectId || 'UNKNOWN';
      const apiKey = auth.app.options.apiKey ? `${auth.app.options.apiKey.substring(0,4)}...` : 'UNKNOWN';
      
      switch (code) {
          case 'auth/email-already-in-use':
              return 'PROTOCOL FAILED: EMAIL ALREADY REGISTERED. PLEASE LOGIN OR RESET KEY.';
          case 'auth/invalid-credential':
          case 'auth/wrong-password':
          case 'auth/user-not-found':
              return 'ACCESS DENIED: INVALID CREDENTIALS. CHECK INPUT OR REGISTER.';
          case 'auth/weak-password':
              return 'SECURITY ALERT: PASSWORD TOO WEAK.';
          case 'auth/popup-closed-by-user':
              return 'CONNECTION ABORTED BY USER.';
          case 'auth/cancelled-popup-request':
              return 'POPUP CONFLICT DETECTED. RETRY.';
          case 'auth/invalid-phone-number':
              return 'ERROR: INVALID PHONE FORMAT (USE E.164, e.g. +62812...).';
          case 'auth/code-expired':
              return 'ERROR: VERIFICATION CODE EXPIRED.';
          case 'auth/invalid-verification-code':
              return 'ERROR: INVALID VERIFICATION CODE.';
          case 'auth/unauthorized-domain':
              return `DOMAIN BLOCKED (${window.location.hostname}).\nACTION: Go to Firebase Console > Auth > Settings > Authorized Domains and add "${window.location.hostname}".`;
          case 'auth/configuration-not-found':
              return `CONFIG MISMATCH ERROR:
              1. Project in code: ${projectId}
              2. API Key used: ${apiKey}
              
              SOLUTION: Your API Key likely does not belong to project "${projectId}".
              Go to Firebase Console > Project Settings. Copy the "firebaseConfig" object exactly into services/firebase.ts.`;
          case 'auth/operation-not-allowed':
              return `PROVIDER DISABLED [Project: ${projectId}]:
              Go to Firebase Console > Authentication > Sign-in method.
              Enable the provider (Google/Email/Phone).
              Ensure "Project Support Email" is set for Google.`;
          default:
              return `SYSTEM ERROR: ${code}`;
      }
  };

  const setupRecaptcha = () => {
      if (!(window as any).recaptchaVerifier) {
          (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
              'size': 'invisible',
              'callback': () => {
                  // reCAPTCHA solved, allow signInWithPhoneNumber.
              },
              'expired-callback': () => {
                  setErrorMsg("RECAPTCHA EXPIRED. RETRY.");
              }
          });
      }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMsg(null);
      setSuccessMsg(null);
      setStatus('verifying');
      setLoginMethod('phone');
      audioSystem.playProcessing();

      try {
          setupRecaptcha();
          const appVerifier = (window as any).recaptchaVerifier;
          const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
          setConfirmationResult(confirmation);
          setPhoneStep(2);
          setStatus('idle');
          audioSystem.playSuccess();
      } catch (error: any) {
          console.error("Phone Auth Error:", error);
          setStatus('idle');
          audioSystem.playError();
          setErrorMsg(getFriendlyErrorMessage(error.code));
          if ((window as any).recaptchaVerifier) {
              (window as any).recaptchaVerifier.clear();
              (window as any).recaptchaVerifier = null;
          }
      }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!confirmationResult) return;
      setErrorMsg(null);
      setSuccessMsg(null);
      setStatus('verifying');
      audioSystem.playProcessing();

      try {
          await confirmationResult.confirm(otp);
          setStatus('success');
          audioSystem.playSuccess();
          setTimeout(() => {
              onLogin();
          }, 800);
      } catch (error: any) {
          console.error("OTP Verification Error:", error);
          setStatus('idle');
          audioSystem.playError();
          setErrorMsg(getFriendlyErrorMessage(error.code));
      }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    if (isRegistering && !name) return;

    setLoginMethod('email');
    setStatus('verifying');
    setErrorMsg(null);
    setSuccessMsg(null);
    audioSystem.playProcessing();

    try {
        if (isRegistering) {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            
            // Send Verification Email
            await sendEmailVerification(userCredential.user);
            setSuccessMsg(t.verify_email_sent || "VERIFICATION LINK SENT TO EMAIL.");
        } else {
            await signInWithEmailAndPassword(auth, email, password);
        }
        
        setStatus('success');
        audioSystem.playSuccess();
        setTimeout(() => {
            onLogin(); 
        }, 1500);
    } catch (error: any) {
        const message = error?.message || 'Unknown Auth Error';
        const code = error?.code || 'unknown';
        console.error("Auth Error:", code, message);
        setStatus('idle');
        audioSystem.playError();
        setErrorMsg(getFriendlyErrorMessage(code));
    }
  };

  const handleForgotPassword = async () => {
      if (!email) {
          setErrorMsg("ENTER IDENTITY (EMAIL) FIRST.");
          audioSystem.playError();
          return;
      }
      
      setStatus('verifying');
      setErrorMsg(null);
      setSuccessMsg(null);
      audioSystem.playProcessing();

      try {
          await sendPasswordResetEmail(auth, email);
          setStatus('idle');
          setSuccessMsg(t.reset_sent || "RESET LINK TRANSMITTED TO EMAIL.");
          audioSystem.playSuccess();
      } catch (error: any) {
          console.error("Reset Password Error:", error);
          setStatus('idle');
          audioSystem.playError();
          setErrorMsg(getFriendlyErrorMessage(error.code));
      }
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setStatus('verifying');
      
      if (adminPassword === '040404') {
          setStatus('success');
          audioSystem.playSuccess();
          setTimeout(() => {
              onAdminLogin();
              onLogin(); // Explicitly trigger view change after admin login
          }, 800);
      } else {
          setStatus('idle');
          setErrorMsg('ACCESS DENIED: INVALID SECURITY CLEARANCE CODE');
          audioSystem.playError();
          setAdminPassword('');
      }
  };

  const handleGoogleLogin = async (useRedirect = false) => {
    setLoginMethod('google');
    setStatus('verifying');
    setErrorMsg(null);
    setSuccessMsg(null);
    audioSystem.playClick();
    
    try {
        if (useRedirect) {
            await signInWithRedirect(auth, googleProvider);
            // Redirect happens here, code stops
        } else {
            await signInWithPopup(auth, googleProvider);
            setStatus('success');
            audioSystem.playSuccess();
            setTimeout(() => {
                onLogin();
            }, 800);
        }
    } catch (error: any) {
        const message = error?.message || 'Unknown Auth Error';
        const code = error?.code || 'unknown';
        console.error("Google Auth Error:", code, message);
        setStatus('idle');
        audioSystem.playError();
        setErrorMsg(getFriendlyErrorMessage(code));
    }
  };

  const toggleMode = () => {
      setIsRegistering(!isRegistering);
      setStatus('idle');
      setErrorMsg(null);
      setSuccessMsg(null);
      setLoginMethod(null);
      setName('');
      audioSystem.playClick();
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 animate-fade-in-up relative overflow-hidden">
       {/* Background Elements */}
       <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#00FF41]/20"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#00FF41]/20"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.02)_1px,transparent_1px)] bg-[size:100%_4px]"></div>
       </div>

      <div className="max-w-md w-full bg-[#0D0D0D] border border-[#333] p-8 relative z-10 shadow-2xl shadow-[#00FF41]/10 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,255,65,0.15)]">
        <div className="absolute top-0 left-0 w-2 h-2 bg-[#00FF41]"></div>
        <div className="absolute top-0 right-0 w-2 h-2 bg-[#00FF41]"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#00FF41]"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#00FF41]"></div>

        <div className="text-center mb-10">
           <div className="w-12 h-12 mx-auto border border-[#00FF41] flex items-center justify-center mb-4 rounded-full animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#00FF41" className="w-6 h-6">
                 {isAdminLogin ? (
                     <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                 ) : isRegistering ? (
                     <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3.75 19.5a6.96 6.96 0 006-3.75 7.06 7.06 0 01-3.75-6 7.06 7.06 0 01-6 3.75 6.96 6.96 0 003.75 6z" />
                 ) : (
                     <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                 )}
              </svg>
           </div>
           <h2 className="text-2xl font-bold text-white tracking-widest uppercase font-mono">
               {isAdminLogin ? t.title_admin : (isRegistering ? t.title_new : t.title_access)}
           </h2>
           <p className="text-xs text-[#666] mt-2 font-mono">
               {isAdminLogin ? t.subtitle_admin : (isRegistering ? t.subtitle_new : t.subtitle_access)}
           </p>
        </div>

        {isAdminLogin ? (
            <AdminLoginForm 
                onSubmit={handleAdminSubmit}
                adminPassword={adminPassword}
                setAdminPassword={setAdminPassword}
                status={status}
                errorMsg={errorMsg}
                onCancel={() => { setIsAdminLogin(false); setErrorMsg(null); }}
                t={t}
            />
        ) : (
            <UserLoginForm 
                onSubmit={handleSubmit}
                isRegistering={isRegistering}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                status={status}
                errorMsg={errorMsg}
                successMsg={successMsg}
                loginMethod={loginMethod}
                handleGoogleLogin={() => handleGoogleLogin(false)}
                onSwitchToAdmin={() => {
                    audioSystem.playClick();
                    setIsAdminLogin(true);
                    setErrorMsg(null);
                }}
                onForgotPassword={handleForgotPassword}
                toggleMode={toggleMode}
                onCancel={onCancel}
                t={t}
                // Phone Props
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                otp={otp}
                setOtp={setOtp}
                phoneStep={phoneStep}
                setPhoneStep={setPhoneStep}
                handleSendOtp={handleSendOtp}
                handleVerifyOtp={handleVerifyOtp}
            />
        )}
      </div>
    </div>
  );
};

export default Login;
