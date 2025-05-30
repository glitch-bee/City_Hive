import requests
import json

url = "https://data.cityofnewyork.us/resource/uvpi-gqnh.json"
params = {
    "$where": "tree_dbh >= 35 AND tree_dbh <= 80 AND latitude IS NOT NULL AND longitude IS NOT NULL",
    "$select": "tree_id,spc_common,tree_dbh,latitude,longitude",
    "$limit": 1000
}
response = requests.get(url, params=params)
trees = response.json()
print("Pulled", len(trees), "trees from API.")

geojson = {
    "type": "FeatureCollection",
    "features": []
}

for tree in trees:
    try:
        lat = float(tree["latitude"])
        lon = float(tree["longitude"])
        props = {
            "tree_id": tree["tree_id"],
            "species": tree["spc_common"],
            "dbh": tree["tree_dbh"]
        }
        geojson["features"].append({
            "type": "Feature",
            "geometry": {"type": "Point", "coordinates": [lon, lat]},
            "properties": props
        })
    except Exception as e:
        print("Error with tree:", tree, "| Exception:", e)

with open("trees_35_80cm.geojson", "w") as f:
    json.dump(geojson, f, indent=2)

print(f"GeoJSON file written: {len(geojson['features'])} features")
