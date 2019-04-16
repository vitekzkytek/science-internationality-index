import pandas as pd

method = pd.read_excel('AWS_Import/populateAmazon.xlsx',sheet_name='method').to_json('methods.json')
