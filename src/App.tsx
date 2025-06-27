import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LaunchPage from './components/LaunchPage'
import TinderPage from './components/TinderPage'
import GalleryPage from './components/GalleryPage'
import RoutingPage from './components/RoutingPage'

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LaunchPage />} />
          <Route path="/tinder" element={<TinderPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/routing" element={<RoutingPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App