# Imports
from collections import defaultdict as ddict
def main():
	# Variables
	dct = ddict(list)
	inp = input('Input:\n')
	lst = []

	# Main loop
	while inp:
		i = list(inp.split('  :revolving_hearts: => '))
		dct[i[1]].append(i[0])
		inp = input()

	# Turning defaultdict into a list
	for i in dct:
		lst.append([i.capitalize(), dct[i]])

	# Sorting list
	lst.sort()

	# Outputting formatted list
	for i in range(len(lst)):
		print(lst[i][0], end=': \n')
		print(*lst[i][1], sep=', ', end='\n\n')

# Instructions
# copy the characters and owners from a $imao-
# command and paste it in the console after
# running the command

# Example Input:
# Alucard  :revolving_hearts: => User#5291
# Rip Van Winkle  :revolving_hearts: => User#4328
# Schrödinger  :revolving_hearts: => User#5291
# Seras Victoria  :revolving_hearts: => User#3783
#

# Example Output:
# User#3783:
# Seras Victoria
# 
# User#4328:
# Rip Van Winkle
# 
# User#5291:
# Alucard, Schrödinger
# 
