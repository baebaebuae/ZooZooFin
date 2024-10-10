import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import CorrectSVG from '@assets/images/school/correct.svg?react';
import IncorrectSVG from '@assets/images/school/incorrect.svg?react';
import { Button } from '@components/root/buttons';
import { getApiClient } from '@/stores/apiClient';
// 점수 이미지
import score0 from '@assets/images/school/0.png';
import score20 from '@assets/images/school/20.png';
import score40 from '@assets/images/school/40.png';
import score60 from '@assets/images/school/60.png';
import score80 from '@assets/images/school/80.png';
import score100 from '@assets/images/school/100.png';

// 시험지 전체 컨테이너
const Paper = styled.div`
  background-color: #f9f9f9;
  height: 580px;
  width: 80%;
  margin: 2px auto;
  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex; 
  flex-direction: column;
  position: relative;
  overflow-y: auto;
`;

// 시험지 헤더 스타일링
const Header = styled.div`
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
  border-style: double;
  border-radius: 10px;
`;

// 시험 제목 스타일링
const TestTitle = styled.div`
  padding: 10px 0;
  border-bottom: 2px solid #333;
  margin: 0 20px;
  font-weight: bold;
  font-size: x-large;
  line-height: 1.5;
`;

// 이름 및 턴 영역 스타일링
const DateName = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  line-height: 0px;
`;

// 문제 컨테이너 수정
const QuestionsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 1;
  overflow-y: auto;
`;

// 문제 그룹(좌측/우측) 스타일링 수정
const QuestionGroup = styled.div`
  width: 50%; 
  padding: 10px;
  border-right: ${props => props.side === 'left' ? '1px solid #ccc' : 'none'};
`;

// 개별 문제 섹션 스타일링
const QuestionSectionStyled = styled.div`
  margin-bottom: 20px;
`;

// 문제 번호 스타일링 수정
const QuestionNumber = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  align-items: center;
  position: relative;
`;

// 돋보기 아이콘 스타일링
const MagnifyIcon = styled.span`
  cursor: pointer;
  margin-left: 10px;
  font-size: 1.2em;
  color: #808080;
  transition: color 0.3s ease;

  &:hover {
    color: #505050;
  }
`;

// 모달 배경 스타일링 수정
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 모달 컨텐츠 스타일링 수정
const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  z-index: 1001;
`;

const AnswerInput = styled.input`
  padding: 5px;
  width: 80%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const OXButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const OXButton = styled.button`
  padding: 5px 15px;
  background-color: ${props => props.selected ? '#4CAF50' : '#f0f0f0'};
  color: ${props => props.selected ? 'white' : 'black'};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.selected ? '#45a049' : '#e0e0e0'};
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background-color: #45a049;
  }
`;

const GradeMarker = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
`;

const ScoreImage = styled.img`
  position: absolute;
  top: 0px;
  right: 20px;
  width: 100px;
  height: auto;
`;

const ScoreDisplay = ({ score }) => {
  const getScoreImage = (score) => {
    if (score === 0) return score0;
    if (score <= 20) return score20;
    if (score <= 40) return score40;
    if (score <= 60) return score60;
    if (score <= 80) return score80;
    return score100;
  };

  return <ScoreImage src={getScoreImage(score)} alt={`Score: ${score}`} />;
};

ScoreDisplay.propTypes = {
  score: PropTypes.number.isRequired,
};

const QuestionSection = ({ question, index, onAnswerChange, userAnswer, isSubmitted, isCorrect }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAnswerChange = (answer) => {
    onAnswerChange(question.quizId, answer);
  };

  const renderAnswerInput = () => {
    if (question.quizType === 'ox') {
      return (
        <OXButtonContainer>
          <OXButton 
            selected={userAnswer === 'O'}
            onClick={() => handleAnswerChange('O')}
            disabled={isSubmitted}
          >
            O
          </OXButton>
          <OXButton 
            selected={userAnswer === 'X'}
            onClick={() => handleAnswerChange('X')}
            disabled={isSubmitted}
          >
            X
          </OXButton>
        </OXButtonContainer>
      );
    } else if (question.quizType === 'short') {
      return (
        <AnswerInput
          type="text"
          value={userAnswer || ''}
          onChange={(e) => handleAnswerChange(e.target.value)}
          placeholder="답을 입력하세요"
          disabled={isSubmitted}
        />
      );
    }
  };

  return (
    <QuestionSectionStyled>
      <QuestionNumber>
        {index}.
        {isSubmitted && (
          <GradeMarker>
            {isCorrect ? <CorrectSVG width="50" height="50" /> : <IncorrectSVG width="40" height="40" />}
          </GradeMarker>
        )}
        {question.quizQuestion}
        <MagnifyIcon onClick={() => setIsModalOpen(true)}>🔍</MagnifyIcon>
      </QuestionNumber>
      {renderAnswerInput()}

      {isModalOpen && (
        <ModalBackground onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>문제 {index}</h2>
            <p><strong>질문:</strong> {question.quizQuestion}</p>
            {renderAnswerInput()}
          </ModalContent>
        </ModalBackground>
      )}
    </QuestionSectionStyled>
  );
};

QuestionSection.propTypes = {
  question: PropTypes.shape({
    quizId: PropTypes.number.isRequired,
    quizQuestion: PropTypes.string.isRequired,
    quizAnswer: PropTypes.string.isRequired,
    quizType: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onAnswerChange: PropTypes.func.isRequired,
  userAnswer: PropTypes.string,
  isSubmitted: PropTypes.bool.isRequired,
  isCorrect: PropTypes.bool,
};


const TestPaper = () => {
  const [quizData, setQuizData] = useState([]);
  const [characterInfo, setCharacterInfo] = useState({ animalName: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState({});
  const navigate = useNavigate();

  const fetchCharacterInfo = useCallback(async () => {
    try {
      const apiClient = getApiClient();
      const response = await apiClient.get('/animal/info');
      if (response.data && response.data.body) {
        setCharacterInfo(response.data.body);
      }
    } catch (error) {
      console.error('캐릭터 정보 가져오기 실패:', error);
    }
  }, []);

  const fetchQuizData = useCallback(async () => {
    setIsLoading(true);
    try {
      const apiClient = getApiClient();
      const response = await apiClient.get('/quiz');
      console.log("퀴즈");
      console.log(response.data.body);
      if (response.data && response.data.body && response.data.body.quizzes.length > 0) {
        setQuizData(response.data.body.quizzes);
      } 
    } catch (error) {
      console.error('API 호출 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuizData();
    fetchCharacterInfo();
  }, [fetchQuizData, fetchCharacterInfo]);

  const handleAnswerChange = (quizId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [quizId]: answer
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const apiClient = getApiClient();

      const answerList = quizData.map((quiz) => ({
        quizId: quiz.quizId,
        animalAnswer: userAnswers[quiz.quizId] !== undefined 
          ? userAnswers[quiz.quizId].trim() || null // 앞뒤 공백만 제거하고, 빈 값은 null 처리
          : null
      }));
  
      const requestData = {
        answerList: answerList
      };

      
      console.log(requestData);
      const response = await apiClient.post('/quiz/submit', requestData );
      console.log("퀴즈 서브밋!");
      console.log(response);
      if (response.data && response.data.body) {
        setScore(response.data.body.score);
        setCorrectAnswers(response.data.body.correctAnswers);
        setIsSubmitted(true);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Failed to submit quiz:', error);
     } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = () => {
    navigate('/school', { state: { score: score.toFixed(0) } });
  };

  if (isLoading) return <div>Loading...</div>;

  const leftQuestions = quizData.slice(0, Math.ceil(quizData.length / 2));
  const rightQuestions = quizData.slice(Math.ceil(quizData.length / 2));

  return (
    <Paper>
      <Header>
        <TestTitle>금 융</TestTitle>
        <DateName>
          <p>ZooZooSchool</p>
          <p>{characterInfo.animalName}</p>
        </DateName>
      </Header>
      {isSubmitted && score !== null && (
        <ScoreDisplay score={parseInt(score)} />
      )}
      <QuestionsContainer>
        <QuestionGroup side="left">
          {leftQuestions.map((question, index) => (
            <QuestionSection 
            key={question?.quizId || index} 
            question={question || {}}       
            index={index + 1}
            onAnswerChange={handleAnswerChange}
            userAnswer={userAnswers[question?.quizId] || ''} 
            isSubmitted={isSubmitted}
          />
          ))}
        </QuestionGroup>
        <QuestionGroup side="right">
          {rightQuestions.map((question, index) => (
            <QuestionSection 
            key={question?.quizId || index}  
            question={question || {}}       
            index={index + 1}
            onAnswerChange={handleAnswerChange}
            userAnswer={userAnswers[question?.quizId] || ''} 
            isSubmitted={isSubmitted}
          />
          ))}
        </QuestionGroup>
      </QuestionsContainer>
      {!isSubmitted && <SubmitButton onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? '제출 중...' : '제출하기'}
      </SubmitButton>}
      {isSubmitted && <SubmitButton onClick={handleFinish}>시험 종료</SubmitButton>}
    </Paper>
  );
};

export default TestPaper;