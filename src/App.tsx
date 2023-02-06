import Editor from '@/views/editor'
import { AppProviders } from './context'

import './App.css'

function App() {
  return (
    <AppProviders>
      <Editor />
    </AppProviders>
  )
}

export default App
