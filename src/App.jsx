import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from './component/Header'
import {Home} from './pages/home/Home'
import { Coin } from "./pages/coin/Coin"
import { News } from "./pages/news/News"

function App() {

  return (
    <>
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
        <Route path="/" Component={Home} exact />
        <Route path="/coins/:id" Component={Coin} />
        <Route path="/news" Component={News} />
        </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
