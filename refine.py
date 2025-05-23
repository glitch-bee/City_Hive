import pandas as pd
import geojson
import numpy as np

input_file = 'staten_island_trees.csv'
output_file = 'staten_island_trees.geojson'

lat_col = 'latitude'
lon_col = 'longitude'

df = pd.read_csv(input_file)

# Convert lat/lon to numeric, coerce errors to NaN
df[lat_col] = pd.to_numeric(df[lat_col], errors='coerce')
df[lon_col] = pd.to_numeric(df[lon_col], errors='coerce')

# Only keep finite numbers for coordinates
df_clean = df[np.isfinite(df[lat_col]) & np.isfinite(df[lon_col])]

print(f"Rows that will be written: {len(df_clean)}")

features = []
for _, row in df_clean.iterrows():
    lon = float(row[lon_col])
    lat = float(row[lat_col])
    # Remove any nan/inf/-inf in properties
    props = {k: ("" if (pd.isnull(v) or (isinstance(v, float) and not np.isfinite(v))) else v)
             for k, v in row.to_dict().items()}
    features.append(geojson.Feature(
        geometry=geojson.Point((lon, lat)),
        properties=props
    ))

feature_collection = geojson.FeatureCollection(features)

with open(output_file, 'w', encoding='utf-8') as f:
    geojson.dump(feature_collection, f)

print(f"GeoJSON file saved as {output_file} with {len(features)} features.")
