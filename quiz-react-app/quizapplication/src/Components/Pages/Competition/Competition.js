import React, { useEffect, useState } from 'react'
import './Competition.css'

const Competition = ({allQuiz}) => {

    const [currentIndex, setcurrentIndex] = useState(0);
    const [showScore, setShowScore] = useState(false);
    
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
       else{
           setShowScore(true);
       }
    }

    useEffect(() => {
        if(!timeoff){
            if(document.querySelector('.question-footer button')!=null){
                document.querySelector('.question-footer button').setAttribute('disabled',true);
            }
            if(timeLeft==0){
                if(document.querySelector('.question-footer button')!=null){
                    document.querySelector('.question-footer button').removeAttribute('disabled');
                }
                clearInterval(timer);
                let elems=document.querySelectorAll('.question-content .option');

                for(let i=0;i<elems.length;i++){
                    elems[i].setAttribute('disabled',true);
                    if(elems[i].textContent==allQuiz[currentIndex].answer){
                        elems[i].classList.add('correct');
                    }
                }
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

        return () => {
            clearInterval(timer);
        };
    }, [timeLeft,timeoff])

    const handleCheckedAnswer = (event)=>{
        const answerCard = event.target;
        const userAnswer = answerCard.textContent;

        let elems=document.querySelectorAll('.question-content .option');

        for(let i=0;i<elems.length;i++){
            elems[i].setAttribute('disabled',true);
        }


        if(userAnswer==allQuiz[currentIndex].answer){
            answerCard.classList.add('correct');
        }
        else{
            answerCard.classList.add('incorrect');
            for(let i=0;i<elems.length;i++){
                if(elems[i].textContent==allQuiz[currentIndex].answer){
                    elems[i].classList.add('correct');
                }
            }
        }
        setTimeOff(true);
        document.querySelector('.question-footer button').removeAttribute('disabled');
    }

    return (
        <div className="container mt-3">
            {
                showScore?
                <div>Score</div>:
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
                            <button className="btn btn-primary" onClick={handleNext}>{allQuiz.length-(currentIndex+1)==0?'Show Score':'Next Question'}</button>
                        </div>

                    </div>
                </React.Fragment>:null
            }
        </div>
    )
}

export default Competition
