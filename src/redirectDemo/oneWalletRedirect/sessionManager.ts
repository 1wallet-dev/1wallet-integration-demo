const localStorageKey = 'one-wallet-address'

let oneWalletAddress = window.localStorage.getItem(localStorageKey) || ''

export const getAddress = () => oneWalletAddress
export const logout = () => {
    oneWalletAddress = ''
}