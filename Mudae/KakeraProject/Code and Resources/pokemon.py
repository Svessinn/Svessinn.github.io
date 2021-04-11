#!/usr/bin/env python3

#==============================================#
#         Created By: Svess#8004               #
#  Last Modification:  2021-03-09 23:49 UTC+0  #
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

sm = 0 # Counter for the number of $p commands
shinySum = 0
raritySum = [0, 0, 0, 0, 0, 0]
shinyRaritySum = [0, 0, 0, 0, 0, 0]
# IDs of the Mudae Bots that counld be used
# You can add more if you have a different 
# Maid/Butler in the server your data is from
MudaDict = {
"Mudae":"Mudae#0807",
"Mudamaid2":"Mudamaid2#2147",
"Mudamaid39":"Mudamaid 39#0819"
}

# Runs through all the desired files
for File in files:
  searchfile = open(File, "r") # Opening the next File, read only
  lastLines = ['', '', '', '', '', '', '', '', '', '', ''] # Initialising a last line to be able to find the reactions later

  # Reads through each line
  for line in searchfile:
    # Checkin if a Message by your specific MudaBOT is a response to a kakeraL reaction
    if '$p' == lastLines[0].strip() and (MudaDict["Mudae"] in lastLines[3] or MudaDict["Mudamaid2"] in lastLines[3] or MudaDict["Mudamaid39"] in lastLines[3]) and ('🔔' in lastLines[4] or '❌' in lastLines[4] or ':shinySparkles:' in lastLines[4]):
      sm+=1 # Adds to the pokmon counter
      if '❌' not in lastLines[4]:
        raritySum[0] += 1
        if ':shinySparkles:' in lastLines[4]:
          shinyRaritySum[0] += 1
          shinySum += 1
      if '❌' not in lastLines[5]:
        raritySum[1] += 1
        if ':shinySparkles:' in lastLines[5]:
          shinyRaritySum[1] += 1
          shinySum += 1
      if '❌' not in lastLines[6]:
        raritySum[2] += 1
        if ':shinySparkles:' in lastLines[6]:
          shinyRaritySum[2] += 1
          shinySum += 1
      if '❌' not in lastLines[7]:
        raritySum[3] += 1
        if ':shinySparkles:' in lastLines[7]:
          shinyRaritySum[3] += 1
          shinySum += 1
      if '❌' not in lastLines[8]:
        raritySum[4] += 1
        if ':shinySparkles:' in lastLines[8]:
          shinyRaritySum[4] += 1
          shinySum += 1
      if ':wormholebell:' in lastLines[9]:
        raritySum[5] += 1
        if ':shinySparkles:' in lastLines[9]:
          shinyRaritySum[5] += 1
          shinySum += 1

    lastLines = lastLines[1::]
    lastLines.append(line)

  searchfile.close() # Closing the read File so it's ready for the next one


print('From a Total of', sm, 'Pokéslots rolls')
print('Common Pokémon: ', format(round(100*(raritySum[0]/sm), 6), '.4f'), '% - ', raritySum[0], ' Total, of which ', shinyRaritySum[0], ' shiny',
'\nUncommon Pokémon: ', format(round(100*(raritySum[1]/sm), 6), '.4f'), '% - ', raritySum[1], ' Total, of which ', shinyRaritySum[1], ' shiny',
'\nRare Pokémon: ', format(round(100*(raritySum[2]/sm), 6), '.4f'), '% - ', raritySum[2], ' Total, of which ', shinyRaritySum[2], ' shiny',
'\nVery Rare Pokémon: ', format(round(100*(raritySum[3]/sm), 6), '.4f'), '% - ', raritySum[3], ' Total, of which ', shinyRaritySum[3], ' shiny',
'\nLegendary Pokémon: ', format(round(100*(raritySum[4]/sm), 6), '.4f'), '% - ', raritySum[4], ' Total, of which ', shinyRaritySum[4], ' shiny',
'\nUltra Beast Pokémon: ', format(round(100*(raritySum[5]/sm), 6), '.4f'), '% - ', raritySum[5], ' Total, of which ', shinyRaritySum[5], ' shiny', sep='')

