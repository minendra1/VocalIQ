# Google OAuth Configuration Guide

## Issue: redirect_uri_mismatch Error

This error occurs when the redirect URI used by Firebase Authentication doesn't match the authorized redirect URIs configured in Google Cloud Console.

## Steps to Fix

### 1. Go to Google Cloud Console
- Visit: https://console.cloud.google.com/
- Select your **VocalIQ** project

### 2. Enable Firebase Admin SDK (if not already done)
- Go to **APIs & Services** → **Library**
- Search for "Firebase Admin SDK" and enable it

### 3. Configure OAuth Consent Screen
- Go to **APIs & Services** → **OAuth consent screen**
- Fill in required fields:
  - **App name**: VocalIQ
  - **User support email**: Your email
  - **Developer contact information**: Your email
- Add scopes if needed (Firebase handles most automatically)
- Add test users if in testing mode

### 4. Create OAuth 2.0 Credentials
- Go to **APIs & Services** → **Credentials**
- Click **Create Credentials** → **OAuth client ID**
- Application type: **Web application**
- Name: **VocalIQ Web Client**

### 5. Add Authorized JavaScript Origins
Under **Authorized JavaScript origins**, add:
```
http://localhost:5173
https://vocaliq.firebaseapp.com
```

### 6. Add Authorized Redirect URIs
Under **Authorized redirect URIs**, add:
```
http://localhost:5173/__/auth/handler
https://vocaliq.firebaseapp.com/__/auth/handler
```

**Important**: The `__/auth/handler` path is required by Firebase Authentication.

### 7. Save and Wait
- Click **Create** or **Save**
- Wait 1-2 minutes for changes to propagate

### 8. Test the Login
- Restart your development server
- Try logging in with Google

## Troubleshooting

### Still getting redirect_uri_mismatch?

1. **Check the exact error message** - it may show the redirect URI that's being used
2. **Verify you added the correct port** - Vite uses port 5173 by default
3. **Clear browser cache and cookies** - old auth states can cause issues
4. **Try incognito mode** - to rule out cached data

### Common Mistakes

- ❌ Missing the `__/auth/handler` path
- ❌ Using wrong port (e.g., 3000 instead of 5173)
- ❌ Forgetting to add both HTTP (local) and HTTPS (production) URIs
- ❌ Not waiting for changes to propagate

### Firebase Configuration

Your Firebase config in `Client/src/utils/firebase.js` should match your Firebase project:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "vocaliq.firebaseapp.com",  // Must match your Firebase project
  projectId: "vocaliq",
  storageBucket: "vocaliq.firebasestorage.app",
  messagingSenderId: "1095099448118",
  appId: "1:1095099448118:web:6cbcb1b989228c5fc99197"
};
```

### Enable Google Sign-In in Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your **VocalIQ** project
3. Go to **Authentication** → **Sign-in method**
4. Enable **Google** provider
5. Set your project's support email
6. Click **Save**

## Additional Resources

- [Firebase Google Authentication Docs](https://firebase.google.com/docs/auth/web/google-signin)
- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [Troubleshooting OAuth Errors](https://support.google.com/cloud/answer/6158849)