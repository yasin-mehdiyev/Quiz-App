import React, { useEffect, useState } from 'react'
import './Competition.css'
import {Link} from 'react-router-dom'

const Competition = ({allQuiz}) => {

    const [currentIndex, setcurrentIndex] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [correctQuestion, setCorrectQuestion] = useState(0);
    const [incorrectQuestion, setIncorrectQuestion] = useState(0);
    const [totalPoint, setTotalPoint] = useState(0);
    const [usedTime, setUsedTime] = useState(0);

    const getDateTimeNow = () => {
        let date = new Date();
        let currentDateFormat =
        ("00" + date.getDate()).slice(-2)
        + "/" + ("00" + (date.getMonth() + 1)).slice(-2)
        + "/" + date.getFullYear() + " "
        + ("00" + date.getHours()).slice(-2) + ":"
        + ("00" + date.getMinutes()).slice(-2);

        return currentDateFormat;
    }

    const reportResult = localStorage.getItem('report') ? JSON.parse(localStorage.getItem('report')) : [];

    const [report, setReport] = useState(reportResult);

    const clickedShowResult = () =>{
        setShowScore(true);
        let time = '';
        if(Number(usedTime)<60)
        {
            //  console.log(usedTime,usedTime.toString().length,usedTime.toString().length=='2');
             if(usedTime.toString().length=='2'){
                 time = `00:${usedTime}`;
             }
             else{
                  time = `00:0${usedTime}`;
             }
        }
        else{
            let minute = Math.floor(Number(usedTime)/60);
            let second = usedTime-(60*minute);

            if(minute.toString().length=='1' && second.toString().length=='1'){
                 time = `0${minute}:0${second}`;
            }
            else if(minute.toString().length=='1'){
                time = `0${minute}:${second}`;
            }
            else if(second.toString().length=='1'){
                time = `${minute}:0${second}`;
            }
            else{
                time = `${minute}:${second}`;
            }
        }

        setReport([...reportResult,{"questionCount":allQuiz.length.toString(),"trueQuestion":correctQuestion,"falseQuestion":incorrectQuestion,"totalScore":totalPoint,"time":time,"date":getDateTimeNow()}]);
    }
    
    let quest;
    let opts='';
    let timer = null;
    let initialTimer=15;
    const [timeLeft, setTimeLeft] = useState(initialTimer);
    const [timeoff, setTimeOff] = useState(false);

    if(allQuiz.length!=0){
        quest=allQuiz[currentIndex].question;
        opts=allQuiz[currentIndex].options;
    }

    const handleNext = () =>{
        let elems=document.querySelectorAll('.question-content .option');

        for(let i=0;i<elems.length;i++){
            elems[i].removeAttribute('disabled');
            elems[i].classList.remove('correct');
            elems[i].classList.remove('incorrect');
        }
       const newCurrentIndex=currentIndex+1;
       if(newCurrentIndex<allQuiz.length){
          setcurrentIndex(newCurrentIndex);
          setTimeOff(false);
          let timeout=allQuiz[newCurrentIndex].timeout;
          setTimeLeft(timeout);
       }
    }

    const setDisabledButton = () => {
        if(document.querySelector('.question-footer button')!=null){
            document.querySelector('.question-footer button').setAttribute('disabled',true);
        }
    }

    const removeDisabledButton = () => {
        if(document.querySelector('.question-footer button')!=null){
            document.querySelector('.question-footer button').removeAttribute('disabled');
        }
    }

    const findUsedTimeout = () =>{
        if(allQuiz.length!=0){
            const usedTimeout = usedTime + (Number(allQuiz[currentIndex].timeout)-Number(timeLeft));
            setUsedTime(usedTimeout);
        }
    }

    const findIncorrectQuestion = () => {
        const incorrect = incorrectQuestion + 1;
        setIncorrectQuestion(incorrect);
    }

    const setDisabledOptions = () => {
        let elems=document.querySelectorAll('.question-content .option');

        for(let i=0;i<elems.length;i++){
            elems[i].setAttribute('disabled',true);
        }
    }

    const showCorrectOption = () => {
        let elems=document.querySelectorAll('.question-content .option');

        for(let i=0;i<elems.length;i++){
            if(elems[i].textContent==allQuiz[currentIndex].answer){
                elems[i].classList.add('correct');
            }
        }
    }

    useEffect(() => {
        if(!timeoff){
            setDisabledButton();
            if(timeLeft==0){
                removeDisabledButton();
                clearInterval(timer);
                setDisabledOptions();
                showCorrectOption();
                findUsedTimeout();
                findIncorrectQuestion();
            }
            else{
                timer = setInterval(() => {
                    setTimeLeft(timeLeft-1);
                }, 1000);
            }
        }
        else{
            clearInterval(timer);
        }

        localStorage.setItem("report",JSON.stringify(report));

        return () => {
            clearInterval(timer);
        };
    }, [timeLeft,timeoff,report])

    const handleCheckedAnswer = (event)=>{
        const answerCard = event.target;
        const userAnswer = answerCard.textContent;
        setDisabledOptions();

        if(userAnswer==allQuiz[currentIndex].answer){
            answerCard.classList.add('correct');
            const correct = correctQuestion + 1;
            setCorrectQuestion(correct);
            const totalScore = totalPoint + Number(allQuiz[currentIndex].score);
            setTotalPoint(totalScore);
        }
        else{
            answerCard.classList.add('incorrect');
            showCorrectOption();
            findIncorrectQuestion();
        }
        setTimeOff(true);
        removeDisabledButton();
        findUsedTimeout();
    }

    return (
        <div className="container mt-3">
            {
                showScore?
                <div>
                    <h3 className="mb-4">Son 10 Nəticəm:</h3>
                    <table className="table border shadow text-center">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Sualların sayı</th>
                                <th scope="col">Doğru Cavab</th>
                                <th scope="col">Yanlış Cavab</th>
                                <th scope="col">Toplam Bal</th>
                                <th scope="col">Sualları cavablama müddəti</th>
                                <th scope="col">Yaradilib</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                               report.map((value, index) => (
                                   (report.length-index)<=10?
                                     <tr key={index+1}>
                                        <th scope="col">{index+1}</th>
                                        <td>{value.questionCount}</td>
                                        <td>{value.trueQuestion}</td>
                                        <td>{value.falseQuestion}</td>
                                        <td>{value.totalScore}</td>
                                        <td>{value.time}</td>
                                        <td>{value.date}</td>
                                    </tr>
                                    : null
                               ))
                            }
                        </tbody>
                </table>
                <div className="text-right"><Link className="btn btn-success" to="/">Back to Home Page</Link></div>
                </div> :
                allQuiz.length!==0?
                <React.Fragment>

                    <h5 className="mb-4 text-right">Question: {currentIndex+1}/{allQuiz.length}</h5>
                    
        
                    <div className="question-box">

                        
                        
                        <div className="text-center">
                           {<h5>00:{timeLeft.toString().length === 1 ? `0${timeLeft}` : timeLeft}</h5>}
                        </div>

                        <div className="question-header">
                            <h4>{quest}</h4>
                        </div>

                        <div className="question-content">
                            {
                                opts!=''?
                                    opts.map((value, index) => {
                                        return <button className="option" key={index} onClick={handleCheckedAnswer}>{value}</button>
                                    }):null
                            }
                        </div>

                        <div className="question-footer">
                            {
                               allQuiz.length - (currentIndex+1) == 0 ?
                               <button className="btn btn-primary mt-2" onClick={clickedShowResult}>Result</button>:
                               <button className="btn btn-primary" onClick={handleNext}>Next Question</button>
                            }
                        </div>

                    </div>

                </React.Fragment>:null
            }
        </div>
    )
}

export default Competition
