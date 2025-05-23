import pandas as pd

# Use raw string for Windows file paths to avoid escape issues
input_file = r'data/raw/2015_Street_Tree_Census_-_Tree_Data_20250522.csv'
output_dir = 'data/processed/'

# Read the CSV into a DataFrame with utf-8 encoding for special characters
try:
    df = pd.read_csv(input_file, encoding='utf-8')
except UnicodeDecodeError:
    # Try utf-8-sig if utf-8 fails
    df = pd.read_csv(input_file, encoding='utf-8-sig')

boroughs = {
    1: 'manhattan_trees.csv',
    2: 'bronx_trees.csv',
    3: 'brooklyn_trees.csv',
    4: 'queens_trees.csv',
    5: 'staten_island_trees.csv',
}

for code, filename in boroughs.items():
    borough_df = df[df['borocode'] == code]
    borough_df.to_csv(output_dir + filename, index=False)
    print(f"Done. {len(borough_df)} rows written to {filename}")
