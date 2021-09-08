def main():
	inp = input() # Input the series from your $dl command
	lst = []
	while inp:
		lst.append(inp.split(' (')[0])
		inp = input()
	print(*lst, sep='$')
