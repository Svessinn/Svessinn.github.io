with open('bundlelist.txt', 'r', encoding='UTF-8') as inp:
  for line in inp:
    with open('msgToSend.txt', 'w', encoding='UTF-8') as f:
      print(f"$imat {' ('.join(line.split(' (')[0:-1])}", file=f)
