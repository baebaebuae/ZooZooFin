import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';

// 시험지 전체 컨테이너
const Paper = styled.div`
  background-color: #f9f9f9;
  height: 700px;
  margin: 2px auto;
  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex; 
  flex-direction: column;
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

// 문제 컨테이너 추가
const QuestionsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 1;
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

// 문제 번호 스타일링
const QuestionNumber = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

// 문제 텍스트 스타일링
const QuestionText = styled.div`
  margin-bottom: 15px;
`;

// 돋보기 아이콘 스타일링
const MagnifyIcon = styled.span`
  cursor: pointer;
  margin-left: 10px;
  font-size: 1.2em;
`;

// 모달 배경 스타일링
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 모달 컨텐츠 스타일링
const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
`;

// 개별 문제 섹션 컴포넌트
const QuestionSection = ({ question, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <QuestionSectionStyled>
      <QuestionNumber>
        {index}. {question.quizQuestion}
        <MagnifyIcon onClick={() => setIsModalOpen(true)}>🔍</MagnifyIcon>
      </QuestionNumber>
      <QuestionText>정답: {question.quizAnswer}</QuestionText>

      {isModalOpen && (
        <ModalBackground onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>문제 {index}</h2>
            <p><strong>질문:</strong> {question.quizQuestion}</p>
            <p><strong>정답:</strong> {question.quizAnswer}</p>
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
  }).isRequired,
  index: PropTypes.number.isRequired,
};

const TestPaper = () => {
  const [quizData, setQuizData] = useState([]);
  const [user] = useState({ name: '토 토', date: '2024.09.03' });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuizData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Fetching quiz data...');
      const response = await axios.get('https://j11a705.p.ssafy.io/api/v1/quiz', {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6IjkxMzQxOGFmLTZiMmUtMTFlZi05MjlmLTI4YzVkMjFlYWJmMyIsImV4cCI6MTgxMzMzMDU4Nn0.ZgnLrGNNi9xt-jlJAgyNOAn6-_yw4m5C9SOUkk5zyPY',
        },
      });
      
      console.log('Response received:', response);
      if (response.data && response.data.body && response.data.body.quizzes) {
        setQuizData(response.data.body.quizzes);
      } else {
        throw new Error('Unexpected data structure in response');
      }
    } catch (error) {
      setError(`데이터를 가져오는 중 오류 발생: ${error.message}`);
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuizData();
  }, [fetchQuizData]);

  const leftQuestions = quizData.slice(0, 3);
  const rightQuestions = quizData.slice(3, 5);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Paper>
      <Header>
        <TestTitle>금 융</TestTitle>
        <DateName>
          <p>{user.date}</p>
          <p>{user.name}</p>
        </DateName>
      </Header>
      <QuestionsContainer>
        <QuestionGroup side="left">
          {leftQuestions.map((question, index) => (
            <QuestionSection key={question.quizId} question={question} index={index + 1} />
          ))}
        </QuestionGroup>
        <QuestionGroup side="right">
          {rightQuestions.map((question, index) => (
            <QuestionSection key={question.quizId} question={question} index={index + 4} />
          ))}
        </QuestionGroup>
      </QuestionsContainer>
    </Paper>
  );
};

export default TestPaper;