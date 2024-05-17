const config = {
  auth: {
    clientId: "5a8a9d7c-e37b-4d4c-a7b2-c440ef50fd80",
    authority:
      "https://login.microsoftonline.com/569779cc-e9ff-4510-98cb-ed948a207bb6",
    redirectUri: "http://localhost:3000/callback",
    scopes: [
      'user.read'
    ],
  },
  cache: {
    cacheLocation: "sessionStorage", // Or 'localStorage'
    storeAuthStateInCookie: false,
  },
};

export default config;
