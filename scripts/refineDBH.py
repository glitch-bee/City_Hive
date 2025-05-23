import geopandas as gpd

# Load the GeoJSON file
gdf = gpd.read_file('../data/processed/staten_island_trees.geojson')

# Define your preferred diameter range (in centimeters)
min_dbh = 35    # minimum tree_dbh, adjust as needed
max_dbh = 80    # maximum tree_dbh, adjust as needed (or set very high if you want no upper limit)

# Filter for trees within the specified DBH range
filtered_gdf = gdf[(gdf['tree_dbh'] >= min_dbh) & (gdf['tree_dbh'] <= max_dbh)]

# Save the filtered results to a new GeoJSON file
filtered_gdf.to_file('../data/processed/staten_island_trees_filtered.geojson', driver='GeoJSON')

print(f"Filtered trees from {len(gdf)} to {len(filtered_gdf)} in the specified diameter range.")
