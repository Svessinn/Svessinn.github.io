# -*- coding: utf-8 -*-
import json
from collections import defaultdict as ddict

parent = ddict(list)
overlap = []

with open('Bundles.json', encoding='utf-8') as f:
	data = json.load(f)

# Not needed, just for major fuckups

#with open('Test.json', "a", encoding='utf-8') as fi:
#	op = sorted(data, key=lambda x:x["Bundle"], reverse=False)
#	for Bundle in op:
#		Bundle["wap"] = float(Bundle["wap"])
#		Bundle["hap"] = float(Bundle["hap"])
#		Bundle["wgp"] = float(Bundle["wgp"])
#		Bundle["hgp"] = float(Bundle["hgp"])
#	fi.seek(0)
#	fi.truncate()
#	json.dump(op, fi, indent=2, ensure_ascii=False)


output = sorted(data, key=lambda x:x["Bundle"], reverse=False)

with open('_updated.json', encoding='utf-8') as f:
	updated = json.load(f)

updatedBundles = []

with open("input.wip", "a", encoding="UTF-8") as outfile:
	# Clearing the data from the output file
	outfile.seek(0)
	outfile.truncate()
	
	for i in range(len(output)):
		print('$d', output[i]["Bundle"])
		for j in range(i+1, len(output)):
			print(output[j]["Bundle"])
			inp = input('$dl\n')
			if not inp:
				break
			else:
				inp = int(inp)
				print(inp, file=outfile)
			if output[i]["Size"] + output[j]["Size"] == inp:
				# No overlap at all
				continue
			elif inp == max(output[i]["Size"], output[j]["Size"]):
				# Larger bundle is a parent bundle of the smaller one
				if output[i]["Size"] > output[j]["Size"]:
					parent[output[i]["Bundle"]].append(output[j]["Bundle"])
				else:
					parent[output[j]["Bundle"]].append(output[i]["Bundle"])
			else:
				# There is an overlap
				OverLap = output[i]["Size"]+output[j]["Size"]-inp
				if OverLap < 1:
					print('Bundles need Updating')
					if updated[i] == False:
						INPUT = int(input('\n\n'+output[i]["Bundle"]+' Size\n$imat '+output[i]["Bundle"]+'\n').split('/')[-1])
						output[i]["Size"] = INPUT
						INPUT = list(map(int, input(output[i]["Bundle"]+' wa ha wg hg\n').split()[::2]))
						output[i]["wa"] = INPUT[0]
						output[i]["wap"] = round(100*INPUT[0]/output[i]["Size"], 2)
						output[i]["ha"] = INPUT[1]
						output[i]["hap"] = round(100*INPUT[1]/output[i]["Size"], 2)
						output[i]["wg"] = INPUT[2]
						output[i]["wgp"] = round(100*INPUT[2]/output[i]["Size"], 2)
						output[i]["hg"] = INPUT[3]
						output[i]["hgp"] = round(100*INPUT[3]/output[i]["Size"], 2)
						updated[i] = True

					if updated[j] == False:
						INPUT = int(input('\n\n'+output[j]["Bundle"]+' Size\n$imat '+output[j]["Bundle"]+'\n').split('/')[-1])
						output[j]["Size"] = INPUT
						INPUT = list(map(int, input(output[j]["Bundle"]+' wa ha wg hg\n').split()[::2]))
						output[j]["wa"] = INPUT[0]
						output[j]["wap"] = round(100*INPUT[0]/output[j]["Size"], 2)
						output[j]["ha"] = INPUT[1]
						output[j]["hap"] = round(100*INPUT[1]/output[j]["Size"], 2)
						output[j]["wg"] = INPUT[2]
						output[j]["wgp"] = round(100*INPUT[2]/output[j]["Size"], 2)
						output[j]["hg"] = INPUT[3]
						output[j]["hgp"] = round(100*INPUT[3]/output[j]["Size"], 2)

						updated[j] = True

				overlap.append([output[i]["Bundle"], output[j]["Bundle"], OverLap])
		if not inp:
			break

for i in range(len(updated)):
	if updated[i]:
		updatedBundles.append(output[i]["Bundle"])

with open("_overlap.json", "a", encoding="UTF-8") as outfile:
	# Clearing the data from the output file
	outfile.seek(0)
	outfile.truncate()
	# Dumping the output data to the output file
	json.dump(overlap, outfile, ensure_ascii=False)

with open("_parent.json", "a", encoding="UTF-8") as outfile:
	# Clearing the data from the output file
	outfile.seek(0)
	outfile.truncate()
	# Dumping the output data to the output file
	json.dump(dict(parent), outfile, indent=2, ensure_ascii=False)

with open("Bundles.json", "a", encoding="UTF-8") as outfile:
	# Clearing the data from the output file
	outfile.seek(0)
	outfile.truncate()
	# Dumping the output data to the output file
	json.dump(output, outfile, indent=2, ensure_ascii=False)

with open("_updated.json", "a", encoding="UTF-8") as outfile:
	# Clearing the data from the output file
	outfile.seek(0)
	outfile.truncate()
	# Dumping the output data to the output file
	json.dump(updated, outfile, indent=2, ensure_ascii=False)

with open("_updatedBundles.json", "a", encoding="UTF-8") as outfile:
	# Clearing the data from the output file
	outfile.seek(0)
	outfile.truncate()
	# Dumping the output data to the output file
	json.dump(updatedBundles, outfile, indent=2, ensure_ascii=False)


# Getting the names of all the bundles, (Not Needed)

#bundleList = []
#
#for i in output:
#	bundleList.append(i["Bundle"])
#
#with open("_bundleList.json", "a", encoding="UTF-8") as outfile:
#	# Clearing the data from the output file
#	outfile.seek(0)
#	outfile.truncate()
#	# Dumping the output data to the output file
#	json.dump(bundleList, outfile, indent=2, ensure_ascii=False)
