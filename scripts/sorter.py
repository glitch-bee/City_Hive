import pandas as pd

# Use raw string for Windows file paths to avoid escape issues
input_file = r'../data/raw/2015_Street_Tree_Census_-_Tree_Data_20250522.csv'
output_file = '../data/processed/staten_island_trees.csv'

# Read the CSV into a DataFrame with utf-8 encoding for special characters
try:
    df = pd.read_csv(input_file, encoding='utf-8')
except UnicodeDecodeError:
    # Try utf-8-sig if utf-8 fails
    df = pd.read_csv(input_file, encoding='utf-8-sig')

# Filter for Staten Island (borocode == 5)
staten_island_df = df[df['borocode'] == 5]

# Save to a new CSV
staten_island_df.to_csv(output_file, index=False)

print(f"Done. {len(staten_island_df)} rows written to {output_file}")
