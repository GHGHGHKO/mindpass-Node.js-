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

#print(okt.phrases(s))

if len(okt.phrases(s))==0:
	print (json.dumps({"code":410,"result": okt.phrases(s), "total": len(okt.phrases(s))},default=json_util.default,ensure_ascii=False))
else:
	print (json.dumps({"code":200,"result": okt.phrases(s), "total": len(okt.phrases(s))},default=json_util.default,ensure_ascii=False))

