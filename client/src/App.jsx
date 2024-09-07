import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/signUp';
import './index.css';
import OnBoard from './components/OnBoardAssess';
import AssessCompleted from './components/AssessCompleted';
import Welcome from './components/Welcome';
import ErrorComponent from './components/ErrorComponent';


function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />}></Route>
            <Route path="/error" element={<ErrorComponent/>}></Route>
            <Route path="/user/signup" element={<SignUp />}></Route>
            <Route path="/assess/onboard" element={<OnBoard />}></Route>
            <Route path="/completed" element={<AssessCompleted />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App
