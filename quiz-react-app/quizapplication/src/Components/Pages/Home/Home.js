import React from 'react'
import 
  {
     NavLink
  } from "react-router-dom";
import '../../Pages/Home/Home.css'
import Navbar from '../../UI/Navbar'

const Home=()=> {
    return (
        <React.Fragment>
            <Navbar/>
            <div className="container layout">
                <div className="text-center">
                    <h3>Yarışa xoş gəlmisiniz !</h3>
                    <p className="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maxime sunt harum quisquam vero repellat, unde aperiam ex eius, cupiditate voluptate assumenda perspiciatis atque quidem enim culpa commodi. Sapiente, ducimus!</p>
                    <NavLink className="btn btn-primary mt-2" to="/competition">Başla</NavLink>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home
