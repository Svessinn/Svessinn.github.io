def main():
	lst = []
	inp = input('$mpde\n')
	while inp:
		lst.append(inp.split()[-1])
		inp = input()
# If you just want to get the pins you are missing
# uncomment lines 9-12 and comment likes 3-6
#	for i in range(1, 722):
#		lst.append('pin'+str(i))
#	for i in range(1, 93):
#		lst.append('logopin'+str(i))
	inp = input('$mpa\n')
	while inp:
		ls = inp[1:-1].split('::')
		for i in ls:
			if i in lst:
				lst.remove(i)
		inp = input()
	print(*lst, sep='$')
