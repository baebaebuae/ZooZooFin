# kr_fin_bert.py
from konlpy.tag import Kkma
from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM

# Kkma 인스턴스 생성
kkma = Kkma()

# 감정 분석 파이프라인 설정 (KR-FinBert-SC 모델 사용)
sentiment_analysis = pipeline("sentiment-analysis", model="snunlp/KR-FinBert-SC")

# 요약 모델 로드
summarizer_model = AutoModelForSeq2SeqLM.from_pretrained('eenzeenee/t5-small-korean-summarization')
summarizer_tokenizer = AutoTokenizer.from_pretrained('eenzeenee/t5-small-korean-summarization')

def analyze_news(news_text):
    # 1. 뉴스 텍스트를 문장 단위로 분리
    sentences = kkma.sentences(news_text)

    # 2. 감정 분석 수행
    positive_sum, negative_sum, neutral_sum = 0, 0, 0
    results = []

    for sentence in sentences:
        result = sentiment_analysis(sentence)[0]
        results.append(result)
        if result['label'] == 'positive':
            positive_sum += result['score']
        elif result['label'] == 'negative':
            negative_sum += result['score']
        else:
            neutral_sum += result['score']

    # 3. 요약 수행
    prefix = "summarize: "
    inputs = [prefix + news_text]
    inputs = summarizer_tokenizer(inputs, max_length=512, truncation=True, return_tensors="pt")
    output = summarizer_model.generate(**inputs, num_beams=3, do_sample=True, min_length=10, max_length=64)
    summary = summarizer_tokenizer.batch_decode(output, skip_special_tokens=True)[0]

    # 4. 결과 정리
    total_score_sum = positive_sum + negative_sum + neutral_sum
    positive_ratio = (positive_sum / total_score_sum) * 100 if total_score_sum > 0 else 0
    negative_ratio = (negative_sum / total_score_sum) * 100 if total_score_sum > 0 else 0
    neutral_ratio = (neutral_sum / total_score_sum) * 100 if total_score_sum > 0 else 0

    return {
        "positive_ratio": positive_ratio,
        "negative_ratio": negative_ratio,
        "neutral_ratio": neutral_ratio,
        "summary": summary,
        "sentiment_analysis": results
    }
