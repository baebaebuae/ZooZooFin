from konlpy.tag import Kkma
from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM 

# 1. Kkma 인스턴스 생성 (문장 분리를 위해)
kkma = Kkma()

# 2. 감정 분석 파이프라인 설정 (KR-FinBert-SC 모델 사용)
sentiment_analysis = pipeline("sentiment-analysis", model="snunlp/KR-FinBert-SC")

# 2-1. 요약
# summarizer = pipeline("summarization", model="t5-base")

# 3. 분석할 기사 본문 (예시)
news_text = """
[인포스탁데일리=이동희 선임기자] HD현대(267250)가 세계 최대 가스 전시회인 가스텍(Gastech)에서 탈탄소·디지털 기술의 미래를 선보인다.
HD현대는 오는 17일부터 나흘 간 미국 휴스턴에서 열리는 ‘가스텍2024’에 참가한다고 12일 밝혔다. 행사에는 전 세계 800여 개 기업이 참여하며, 5만여 명 이상의 참관객이 방문할 것으로 예상된다.
HD현대는 정기선 부회장을 비롯해 영업, 연구개발, 엔지니어링 분야 임직원들이 참석, 선사와 선급 등 글로벌 기업들을 만나 친환경 기술을 소개하는 한편 조선 및 해운산업의 발전 방안을 논의할 계획이다.
또한 이번 전시회에서는 HD한국조선해양, HD현대중공업, HD현대미포, HD현대삼호, HD현대마린솔루션, HD현대일렉트릭이 함께하는 420제곱미터 규모의 종합 전시 부스를 구성한다. 부스에는 차세대 LNG운반선, FSRU, 액화이산화탄소 운반선 등 HD현대의 친환경 선박 모형이 함께 전시된다.
행사 기간 HD현대는 글로벌 선급 및 기업들로부터 총 16건의 기술인증 획득 및 MOU를 체결한다. 특히 가스운반선의 디지털 전환과 탈탄소화에 있어 진일보된 기술력을 선보인다.
HD현대는 노르웨이선급(DNV)으로부터 LNG운반선의 클라우드 기반 디지털 트윈 선박 가상 시운전 검증기술에 대한 기본인증(AIP)을 받는다. 이 기술은 △엔진시스템 △전력시스템 △가스시스템 등 LNG운반선 주요 시스템의 디지털트윈 모델을 클라우드상에서 통합 연결하여 한 척의 선박을 구성하고, 가상 시운전을 통해 객관적으로 선박을 검증할 수 있게 해준다.
미국선급(ABS)으로부터는 암모니아 추진선에 대한 무인 엔진룸 설계와 안전관제 솔루션에 대한 기본인증을 획득, 선원의 안전성을 강화할 수 있게 된다.
친환경 벙커링 선박에 대한 기본인증도 다수 받는다. 로이드선급(LR) 등으로부터 23,000세제곱미터(㎥)급 암모니아벙커링선 개발에 대한 기본인증을, 한국선급(KR)으로부터는 18,000세제곱미터(㎥)급 LNG벙커링선 개발에 대한 기본인증을 받을 예정이다. 이와 더불어 한국선급(KR)과는 암모니아 연료 공급 시스템 공동 개발에 대한 MOU 체결도 진행한다.
HD현대마린솔루션은 노르웨이선급(DNV)으로부터 선박용 이산화탄소 포집·액화·저장·설비(OCCS) 개조 기본인증을 받는다. 이를 통해, 친환경 리트로핏 사업에 OCCS 개조를 추가하며 사업 영역을 확장한다.
이밖에도 행사 첫날인 17일에는 선사, 선급 등을 대상으로 기술 세미나를 개최한다. 세미나를 통해 가스운반선의 트렌드와 전기추진시스템 현황, 선박 디지털 전환 로드맵 등 HD현대의 기술 개발 현황과 계획을 소개한다. 18일과 19일에는 기존에 실시하던 고객사 면담과 더불어 ‘HD RECEPTION’ 행사를 진행해 부스를 찾는 고객사들과 HD현대의 미래형 친환경 선박에 대해 자유롭게 의견을 나눌 예정이다.
HD현대 관계자는 “HD현대는 선박의 탈탄소화와 디지털 전환에 있어 선도적인 기술력을 보유하고 있다”며, “앞으로도 지속적인 투자와 기술개발을 통해 지속 가능한 미래 에너지 생태계 구현에 나서겠다”고 말했다.
"""

# 4. Kkma를 사용해 문장 단위로 분리
sentences = kkma.sentences(news_text)

# 요약
# summary = summarizer(news_text, max_length=300, min_length=50, do_sample=False)

# 5. 감정 분석 결과 저장을 위한 리스트 초기화
results = []

# 긍정/부정/중립 확률 계산을 위한 변수 초기화
positive_sum = 0
negative_sum = 0
neutral_sum = 0

# 6. 각 문장에 대해 감정 분석 수행
for sentence in sentences:
    result = sentiment_analysis(sentence)[0]  # 감정 분석 결과에서 첫 번째 결과만 사용
    results.append({
        'sentence': sentence,
        'label': result['label'],
        'score': result['score']
    })

    # print(result)
    
    # 긍정/부정/중립에 따라 확률을 합산
    if result['label'] == 'positive':
        positive_sum += result['score']
    elif result['label'] == 'negative':
        negative_sum += result['score']
    else:  # 중립인 경우
        neutral_sum += result['score']

# 7. 긍정 문장과 부정 문장으로 분류
positive_sentences = [r for r in results if r['label'] == 'positive']
negative_sentences = [r for r in results if r['label'] == 'negative']

# 8. 정확도 높은 순서로 정렬 후 상위 3개씩 선택
positive_sentences = sorted(positive_sentences, key=lambda x: x['score'], reverse=True)[:3]
negative_sentences = sorted(negative_sentences, key=lambda x: x['score'], reverse=True)[:3]

# 9. 긍정 문장 출력
print("긍정 문장 (정확도 높은 순):")
for pos in positive_sentences:
    print(f"문장: {pos['sentence']}, 정확도: {pos['score']:.4f}")

# 10. 부정 문장 출력
print("\n부정 문장 (정확도 높은 순):")
for neg in negative_sentences:
    print(f"문장: {neg['sentence']}, 정확도: {neg['score']:.4f}")

# 11. 총합에서 긍정, 부정, 중립 비율 계산 (전체 문장 수에 따른 정규화)
total_score_sum = positive_sum + negative_sum + neutral_sum
if total_score_sum > 0:
    positive_ratio = (positive_sum / total_score_sum) * 100
    negative_ratio = (negative_sum / total_score_sum) * 100
    neutral_ratio = (neutral_sum / total_score_sum) * 100
else:
    positive_ratio = negative_ratio = neutral_ratio = 0

# 12. 결과 출력
print(f"\n긍정 비율: {positive_ratio:.2f}%")
print(f"부정 비율: {negative_ratio:.2f}%")
print(f"중립 비율: {neutral_ratio:.2f}%")

# 기업의 주가에 긍정/부정 영향을 미칠 확률
if positive_ratio > negative_ratio:
    print(f"이 뉴스는 해당 기업의 주가에 긍정적으로 작용할 확률이 {positive_ratio:.2f}%입니다.")
else:
    print(f"이 뉴스는 해당 기업의 주가에 부정적으로 작용할 확률이 {negative_ratio:.2f}%입니다.")




# 뉴스 요약 (T5 모델 사용)
model = AutoModelForSeq2SeqLM.from_pretrained('eenzeenee/t5-small-korean-summarization')
tokenizer = AutoTokenizer.from_pretrained('eenzeenee/t5-small-korean-summarization')

prefix = "summarize: "

# 뉴스 요약 수행
inputs = [prefix + news_text]
inputs = tokenizer(inputs, max_length=512, truncation=True, return_tensors="pt")
output = model.generate(**inputs, num_beams=3, do_sample=True, min_length=10, max_length=64)
decoded_output = tokenizer.batch_decode(output, skip_special_tokens=True)[0]

# Kkma를 사용해 요약 결과 문장 분리
summary_result = kkma.sentences(decoded_output.strip())[0]

# 요약 결과 출력
print("\n뉴스 요약:")
print(summary_result)