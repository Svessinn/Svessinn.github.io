# Imports
import json

def main():
	# Creating the output
	output = []

	# Opening and redefining old data as json
	#f = open('Bundle/bundles.json', )
	#data = json.load(f)
	datas = open('Bundle/bundles.txt')

	# Reading through the old data
	for bundle in datas:
		# Printing the bundle name to be sure you input the correct data
		print(' '.join(bundle.split()[1::]))
		# Getting the bundle size, (input format in sample.in)
		size = input().split('/')[-1]
		# If the Bundle has been removed from the Mudae BOT just press [Enter] to skip it
		if not size:
			continue
		# Making sure the size is an integer, 
		# If not input stops and output is executed
		try:
			size = int(size)
		except:
			break
		# Taking in the next line of input, which should be "(bundle)"
		# And defining the list 'lst' to store the bundles aliases
		inp = input()
		lst = []
		# Going through the bundle aliases
		while inp:
			# Breaks the loop when the roll type info is inputted
			if '$wa, ' in inp:
				break
			# Appending the Bundle alias to the lst list
			# And receiving next line of input
			lst.append(inp)
			inp = input()
		# Removing the "(bundle)" input from the list of aliases
		lst = lst[1::]
		# Getting and defining the roll type amounts as integers in a list
		if inp:
			rolls = list(map(int, inp.split()[::2]))
		else:
			rolls = list(map(int, input().split()[::2]))
		# Adding the bundle stats to the output
		output.append({"Bundle": ' '.join(bundle.split()[1::]),"Aliases":lst, "Size": size,"wa": rolls[0],"ha": rolls[1],"wg": rolls[2],"hg": rolls[3],"wap":format(round((rolls[0]/size)*100, 2), '.2f').zfill(6),"hap": format(round((rolls[1]/size)*100, 2), '.2f').zfill(6),"wgp": format(round((rolls[2]/size)*100, 2), '.2f').zfill(6),"hgp": format(round((rolls[3]/size)*100, 2), '.2f').zfill(6)})
	# Opening the output file
	with open("Bundle/output.json", "a") as outfile:
		# Clearing the data from the output file
		outfile.seek(0)
		outfile.truncate()
		# Dumping the output data to the output file
		json.dump(output, outfile, indent=2, ensure_ascii=False)