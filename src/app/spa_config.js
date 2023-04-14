window.spaConfig = {
  environment: 'dev',
  theme: 'big-dutchman',
  phraseAvailable: true,
  endpoints: {
    accountApi: 'https://account-api.dev.bfn-fusion.bigdutchman.com',
    authApi: 'https://auth-api.dev.bfn-fusion.bigdutchman.com',
    applicationSwitcherApi: 'https://application-switcher.dev.bfn-fusion.bigdutchman.com',
    favicons: 'https://assets.dev.bfn-fusion.bigdutchman.com/public/favicons',
    login: 'https://login.dev.bfn-fusion.bigdutchman.com',
  },
  apolloAuth: {
    tenantId: 'big-dutchman',
    clientId: 'apl-production-planning',
    loginServer: 'https://login.dev.bfn-fusion.bigdutchman.com/auth/',
  },
  remoteAccessParentDomain: 'remote.dev.bfn-fusion.bigdutchman.com',
};
