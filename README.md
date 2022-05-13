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
## 1Wallet Integration Functionality
The 1Wallet Client support integration with other applications [integration code base is here](https://github.com/polymorpher/one-wallet/tree/master/code/client/src/integration).

The `WalletAuth` path is defined in [routes.js](https://github.com/polymorpher/one-wallet/blob/master/code/client/src/routes.js#L81) and uses the following format as defined in [paths.js](https://github.com/polymorpher/one-wallet/blob/master/code/client/src/constants/paths.js#L21) and supports the following format `auth: base + '/auth/:action?/:address?',`

It supports the following actions as defined in [WalletAuth.jsx](https://github.com/polymorpher/one-wallet/blob/master/code/client/src/integration/WalletAuth.jsx)

Communication is done between the DApp (Integration App) and the one wallet client using the oneWalletURL: [https://1wallet.crazy.one/auth](https://1wallet.crazy.one/auth).

The URL then includes a suffix to identify the type of call being made e.g.
* `/connect` : Connects a wallet
* `/pay` : Pay a recipient an amount in the native token
* `/sign` : Sign a transaction
* `/call`: Call a contract method

### connect
Connect connects a wallet to the application

**Input Parameters**
It takes the following imput Parameters
* caller: The name of the calling application e.g. `caller=ONE+Wallet+Integration+Demo`
* callback: The Base64 encoded string identifier for the callback e.g. `/redirect/one-wallet-callback` will translate to `callback=aHR0cDovL2xvY2FsaG9zdDozMDAyL3JlZGlyZWN0L29uZS13YWxsZXQtY2FsbGJhY2s%3D` 

Example Requests
```
https://192.168.0.40:3000/auth/connect?caller=ONE+Wallet+Integration+Demo+App&callback=aHR0cDovL2xvY2FsaG9zdDozMDAyL3JlZGlyZWN0L29uZS13YWxsZXQtY2FsbGJhY2s%3D
```

**Response**
The response is returned in `window.location.href` which is initially set to connect request sent e.g. ` https://192.168.0.40:3000/auth/connect?caller=ONE+Wallet+Integration+Demo+App&callback=aHR0cDovL2xvY2FsaG9zdDozMDAyL3JlZGlyZWN0L29uZS13YWxsZXQtY2FsbGJhY2s%3D`

and the following information
* callback : The callback URL e.g. `http://localhost:3002/redirect/one-wallet-callback`
* address: The selected address e.g. `0x901Cf2959D88241c1B8c756114877dAFd05036EC`
* success: Whether the wallet connected succesfully (0 = unsuccessful, 1 = successful)

Example Responses
If they select a wallet and press connect `window.location.href` is updated as follows
```
window.location.href = callback + `?address=${selectedAddress.value}&success=1`
```
e.g. `http://localhost:3002/redirect/one-wallet-callback?address=0x901Cf2959D88241c1B8c756114877dAFd05036EC&success=1`

If they choose to cancel then 
```
window.location.href = callback + '?success=0'
```

e.g. `http://localhost:3002/redirect/one-wallet-callback?success=0`


### pay
Pay pays a recipient an amount of the native token

**Input Parameters**
It takes the following imput Parameters
* caller: The name of the calling application e.g. `caller=ONE+Wallet+Integration+Demo`
* callback: The Base64 encoded string identifier for the callback e.g. `/redirect/one-wallet-callback` will translate to `callback=aHR0cDovL2xvY2FsaG9zdDozMDAyL3JlZGlyZWN0L29uZS13YWxsZXQtY2FsbGJhY2s%3D`
* amount: amount of native tokens to send Fiat Formatted e.g. `1.0` will send one native token
* dest: destination address of where to send the tokens e.g. `0xC39Fc37a6419E5Ab83B9970F96D06bD4910459b3`
* from: from address where the tokens are being sent from e.g. `0x901Cf2959D88241c1B8c756114877dAFd05036EC`

**Response**
The response is returned in `window.location.href` which is initially set to connect request sent e.g. ` https://192.168.0.40:3000/auth/pay?caller=ONE+Wallet+Integration+Demo+App&callback=aHR0cDovL2xvY2FsaG9zdDozMDAyL3JlZGlyZWN0L29uZS13YWxsZXQtY2FsbGJhY2s%3D`

and the following information
* callback : The callback URL e.g. `http://localhost:3002/redirect/one-wallet-callback`
* txId: The tranfer(payments) transactionId e.g. `0x5050816a7696c14707a7534b6bf0ae7dd6e2b9cc267a38097ef5b3e21b3e8cd4`
* success: Whether the wallet connected succesfully (0 = unsuccessful, 1 = successful)

Example Responses
If they approve the payment by hitting the send button `window.location.href` is updated as follows
```
window.location.href = callback + `?success=1&txId=${txId}`
```
e.g. `http://localhost:3002/redirect/one-wallet-callback?success=1&txId=0x5050816a7696c14707a7534b6bf0ae7dd6e2b9cc267a38097ef5b3e21b3e8cd4`

If they choose to cancel then 
```
window.location.href = callback + '?success=0'
```

e.g. `http://localhost:3002/redirect/one-wallet-callback?success=0`


### call
Call executes a smart contract call for the connected wallet. It currently supports
* Gnosis safe: execTransaction and approveHash
* Contracts: which have their code base on chain.

**Input Parameters**
It takes the following imput Parameters
* caller: The name of the calling application e.g. `caller=ONE+Wallet+Integration+Demo`
* callback: The Base64 encoded string identifier for the callback e.g. `/redirect/one-wallet-callback` will translate to `callback=aHR0cDovL2xvY2FsaG9zdDozMDAyL3JlZGlyZWN0L29uZS13YWxsZXQtY2FsbGJhY2s%3D`
* amount: amount of native tokens to send Fiat Formatted e.g. `1.0` will send one native token
* calldata: The call data in the following format
  * Format: {method, parameters, comment}
    * method: the function's signature, for example, `commit(bytes32,bytes32,bytes32)` is the signature for `function commit(bytes32 hash, bytes32 paramsHash, bytes32 verificationHash) external`;
    * parameters: an array of name-value pairs of length correspond to the function signature. Using above example, the parameters could be `[{"name":"hash", "value":"0x1234..."},{"name":"paramsHash", "value":"0xffff..."},{"name":"verificationHash", "value":"0xffff..."}]`
    * comment: anything the app developer wants to add to explain to the user what the app is asking for.
* dest: destination address of where to send the tokens e.g. `0xC39Fc37a6419E5Ab83B9970F96D06bD4910459b3`
* from: from address where the tokens are being sent from e.g. `0x901Cf2959D88241c1B8c756114877dAFd05036EC`

**Response**
The response is returned in `window.location.href` which is initially set to connect request sent e.g. ` https://192.168.0.40:3000/auth/pay?caller=ONE+Wallet+Integration+Demo+App&callback=aHR0cDovL2xvY2FsaG9zdDozMDAyL3JlZGlyZWN0L29uZS13YWxsZXQtY2FsbGJhY2s%3D`

and the following information
* callback : The callback URL e.g. `http://localhost:3002/redirect/one-wallet-callback`
* txId: The calls transactionId e.g. `0x5050816a7696c14707a7534b6bf0ae7dd6e2b9cc267a38097ef5b3e21b3e8cd4`
* success: Whether the wallet connected succesfully (0 = unsuccessful, 1 = successful)

### sign
Sign requests a signature for a transaction or verification.

**Input Parameters**
It takes the following input parameters
* caller: The name of the calling application e.g. `caller=ONE+Wallet+Integration+Demo`
* callback: The Base64 encoded string identifier for the callback e.g. `/redirect/one-wallet-callback` will translate to `callback=aHR0cDovL2xvY2FsaG9zdDozMDAyL3JlZGlyZWN0L29uZS13YWxsZXQtY2FsbGJhY2s%3D`
* msg: the message Base64 encoded
* comment: the comment explaining the reason for the signature Base64 encoded
* raw: the raw message to be signed
* duration: the duration which the signature is valid for
* from: the address which the call is made from

**Response**
The response is returned in `window.location.href` which is initially set to connect request sent e.g. ` https://192.168.0.40:3000/auth/pay?caller=ONE+Wallet+Integration+Demo+App&callback=aHR0cDovL2xvY2FsaG9zdDozMDAyL3JlZGlyZWN0L29uZS13YWxsZXQtY2FsbGJhY2s%3D`

and the following information
* callback : The callback URL e.g. `http://localhost:3002/redirect/one-wallet-callback`
* success: Whether the wallet connected succesfully (0 = unsuccessful, 1 = successful)
* txId: The calls transactionId e.g. `0x5050816a7696c14707a7534b6bf0ae7dd6e2b9cc267a38097ef5b3e21b3e8cd4`
* hash: The signature hash
* signature: The Signature string


## Integration Demo Functionality
### Connecting to 1Wallet

The Integration Demo connects using the following URL

https://1wallet.crazy.one/auth/connect?caller=ONE+Wallet+Integration+Demo+App&callback=aHR0cDovL2xvY2FsaG9zdDozMDAyL29uZS13YWxsZXQtaWZyYW1lLWNhbGxiYWNr

### DApp Integration Types
There are three integration types utlized in this demo

#### iFrame

#### redirect

#### crossTab

### Events
Events are used internally and are listened to via the npm package [react-web-broadcast-channel](https://www.npmjs.com/package/react-web-broadcast-channel) which uses the [Broadcast Channel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API). 

The demo uses the following events (it currently only tests connecting and sending transactions)
* `walletConnectedEvent` : the wallet was succesfully connected
* `walletConnectedErrorEvent`: there was an error connecting the wallet
* `transactionSentEvent`: the transaction was succesfully sent
* `transactionSentErrorEvent`: there was an error sending the transaction

