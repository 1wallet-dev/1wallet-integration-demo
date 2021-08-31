import React, {useState, useCallback} from 'react';
import './RedirectContainer.css';
import {auth, send} from './oneWalletRedirect'
import * as events from './oneWalletRedirect/events'
import {useWindowEvent} from './hooks'

const blockExplorerMainnetURL = 'https://explorer.harmony.one/tx/'
const blockExplorerTestnetURL = 'https://explorer.pops.one/tx/'

function RedirectContainer() {
    const [address, setAddress] = useState('')

    useWindowEvent(events.walletConnectedEvent, setAddress)
    useWindowEvent(events.transactionSentErrorEvent, () => alert('Failed to send the transaction'))
    useWindowEvent(events.transactionSentEvent, () => alert('Transaction sent!'))

    const [amount, setAmount] = useState(2)
    const [recipient, setRecipient] = useState('')


    const handleOnChange = useCallback(event => {
        const {name, value} = event.target
        if (name === 'amount') {
            setAmount(value)
        } else {
            setRecipient(value)
        }
    }, [amount, recipient])

    return (
        <div>
            <div>
                Send ONE Tokens<br/>
                <span style={{fontSize: '14px'}}>
                    {address && <>From {address}</>}
                </span>
            </div>
            <div className="container">
                <input onChange={handleOnChange}
                       value={amount}
                       name="amount" className="input-field" type="number" placeholder="Amount"/>
            </div>

            <div>
                <input
                    onChange={handleOnChange}
                    value={recipient}
                    name="recipient" className="input-field" type="text" placeholder="Recipient Address (HEX)"/>
            </div>

            <div style={{marginTop: '18px'}}>
                {(amount && recipient && address) ?
                    <button className="btn" onClick={() => send(address, recipient, +amount)}>Send ONE
                        Tokens</button> : null}
            </div>

            <div style={{marginTop: '18px'}}>
                {!address && <button className="btn" onClick={auth}>Connect ONE Wallet</button>}
                {address && <button className="btn" onClick={() => setAddress('')}>Disconnect ONE Wallet</button>}
            </div>
        </div>
    );
}

export default RedirectContainer;
