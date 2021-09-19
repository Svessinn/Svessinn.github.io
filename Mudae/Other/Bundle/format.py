import json
def main():
	output = []
	f = open('Bundle/newBundles.json', )
	data = json.load(f)

	for bundle in data:

		wa = format(float(bundle["wap"]), '.2f').zfill(6)
		ha = format(float(bundle["hap"]), '.2f').zfill(6)
		wg = format(float(bundle["wgp"]), '.2f').zfill(6)
		hg = format(float(bundle["hgp"]), '.2f').zfill(6)

		output.append({"Bundle": bundle["Bundle"],"Aliases":bundle["Aliases"], "Size": bundle["Size"],"wa": bundle["wa"],"ha": bundle["ha"],"wg": bundle["wg"],"hg": bundle["hg"],"wap":wa,"hap":ha,"wgp":wg,"hgp":hg})

	# Opening the output file
	with open("Bundle/output.json", "a") as outfile:
		# Clearing the data from the output file
		outfile.seek(0)
		outfile.truncate()
		# Dumping the output data to the output file
		json.dump(output, outfile, indent=2, ensure_ascii=False)
