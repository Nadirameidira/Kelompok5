const authService = require('./auth-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { passwordMatched } = require('../../../utils/password');

async function login(request, response, next) {
  try {
    const { email, password } = request.body;
    
    if (!email || !password) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Email and password are required'
      );
    }
    
    const loginResult = await authService.checkLogin(email, password);
    
    if (!loginResult) {
      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        'Wrong email or password'
      );
    }

    return response.status(200).json(loginResult);
  } catch (error) {
    return next(error);
  }
}

async function register(request, response, next) {
  try {
    const { email, password, full_name, confirm_password } = request.body;


    if (!email || !password || !full_name) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Email, password, and full name are required'
      );
    }

    if (password !== confirm_password) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Password and confirm password do not match'
      );
    }

    if (password.length < 8) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Password must be at least 8 characters'
      );
    }

    const { Users } = require('../../../models');
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      throw errorResponder(errorTypes.EMAIL_ALREADY_TAKEN, 'Email already registered');
    }

  
    const { hashPassword } = require('../../../utils/password');
    const hashedPassword = await hashPassword(password);


    const newUser = await Users.create({
      email,
      password: hashedPassword,
      fullName: full_name,
      role: 'cashier',
    });

    const token = authService.generateToken(email);

    return response.status(201).json({
      success: true,
      message: 'Registration successful',
      token: token,
      user: {
        id: newUser._id,
        email: newUser.email,
        full_name: newUser.fullName,
        role: newUser.role
      }
    });
  } catch (error) {
    return next(error);
  }
}



async function getProfile(request, response, next) {
  try {
    const user = request.user;
    
    return response.status(200).json({
      id: user._id,
      email: user.email,
      full_name: user.fullName,
    });
  } catch (error) {
    return next(error);
  }
}

async function updatePassword(request, response, next) {
  try {
    const { old_password, new_password, confirm_new_password } = request.body;
    const user = request.user;
    
    if (!old_password || !new_password || !confirm_new_password) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Old password, new password, and confirm password are required'
      );
    }
    
    if (new_password.length < 8) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'New password must be at least 8 characters long'
      );
    }
    
    if (new_password !== confirm_new_password) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'New password and confirm password do not match'
      );
    }

    const isPasswordValid = await passwordMatched(old_password, user.password);
    
    if (!isPasswordValid) {
      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        'Current password is incorrect'
      );
    }
    
    const { hashPassword } = require('../../../utils/password');
    const hashedPassword = await hashPassword(new_password);
    
    const { Users } = require('../../../models');
    await Users.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });
    
    return response.status(200).json({ 
      success: true,
      message: 'Password updated successfully' 
    });
  } catch (error) {
    return next(error);
  }
}

async function testProtected(request, response, next) {
  try {
    return response.status(200).json({ 
      message: 'VALID TOKEN, you can access this protected route now ^_^', 
      user: {
        email: request.user.email,
        fullName: request.user.fullName
      }
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  login,
  register,
  getProfile,
  updatePassword,
  testProtected,
};