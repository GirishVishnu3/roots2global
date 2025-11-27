import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { passwordSecurity, inputValidation } from '@/lib/security';
import { logError } from '@/lib/errorTracking';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, password } = body;

    // Validate email
    const emailValidation = inputValidation.validateEmail(email);
    if (!emailValidation.valid) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Find user
    const user = await User.findOne({ email: emailValidation.sanitized });
    if (!user) {
      // Don't reveal if user exists (security best practice)
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await passwordSecurity.verify(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Return user data (without password hash)
    const userData = {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      createdAt: user.createdAt.toISOString(),
    };

    return NextResponse.json(
      { success: true, user: userData },
      { status: 200 }
    );
  } catch (error: unknown) {
    logError(error instanceof Error ? error : new Error('Unknown login error'), {
      endpoint: '/api/auth/login',
      method: 'POST',
    });
    return NextResponse.json(
      { success: false, error: 'Failed to login. Please try again.' },
      { status: 500 }
    );
  }
}

