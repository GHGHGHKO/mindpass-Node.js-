import pymysql
import json
import pymongo
from bson import json_util
from bson import json_util
from bson import BSON
import sys

conn = pymysql.connect(host='localhost', user='root', password='1q2w3e4r', db='test', charset='utf8', )

clothes_curs = conn.cursor(pymysql.cursors.DictCursor)
classification_curs = conn.cursor(pymysql.cursors.DictCursor)
color_curs = conn.cursor(pymysql.cursors.DictCursor)

top = []
pants = []
shoes = []
bag = []
coat = []
result = []
clothes_hash_top = {}
clothes_hash_pants = {}
clothes_hash_shoes = {}
clothes_hash_bag = {}
clothes_hash_coat = {}
empty_arr = ["-","-","-"]

# ==== select example ====
clothes_sql = "select top, pants, shoes, bag, coat from clothes"
classification_sql = "select color, cloth, cloth_big, image from " + sys.argv[1]
#classification_sql = "select color, cloth, cloth_big from admin"
color_sql = "select * from color"

clothes_curs.execute(clothes_sql)
classification_curs.execute(classification_sql)
color_curs.execute(color_sql)

clothes_rows = clothes_curs.fetchall()
classification_rows = classification_curs.fetchall()
color_rows = color_curs.fetchall()

for i in classification_rows:
    if i['cloth_big'] == 'top':
        clothes_hash_top[i['cloth']] = [i['color'], i['image']]
    elif i['cloth_big'] == 'pants':
        clothes_hash_pants[i['cloth']] = i['color']
    elif i['cloth_big'] == 'shoes':
        clothes_hash_shoes[i['cloth']] = i['color']
    elif i['cloth_big'] == 'bag':
        clothes_hash_bag[i['cloth']] = i['color']
    elif i['cloth_big'] == 'coat':
        clothes_hash_coat[i['cloth']] = i['color']
        
#print ('=' * 25)
#print ('색상')
#print ('=' * 25)
#for i in color_rows:
#    print (i)
#
#print ('=' * 25)
#print ('가지고 있는 옷')
#print ('=' * 25)
#for i in classification_rows:
#    print (i)
#    
#print ('=' * 25)
#print ('가이드')
#print ('=' * 25)
#for i in clothes_rows:
#    print (i)
#print ('=' * 25)
#
#print ('=' * 25)
#print ('가지고 있는 옷 분류')
#print ('=' * 25)
print ('상의 :', clothes_hash_top)
print ('바지 :', clothes_hash_pants)
#print ('신발 :', clothes_hash_shoes)
#print ('가방 :', clothes_hash_bag)
#print ('겉옷 :', clothes_hash_coat)
#print ('=' * 25)

for top_list in clothes_hash_top.items():
    for pants_list in clothes_hash_pants.items():
        for clothes_list in clothes_rows:
            for color_list in color_rows:
                
                # ==== 상의, 하의 ====
                if (top_list[0] == clothes_list['top']) and (pants_list[0] == clothes_list['pants']):
                    if (top_list[1] == color_list['color1']) and (pants_list[1] == color_list['color2']):
                        #print (top_list, pants_list)
                        #result.append({'connected_clothes' : [top_list, pants_list]})
                        result.append({"top":top_list, "pants":pants_list,"shoes":empty_arr, "bag":empty_arr, "coat":empty_arr})
                    
                # ==== 상의, 하의, 신발 ====
                for shoes_list in clothes_hash_shoes.items():
                    if (top_list[0] == clothes_list['top']) and (pants_list[0] == clothes_list['pants']) and (shoes_list[0] == clothes_list['shoes']):
                        if (top_list[1] == color_list['color1']) and (pants_list[1] == color_list['color2']):
                            #print (top_list, pants_list)
                            #result.append({'connected_clothes' : [top_list, pants_list, shoes_list]})
                            result.append({"top":top_list, "pants":pants_list,"shoes":shoes_list, "bag":empty_arr, "coat":empty_arr})
                            
                    # ==== 상의, 하의, 신발 가방 ====
                    for bag_list in clothes_hash_bag.items():
                        if (top_list[0] == clothes_list['top']) and (pants_list[0] == clothes_list['pants']) and (shoes_list[0] == clothes_list['shoes']) and (bag_list[0] == clothes_list['bag']):
                            if (top_list[1] == color_list['color1']) and (pants_list[1] == color_list['color2']):
                                #print (top_list, pants_list)
                                #esult.append({'connected_clothes' : [top_list, pants_list, shoes_list, bag_list]})
                                result.append({"top":top_list, "pants":pants_list,"shoes":shoes_list, "bag":bag_list, "coat":empty_arr})
                        
                # ==== 상의, 하의, 가방 ====
                for bag_list in clothes_hash_bag.items():
                    if (top_list[0] == clothes_list['top']) and (pants_list[0] == clothes_list['pants']) and (bag_list[0] == clothes_list['bag']):
                        if (top_list[1] == color_list['color1']) and (pants_list[1] == color_list['color2']):
                            #print (top_list, pants_list)
                            #esult.append({'connected_clothes' : [top_list, pants_list, bag_list]})
                            result.append({"top":top_list, "pants":pants_list,"shoes":empty_arr, "bag":bag_list, "coat":empty_arr})
                    
                    # ==== 상의, 하의, 가방, 코트 ====
                    for coat_list in clothes_hash_coat.items():
                        if (top_list[0] == clothes_list['top']) and (pants_list[0] == clothes_list['pants']) and (bag_list[0] == clothes_list['bag']) and (coat_list[0] == clothes_list['coat']):
                            if (top_list[1] == color_list['color1']) and (pants_list[1] == color_list['color2']):
                                #print (top_list, pants_list)
                                #result.append({'connected_clothes' : [top_list, pants_list, bag_list, coat_list]})
                                result.append({"top":top_list, "pants":pants_list,"shoes":empty_arr, "bag":bag_list, "coat":coat_list})
                        
                # ==== 상의, 하의, 코트 ====
                for coat_list in clothes_hash_coat.items():
                    if (top_list[0] == clothes_list['top']) and (pants_list[0] == clothes_list['pants']) and (coat_list[0] == clothes_list['coat']):
                        #if (top_list[1] == color_list['color1']) and (pants_list[1] == color_list['color2']):
                        if (top_list[1] == color_list['color1']) and (pants_list[1] == color_list['color2']) and (coat_list[1] == color_list['color3']):
                            #print (top_list, pants_list)
                            #result.append({'connected_clothes' : [top_list, pants_list, coat_list]})
                            result.append({"top":top_list, "pants":pants_list,"shoes":empty_arr, "bag":empty_arr, "coat":coat_list})
                    
                    # ==== 상의, 하의, 신발, 코트 ====
                    for shoes_list in clothes_hash_shoes.items():
                        if (top_list[0] == clothes_list['top']) and (pants_list[0] == clothes_list['pants']) and (shoes_list[0] == clothes_list['shoes']) and (coat_list[0] == clothes_list['coat']):
                            if (top_list[1] == color_list['color1']) and (pants_list[1] == color_list['color2']):
                                #print (top_list, pants_list)
                                #result.append({'connected_clothes' : [top_list, pants_list, shoes_list, coat_list]})
                                result.append({"top":top_list, "pants":pants_list,"shoes":shoes_list, "bag":empty_arr, "coat":coat_list})
                        
                        # ==== 상의, 하의, 신발, 가방, 코트 ====
                        for bag_list in clothes_hash_bag.items():
                            if (top_list[0] == clothes_list['top']) and (pants_list[0] == clothes_list['pants']) and (shoes_list[0] == clothes_list['shoes']) and (bag_list[0] == clothes_list['bag']) and (coat_list[0] == clothes_list['coat']):
                                if (top_list[1] == color_list['color1']) and (pants_list[1] == color_list['color2']):
                                    #print (top_list, pants_list)
                                    #result.append({'connected_clothes' : [top_list, pants_list, shoes_list, bag_list, coat_list]})
                                    result.append({"top":top_list, "pants":pants_list,"shoes":shoes_list, "bag":bag_list, "coat":coat_list})
                            
if result == []:
    result.append({"top":empty_arr, "pants":empty_arr,"shoes":empty_arr, "bag":empty_arr, "coat":empty_arr})
                            
print (json.dumps({"code":200,"result": result},default=json_util.default,ensure_ascii=False))
