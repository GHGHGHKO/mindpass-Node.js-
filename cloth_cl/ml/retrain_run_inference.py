# -*- coding: utf-8 -*-

"""Inception v3 architecture 모델을 retraining한 모델을 이용해서 이미지에 대한 추론(inference)을 진행하는 예제"""
import sys
import numpy as np
import tensorflow as tf
import json
import pymongo
from bson import json_util
from bson import json_util
from bson import BSON
from PIL import Image

var = sys.argv[1]
imagePath = '/home/sm6336/ml/tmp/' + var                                      # 추론을 진행할 이미지 경로
modelFullPath = '/home/sm6336/ml/tmp/output_graph.pb'                                      # 읽어들일 graph 파일 경로
labelsFullPath = '/home/sm6336/ml/tmp/output_labels.txt'                                   # 읽어들일 labels 파일 경로

translation = {
    'hood'  : '후드',
    'jeans'  : '청바지',
    'loafers'  : '로퍼',
    'mtm'  : '맨투맨',
    'neat'  : '니트',
    'shirt'  : '셔츠',
    'shortpants'  : '반바지',
    'slacks'  : '슬랙스',
    'trackpants'  : '츄리닝',
    'turtleneck'  : '목폴라',
    'windbreaker'  : '바람막이',
    'bluejacket'  : '청자켓',
    'coat'  : '코트',
    'jacket'  : '자켓',
    'karati'  : '카라티',
    'longpadding'  : '롱패딩',
    'mustang'  : '무스탕',
    'runningshoes'  : '러닝화',
    'shortpadding'  : '숏패딩',
    'tracktop'  : '트랙탑',
    'walker'  : '워커',
    'shortsleeve' : '반팔',
    'cardigan' : '가디건',
    'fries' : '후리스',
    'nocturnal' : '야상'
}

def create_graph():
    """저장된(saved) GraphDef 파일로부터 graph를 생성하고 saver를 반환한다."""
    # 저장된(saved) graph_def.pb로부터 graph를 생성한다.
    with tf.gfile.FastGFile(modelFullPath, 'rb') as f:
        graph_def = tf.GraphDef()
        graph_def.ParseFromString(f.read())
        _ = tf.import_graph_def(graph_def, name='')


def run_inference_on_image():
    answer = None
    result = {}

    if not tf.gfile.Exists(imagePath):
        tf.logging.fatal('File does not exist %s', imagePath)
        return answer

    image_data = tf.gfile.FastGFile(imagePath, 'rb').read()

    # 저장된(saved) GraphDef 파일로부터 graph를 생성한다.
    create_graph()

    with tf.Session() as sess:
        softmax_tensor = sess.graph.get_tensor_by_name('final_result:0')
        predictions = sess.run(softmax_tensor,
                               {'DecodeJpeg/contents:0': image_data})
        predictions = np.squeeze(predictions)

        i=0
        result=[]

        top_k = predictions.argsort()[-5:][::-1]  # 가장 높은 확률을 가진 5개(top 5)의 예측값(predictions)을 얻는다.
        f = open(labelsFullPath, 'rb')
        lines = f.readlines()
        labels = [str(w).replace("\n", "") for w in lines]
        for node_id in top_k:
            i=i+1
            human_string = labels[node_id]
            labels[node_id] = labels[node_id][2:-3]
            human_string = human_string[2:-3]
            score = predictions[node_id]
#            print('%s (score = %.5f)' % (human_string, score))
            result.append({"cloth":translation[human_string], "rank":i})

        im = Image.open(imagePath)
        pix = np.array(im)
        width, height = im.size
        x = int(width*(4/10))
        y = int(height/2)
        r, g, b = pix[x,y]

        if r < 60 : r = 'row'
        elif r > 170 : r = 'high'
        else : r = 'mid'

        if g < 60 : g = 'row'
        elif g > 170 : g = 'high'
        else : g = 'mid'

        if b < 60 : b = 'row'
        elif b > 170 : b = 'high'
        else : b = 'mid'

        if r=='high' and g=='high' and b=='high':
            color = '흰색'
        elif r=='mid' and g=='mid' and b=='mid':
            color = '회색'
        elif r=='row' and g=='row' and b=='row':
            color = '검정색'
        elif (r=='high' and g=='mid' and b=='high') or (r=='high' and g=='row' and b=='high'):
            color = '분홍색'
        elif (r=='high' and g=='mid' and b=='row'):
            color = '주황색'
        elif (r=='high' and g=='row' and b=='row') or (r=='high' and g=='mid' and b=='mid') or (r=='mid' and g=='row' and b=='row'):
            color = '빨강색'
        elif (r=='high' and g=='high' and b=='row') or (r=='mid' and g=='mid' and b=='row') or (r=='high' and g=='high' and b=='mid'):
            color = '노랑색'
        elif (r=='row' and g=='mid' and b=='row') or (r=='row' and g=='high' and b=='row') or (r=='mid' and g=='high' and b=='mid') or (r=='mid' and g=='high' and b=='row') or(r=='row' and g=='mid' and b=='high'):
            color = '녹색'
        elif (r=='row' and g=='row' and b=='mid') or (r=='row' and g=='high' and b=='high') or (r=='row' and g=='mid' and b=='mid') or (r=='row' and g=='row' and b=='high') or (r=='mid' and g=='high' and b=='high') or ('mid' and g=='mid' and b=='high') or (r=='row' and g=='high' and b=='mid'):
            color = '파랑색, 남색'
        elif (r=='mid' and g=='row' and b=='high') or (r=='high' and g=='row' and b=='mid') or (r=='mid' and g=='row' and b=='mid'):
            color = '보라색'

        print(json.dumps({"color":color,"result": result},default=json_util.default,ensure_ascii=False))
#        print(json.dumps({"code":200,"result": result},default=json_util.default,ensure_ascii=False))
        answer = labels[top_k[0]]
        sys.stdout.flush()
        #return answer


if __name__ == '__main__':
    run_inference_on_image()

