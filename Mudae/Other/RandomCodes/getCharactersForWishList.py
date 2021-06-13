inp = input('Input $topmvu list\n')
lst = []
while inp:
  lst.append(inp.split(' - ')[1])
  inp = input()

inp = input('Input your $wlmvu list\n')
while inp:
  if inp in lst:
    lst.remove(inp)
  inp = input()

inp = input('Input your $wlx list\n')
while inp:
  i = inp.split(' :no')[0]
  if i in lst:
    lst.remove(i)
  inp = input()
print(*lst, sep='$')
