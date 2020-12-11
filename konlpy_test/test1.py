from konlpy.tag import Okt
from bson import json_util
from bson import json_util
from bson import BSON
import sys
import json

s = ""

for arg in sys.argv[1:]:
  s += arg + " "

okt = Okt()

#okt.morphs     #형태소 분석
#okt.nouns      #명사 분석
#okt.phrases    #구(Phrase) 분석
#okt.pos        #형태소 분석 태깅

#print(okt.nouns(u'롯데마트에서 치킨사기'))

test = []
result = []
noun = []
test = okt.pos(s)
num = 0
temp = None
place_Check = 0

for i in test:
	if ((i[0] == '에서' and i[1] == 'Josa') or
	(i[0] == '에' and i[1] == 'Josa') or
	(i[0] == '갔다가' and i[1] == 'Verb') or
	(i[0] == '가기' and i[1] == 'Noun') or
	(i[0] == '가서' and i[1] == 'Verb') or
	(i[0] == '들르기' and i[1] == 'Verb') or
	(i[0] == '들렀다가' and i[1] == 'Verb') or
	(i[0] == '들러' and i[1] == 'Verb') or
	(i[0] == '들러서' and i[1] == 'Verb')):
		if place_Check == 0 :
			result.append(test[temp:num])
			place_Check = 1
			temp = None
		else :
			place_Check = 0
	elif (i[1] == 'Noun') and temp == None:
		temp = num
		place_Check = 0
	elif (i[1] == 'Noun') and temp != None:
		num = num
		place_Check = 0
	else:
		none = test[temp:num]
		temp = None
		place_Check = 0

	num = num + 1


print(result)
print(test)

#print (json.dumps({"code":200,"result": okt.phrases(s), "total": len(okt.phrases(s))},default=json_util.default,ensure_ascii=False))
