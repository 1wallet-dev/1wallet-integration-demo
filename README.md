# 1Wallet Integration Demo

## Overview

This repository gives an overview of how application developers can integrate with 1wallet. 1wallet can be used for signing transactions on evm compatible block chains. This repository gives examples of how to integrate 1wallet into your application. it uses three approaches redirect, cross tab and embedding an IFrame.

For more information on 1wallet please see the [wiki](https://github.com/polymorpher/one-wallet/wiki) or try it out at [https://1wallet.crazy.one/](https://1wallet.crazy.one/).

## Quick start

Actual demo can be found [here](https://onewallet-integration.web.app/)

```
yarn
yarn start
```

## Developer guide


### 1Wallet Integration Approach
The 1Wallet Client support integration with other applications [integration code base is here](https://github.com/polymorpher/one-wallet/tree/master/code/client/src/integration).

The `WalletAuth` path is defined in [routes.js](https://github.com/polymorpher/one-wallet/blob/master/code/client/src/routes.js#L81) and uses the following format as defined in [paths.js](https://github.com/polymorpher/one-wallet/blob/master/code/client/src/constants/paths.js#L21) and supports the following format `auth: base + '/auth/:action?/:address?',`

It supports the following actions as defined in [WalletAuth.jsx](https://github.com/polymorpher/one-wallet/blob/master/code/client/src/integration/WalletAuth.jsx)
* connect : `{action === 'connect' && <ConnectWallet caller={caller} callback={callback} />}`
* pay     : `{action === 'pay' && <RequestPayment caller={caller} callback={callback} amount={amount} dest={dest} from={from} />}`
* call    : `{action === 'call' && <RequestCall caller={caller} callback={callback} amount={amount} calldata={calldata} from={from} dest={dest} />}`
* sign    : `{action === 'sign' && <RequestSignature caller={caller} callback={callback} messageB64Encoded={msg} commentB64Encoded={comment} raw={raw} duration={duration} from={from} />}`

### Demo Integration Approaches

#### Connecting to 1Wallet

The Integration Demo connects using the following URL

https://1wallet.crazy.one/auth/connect?caller=ONE+Wallet+Integration+Demo+App&callback=aHR0cDovL2xvY2FsaG9zdDozMDAyL29uZS13YWxsZXQtaWZyYW1lLWNhbGxiYWNr

It receives the following response

```
<!doctype html>
<html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>1wallet</title>
<link rel="icon" href="/1wallet.png?717ed0830f689b645cf0">
<script defer="defer" src="/main.js?717ed0830f689b645cf0"></script>
<script defer="defer" src="/ONEWalletWorker.js?717ed0830f689b645cf0"></script>
</head>
<body>
<div id="root"></div>
</body>
</html>
```

