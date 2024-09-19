from tensorflow.keras.models import load_model
# 모델 사용
def use_model(data):
    # 저장된 모델 불러오기
    loaded_model = load_model('stock_model.h5')
    X_new = data

    # 예측
    predicted_price = loaded_model.predict(X_new)
    print(f"예측된 다음날 주가: {predicted_price[0][0]}")