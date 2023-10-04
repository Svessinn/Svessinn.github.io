import json

data = open('bundles.json', encoding='UTF-8')
bundles = json.load(data)
data.close()

for i in range(len(bundles)):
  for j in range(len(bundles[i]['Aliases'])):
    bundles[i]['Aliases'][j] = bundles[i]['Aliases'][j][1:-1]

with open('newBundles.json', 'w', encoding='UTF-8') as f:
  json.dump(bundles, f, indent=2, sort_keys=False, ensure_ascii=False)
