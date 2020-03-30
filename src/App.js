import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './Layouts/Header';
import MyDefaultButton from './Layouts/MyDefaultButton';
import CustomizedButtons from './Layouts/MyCustomizedButton';
import If from './Utils/If';
import questions from './questions'; 
import MyTextField from './Layouts/MyTextField';
import MyFinalTable from './Layouts/MyFinalTable'

var allAnswers = []
var currentQuestionIndex = 0
var participants = []
var didGameStart = false
var didGameEnd = false

function App() {
  const [participantName, setParticipantName] = useState("");
  const [participantScore, setParticipantScore] = useState("");

  const [nextQuestion, setNextQuestion] = useState("");
  const [nextAnswer1, setNextAnswer1] = useState("Option 1");
  const [nextAnswer2, setNextAnswer2] = useState("Option 2");
  const [nextAnswer3, setNextAnswer3] = useState("Option 3");
  const [nextAnswer4, setNextAnswer4] = useState("Option 4");
  const [givenAnswer, setGivenAnswer] = useState(null);
  const [correctQuestionIndex, setCorrectQuestionIndex] = useState(null);
  const [clickedButtonIndex, setClickedButtonIndex] = useState(null);

  const [isStartDisabled, setIsStartDisabled] = useState(true);
  const [isAnswerDisabled, setIsAnswerDisabled] = useState(false);
  const [isNextQuestionDisabled, setIsNextQuestionDisabled] = useState(true);
  
  function onChangeParticipantName(event) {
    var name = event.target.value
    if (name.length > 3 ) {
      setIsStartDisabled(false)
    } else if (name.length < 4) {
      setIsStartDisabled(true)
    }
    setParticipantName(name)
  }

  function startGame() {
    didGameStart = true
    participants.push(participantName)
    console.log(participants)
    setIsStartDisabled(true)
    console.log("started")
    showNextQuestion()


    // currentQuestionIndex ++ 
    // what we will do with the start button
  }

  function nextQuestionIndex() {
    currentQuestionIndex ++ 
    setGivenAnswer(null)
    setIsAnswerDisabled(false)
    setIsNextQuestionDisabled(true)
    
    showNextQuestion()
  }

  function showNextQuestion() {
    
    if (currentQuestionIndex === questions.length) {
      endGame()
    } else {
      
      var thisQuestionArray = questions[currentQuestionIndex].answers
      setCorrectQuestionIndex(thisQuestionArray.findIndex(isTrueOrFalse));

      var nextGroup = questions[currentQuestionIndex]
      var questionToShow = nextGroup.question
      // ver com fanu como funciona essa parte da linguagem JS
      var answer1ToShow2 = nextGroup.answers[0]
      var answer1ToShow = answer1ToShow2.text

      var answer2ToShow2 = nextGroup.answers[1]
      var answer2ToShow = answer2ToShow2.text

      var answer3ToShow2 = nextGroup.answers[2]
      var answer3ToShow = answer3ToShow2.text

      var answer4ToShow2 = nextGroup.answers[3]
      var answer4ToShow = answer4ToShow2.text
      
      // Questions
      setNextQuestion(questionToShow)

      // Answer Options
      setNextAnswer1(answer1ToShow)
      setNextAnswer2(answer2ToShow)
      setNextAnswer3(answer3ToShow)
      setNextAnswer4(answer4ToShow)

      // what happens when click in the next button
    }
  }

  function searchCorrectAnswer(selectedButton, myArray) {
    for (var i = 0; i < 4; i ++) {
      if (myArray[i].text === selectedButton) {
        setGivenAnswer(myArray[i].correct)
        setClickedButtonIndex(i)
      }
    }
  }

  useEffect(()=>{
    console.log(givenAnswer)
    if (givenAnswer === null) {
      return;
      //  = exit sub
    }
    allAnswers.push(givenAnswer)
  }, [givenAnswer]) 

  function isTrueOrFalse(array) {
    return array.correct === true
  }

  function selectAnswer() {
    setIsAnswerDisabled(true)
    setIsNextQuestionDisabled(false)
    var selectedButton = this.name
    console.log(selectedButton)
    
    var thisQuestionArray = questions[currentQuestionIndex].answers
    searchCorrectAnswer(selectedButton, thisQuestionArray)
  }

  function endGame() {
    didGameEnd = true
    console.log(allAnswers)
    setCorrectQuestionIndex(null)
    setNextQuestion(null)

    var correctAnswers = 0
    // var falses = 0

    for (var i = 0; i < allAnswers.length; i++) {
      if (allAnswers[i] === true) {
        correctAnswers ++
      } 
    }

    setParticipantScore(correctAnswers / allAnswers.length * 100)

  }

  return (

    <div style={{alignItems:"center", justifyContent: "center"}} >
      <Header />
      <form>
        <div className="questions-format" >
          <If show={didGameStart === false }>
            <div className="questions-format" >
              <h2>Plese insert your name</h2>

              <MyTextField
                onChange={(event)=>{onChangeParticipantName(event)}}
              />
            </div>  
          </If>

          <h1>{nextQuestion}</h1>
            
          <If show={didGameStart !== true} >
              <MyDefaultButton 
              size="large" 
              name="start"
              disabled={isStartDisabled}
              handleButtonClick={startGame}/>
          </If>  
         
        </div>
         <If show={correctQuestionIndex != null}>
          <div className="questions-format" >
           
              <CustomizedButtons
                name={nextAnswer1}
                handleButtonClick={selectAnswer}
                disabled={isAnswerDisabled}
                isGreen={correctQuestionIndex === 0 && givenAnswer}
                isRed={clickedButtonIndex !== correctQuestionIndex && clickedButtonIndex === 0}
              />
              <CustomizedButtons
                name={nextAnswer2}
                handleButtonClick={selectAnswer}
                disabled={isAnswerDisabled}
                isGreen={correctQuestionIndex === 1 && givenAnswer}
                isRed={clickedButtonIndex !== correctQuestionIndex && clickedButtonIndex === 1}
              />
              <CustomizedButtons
                name={nextAnswer3}
                handleButtonClick={selectAnswer}
                disabled={isAnswerDisabled}
                isGreen={correctQuestionIndex === 2 && givenAnswer}
                isRed={clickedButtonIndex !== correctQuestionIndex && clickedButtonIndex === 2}
              />
              <CustomizedButtons
                name={nextAnswer4}
                handleButtonClick={selectAnswer}
                disabled={isAnswerDisabled}
                isGreen={correctQuestionIndex === 3 && givenAnswer}
                isRed={clickedButtonIndex !== correctQuestionIndex && clickedButtonIndex === 3}
              />
           
            </div>
            
            <div className="questions-format" >
              <MyDefaultButton 
                size="large" 
                name="Próxima pergunta"
                disabled={isNextQuestionDisabled}
                handleButtonClick={nextQuestionIndex}/>
              </div>
          </If>  

          <If show={didGameEnd}>
          <h1>Veja a sua vergonha de pontuação</h1>


            <MyFinalTable
              player={participantName}
              score={participantScore}
              comment={'rei dos reis'}
            >


            </MyFinalTable>



          </If>
      </form>
    </div>
  );
}

export default App;