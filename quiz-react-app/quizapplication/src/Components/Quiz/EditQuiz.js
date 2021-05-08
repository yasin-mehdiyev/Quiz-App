import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router';

const EditQuiz = () => {

    let baseUrl = "http://localhost:3000/quizData";

    const [editQuiz,setStateEditQuiz] = useState({
        question:"",
        options:[],
        answer:"",
        score: 0,
        timeout: 0
    });
    
    const {id} = useParams();
    let history = useHistory();

    const getSelectedData = async () => {
        let selectedItem = await axios.get(baseUrl+"/"+id);
        setStateEditQuiz(selectedItem.data);
    }

    const handlerInputChange = (e) => {
        setStateEditQuiz({...editQuiz,[e.target.name]:e.target.value})
    }

    const onEditHandler = async (e) => {
        e.preventDefault();
        // console.log(editQuiz);
        await axios.put(baseUrl+'/'+id,editQuiz);
        history.push('/quiz');
    }

    useEffect(() => {
       getSelectedData();
    }, []);

    const {question,options,answer,score,timeout} = editQuiz;

    return (
        <div className="container">
            <h3 className="text-center mt-3 mb-4">Edit Question</h3>
            <div className="d-flex justify-content-center">

                <form className="w-50" onSubmit={(e) => onEditHandler(e)}>
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Question" name="question" value={question} onChange={(e)=>handlerInputChange(e)} required/>
                    </div>

                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Answer" name="answer" value={answer} onChange={(e)=>handlerInputChange(e)} required/>
                    </div>

                    <div className="mb-3">
                        <input type="number" min="1" max="60" className="form-control" placeholder="Time" name="timeout" value={timeout} onChange={(e)=>handlerInputChange(e)} required/>
                    </div>

                    <div className="mb-3">
                        <input type="number" min="0" className="form-control" placeholder="Score" name="score" value={score} onChange={(e)=>handlerInputChange(e)} required />
                    </div>

                    <button type="submit" className="btn btn-primary">Edit Item</button>
                </form>
            </div>
        </div>
    )
}

export default EditQuiz
