#!/usr/bin/env python3

# start code
import random
import cgi
parameters = cgi.FieldStorage()
colors = {"r": "red", "g": "green", "o": "orange", "b": "blue", "p": "purple"}


def writetofile(size, roosterstring, json):
    myfile = open('kleuren.txt', 'w')
    myfile.write("{}\n".format(size))
    myfile.write("{}\n".format(roosterstring))
    myfile.write("{}\n".format(" ".join(json['moves'])))
    myfile.write(str(json['score']))
    myfile.close()


def makeboard(roosterstring, size):
    board = []
    for i in range(0, size):
        row = []
        for j in range(0, size):
            try:
                row.append(colors[roosterstring[i*size+j].lower()])
            except KeyError:
                row.append("darkgoldenrod")
        board.append(row)

    return board


def new_game(size=5):
    if parameters.getvalue('size'):
        size = int(parameters.getvalue('size'))

    stat = {}
    roosterstring = "*"
    for i in range(1, size**2):
        roosterstring += random.choice(list(colors.keys()))

    stat['board'] = makeboard(roosterstring, size)
    stat['moves'] = []
    stat['score'] = 0
    stat['message'] = ''

    writetofile(size, roosterstring, stat)

    return stat


def do_move(status, zet, index):
    kleur = zet.upper()
    stat = {}

    # aanmaken van het rooster
    myfile = open('kleuren.txt', 'r')
    allvalues = myfile.readlines()
    size = int(allvalues[0].rstrip('\n'))
    roosterstring = allvalues[1].rstrip('\n')
    moves = allvalues[2].rstrip('\n')
    if not moves:
        moves = []
    else:
        moves = moves.split(' ')
    moves.append(colors[zet])
    score = int(allvalues[3])
    myfile.close()

    spelbord = Rooster(size, roosterstring)
    spelbord.druppel(kleur)

    stat['board'] = makeboard(str(spelbord), size)
    stat['score'] = score + 1
    stat['moves'] = moves
    if spelbord.gewonnen(kleur):
        stat['message'] = "Proficiat! U won dit spel in {} stappen.".format(stat['score'])
    else:
        stat['message'] = ''

    writetofile(size, str(spelbord), stat)
    return stat


# klasse rooster
class Rooster:
    def __init__(self, k, kleuren):
        self.rooster = []
        self.druppeltegel = None
        for i in range(0, int(len(kleuren) / k)):
            rij = kleuren[i * k:(i + 1) * k]
            rijlijst = []
            for j in range(0, len(rij)):
                rijlijst.append(Druppeltegel(rij[j]))
                if rij[j] == '*':
                    self.druppeltegel = (i, j)
            self.rooster.append(rijlijst)

        # set de buren
        h = int(len(self.rooster))
        b = int(len(self.rooster[0]))
        for r in range(0, h):
            for c in range(0, b):
                buren = []
                if c > 0:
                    buren.append(self.rooster[r][c - 1])
                if c < b - 1:
                    buren.append(self.rooster[r][c + 1])
                if r > 0:
                    buren.append(self.rooster[r - 1][c])
                if r < h - 1:
                    buren.append(self.rooster[r + 1][c])

                self.rooster[r][c].setBuren(buren)

    def __str__(self):
        ret = ''
        l = int(len(self.rooster))
        h = int(len(self.rooster[0]))
        for r in range(0, l):
            for k in range(0, h):
                ret += str(self.rooster[r][k])

        return ret

    def druppel(self, kleur):
        d = self.rooster[self.druppeltegel[0]][self.druppeltegel[1]]
        d.drup(kleur)

        return self

    def druppels(self, druppels):
        for kleur in druppels:
            self.druppel(kleur)

        return self

    def gewonnen(self, kleur):
        l = int(len(self.rooster))
        h = int(len(self.rooster[0]))
        for r in range(0, l):
            for k in range(0, h):
                if self.rooster[r][k].kleur.isalpha() and self.rooster[r][k].kleur.lower() != kleur.lower():
                    return False

        return True


class Druppeltegel:
    def __init__(self, kleur):
        self.buren = None
        self.kleur = kleur

    def setBuren(self, buren):
        self.buren = buren

    def drup(self, kleur):
        for tegel in self.buren:
            if (tegel.kleur.islower() and tegel.kleur == kleur.lower()) \
                    or (tegel.kleur.isupper() and tegel.kleur != kleur.upper()):
                tegel.kleur = kleur.upper()
                tegel.drup(kleur)

    def __str__(self):
        return self.kleur


# return the correct response
print("Content-Type: application/json")
print("Accept: application/json")
print("Access-Control-Allow-Origin: *")
print()

import json
method = parameters.getvalue('met')
if method == 'g':
    print(json.dumps(new_game()))
elif method == 'm':
    zet = parameters.getvalue('zet')
    print(json.dumps(do_move(None, zet, None)))
