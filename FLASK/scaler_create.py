# Scaler를 생성하고 데이터를 학습시킨 후 저장하는 코드
import pandas as pd
from sklearn.preprocessing import StandardScaler
import joblib
import os

# 경로 설정
DATA_DIR = "S11P21A705/FLASK/STOCK_DATA"  # 주식 데이터가 저장된 디렉토리 경로
path = os.path.dirname(os.path.abspath(__file__))
scaler_path = os.path.join(path, 'scaler.pkl')

# 데이터 로드
all_data = []

# 데이터 디렉토리 내의 모든 주식 데이터 파일을 가져와서 하나의 DataFrame으로 합침
for root, dirs, files in os.walk(DATA_DIR):
    for file in files:
        if file.endswith(".csv"):
            file_path = os.path.join(root, file)
            df = pd.read_csv(file_path)
            # 필요한 모든 피처를 포함
            df['변동률'] = (df['High'] - df['Low']) / df['Open']
            df['MA5'] = df['Close'].rolling(window=5).mean().fillna(0)
            df['MA20'] = df['Close'].rolling(window=20).mean().fillna(0)
            df.fillna(0, inplace=True)            
            df = df[['Open', 'High', 'Low', 'Close', 'Volume', '변동률', 'MA5', 'MA20']]  # 필요한 컬럼만 사용
            all_data.append(df)

# 모든 데이터를 하나의 DataFrame으로 병합
if all_data:
    merged_data = pd.concat(all_data, axis=0)
    merged_data.dropna(inplace=True)  # 결측값 제거

    # Scaler 학습 및 저장
    scaler = StandardScaler()
    scaler.fit(merged_data)
    joblib.dump(scaler, scaler_path)
    print(f"Scaler가 성공적으로 생성되고 저장되었습니다: {scaler_path}")
else:
    print(f"데이터가 없습니다. 데이터 경로와 파일들을 확인하세요: {DATA_DIR}")
