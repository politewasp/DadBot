### txt_to_json.py ###
## converts text file to array of each line in a json format.##

import json

# First, get all needed data in an array.
filein = open('txtin.txt', 'r')
data = filein.readlines()
filein.close()

reg = 0
for line in data:
    data[reg] = json.dumps(line)
    reg += 1

reg = 0
for line in data:
    data[reg] = line[0:(len(line)-3)] + '"'
    reg += 1

reg = 0

# Now, open the output file and write the data in the needed json format.

fileout = open('txtout.txt', 'w')

fileout.write("{\n")
fileout.write('"joke": [\n')

reg = 0
for line in data:
    if reg + 1 == len(data):
        fileout.write("\t" + line + "\n")
    else:
        fileout.write("\t" + line + "," + "\n")
    reg += 1

fileout.write("]\n")
fileout.write("}\n")

fileout.close()
