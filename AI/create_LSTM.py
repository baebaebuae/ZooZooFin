import os
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, LSTM, Dense
from tensorflow.keras.optimizers import Adam

# 데이터 경로 설정
base_dirs = [
    "S11P21A705/AI/stock_data/domestic",
    "S11P21A705/AI/stock_data/oversea",
    "S11P21A705/AI/stock_data/etf"
]

# 산업 분야별 주식 코드 분류 (예시)
manufacturing_codes = ["000660", "005930", "005380", "010140", "329180", "042660", "BA", "NKE", "RACE", "102960", "117700", "139230"]
it_codes = ["035420", "035720", "018260", "AMAT", "NVDA", "INTC", "MSFT", "AAPL", "META", "411420", "139260", "363580", "091160", "395160", "091230"]
entertainment_codes = ["079160", "352820", "035900", "NFLX", "DIS", "MAR"]
bio_codes = ["019170", "196170", "128940", "AZN", "NVO", "SNY", "266420", "244580", "185680"]
food_codes = ["004370", "005180", "005440", "KO", "MCD", "KHC"]
chemical_codes = ["051910", "298020", "161000", "XOM", "CVX", "DOW", "385510", "117460", "139250"]
finance_codes = ["105560", "023760", "323410", "JPM", "GS", "BAC", "140700", "102970", "091170"]
misc_etf_codes = ["352560", "352540", "329220", "396510", "256750", "217780"]

# 산업 분야 코드 리스트
sector_codes = [manufacturing_codes, it_codes, entertainment_codes, bio_codes, 
                food_codes, chemical_codes, finance_codes, misc_etf_codes]

# 각 주식 코드에 대한 산업 분야를 매핑하는 함수
def get_sector(code):
    for i, codes in enumerate(sector_codes):
        if code in codes:
            return i
    return None

# 데이터 스케일러 정의 (0~1 사이 값으로 정규화)
scaler = MinMaxScaler()

# 모든 데이터 파일을 읽고 주식 코드에 따라 데이터를 산업 분야로 분류
data_by_sector = [[] for _ in range(len(sector_codes))]

# 모든 base_dir에 있는 CSV 파일을 순회하며 읽기
for base_dir in base_dirs:
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith(".csv"):
                file_path = os.path.join(root, file)
                stock_code = file.split('_')[-1].split('.')[0]  # 파일명에서 주식 코드 추출
                sector_idx = get_sector(stock_code)
                
                if sector_idx is not None:
                    # CSV 파일 로드
                    df = pd.read_csv(file_path)
                    
                    # 필요한 컬럼만 선택
                    df = df[['Date', 'Open', 'High', 'Low', 'Close']]
                    
                    # 날짜를 기준으로 정렬
                    df = df.sort_values('Date')

                    # 'Open', 'High', 'Low', 'Close' 컬럼을 정규화
                    scaled_data = scaler.fit_transform(df[['Open', 'High', 'Low', 'Close']])
                    
                    # 시계열 데이터 형태로 변환하여 저장
                    data_by_sector[sector_idx].append(scaled_data)

# 2. LSTM 모델 설계
input_shape = (None, 4)  # (시간 스텝, 피처 수)

# 입력 레이어 생성
inputs = Input(shape=input_shape)

# 공유 LSTM 레이어
shared_lstm = LSTM(64, return_sequences=False, name='shared_lstm')(inputs)

# 각 산업 분야별 분리된 출력 레이어
outputs = []
for i, sector in enumerate(sector_codes):
    sector_output = Dense(1, activation='linear', name=f'sector_{i}_output')(shared_lstm)
    outputs.append(sector_output)

# 멀티 태스크 모델 생성
model = Model(inputs=inputs, outputs=outputs)
model.compile(optimizer=Adam(learning_rate=0.001), loss='mse')

# 모델 요약 출력
model.summary()

# 3. 멀티 태스크 학습 데이터 준비
train_x = []  # 모든 산업 분야의 데이터를 통합하여 입력으로 사용
train_y = [[] for _ in range(len(sector_codes))]  # 각 산업 분야별 타겟 값 리스트

for sector_idx, sector_data in enumerate(data_by_sector):
    for stock_data in sector_data:
        sequence_length = 5  # 시계열 데이터 길이 설정
        if len(stock_data) >= sequence_length:
            for i in range(len(stock_data) - sequence_length):
                # 전체 학습 데이터 입력으로 추가
                train_x.append(stock_data[i:i + sequence_length])
                # 각 산업 분야별 출력 값을 별도로 저장
                train_y[sector_idx].append(stock_data[i + sequence_length][-1])  # Close 가격

# 학습 데이터 numpy 배열로 변환
train_x = np.array(train_x)
train_y = [np.array(y) for y in train_y]

# 4. 모델 학습
# 멀티 태스크 모델은 여러 출력값을 동시에 학습
# 학습 시 모든 분야의 타겟 값이 동일한 개수를 유지해야 함
min_samples = min([len(y) for y in train_y])  # 모든 섹터에서 최소 샘플 수 찾기
train_x = train_x[:min_samples]  # 최소 샘플 수에 맞춰 입력 데이터 자르기
train_y = [y[:min_samples] for y in train_y]  # 출력 데이터도 동일하게 자르기

# 모델 학습
model.fit(train_x, train_y, epochs=10, batch_size=32)

# 5. 모델 평가 및 예측
# 예시로 더미 테스트 데이터를 사용하여 모델을 평가
test_x = np.random.rand(20, 5, 4)  # (테스트 샘플 수, 시계열 길이, 피처 수)
test_y = [np.random.rand(20, 1) for _ in sector_codes]  # 더미 타겟 값

# 모델 평가
model.evaluate(test_x, test_y)

# 예측
predictions = model.predict(test_x)

# 예측 결과 출력
for i, pred in enumerate(predictions):
    print(f"섹터 {i}의 예측값:\n", pred)

# 6. 정확도 계산
# 실제 데이터가 필요하며, test_y를 실제 데이터로 설정해야 합니다.
for i, pred in enumerate(predictions):
    actual = test_y[i]
    
    # RMSE (Root Mean Squared Error)
    rmse = np.sqrt(mean_squared_error(actual, pred))
    
    # MAE (Mean Absolute Error)
    mae = mean_absolute_error(actual, pred)
    
    # R^2 (Coefficient of Determination)
    r2 = r2_score(actual, pred)
    
    print(f"섹터 {i}의 평가 지표:")
    print(f"  RMSE: {rmse}")
    print(f"  MAE: {mae}")
    print(f"  R^2: {r2}")
