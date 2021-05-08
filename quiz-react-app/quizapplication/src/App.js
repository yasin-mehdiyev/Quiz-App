import React, { useEffect, useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Components/Pages/Home/Home'
import Competition from './Components/Pages/Competition/Competition'
import Quiz from './Components/Pages/Quiz/Quiz'
import NotFound from './Components/Pages/NotFound/NotFound'
import axios from 'axios'
import EditQuiz from './Components/Quiz/EditQuiz'

const App = () => {

  const [quiz, setStatetQuiz] = useState([])

  let baseUrl = "http://localhost:3000/quizData";

  const getData = async () => {
     let response = await axios.get(baseUrl);
     setStatetQuiz(response.data.reverse());
  }
  
  return (
    <Router>
      <React.Fragment>
          <Switch>
                <Route exact path="/" render={() => <Home/>} />
                <Route path="/competition" render={() => <Competition/>} />
                <Route path="/quiz" render={() => <Quiz quiz={quiz} data={getData} />} />
                <Route path="/quizdata/edit/:id" render={() => <EditQuiz />} />
                <Route render={() => <NotFound/>}/>
          </Switch>
      </React.Fragment>
    </Router>
  )
}

export default App
