import geopandas as gpd
import sys
import os

boroughs = [
    ('bronx', 'bronx_trees.geojson'),
    ('brooklyn', 'brooklyn_trees.geojson'),
    ('manhattan', 'manhattan_trees.geojson'),
    ('queens', 'queens_trees.geojson'),
]

# Define your preferred diameter range (in centimeters)
min_dbh = 35    # minimum tree_dbh, adjust as needed
max_dbh = 80    # maximum tree_dbh, adjust as needed (or set very high if you want no upper limit)

for borough, geojson_file in boroughs:
    input_file = os.path.join('data', 'processed', geojson_file)
    output_file = os.path.join('data', 'processed', f'{borough}_trees_filtered.geojson')
    try:
        gdf = gpd.read_file(input_file)

        # Filter for trees within the specified DBH range
        filtered_gdf = gdf[(gdf['tree_dbh'] >= min_dbh) & (gdf['tree_dbh'] <= max_dbh)]

        # Save the filtered results to a new GeoJSON file
        filtered_gdf.to_file(output_file, driver='GeoJSON')

        print(f"Filtered {borough} trees from {len(gdf)} to {len(filtered_gdf)} in the specified diameter range.")
    except Exception as e:
        print(f"Error processing {geojson_file}: {e}")
