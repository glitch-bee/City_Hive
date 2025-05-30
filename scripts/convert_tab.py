import pandas as pd
import geopandas as gpd
from shapely import wkt
import matplotlib.pyplot as plt

# Read the CSV
df = pd.read_csv("data/raw/2020_Neighborhood_Tabulation_Areas__NTAs__20250525.csv")

# Parse the WKT geometry
df['geometry'] = df['the_geom'].apply(wkt.loads)

# Create a GeoDataFrame
gdf = gpd.GeoDataFrame(df, geometry='geometry', crs="EPSG:4326")

# Save as GeoJSON
gdf.to_file("data/processed/nyc_nta_boundaries.geojson", driver="GeoJSON")

# Plot only the outlines (clear fill)
ax = gdf.plot(edgecolor='#0074D9', linewidth=1, facecolor='none')
plt.title("NYC Neighborhood Tabulation Areas (Outlines Only)")
plt.axis('off')
plt.show()