def main():
	inp = input() # Input your $llo+mv list
	lst = []
	while inp:
		lst.append(inp.split(' :revolving_he')[0])
		inp = input()
	print(*lst, sep='$')
