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

## Communication Approach
### URL
Communication is done between the DApp (Integration App) and the one wallet client using the oneWalletURL: [https://1wallet.crazy.one/auth](https://1wallet.crazy.one/auth).

The URL then includes a suffix to identify the type of call being made e.g.
* `/connect` : Connects a wallet
* `/pay` : Pay a recipient an amount in the native token
* `/sign` : Sign a transaction
* `/call`: Call a contract method

### Events
Events are listened to via the npm package [react-web-broadcast-channel](https://www.npmjs.com/package/react-web-broadcast-channel) which uses the [Broadcast Channel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API). 

The demo uses the following events (it currently only tests connecting and sending transactions)
* `walletConnectedEvent` : the wallet was succesfully connected
* `walletConnectedErrorEvent`: there was an error connecting the wallet
* `transactionSentEvent`: the transaction was succesfully sent
* `transactionSentErrorEvent`: there was an error sending the transaction

## DApp Integration Types
There are three integration types utlized in this demo

#### iFrame

#### redirect

#### crossTab

## 1Wallet Integration Functionality
The 1Wallet Client support integration with other applications [integration code base is here](https://github.com/polymorpher/one-wallet/tree/master/code/client/src/integration).

The `WalletAuth` path is defined in [routes.js](https://github.com/polymorpher/one-wallet/blob/master/code/client/src/routes.js#L81) and uses the following format as defined in [paths.js](https://github.com/polymorpher/one-wallet/blob/master/code/client/src/constants/paths.js#L21) and supports the following format `auth: base + '/auth/:action?/:address?',`

It supports the following actions as defined in [WalletAuth.jsx](https://github.com/polymorpher/one-wallet/blob/master/code/client/src/integration/WalletAuth.jsx)

### connect
Connect connects a wallet to the application

**Input Parameters**
It takes the following imput Parameters
* caller: The name of the calling application e.g. `caller=ONE+Wallet+Integration+Demo`
* callback: The Base64 encoded string identifier for the callback e.g. `/redirect/one-wallet-callback` will translate to `callback=aHR0cDovL2xvY2FsaG9zdDozMDAyL29uZS13YWxsZXQtaWZyYW1lLWNhbGxiYWNr` 

Example Requests
```
https://1wallet.crazy.one/auth/connect?caller=ONE+Wallet+Integration+Demo+App&callback=aHR0cDovL2xvY2FsaG9zdDozMDAyL29uZS13YWxsZXQtaWZyYW1lLWNhbGxiYWNr
```

**Response**
The response is returned in `window.location.href` and the following information
* address: The selected address e.g. `0x901Cf2959D88241c1B8c756114877dAFd05036EC`
* success: Whether the wallet connected succesfully (0 = unsuccessful, 1 = successful)

Example Responses
If they select a wallet and press connect `window.location.href` is updated as follows
```
window.location.href = callback + `?address=${selectedAddress.value}&success=1`
```
e.g. `aHR0cDovL2xvY2FsaG9zdDozMDAyL29uZS13YWxsZXQtaWZyYW1lLWNhbGxiYWNr?address=0x901Cf2959D88241c1B8c756114877dAFd05036EC&success=1`

` https://1wallet.crazy.one/auth/connect?caller=ONE+Wallet+Integration+Demo+App&callback=aHR0cDovL2xvY2FsaG9zdDozMDAyL29uZS13YWxsZXQtaWZyYW1lLWNhbGxiYWNr`

If they choose to cancel then 
```
    window.location.href = callback + '?success=0'
```

e.g. `aHR0cDovL2xvY2FsaG9zdDozMDAyL29uZS13YWxsZXQtaWZyYW1lLWNhbGxiYWNr?success=0`


### pay
Pay pays a recipient an amount of the native token

* caller: The name of the calling application e.g. `caller=ONE+Wallet+Integration+Demo`
* callback: The Base64 encoded string identifier for the callback e.g. `/redirect/one-wallet-callback` will translate to `callback=aHR0cDovL2xvY2FsaG9zdDozMDAyL29uZS13YWxsZXQtaWZyYW1lLWNhbGxiYWNr` 

**Input Parameters**

* pay     : `{action === 'pay' && <RequestPayment caller={caller} callback={callback} amount={amount} dest={dest} from={from} />}`

### call
* call    : `{action === 'call' && <RequestCall caller={caller} callback={callback} amount={amount} calldata={calldata} from={from} dest={dest} />}`

### sign
* sign    : `{action === 'sign' && <RequestSignature caller={caller} callback={callback} messageB64Encoded={msg} commentB64Encoded={comment} raw={raw} duration={duration} from={from} />}`

### Demo Integration Approaches

#### Connecting to 1Wallet

The Integration Demo connects using the following URL

https://1wallet.crazy.one/auth/connect?caller=ONE+Wallet+Integration+Demo+App&callback=aHR0cDovL2xvY2FsaG9zdDozMDAyL29uZS13YWxsZXQtaWZyYW1lLWNhbGxiYWNr

The user then can connect to the wallet via an iFrame 

If they select a wallet and press connect `window.location.href` is updated as follows
```
window.location.href = callback + `?address=${selectedAddress.value}&success=1`
```
e.g. `aHR0cDovL2xvY2FsaG9zdDozMDAyL29uZS13YWxsZXQtaWZyYW1lLWNhbGxiYWNr?address=0x901Cf2959D88241c1B8c756114877dAFd05036EC&success=1`

` https://1wallet.crazy.one/auth/connect?caller=ONE+Wallet+Integration+Demo+App&callback=aHR0cDovL2xvY2FsaG9zdDozMDAyL29uZS13YWxsZXQtaWZyYW1lLWNhbGxiYWNr`

If they choose to cancel then 
```
    window.location.href = callback + '?success=0'
```

e.g. `aHR0cDovL2xvY2FsaG9zdDozMDAyL29uZS13YWxsZXQtaWZyYW1lLWNhbGxiYWNr?success=0`

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

