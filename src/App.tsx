import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Example components - you can create these in separate files
const Home = () => <div><h1>Home Page</h1></div>
const About = () => <div><h1>About Page</h1></div>
const Contact = () => <div><h1>Contact Page</h1></div>

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App