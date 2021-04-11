#!/usr/bin/env python3

#==============================================#
#         Created By: Svess#8004               #
#  Last Modification:  2021-03-03 10:21 UTC+0  #
#==============================================#

################################################
#                  DISCLAIMER                  #
#   This code is not good for 1 major reason   #
#     We are unable to see if the reactions    #
#     are on messages from the Mudae BOTs      #
#   So any reaction on any message is counted  #
#       and therefore this code will not       #
#      return a close to correct resault       #
################################################

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

# Function to filter the kakera reactions
def getReaction(l):
  if l =='kakeraP': 
    dct[l] += 1
    return True
  elif l =='kakera ': 
    dct[l] += 1
    return True
  elif l =='kakeraT': 
    dct[l] += 1
    return True
  elif l =='kakeraG': 
    dct[l] += 1
    return True
  elif l =='kakeraY': 
    dct[l] += 1
    return True
  elif l =='kakeraO': 
    dct[l] += 1
    return True
  elif l =='kakeraR': 
    dct[l] += 1
    return True
  elif l =='kakeraW': 
    dct[l] += 1
    return True
  elif l =='kakeraL': 
    dct[l] += 1
    return True
  else: 
    return False

sm = 0 # Counter of kakera

# Runs through all the desired files
for File in files:
  searchfile = open(File, "r") # Opening the next File, read only
  lastLine = '' # Initialising a last line to be able to find the reactions later
  
  # Reads through each line
  for line in searchfile:
    # Checking for kakera reactions
    if "kakera" in line and '{Reactions}' in lastLine:
      # Passes the reaction through the filter 
      # and adds to the counter if it passes the check
      if getReaction(line[0:7]): sm+=1
      #else: print(line, File) # Uncomment this to see what made it to the filter but failed to get through

    lastLine = line # Updates the lastLine variable

  searchfile.close() # Closing the read File so it's ready for the next one

# Prints the data disorganised
#for i in dct:
#  print(i, dct[i])

print(dct) # Prints out the raw data

# Prints the data in an organised format
print('\nPurple:', dct['kakeraP'], '\nBlue:', dct['kakera '], '\nTeal:', dct['kakeraT'], 
'\nGreen:', dct['kakeraG'], '\nYellow:', dct['kakeraY'], '\nOrange:', dct['kakeraO'], 
'\nRed:', dct['kakeraR'], '\nRainbow:', dct['kakeraW'], '\nLight:', dct['kakeraL'], 
'\nFor a total of', sm, 'kakera reactions')
