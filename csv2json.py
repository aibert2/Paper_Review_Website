import csv
import json

csv_file = 'data/paperlist.csv'
json_file = 'material-dashboard-react-main/public/paperlist.json'

with open(csv_file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

with open(json_file, 'w', encoding='utf-8') as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)

print('转换完成，已生成 paperlist.json')