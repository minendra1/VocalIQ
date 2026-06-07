import mongoose from 'mongoose';
import User from './Server/Models/user.model.js';

const MONGODB_URL = 'mongodb+srv://minendragangwar1_db_user:STf2iFIm6CZl8qs2@cluster0.878cvr7.mongodb.net/VocalIQ';

mongoose.connect(MONGODB_URL)
  .then(async () => {
    console.log('Connected to MongoDB');
    const users = await User.find({});
    console.log(`Found ${users.length} user(s):`);
    users.forEach(u => {
      console.log({
        _id: u._id,
        email: u.email,
        geminiApiKey: u.geminiApiKey ? u.geminiApiKey.substring(0, 10) + '...' : 'none',
        geminiStatus: u.geminiStatus,
        isSetupComplete: u.isSetupComplete,
        assistantName: u.assistantName
      });
    });
    await mongoose.disconnect();
    process.exit(0);
  })
  .catch(e => {
    console.error('Error:', e);
    process.exit(1);
  });