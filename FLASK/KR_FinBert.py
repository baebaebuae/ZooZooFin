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
        results.append({
            "sentence": sentence,
            "label": result['label'],
            "score": result['score']
        })
        if result['label'] == 'positive':
            positive_sum += result['score']
        elif result['label'] == 'negative':
            negative_sum += result['score']
        else:
            neutral_sum += result['score']

    # 3. 긍정 및 부정 문장을 정확도 기준으로 정렬 후 상위 3개씩 선택
    positive_sentences = sorted([res for res in results if res['label'] == 'positive'], 
                                key=lambda x: x['score'], reverse=True)[:3]
    negative_sentences = sorted([res for res in results if res['label'] == 'negative'], 
                                key=lambda x: x['score'], reverse=True)[:3]

    # 4. 요약 수행
    prefix = "summarize: "
    inputs = [prefix + news_text]
    inputs = summarizer_tokenizer(inputs, max_length=512, truncation=True, return_tensors="pt")
    output = summarizer_model.generate(**inputs, num_beams=3, do_sample=True, min_length=10, max_length=64)
    summary = summarizer_tokenizer.batch_decode(output, skip_special_tokens=True)[0]

    # 5. 긍정, 부정, 중립 비율 계산
    total_score_sum = positive_sum + negative_sum + neutral_sum
    positive_ratio = (positive_sum / total_score_sum) * 100 if total_score_sum > 0 else 0
    negative_ratio = (negative_sum / total_score_sum) * 100 if total_score_sum > 0 else 0
    neutral_ratio = (neutral_sum / total_score_sum) * 100 if total_score_sum > 0 else 0

    # 6. 결과 반환
    return {
        "positive_sentences": [{"sentence": s['sentence'], "score": s['score']} for s in positive_sentences],
        "negative_sentences": [{"sentence": s['sentence'], "score": s['score']} for s in negative_sentences],
        "positive_ratio": positive_ratio,
        "negative_ratio": negative_ratio,
        "neutral_ratio": neutral_ratio,
        "summary": summary
    }



if __name__ == "__main__":
    test_news = "[인포스탁데일리=이동희 선임기자] HD현대(267250)가 세계 최대 가스 전시회인 가스텍(Gastech)에서 탈탄소·디지털 기술의 미래를 선보인다.HD현대는 오는 17일부터 나흘 간 미국 휴스턴에서 열리는 ‘가스텍2024’에 참가한다고 12일 밝혔다. 행사에는 전 세계 800여 개 기업이 참여하며, 5만여 명 이상의 참관객이 방문할 것으로 예상된다.HD현대는 정기선 부회장을 비롯해 영업, 연구개발, 엔지니어링 분야 임직원들이 참석, 선사와 선급 등 글로벌 기업들을 만나 친환경 기술을 소개하는 한편 조선 및 해운산업의 발전 방안을 논의할 계획이다.또한 이번 전시회에서는 HD한국조선해양, HD현대중공업, HD현대미포, HD현대삼호, HD현대마린솔루션, HD현대일렉트릭이 함께하는 420제곱미터 규모의 종합 전시 부스를 구성한다. 부스에는 차세대 LNG운반선, FSRU, 액화이산화탄소 운반선 등 HD현대의 친환경 선박 모형이 함께 전시된다.행사 기간 HD현대는 글로벌 선급 및 기업들로부터 총 16건의 기술인증 획득 및 MOU를 체결한다. 특히 가스운반선의 디지털 전환과 탈탄소화에 있어 진일보된 기술력을 선보인다.HD현대는 노르웨이선급(DNV)으로부터 LNG운반선의 클라우드 기반 디지털 트윈 선박 가상 시운전 검증기술에 대한 기본인증(AIP)을 받는다. 이 기술은 △엔진시스템 △전력시스템 △가스시스템 등 LNG운반선 주요 시스템의 디지털트윈 모델을 클라우드상에서 통합 연결하여 한 척의 선박을 구성하고, 가상 시운전을 통해 객관적으로 선박을 검증할 수 있게 해준다.미국선급(ABS)으로부터는 암모니아 추진선에 대한 무인 엔진룸 설계와 안전관제 솔루션에 대한 기본인증을 획득, 선원의 안전성을 강화할 수 있게 된다.친환경 벙커링 선박에 대한 기본인증도 다수 받는다. 로이드선급(LR) 등으로부터 23,000세제곱미터(㎥)급 암모니아벙커링선 개발에 대한 기본인증을, 한국선급(KR)으로부터는 18,000세제곱미터(㎥)급 LNG벙커링선 개발에 대한 기본인증을 받을 예정이다. 이와 더불어 한국선급(KR)과는 암모니아 연료 시스템 공동 개발에 대한 MOU 체결도 진행한다.HD현대마린솔루션은 노르웨이선급(DNV)으로부터 선박용 이산화탄소 포집·액화·저장·설비(OCCS) 개조 기본인증을 받는다. 이를 통해, 친환경 리트로핏 사업에 OCCS 개조를 추가하며 사업 영역을 확장한다.이밖에도 행사 첫날인 17일에는 선사, 선급 등을 대상으로 기술 세미나를 개최한다. 세미나를 통해 가스운반선의 트렌드와 전기추진시스템 현황, 선박 디지털 전환 로드맵 등 HD현대의 기술 개발 현황과 계획을 소개한다. 18일과 19일에는 기존에 실시하던 고객사 면담과 더불어 ‘HD RECEPTION’ 행사를 진행해 부스를 찾는 고객사들과 HD현대의 미래형 친환경 선박에 대해 자유롭게 의견을 나눌 예정이다.HD현대 관계자는 “HD현대는 선박의 탈탄소화와 디지털 전환에 있어 선도적인 기술력을 보유하고 있다”며, “앞으로도 지속적인 투자와 기술개발을 통해 지속 가능한 미래 에너지 생태계 구현에 나서겠다”고 말했다."
    print(analyze_news(test_news))

# 테스트 함수 실행
# result = analyze_news("""
# [인포스탁데일리=이동희 선임기자] HD현대(267250)가 세계 최대 가스 전시회인 가스텍(Gastech)에서 탈탄소·디지털 기술의 미래를 선보인다.
# HD현대는 오는 17일부터 나흘 간 미국 휴스턴에서 열리는 ‘가스텍2024’에 참가한다고 12일 밝혔다. 행사에는 전 세계 800여 개 기업이 참여하며, 5만여 명 이상의 참관객이 방문할 것으로 예상된다.
# HD현대는 정기선 부회장을 비롯해 영업, 연구개발, 엔지니어링 분야 임직원들이 참석, 선사와 선급 등 글로벌 기업들을 만나 친환경 기술을 소개하는 한편 조선 및 해운산업의 발전 방안을 논의할 계획이다.
# 또한 이번 전시회에서는 HD한국조선해양, HD현대중공업, HD현대미포, HD현대삼호, HD현대마린솔루션, HD현대일렉트릭이 함께하는 420제곱미터 규모의 종합 전시 부스를 구성한다. 부스에는 차세대 LNG운반선, FSRU, 액화이산화탄소 운반선 등 HD현대의 친환경 선박 모형이 함께 전시된다.
# 행사 기간 HD현대는 글로벌 선급 및 기업들로부터 총 16건의 기술인증 획득 및 MOU를 체결한다. 특히 가스운반선의 디지털 전환과 탈탄소화에 있어 진일보된 기술력을 선보인다.
# HD현대는 노르웨이선급(DNV)으로부터 LNG운반선의 클라우드 기반 디지털 트윈 선박 가상 시운전 검증기술에 대한 기본인증(AIP)을 받는다. 이 기술은 △엔진시스템 △전력시스템 △가스시스템 등 LNG운반선 주요 시스템의 디지털트윈 모델을 클라우드상에서 통합 연결하여 한 척의 선박을 구성하고, 가상 시운전을 통해 객관적으로 선박을 검증할 수 있게 해준다.
# 미국선급(ABS)으로부터는 암모니아 추진선에 대한 무인 엔진룸 설계와 안전관제 솔루션에 대한 기본인증을 획득, 선원의 안전성을 강화할 수 있게 된다.
# 친환경 벙커링 선박에 대한 기본인증도 다수 받는다. 로이드선급(LR) 등으로부터 23,000세제곱미터(㎥)급 암모니아벙커링선 개발에 대한 기본인증을, 한국선급(KR)으로부터는 18,000세제곱미터(㎥)급 LNG벙커링선 개발에 대한 기본인증을 받을 예정이다. 이와 더불어 한국선급(KR)과는 암모니아 연료 공급 시스템 공동 개발에 대한 MOU 체결도 진행한다.
# HD현대마린솔루션은 노르웨이선급(DNV)으로부터 선박용 이산화탄소 포집·액화·저장·설비(OCCS) 개조 기본인증을 받는다. 이를 통해, 친환경 리트로핏 사업에 OCCS 개조를 추가하며 사업 영역을 확장한다.
# 이밖에도 행사 첫날인 17일에는 선사, 선급 등을 대상으로 기술 세미나를 개최한다. 세미나를 통해 가스운반선의 트렌드와 전기추진시스템 현황, 선박 디지털 전환 로드맵 등 HD현대의 기술 개발 현황과 계획을 소개한다. 18일과 19일에는 기존에 실시하던 고객사 면담과 더불어 ‘HD RECEPTION’ 행사를 진행해 부스를 찾는 고객사들과 HD현대의 미래형 친환경 선박에 대해 자유롭게 의견을 나눌 예정이다.
# HD현대 관계자는 “HD현대는 선박의 탈탄소화와 디지털 전환에 있어 선도적인 기술력을 보유하고 있다”며, “앞으로도 지속적인 투자와 기술개발을 통해 지속 가능한 미래 에너지 생태계 구현에 나서겠다”고 말했다.
# """)
# print(result)
