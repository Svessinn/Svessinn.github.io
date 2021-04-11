#!/usr/bin/env python3

#==============================================#
#         Created By: Svess#8004               #
#  Last Modification:  2021-03-06 10:36 UTC+0  #
#==============================================#

# Imports
from collections import defaultdict as ddict

# Initialising a default dict to store the reactions
dct = ddict(int)

# List of files that the program will read through
# Should be .txt files
# We recommend compiling your data using DiscordChatExporter
files = [
# File names go here
]

sm = 0 # Counter 
k=0
kl = 0
# Runs through all the desired files
for File in files:
  searchfile = open(File, "r") # Opening the next File, read only
  lastLine = ""
  # Reads through each line
  for line in searchfile:
    if "LVL" not in lastLine:
      if "$kl " in line and "No kakeraloots bought" not in line:
        try:
          L = line.split()
          for j in range(len(L)):
            try:
              L[j] = int(L[j])
            except:
              L[j]=L[j]
          if len(L) > 2 or L[1] > 10 or type(L[1]) != int:
            k+=1
          else:
            kl += L[1]
        except:
          try:
            if len(L) == 1:
              kl += 1
          except:
            k+=1
                                                    
      if "rolls stacked" in line or "Rolls stacked" in line or "roll stacked" in line or "qualityup" in line or "kakeraP" in line:
        if "qualityup" in line:
          kl -= 1
      elif ":rollstack:" in line or ":2tierUS:" in line or ":1tierUS:" in line:
        sm+=1 # Adds to the counter
        # Splits the line
        lst = list(line[1:-1].split('::'))
        # Adding the kl items to the dict
        for i in lst:
          dct[':'+i.strip(':')+':']+=1
        
    lastLine=line

  searchfile.close() # Closing the read File so it's ready for the next one

print(dct) # Prints out the raw data
print(kl)
print('from', sm, '$kl')
