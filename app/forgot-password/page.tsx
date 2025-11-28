'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserAuthStore } from '@/lib/userAuthStore';
import { Mail, Key, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

/**
* Renders the forgot password UI that toggles between requesting a reset link and using a token to reset the password.
* @example
* ForgotPasswordPageContent()
* <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">...</div>
* @returns {JSX.Element} JSX element representing the forgot/reset password page content.
**/
function ForgotPasswordPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetToken = searchParams.get('token');
  const email = searchParams.get('email');
  
  const { requestPasswordReset, resetPassword } = useUserAuthStore();
  const [step, setStep] = useState<'request' | 'reset'>(resetToken && email ? 'reset' : 'request');
  const [formData, setFormData] = useState({
    email: email || '',
    resetToken: resetToken || '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetTokenGenerated, setResetTokenGenerated] = useState<string | null>(null);

  /**
  * Handles password reset form submission by validating input, showing feedback, and requesting a reset token.
  * @example
  * sync({ preventDefault: () => {}, ... })
  * undefined
  * @param {{React.FormEvent}} e - Form event used to prevent default submission behavior.
  * @returns {{Promise<void>}} Promise resolving when the reset flow handling completes.
  **/
  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.email.trim()) {
      toast.error('Please enter your email address');
      setLoading(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    const result = requestPasswordReset(formData.email);

    if (result.success && result.resetToken) {
      setResetTokenGenerated(result.resetToken);
      toast.success('Password reset link generated!');
      // In production, this would be sent via email
      // For demo, we'll show it and allow manual navigation
    } else {
      toast.error(result.error || 'Failed to generate reset link');
    }

    setLoading(false);
  };

  /**
  * Handles the password reset submission workflow by validating input, triggering reset, and redirecting or showing errors
  * @example
  * sync(event)
  * void
  * @param {{React.FormEvent}} {{e}} - Form submission event object to prevent default behavior.
  * @returns {{Promise<void>}} Resolves after processing reset logic and updating UI state.
  **/
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const success = await resetPassword(formData.email, formData.resetToken, formData.newPassword);

      if (success) {
        toast.success('Password reset successfully! Please sign in with your new password.');
        router.push('/login');
      } else {
        toast.error('Invalid or expired reset token. Please request a new one.');
        setStep('request');
        setFormData({ ...formData, resetToken: '', newPassword: '', confirmPassword: '' });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'request') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Key className="w-8 h-8 text-primary-600" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
              <p className="text-gray-600">Enter your email to receive a password reset link</p>
            </div>

            {resetTokenGenerated ? (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900 mb-2 font-semibold">Reset Token Generated</p>
                  <p className="text-xs text-blue-700 mb-3">
                    In production, this would be sent to your email. For demo purposes, use this link:
                  </p>
                  <Link
                    href={`/forgot-password?email=${encodeURIComponent(formData.email)}&token=${resetTokenGenerated}`}
                    className="text-primary-600 hover:text-primary-700 font-semibold text-sm break-all"
                  >
                    Click here to reset password
                  </Link>
                </div>
                <button
                  onClick={() => {
                    setResetTokenGenerated(null);
                    setFormData({ ...formData, email: '' });
                  }}
                  className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Request Another Reset Link
                </button>
              </div>
            ) : (
              <form onSubmit={handleRequestReset} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
                </button>
              </form>
            )}

            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 font-semibold"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Key className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
            <p className="text-gray-600">Enter your new password</p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full pl-10 pr-4 py-3 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                  disabled
                />
              </div>
            </div>

            <div>
              <label htmlFor="resetToken" className="block text-sm font-semibold mb-2">
                Reset Token *
              </label>
              <input
                id="resetToken"
                type="text"
                value={formData.resetToken}
                onChange={(e) => setFormData({ ...formData, resetToken: e.target.value })}
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                placeholder="Enter reset token"
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-semibold mb-2">
                New Password *
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2">
                Confirm New Password *
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  className="w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 font-semibold"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
* Returns the forgot-password page layout with a loading fallback while suspense resolves.
* @example
* ForgotPasswordPage()
* <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">...</div>}><ForgotPasswordPageContent /></Suspense>
* @param {{void}} _ - No arguments are required.
* @returns {{React.ReactNode}} React element tree representing the forgot-password page.
**/
export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Loading...</h1>
        </div>
      </div>
    }>
      <ForgotPasswordPageContent />
    </Suspense>
  );
}

