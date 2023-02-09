import { ReactNode } from 'react'
import { FileProvider } from './file'

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <FileProvider>{children}</FileProvider>
}
