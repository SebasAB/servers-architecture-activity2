const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrar un usuario
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, bio } = req.body;
    const user = new User({ name, email, password, bio, active: false });
    await user.save();

    const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1d' });
    const activationLink = `http://localhost:8000/api/users/activate/${token}`;
    
    // Devolvemos el enlace de activación
    res.status(201).json({
      message: 'User registered. Please activate your account.',
      activationLink
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Activar la cuenta
exports.activateAccount = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, 'secretkey');
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.active = true;
    await user.save();
    res.status(200).json({ message: 'Account activated' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

// Iniciar sesión
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.active) {
      return res.status(401).json({ message: 'Invalid credentials or account not activated' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
