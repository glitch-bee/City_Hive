import pandas as pd
import geojson
import numpy as np
import os

boroughs = [
    ('bronx', 'bronx_trees.csv'),
    ('brooklyn', 'brooklyn_trees.csv'),
    ('manhattan', 'manhattan_trees.csv'),
    ('queens', 'queens_trees.csv'),
]

lat_col = 'latitude'
lon_col = 'longitude'

for borough, csv_file in boroughs:
    input_file = os.path.join('data', 'processed', csv_file)
    output_file = os.path.join('data', 'processed', f'{borough}_trees.geojson')
    try:
        df = pd.read_csv(input_file)
        df[lat_col] = pd.to_numeric(df[lat_col], errors='coerce')
        df[lon_col] = pd.to_numeric(df[lon_col], errors='coerce')
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
    except Exception as e:
        print(f"Error processing {csv_file}: {e}")
