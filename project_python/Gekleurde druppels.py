class Rooster:
    def __init__(self, k, kleuren):
        self.rooster = []
        self.druppeltegel = None
        for i in range(0, int(len(kleuren)/k)):
            rij = kleuren[i*k:(i+1)*k]
            rijlijst = []
            for j in range(0, len(rij)):
                rijlijst.append(Druppeltegel(rij[j].lower()))
                if rij[j] == '*':
                    self.druppeltegel = (i, j)
            self.rooster.append(rijlijst)

        #set de buren
        h = int(len(self.rooster))
        b = int(len(self.rooster[0]))
        for r in range(0, h):
            for c in range(0, b):
                buren = []
                if c > 0:
                    buren.append(self.rooster[r][c-1])
                if c < b-1:
                    buren.append(self.rooster[r][c+1])
                if r > 0:
                    buren.append(self.rooster[r-1][c])
                if r < h-1:
                    buren.append(self.rooster[r+1][c])

                self.rooster[r][c].setBuren(buren)

    def __str__(self):
        ret = ''
        l = int(len(self.rooster))
        h = int(len(self.rooster[0]))
        for r in range(0, l):
            for k in range(0, h):
                ret += str(self.rooster[r][k]) + ' '
            ret = ret.rstrip(' ')
            ret += '\n'

        return ret.rstrip('\n')

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
