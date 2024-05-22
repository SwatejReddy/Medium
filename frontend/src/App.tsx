import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
// import { Blogs } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { WriteBlog } from './pages/BlogEditor'
// import { Quote } from './components/Quote'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs/>} />
          <Route path='/write-blog' element={<WriteBlog/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
