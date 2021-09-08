def main():
	inp = input() # input either your $llmv or $llmvr or $llmvl or $llmvrl
	lst = []
	while inp:
		lst.append(inp.split(' #')[0])
		inp = input()
	print(*lst, sep='$')
