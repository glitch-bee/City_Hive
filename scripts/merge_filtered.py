import geopandas as gpd
import pandas as pd
import os

boroughs = [
    'bronx_trees_filtered.geojson',
    'brooklyn_trees_filtered.geojson',
    'manhattan_trees_filtered.geojson',
    'queens_trees_filtered.geojson',
]

files = [os.path.join('data', 'processed', b) for b in boroughs]
gdfs = [gpd.read_file(f) for f in files]
merged = gpd.GeoDataFrame(pd.concat(gdfs, ignore_index=True), crs=gdfs[0].crs)

output_file = os.path.join('data', 'processed', 'full_boro_filtered.geojson')
merged.to_file(output_file, driver='GeoJSON')
print(f"Merged {len(merged)} trees into {output_file}")
