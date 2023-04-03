import '../css/Quiz.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Quiz() {

	const [questions, setQuestions] = useState([]);
	const [newQuestions, setNewQuestions] = useState([]);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [position, setPosition] = useState(0);
	const [punctuation, setPunctuation] = useState(0);
	const [isFinished, setIsFinished] = useState(false);
	const [timeLeft, setTimeLeft] = useState(10);
	const [btnDisabled, setBtnDisabled] = useState(false);
	const [showAnswer, setShowAnswer] = useState(false);
	// const [showProgress, setshowProgress] = useState(false);

	useEffect(() => {
		axios.get('https://opentdb.com/api.php?amount=5&category=32&difficulty=medium&type=multiple&encode=base64')
			.then(response => {
				const decodedQuestions = response.data.results.map(question => {
					// Decodificar cada pregunta y respuesta utilizando decodeURIComponent
					const decodedQuestion = decodeURIComponent(atob(question.question.replace(/_/g, "/").replace(/-/g, "+")));
					const decodedAnswers = question.incorrect_answers.map(answer => decodeURIComponent(atob(answer.replace(/_/g, "/").replace(/-/g, "+"))));
					const decodedCorrectAnswer = decodeURIComponent(atob(question.correct_answer.replace(/_/g, "/").replace(/-/g, "+")));
					return {
						...question,
						question: decodedQuestion,
						incorrect_answers: decodedAnswers,
						correct_answer: decodedCorrectAnswer
					};
				});
				setQuestions(decodedQuestions);
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	useEffect(() => {
		if (questions.length > 0) {
			const newq = questions.map((q) => {
				const incorrectAnswers = q.incorrect_answers.map((i) => ({
					title: i,
					isCorrect: false
				}));
				const correctAnswer = {
					title: q.correct_answer,
					isCorrect: true
				};
				const answers = [...incorrectAnswers, correctAnswer];
				answers.sort(() => Math.random() - 0.5);
				return { question: q.question, options: answers };
			});
			setNewQuestions(newq);
		}
	}, [questions]);

	useEffect(() => {
		if (newQuestions.length > 0) {
			setDataLoaded(true);
		}
	}, [newQuestions]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (timeLeft > 0) {
				setTimeLeft((prev) => prev - 1);
				setBtnDisabled(false)
			}
			if (timeLeft === 0) {
				setBtnDisabled(true);
				const buttons = document.querySelectorAll('.btnoption');
				buttons.forEach((button) => {
					button.classList.add('disabled');
				});
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [timeLeft]);

	function handleAnswerSubmit(e, isCorrect) {
		if (isCorrect) {
			setPunctuation(punctuation + 1);
		}
		e.target.classList.add(isCorrect ? "correct" : "error");
		// setshowProgress(true);
		setTimeout(() => {
			if (position === newQuestions.length - 1) {
				setIsFinished(true);
			} else {
				setPosition(position + 1);
				setTimeLeft(10);
			}
		}, 200);
	}

	if (isFinished) {
		return (
			<div className="principal-question">
				<div className="content-show">
					<div className='punctuation'>
						<span>You got {punctuation} de {newQuestions.length} points.</span>
					</div>
					<div className='content-prev'>
						<button className='btnPlayAgain' onClick={() => (window.location.href = "/")}>Play again</button>
						<button
							className='viewAnswer'
							onClick={() => {
								setIsFinished(false);
								setPosition(0);
								setShowAnswer(true);
							}}>Show Answers</button>
					</div>
				</div>
			</div>
		)
	}

	if (showAnswer) {
		return (
			<div className='principal-question'>
				<div className="top-question">
					<div className='timeleft-content'>
						<div className='timeleft-question'></div>
						<div className='position-question'><span>{position + 1} / {newQuestions.length}</span></div>
					</div>
					<div className='timeout'></div>
				</div>
				<div className="body-question">
					<div className='span-question'>
						<span>Question: </span>
					</div>
					<div className='content-question'>
						<div key={newQuestions[position].question} className='title-question'>
							{newQuestions[position].question}
						</div>
						<div className='options-question'>
							{
								newQuestions[position].options.map((option) => (
									<button
										className={option.isCorrect ? "btnoption2 correct" : "btnoption2 error" }
										key={option.title} readOnly
									>{option.title}</button>
								))
							}
						</div>
					</div>
				</div>
				<div className='bottom-question'>
					<button
						className='btnnext'
						onClick={() => {
							if (position === newQuestions.length - 1) {
								window.location.href = "/";
							} else {
								setPosition(position + 1);
							}
						}}>
						{
							position === newQuestions.length - 1
								? "Play again" : "Next"
						}
					</button>
				</div>
			</div>
		)
	}

	if (!dataLoaded) {
		return (
			<div>...</div>
		)
	}

	return (
		<div className="main_q">
			<div className='principal-question'>
				<div className="top-question">
					<div className='timeleft-content'>
						<div className='timeleft-question'>Time Left: <span className='time'>{timeLeft}sec</span></div>
						<div className='position-question'><span>{position + 1} / {newQuestions.length}</span></div>
					</div>
					<div className='timeout'>
						{ timeLeft+1 === 11 ? ("") : (<span className='progress'></span>) }
						</div>
				</div>
				<div className="body-question">
					<div className='span-question'>
						<span>Question: </span>
					</div>
					<div className='content-question'>
						<div key={newQuestions[position].question} className='title-question'>
							{newQuestions[position].question}
						</div>
						<div className='options-question'>
							{
								newQuestions[position].options.map((option) => (
									<button
										className='btnoption'
										key={option.title}
										onClick={(e) => { handleAnswerSubmit(e, option.isCorrect) }}
										disabled={btnDisabled}
									>{option.title}</button>
								))
							}
						</div>
					</div>
				</div>
				<div className='bottom-question'>
					{
						!btnDisabled
							?
							(<div></div>)
							:
							(
								<button
									className='btnnext'
									onClick={(e) => {
										setBtnDisabled(false)
										handleAnswerSubmit(e, false)
									}}
								>Next</button>
							)
					}
				</div>
			</div>
		</div>
	)
}

export default Quiz;