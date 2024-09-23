from flask import Flask, request, render_template
import pandas as pd
import numpy as np
import os
from tensorflow.keras.models import load_model
from tensorflow.keras.layers import Layer
from sklearn.preprocessing import StandardScaler
from datetime import datetime, timedelta
import tensorflow as tf
from LSTM_model_definition import ReduceMeanLayer, AttentionLayer  # 커스텀 레이어 import
import joblib


app = Flask(__name__)

# 모델 및 데이터 경로 설정
path = os.path.dirname(os.path.abspath(__file__)) 
MODEL_DIR = "LSTM_MODELS"
DATA_DIR = "STOCK_DATA"

# 저장된 Scaler 불러오기
scaler = joblib.load('scaler.pkl')

# 주식 데이터 로드 및 전처리 함수
def load_and_preprocess_data(stock_field, stock_code, start_date, sequence_length=30):
    # 주식 데이터 파일 경로 설정
    file_path = os.path.join(path, DATA_DIR, stock_field, f"daily_stock_data_{stock_code}.csv")
    print(file_path)

    if not os.path.exists(file_path):
        return None, f"주식 코드 {stock_code}에 대한 데이터를 찾을 수 없습니다."
    
    # 데이터 로드
    df = pd.read_csv(file_path)
    df['Date'] = pd.to_datetime(df['Date'])
    
    # 날짜 기준으로 정렬
    df = df.sort_values('Date')
    
    # 입력된 날짜를 기준으로 데이터를 필터링하여 사용
    df = df[df['Date'] <= start_date]
    
    # 최근 30개의 데이터만 선택 (날짜 기준 최신 30개)
    if len(df) < sequence_length:
        return None, f"주식 코드 {stock_code}에 대한 데이터가 30개 이상 필요합니다."
    
    # 최근 30개 데이터를 가져오기
    df = df.iloc[-sequence_length:]
    
    # 필요한 컬럼 선택
    df = df[['Date', 'Open', 'High', 'Low', 'Close', 'Volume']]
    
    # 결측치 처리
    for col in ['Open', 'High', 'Low', 'Close', 'Volume']:
        df[col] = pd.to_numeric(df[col], errors='coerce')
    df.fillna(0, inplace=True)
    
    # 추가 피처 생성 및 기술적 지표 계산
    df['변동률'] = (df['High'] - df['Low']) / df['Open']
    df['MA5'] = df['Close'].rolling(window=5).mean().fillna(0)
    df['MA20'] = df['Close'].rolling(window=20).mean().fillna(0)
    df['RSI'] = compute_RSI(df['Close'])
    df['MACD'] = compute_MACD(df['Close'])
    
    # 필요한 피처만 선택
    features = ['Open', 'High', 'Low', 'Close', 'Volume', '변동률', 'MA5', 'MA20']
    df_features = df[features]
    
    # 스케일링
    scaled_features = scaler.transform(df_features)  # fit 대신 transform만 사용
    
    # 시계열 데이터 형태로 변환
    sequence_data = []
    for i in range(len(scaled_features) - sequence_length + 1):
        sequence_data.append(scaled_features[i:i + sequence_length])
    
    sequence_data = np.array(sequence_data)
    
    return sequence_data, None

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

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/lstm-predict', methods=['POST'])
def predict():
    # 사용자 입력값 받기
    industry_field = request.form['industry_field']  # 예: manufacturing, it 등
    stock_field = request.form['stock_field']        # 예: domestic, oversea 등
    stock_code = request.form['stock_code']          # 주식 코드 입력
    input_date = request.form['input_date']          # 예측 기준 날짜 (형식: YYYY-MM-DD)

    # 입력값 유효성 검사 (입력값을 받은 직후 위치)
    # 사전 정의된 산업 및 주식 분야 목록
    valid_industry_fields = [
        "manufacturing", "joseon", "machinery_construction", 
        "it", "semiconductor", "entertainment", 
        "bio", "food", "chemical", 
        "finance", "reit", "china"
    ]
    valid_stock_fields = ["domestic", "oversea", "etf"]

    # 산업 분야 유효성 검사
    if industry_field not in valid_industry_fields:
        return f"산업 분야 '{industry_field}'는 유효하지 않습니다. 유효한 값을 입력하세요."

    # 주식 분야 유효성 검사
    if stock_field not in valid_stock_fields:
        return f"주식 분야 '{stock_field}'는 유효하지 않습니다. 유효한 값을 입력하세요."

    # 날짜 형식 검사
    try:
        # 입력된 날짜 형식 변환
        start_date = datetime.strptime(input_date, "%Y-%m-%d")
    except ValueError:
        return "날짜 형식이 올바르지 않습니다. YYYY-MM-DD 형식으로 입력하세요."

    # 입력된 산업 분야와 주식 분야를 사용하여 모델 이름 생성
    model_name = f"model_{industry_field}_{stock_field}"
    model_path = os.path.join(path, MODEL_DIR, f"{model_name}.keras")
    print(model_path)
    # 모델 파일이 존재하는지 확인
    if not os.path.exists(model_path):
        return f"{model_name} 모델을 찾을 수 없습니다. 입력된 산업 분야와 주식 분야가 정확한지 확인하세요."

    # 데이터 로드 및 전처리
    sequence_length = 30  # 시퀀스 길이 설정
    input_data, error = load_and_preprocess_data(stock_field, stock_code, start_date, sequence_length)
    if error:
        return error

    # 모델 로드
    try:
        model = load_model(model_path, custom_objects={'ReduceMeanLayer': ReduceMeanLayer, 'AttentionLayer': AttentionLayer})
    except Exception as e:
        return f"모델을 불러오는 중 오류가 발생했습니다: {str(e)}"

    # 예측 수행
    try:
        predictions = model.predict(input_data[-1].reshape(1, sequence_length, 8))
        
        # 예측 값을 원래의 스케일로 되돌림 (첫 번째 feature만 사용)
        predictions_scaled = np.zeros((1, 8))
        predictions_scaled[0, 0] = predictions[0, 0]
        predicted_price = scaler.inverse_transform(predictions_scaled)[0][0]

    except Exception as e:
        return f"예측 중 오류가 발생했습니다: {str(e)}"
    
    # 결과 반환 (템플릿 파일 이름 추가)
    return render_template('result.html', 
                           industry_field=industry_field, 
                           stock_field=stock_field, 
                           stock_code=stock_code, 
                           predicted_price=predicted_price)

if __name__ == '__main__':
    app.run(debug=True)
