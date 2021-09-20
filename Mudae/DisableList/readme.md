# I've decided to take on the challenge of getting all of the bundle overlaps
## I know that this is a crazy task and will take a long time 
## So if you'd like to help with this challenge you can use the code provided in the DisableList directory and run it
### The input.wip file gets filled with the data entered to the program by the user, this data is the number of disabled chatacters from each distinct pair of bundles
### The finished.in file is just a text file containing the finished input which I copy from input.wip after I stop the code's execution 
### The Bundles.json file gets updated with the new data that the user enters when prompted with a "Bundle needs Updating" pop-up while running the code
### The BundleBackup.json file if just a file that I copy the Bundles.json file to after I stop the code, so IF I make some huge messup I have a backup file
### The _overlap.json file keeps track of all the bundle pairs that have an overlap
### The _parent.json file keeps track of any bundles that are parent bundles to smaller bundles
### The _updated.json file keeps track of all indexes that have been updated
### The _updatedBundles.json file keeps the names of the updated bundles