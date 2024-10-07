from domestic_stock_description import data

def generate_bulk_insert_query(table, data_list):
    if not data_list:
        return None
    
    # 컬럼명 추출 (모든 딕셔너리의 키는 동일해야 합니다)
    columns = ', '.join(data_list[0].keys())
    
    # 값 목록 생성
    values_list = []
    for data in data_list:
        values = ', '.join([f"'{val}'" for val in data.values()])
        values_list.append(f"({values})")
    
    # 쿼리 생성
    values_clause = ', '.join(values_list)
    query = f"INSERT INTO {table} ({columns}) VALUES {values_clause}"
    
    return query

# 예시: users 테이블에 새로운 여러 레코드 삽입
data_list = [
    {'name': 'Alice', 'age': 25},
    {'name': 'Bob', 'age': 30},
    {'name': 'Charlie', 'age': 35}
]

sql_query = generate_bulk_insert_query(
    table='stock', 
    data_list=data
)

print(sql_query)
with open('sql_domestic_stock.txt', 'w', encoding='utf-8') as file:
    file.write(sql_query)