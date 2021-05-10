import axios from 'axios';
import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import '../Add/AddQuiz.css'

const AddQuiz = () => {

    let baseUrl = "http://localhost:3000/quizData";

    const history = useHistory();

    const [addQuiz, setAddQuiz] = useState({
        question: "",
        options: [],
        answer: "",
        score: "",
        timeout: ""
    });

    const { question, options, answer, score, timeout } = addQuiz;

    const inputChange = (e) => {
        const option = options;
        option[e.target.dataset.index] = e.target.value
        setAddQuiz({ ...addQuiz, options: option });
    }

    const handleChange = (e) => {
        setAddQuiz({ ...addQuiz, [e.target.name]: e.target.value })
    }

    const clearChange = (e) => {
        e.preventDefault();

        let elem = document.querySelectorAll('.option');
        for (let i = 0; i <= elem.length - 1; i++) {
            elem[i].value = '';
        }

        setAddQuiz({
            question: "",
            options: [],
            answer: "",
            score: "",
            timeout: ""
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post(baseUrl, addQuiz);
        history.push('/quiz');

    }

    console.log(addQuiz);

    return (
        <div className="container">
            <h3 className="text-center mt-3 mb-4" > Create Question </h3>
            <div className="d-flex justify-content-center">
                <form className="w-50">
                    <div className="mb-3">
                        <label htmlFor="#" className="text-muted mb-2"> Question: </label>
                        <input type="text"
                            className="form-control"
                            placeholder="Question"
                            name="question"
                            value={question}
                            onChange={handleChange}
                            required />
                    </div>

                    <label htmlFor="#" className="text-muted mb-2" > Options: </label>

                    <div className="d-flex">

                        <div className="mb-3 mr-4">
                            <input data-index={0}
                                type="text"
                                className="form-control option"
                                placeholder="Option-one"
                                onChange={inputChange}
                                required />
                        </div>

                        <div className="mb-3 mr-4">
                            <input data-index={1}
                                type="text"
                                className="form-control option"
                                placeholder="Option-two"
                                onChange={inputChange}
                                required />
                        </div>

                        <div className="mb-3">
                            <input data-index={2}
                                type="text"
                                className="form-control option"
                                placeholder="Option-three"
                                onChange={inputChange}
                                required />
                        </div>

                    </div>

                    <hr className="mb-4" />

                    <div className="mb-3">
                        <label htmlFor="#" className="text-muted mb-2" > Correct Answer: </label>
                        <select className="form-select form-select-lg text-muted" 
                            name="answer"
                            onChange={handleChange}>
                            <option hidden> Correct Answer </option>
                            {
                                options.map((option) => (
                                    <option value={option} key={option}> { option} </option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="d-flex">
                        <div className="mb-3 mr-4 w-50">
                            <label htmlFor="#" className="text-muted mb-2" > Timeout: </label>
                            <input type="number"
                                min="1"
                                max="60"
                                className="form-control"
                                placeholder="Timeout"
                                name="timeout"
                                value={timeout}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className="mb-3 w-50">
                            <label htmlFor="#" className="text-muted mb-2" > Score: </label>
                            <input type="number"
                                min="0"
                                className="form-control"
                                placeholder="Score"
                                name="score"
                                value={score}
                                onChange={handleChange}
                                required />
                        </div>

                    </div>

                    <div className="d-flex justify-content-end mt-3" >
                        <button type="submit" className="btn btn-danger mr-4" onClick={clearChange}>
                            Clear All
                        </button>
                        <button type="submit" className="btn btn-success mr-4" onClick={handleSubmit}>
                            Save
                        </button>
                        <NavLink className="btn btn-secondary" to="/quiz"> Back </NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddQuiz