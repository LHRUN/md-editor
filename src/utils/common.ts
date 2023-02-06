import { message } from 'antd'

/**
 * switch html css link
 * @param key link key
 * @param href link href
 */
export const switchLink = (key: string, href: string) => {
  const head = document.head
  const oldLink = head.getElementsByClassName(key)
  if (oldLink.length) head.removeChild(oldLink[0])

  const newLink = document.createElement('link')
  newLink.setAttribute('rel', 'stylesheet')
  newLink.setAttribute('type', 'text/css')
  newLink.setAttribute('class', key)
  newLink.setAttribute('href', href)
  newLink.onerror = (e) => {
    console.error(e)
    message.error('Failed to get css link')
  }
  head.appendChild(newLink)
}
