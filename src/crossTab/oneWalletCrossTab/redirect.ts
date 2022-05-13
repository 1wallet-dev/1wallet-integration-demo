import * as events from './events'

// const oneWalletURL = 'https://1wallet.crazy.one/auth'
const oneWalletURL = 'https://192.168.0.40:3000/auth'
const callbackLocation = '/one-wallet-callback'
const callbackURL = window.location.origin + callbackLocation
const callbackLocationBase64 = btoa(callbackURL)
const appName = 'ONE Wallet Integration Demo App'


export const auth = () => {
    const o = {
        caller: appName,
        callback: callbackLocationBase64,
    }

    const params = new URLSearchParams(o).toString()
    const url = oneWalletURL + '/connect?' + params

    window.open(url, '_blank')
}

export const send = (from: string, to: string, amount: number) => {
    const o = {
        caller: appName,
        callback: callbackLocationBase64,
        amount: (BigInt(amount) * BigInt(1000000000000000000)).toString(),
        from,
        dest: to,
    }

    const params = new URLSearchParams(o).toString()
    const url = oneWalletURL + '/pay?' + params

    window.open(url, '_blank')
}


const processONEWalletCallback = () => {
    const path = window.location.pathname

    if (path.indexOf(callbackLocation) !== 0) {
        return
    }

    const params = new URLSearchParams(window.location.search)

    const success = +(params.get('success') || 0)
    const address = params.get('address')
    const txId = params.get('txId')

    if (success && address) {
        window.dispatchEvent(new CustomEvent(events.walletConnectedEvent, {detail: address}))
    } else if (success && txId) {
        window.dispatchEvent(new CustomEvent(events.transactionSentEvent, {detail: txId}))
    } else if (!success && txId) {
        window.dispatchEvent(new CustomEvent(events.transactionSentErrorEvent))
    }

    window.close()
}

setTimeout(processONEWalletCallback, 0)
