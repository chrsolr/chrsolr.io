import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import ThemeContextProvider from './providers/ThemeContextProvider'
import TopBar from './shared/components/TopBar'
import Home from './pages/Home'
import Blog from './pages/Blog'
import NoMatch from './pages/NoMatch'
import Sidebar from './shared/components/Sidebar'
import { useLocalStorage } from './hooks/useLocalStorage'
import { Theme } from './theme'

function NavigationLayout() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function toggleMenu() {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <TopBar headerTitle={['chr', 'solr', '.io']} onMenuClick={toggleMenu} />
      <Sidebar isOpen={isOpen} onMenuClick={toggleMenu} />
    </>
  )
}

function App() {
  const [storedTheme] = useLocalStorage<Theme>('theme', 'light')
  return (
    <ThemeContextProvider theme={storedTheme}>
      <Routes>
        <Route path="/" element={<NavigationLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="blog" element={<Blog />}></Route>
          <Route path="*" element={<NoMatch />}></Route>
        </Route>
      </Routes>
    </ThemeContextProvider>
  )
}

export default App
