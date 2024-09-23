import os
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.model_selection import train_test_split
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
from LSTM_model_definition import create_multitask_lstm_model

# RSI 계산 함수
def compute_RSI(series, period=14):
    delta = series.diff()
    gain = np.where(delta > 0, delta, 0)
    loss = np.where(delta < 0, -delta, 0)
    avg_gain = pd.Series(gain).rolling(window=period, min_periods=1).mean()
    avg_loss = pd.Series(loss).rolling(window=period, min_periods=1).mean()
    rs = avg_gain / avg_loss
    return 100 - (100 / (1 + rs))

# MACD 계산 함수
def compute_MACD(series, short_window=12, long_window=26, signal_window=9):
    short_ema = series.ewm(span=short_window, adjust=False).mean()
    long_ema = series.ewm(span=long_window, adjust=False).mean()
    macd = short_ema - long_ema
    signal = macd.ewm(span=signal_window, adjust=False).mean()
    return macd - signal

# 데이터 경로 설정
base_dirs = [
    "S11P21A705/AI/daily_stock_data_10/domestic",
    "S11P21A705/AI/daily_stock_data_10/oversea",
    "S11P21A705/AI/daily_stock_data_10/etf"
]

# 산업 분야별 주식 코드 분류
manufacturing_codes_do1 = ["000660", "005930", "005380"]
manufacturing_codes_do2 = ["010140", "329180", "042660"]
manufacturing_codes_ov = ["BA", "NKE", "RACE"]
manufacturing_codes_etf = ["102960", "117700", "139230"]
it_codes_do = ["035420", "035720", "018260"]
it_codes_ov1 = ["AMAT", "NVDA", "INTC"]
it_codes_ov2 = ["MSFT", "AAPL", "META"]
it_codes_etf1 = ["411420", "139260", "363580"]
it_codes_etf2 = ["091160", "395160", "091230"]
entertainment_codes_do = ["079160", "352820", "035900"]
entertainment_codes_ov = ["NFLX", "DIS", "MAR"]
bio_codes_do = ["019170", "196170", "128940"]
bio_codes_ov = ["AZN", "NVO", "SNY"]
bio_codes_etf = ["266420", "244580", "185680"]
food_codes_do = ["004370", "005180", "005440"]
food_codes_ov = ["KO", "MCD", "KHC"]
chemical_codes_do = ["051910", "298020", "161000"]
chemical_codes_ov = ["XOM", "CVX", "DOW"]
chemical_codes_etf = ["385510", "117460", "139250"]
finance_codes_do = ["105560", "023760", "323410"]
finance_codes_ov = ["JPM", "GS", "BAC"]
finance_codes_etf = ["140700", "102970", "091170"]
misc_etf_codes1 = ["352560", "352540", "329220"]
misc_etf_codes2 = ["396510", "256750", "217780"]

# 산업 분야 코드 리스트
sector_codes = [
    manufacturing_codes_do1,manufacturing_codes_do2, manufacturing_codes_ov, manufacturing_codes_etf,
    it_codes_do, it_codes_ov1,it_codes_ov2, it_codes_etf1,it_codes_etf2,
    entertainment_codes_do, entertainment_codes_ov,
    bio_codes_do, bio_codes_ov, bio_codes_etf,
    food_codes_do, food_codes_ov,
    chemical_codes_do, chemical_codes_ov, chemical_codes_etf,
    finance_codes_do, finance_codes_ov, finance_codes_etf,
    misc_etf_codes1,misc_etf_codes2
]

# 각 주식 코드에 대한 산업 분야를 매핑하는 함수
def get_sector(code):
    for i, codes in enumerate(sector_codes):
        if code in codes:
            return i
    return None

# 데이터 스케일러 정의 (Standard Scaler 사용)
scaler = StandardScaler()

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
                    df = df[['Date', 'Open', 'High', 'Low', 'Close', 'Volume']]
                    
                    # 날짜를 기준으로 정렬
                    df = df.sort_values('Date')
                    
                    # 데이터 타입을 숫자형으로 변환 (문자열을 숫자로)
                    for col in ['Open', 'High', 'Low', 'Close', 'Volume']:
                        df[col] = pd.to_numeric(df[col], errors='coerce')
                    
                    # NaN 및 Inf 값을 0으로 대체
                    df.replace([np.inf, -np.inf], np.nan, inplace=True)
                    df.fillna(0, inplace=True)
                    
                    # 로그 변환 (Volume) - 0 이하 값은 1로 변환하여 로그 적용
                    df['Volume'] = df['Volume'].apply(lambda x: np.log1p(max(x, 1)))

                    # 추가 피처 생성
                    df['변동률'] = (df['High'] - df['Low']) / df['Open']
                    df['MA5'] = df['Close'].rolling(window=5).mean().fillna(0)
                    df['MA20'] = df['Close'].rolling(window=20).mean().fillna(0)
                    
                    # 기술적 지표 추가
                    df['RSI'] = compute_RSI(df['Close'], 14)  # RSI 계산
                    df['MACD'] = compute_MACD(df['Close'])    # MACD 계산

                    # NaN 및 Inf 값을 0으로 대체
                    df.replace([np.inf, -np.inf], np.nan, inplace=True)
                    df.fillna(0, inplace=True)

                    # 정규화 및 피처 확장
                    numeric_cols = ['Open', 'High', 'Low', 'Close', 'Volume', '변동률', 'MA5', 'MA20']
                    scaled_data = scaler.fit_transform(df[numeric_cols])
                    
                    # 시계열 데이터 형태로 변환하여 저장
                    data_by_sector[sector_idx].append(scaled_data)

# LSTM 모델 생성 및 학습을 위한 함수
def create_and_train_model_for_sector(sector_data, input_shape, sector_idx):
    # 데이터 준비
    train_x = []
    train_y = []
    sequence_length = input_shape[0]

    for stock_data in sector_data:
        if len(stock_data) >= sequence_length + 5:
            for i in range(len(stock_data) - sequence_length - 5):
                train_x.append(stock_data[i:i + sequence_length])
                train_y.append(stock_data[i + sequence_length + 5][3])  # Close 값

    train_x = np.array(train_x)
    train_y = np.array(train_y)
    min_samples = min(len(train_y), len(train_x))

    train_x = train_x[:min_samples]
    train_y = train_y[:min_samples]

    # train_test_split
    train_x, test_x, train_y, test_y = train_test_split(
        train_x, train_y, test_size=0.2, random_state=42
    )

    # 모델 생성
    model = create_multitask_lstm_model(input_shape, 1)  # num_sectors를 1로 설정

    # EarlyStopping 및 ModelCheckpoint 추가
    early_stopping = EarlyStopping(monitor='val_loss', patience=10)
    checkpoint = ModelCheckpoint(f'model_sector_{sector_idx}.keras', monitor='val_loss', save_best_only=True)

    # 모델 학습
    model.fit(train_x, train_y, epochs=50, batch_size=32, validation_split=0.2, callbacks=[early_stopping, checkpoint])

    # 모델 평가
    evaluation = model.evaluate(test_x, test_y)
    print(f"섹터 {sector_idx}의 모델 평가 결과: {evaluation}")

    # 모델 저장
    model.save(f"model_sector_{sector_idx}.keras")
    print(f"섹터 {sector_idx}의 모델이 model_sector_{sector_idx}.keras로 저장되었습니다.")

    # 예측
    predictions = model.predict(test_x)
    
    # RMSE, MAE, R^2 계산 및 출력
    rmse = np.sqrt(mean_squared_error(test_y, predictions))
    mae = mean_absolute_error(test_y, predictions)
    r2 = r2_score(test_y, predictions)

    print(f"섹터 {sector_idx}의 평가 지표:")
    print(f"  RMSE: {rmse}")
    print(f"  MAE: {mae}")
    print(f"  R^2: {r2}")

# 24개 섹터에 대한 모델 생성 및 학습
sequence_length = 30
input_shape = (sequence_length, 8)

for sector_idx, sector_data in enumerate(data_by_sector):
    print(f"섹터 {sector_idx}에 대한 모델 생성 및 학습 시작")
    create_and_train_model_for_sector(sector_data, input_shape, sector_idx)
    print(f"섹터 {sector_idx}에 대한 모델 생성 및 학습 완료\n")
