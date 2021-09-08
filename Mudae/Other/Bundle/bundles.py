def main():
	inp = input()
	lst = []
	while inp:
		lst.append( ' ('.join(inp.split(' (')[0:-1]) )
		inp = input()
	with open("Bundle/bundles.txt", "a") as f:
		f.seek(0)
		f.truncate()
		for i in lst:
			print('$imat ' + i, file=f)
