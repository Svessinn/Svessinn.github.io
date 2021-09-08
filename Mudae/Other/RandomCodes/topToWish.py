def main():
	inp = input() # $topmvu
	lst = []
	while inp:
		lst.append(inp.split(' - ')[1].split(' · ')[0])
		inp = input()

	inp = input() # $wlmvu
	while inp:
		if inp in lst:
			lst.remove(inp)
		inp = input()
	print(*lst, sep='$')