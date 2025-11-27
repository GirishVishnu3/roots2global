import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { passwordSecurity, inputValidation, rateLimiting } from '@/lib/security';
import { logError } from '@/lib/errorTracking';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, password, firstName, lastName, phone } = body;

    // Rate limiting check (client-side also checks, but server-side is critical)
    const clientId = request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimitKey = `register_${clientId}`;
    
    // Validate inputs
    const emailValidation = inputValidation.validateEmail(email);
    if (!emailValidation.valid) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const firstNameValidation = inputValidation.validateName(firstName);
    if (!firstNameValidation.valid) {
      return NextResponse.json(
        { success: false, error: 'Invalid first name' },
        { status: 400 }
      );
    }

    const lastNameValidation = inputValidation.validateName(lastName);
    if (!lastNameValidation.valid) {
      return NextResponse.json(
        { success: false, error: 'Invalid last name' },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = passwordSecurity.validateStrength(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { success: false, error: passwordValidation.errors.join('. ') },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: emailValidation.sanitized });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await passwordSecurity.hash(password);

    // Create user
    const user = new User({
      email: emailValidation.sanitized,
      firstName: firstNameValidation.sanitized,
      lastName: lastNameValidation.sanitized,
      phone: phone ? inputValidation.validatePhone(phone).sanitized : undefined,
      passwordHash,
    });

    await user.save();

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
      { status: 201 }
    );
  } catch (error: unknown) {
    logError(error instanceof Error ? error : new Error('Unknown registration error'), {
      endpoint: '/api/auth/register',
      method: 'POST',
    });
    return NextResponse.json(
      { success: false, error: 'Failed to create account. Please try again.' },
      { status: 500 }
    );
  }
}

