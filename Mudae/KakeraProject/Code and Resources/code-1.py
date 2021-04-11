#!/usr/bin/env python3

#==============================================#
#         Created By: Svess#8004               #
#  Last Modification:  2021-03-04 12:14 UTC+0  #
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

kakeraAvgVal = {
'kakeraP': 100,
'kakera': 125.5,
'kakeraT': 195.5,
'kakeraG': 275.5,
'kakeraY': 450.5,
'kakeraO': 750.5,
'kakeraR': 1450.5,
'kakeraW': 3050.5
}

sm = 0 # Counter for the number of Light kakera

# IDs of the Mudae Bots that counld be used
# You can add more if you have a different 
# Maid/Butler in the server your data is from
MudaDict = {
"Mudae":"Mudae#0807",
"Mudamaid2":"Mudamaid2#2147"
}

# Runs through all the desired files
for File in files:
  searchfile = open(File, "r") # Opening the next File, read only
  lastLine = '' # Initialising a last line to be able to find the reactions later

  # Reads through each line
  for line in searchfile:
    # Checkin if a Message by your specific MudaBOT is a response to a kakeraL reaction
    if ":kakeraL:breaks down into:" in line and (MudaDict["Mudamaid2"] in lastLine or MudaDict["Mudae"] in lastLine):
      sm+=1 # Adds to the Light kakera counter
      # Strips the line into the kakera emotes and then
      # splits the line into a list of the kakera broken
      # down from the kakeraL reaction
      lst = list(line[26:-1].split(': =>')[0].split(':+:'))
      # Adding the kakera breakdown to the dict
      for i in lst:
        dct[i]+=1

    lastLine = line # Updates the lastLine variable

  searchfile.close() # Closing the read File so it's ready for the next one

# Summing the number of kakera that the
# Light kakera broke down into and getting
# the average value of the kakera
dctsm = 0
valsm = 0

for i in dct:
  dctsm += dct[i]
  valsm += dct[i]*kakeraAvgVal[i]

print(dct) # Prints out the raw data

print('\nPurple:', dct['kakeraP'], '\nBlue:', dct['kakera'], '\nTeal:', dct['kakeraT'], 
'\nGreen:', dct['kakeraG'], '\nYellow:', dct['kakeraY'], '\nOrange:', dct['kakeraO'], 
'\nRed:', dct['kakeraR'], '\nRainbow:', dct['kakeraW'], '\nFor a total of',
 dctsm, 'kakera\nBroken down from', sm, 'Light kakera')

print('\nDrop chnances of kakera:\n\nPurple: ', format(round(100*dct['kakeraP']/dctsm, 6), '.4f'), '%', 
'\nBlue: ', format(round(100*dct['kakera']/dctsm, 6), '.4f'), '%', 
'\nTeal: ', format(round(100*dct['kakeraT']/dctsm, 6), '.4f'), '%', 
'\nGreen: ', format(round(100*dct['kakeraG']/dctsm, 6), '.4f'), '%', 
'\nYellow: ', format(round(100*dct['kakeraY']/dctsm, 6), '.4f'), '%', 
'\nOrange: ', format(round(100*dct['kakeraO']/dctsm, 6), '.4f'), '%', 
'\nRed: ', format(round(100*dct['kakeraR']/dctsm, 6), '.4f'), '%', 
'\nRainbow: ', format(round(100*dct['kakeraW']/dctsm, 6), '.4f'), '%', sep='')

print('\nThe average value of a kakera broken down from a light kakera is:', format(round(valsm/dctsm, 6), '.4f'))



