from etf_financial_statements import data

def generate_bulk_insert_query(table, data_list):
    if not data_list:
        return None
    
    # 컬럼명 추출 (모든 딕셔너리의 키는 동일해야 합니다)
    columns = ', '.join(data_list[0].keys())
    
    # 값 목록 생성
    values_list = []
    for data in data_list:
        values = []
        for val in data.values():
            # Check type of value and format accordingly
            if isinstance(val, str):
                values.append(f"'{val}'")  # Strings need quotes
            elif val is None:
                values.append('NULL')  # None translates to NULL in SQL
            else:
                values.append(str(val))  # Other types (int, float) do not need quotes
        values_list.append(f"({', '.join(values)})")
    
    # Generate the query
    values_clause = ', '.join(values_list)
    query = f"INSERT INTO {table} ({columns}) VALUES {values_clause}"
    
    return query


sql_query = generate_bulk_insert_query(
    table='creation_unit', 
    data_list=data
)

print(sql_query)
with open('sql_etf_finance.txt', 'w', encoding='utf-8') as file:
    file.write(sql_query)