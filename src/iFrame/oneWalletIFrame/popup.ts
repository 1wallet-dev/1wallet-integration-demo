export const popUpDOMID = 'one-wallet-popup'
export const iFrameDOMID = 'one-wallet-iframe'

const popupDiv = document.createElement('div')
const popupWidth = 500
let iframeElement: HTMLElement | null = null

popupDiv.id = popUpDOMID


const style = document.createElement('style')
style.innerHTML = `
      #${popUpDOMID} {
        background-color: white;
        width: ${popupWidth}px;
        height: 500px;
        color:black;
        top: 40px;
        left: calc(50% - ${popupWidth / 2}px);
        position: fixed;
        z-index: 99999;
        padding: 20px;
        border-radius: 10px;
        border: 1px black solid;
        display: none;
      }
    `
document.head.appendChild(style)
document.body.appendChild(popupDiv)

const removeIFrame = () => {
    iframeElement && iframeElement.remove()
    iframeElement = null
}

export const open = (url: string) => {
    removeIFrame()
    const iframe = document.createElement('iframe')
    iframe.id = iFrameDOMID
    iframe.src = url
    popupDiv.appendChild(iframe)
    popupDiv.style.display = 'block'
}

export const close = () => {
    removeIFrame()
    popupDiv.style.display = 'none'
}