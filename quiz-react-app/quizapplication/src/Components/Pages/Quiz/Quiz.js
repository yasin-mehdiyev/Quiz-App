import React, { useEffect } from 'react'
import Navbar from '../../UI/Navbar'
import {Link} from 'react-router-dom'
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import './Quiz.css'
import axios from 'axios'

const Quiz = ({quiz,data}) => {

    let baseURL='http://localhost:3000/quizData';

    useEffect(() => {
        data();
    }, []);

    const deleteHandler = async (id) =>{
        // console.log(id);
        await axios.delete(baseURL+'/'+id);
        data();
    }
    
    return (
        <React.Fragment>
            <Navbar/>
             <div className="container">
                 <div className="py-4">

                    <Link className="btn btn-primary mb-4" to="/quizdata/add">Create Quiz</Link>

                     <table className="table border shadow text-center">
                         <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Sual</th>
                                <th scope="col">Cavab</th>
                                <th scope="col">Vaxt</th>
                                <th scope="col">Xal</th>
                                <th scope="col">Əməliyyatlar</th>
                            </tr>
                         </thead>
                         <tbody>
                             {
                                 quiz.map((value, index) => 
                                 (
                                     <tr key={index+1}>
                                         <th scope="col">{value.id}</th>
                                         <td>{value.question}</td>
                                         <td>{value.answer}</td>
                                         <td>{value.timeout}</td>
                                         <td>{value.score}</td>
                                         <td>
                                             <Link to={`/quizdata/edit/${value.id}`}><AiFillEdit className="fs-20"/></Link>
                                             <Link><AiFillDelete className="color fs-20 ml-3" onClick={() => deleteHandler(value.id)}/></Link>
                                         </td>
                                     </tr>
                                 ))
                             }
                         </tbody>
                     </table>
                 </div>
             </div>
        </React.Fragment>
    )
}

export default Quiz
