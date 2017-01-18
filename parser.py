# -*- coding: utf-8 -*-

import sys
import operator
from bs4 import BeautifulSoup
import json

abbrs = ['CHA', 'CTB', 'COR', 'SAN', 'CRU', 'INT', 'BOT', 'CAP', 'SPT', 'VIT', 'AMG', 'PON', 'GRE', 'FIG', 'CAM', 'FLU', 'FLA', 'SPA', 'PAL', 'STA']

pontos = {u'CHA': 0, u'CTB': 0, u'COR': 0, u'SAN': 0, u'CRU': 0, u'INT': 0, u'BOT': 0, u'CAP': 0, u'SPT': 0, u'VIT': 0, u'AMG': 0, u'PON': 0, u'GRE': 0, u'FIG': 0, u'CAM': 0, u'FLU': 0, u'FLA': 0, u'SPA': 0, u'PAL': 0, u'STA': 0}
golsContra = {u'CHA': 0, u'CTB': 0, u'COR': 0, u'SAN': 0, u'CRU': 0, u'INT': 0, u'BOT': 0, u'CAP': 0, u'SPT': 0, u'VIT': 0, u'AMG': 0, u'PON': 0, u'GRE': 0, u'FIG': 0, u'CAM': 0, u'FLU': 0, u'FLA': 0, u'SPA': 0, u'PAL': 0, u'STA': 0}
golsPro = {u'CHA': 0, u'CTB': 0, u'COR': 0, u'SAN': 0, u'CRU': 0, u'INT': 0, u'BOT': 0, u'CAP': 0, u'SPT': 0, u'VIT': 0, u'AMG': 0, u'PON': 0, u'GRE': 0, u'FIG': 0, u'CAM': 0, u'FLU': 0, u'FLA': 0, u'SPA': 0, u'PAL': 0, u'STA': 0}
golsSaldo = {u'CHA': 0, u'CTB': 0, u'COR': 0, u'SAN': 0, u'CRU': 0, u'INT': 0, u'BOT': 0, u'CAP': 0, u'SPT': 0, u'VIT': 0, u'AMG': 0, u'PON': 0, u'GRE': 0, u'FIG': 0, u'CAM': 0, u'FLU': 0, u'FLA': 0, u'SPA': 0, u'PAL': 0, u'STA': 0}
empates = {u'CHA': 0, u'CTB': 0, u'COR': 0, u'SAN': 0, u'CRU': 0, u'INT': 0, u'BOT': 0, u'CAP': 0, u'SPT': 0, u'VIT': 0, u'AMG': 0, u'PON': 0, u'GRE': 0, u'FIG': 0, u'CAM': 0, u'FLU': 0, u'FLA': 0, u'SPA': 0, u'PAL': 0, u'STA': 0}
vitorias = {u'CHA': 0, u'CTB': 0, u'COR': 0, u'SAN': 0, u'CRU': 0, u'INT': 0, u'BOT': 0, u'CAP': 0, u'SPT': 0, u'VIT': 0, u'AMG': 0, u'PON': 0, u'GRE': 0, u'FIG': 0, u'CAM': 0, u'FLU': 0, u'FLA': 0, u'SPA': 0, u'PAL': 0, u'STA': 0}
derrotas = {u'CHA': 0, u'CTB': 0, u'COR': 0, u'SAN': 0, u'CRU': 0, u'INT': 0, u'BOT': 0, u'CAP': 0, u'SPT': 0, u'VIT': 0, u'AMG': 0, u'PON': 0, u'GRE': 0, u'FIG': 0, u'CAM': 0, u'FLU': 0, u'FLA': 0, u'SPA': 0, u'PAL': 0, u'STA': 0}
jogosQty = {u'CHA': 0, u'CTB': 0, u'COR': 0, u'SAN': 0, u'CRU': 0, u'INT': 0, u'BOT': 0, u'CAP': 0, u'SPT': 0, u'VIT': 0, u'AMG': 0, u'PON': 0, u'GRE': 0, u'FIG': 0, u'CAM': 0, u'FLU': 0, u'FLA': 0, u'SPA': 0, u'PAL': 0, u'STA': 0}
posicao = {u'CHA': 0, u'CTB': 0, u'COR': 0, u'SAN': 0, u'CRU': 0, u'INT': 0, u'BOT': 0, u'CAP': 0, u'SPT': 0, u'VIT': 0, u'AMG': 0, u'PON': 0, u'GRE': 0, u'FIG': 0, u'CAM': 0, u'FLU': 0, u'FLA': 0, u'SPA': 0, u'PAL': 0, u'STA': 0}

tabela = {}
jogos = {}

data = ""
for line in sys.stdin:
    data += line
soup = BeautifulSoup(data, 'html.parser')

lis = soup.find('ol',class_='confrontos').findAll('li')

for li in lis:
	rodada = li.find('h3').find(text=True).replace('Rodada','').strip()
	r = int(rodada)
	jogos[r] = []
	articles = li.findAll('article')
	for article in articles:
		partida = article.find('div',class_='partida')
		
		date = article.find('time')['datetime']

		time1 = partida.find('div',class_='time1')
		gols1 = time1.find('label',class_='gols').find(text=True)
		
		if(gols1 == None):
			gols1 = '-1'
		abbr1 = time1.find('abbr').find(text=True)
		name1 = time1.find('abbr')['title']

		time2 = partida.find('div',class_='time2')
		gols2 = time2.find('label',class_='gols').find(text=True)
		
		if(gols2 == None):
			gols2 = '-1'
		abbr2 = time2.find('abbr').find(text=True)
		name2 = time2.find('abbr')['title']	 

		jogo = {}
		jogo['date'] = date
		jogo['time1'] = {}
		jogo['time1']['abbr'] = abbr1
		jogo['time1']['gols'] = int(gols1)

		jogo['time2'] = {}
		jogo['time2']['abbr'] = abbr2
		jogo['time2']['gols'] = int(gols2)
		jogos[r].append(jogo)

		if gols1 != '-1' and gols2 != '-1':

			jogosQty[abbr1] = jogosQty[abbr1]+1
			jogosQty[abbr2] = jogosQty[abbr2]+1

			g1 = int(gols1)
			g2 = int(gols2)

			golsPro[abbr1] = golsPro[abbr1]+g1
			golsPro[abbr2] = golsPro[abbr2]+g2

			golsContra[abbr1] = golsContra[abbr1]+g2
			golsContra[abbr2] = golsContra[abbr2]+g1

			golsSaldo[abbr1] = golsSaldo[abbr1]+(g1-g2)
			golsSaldo[abbr2] = golsSaldo[abbr2]+(g2-g1)

			if g1 > g2:
				pontos[abbr1] = pontos[abbr1]+3
				vitorias[abbr1] = vitorias[abbr1]+1
				derrotas[abbr2] = derrotas[abbr2]+1

			elif g1 < g2:
				pontos[abbr2] = pontos[abbr2]+3
				vitorias[abbr2] = vitorias[abbr2]+1
				derrotas[abbr1] = derrotas[abbr1]+1
			else:
				pontos[abbr1] = pontos[abbr1]+1
				pontos[abbr2] = pontos[abbr2]+1
				empates[abbr1] = empates[abbr1]+1
				empates[abbr2] = empates[abbr2]+1
	
	for a in abbrs:
		posicao[a] = (pontos[a]*100000) + (vitorias[a]*10000) + (golsSaldo[a]*1000) + golsPro[a]
	
	posicaoOrdenado = sorted([(value,key) for (key,value) in posicao.items()],reverse=True)
	
	i = 1
	for p in posicaoOrdenado:
		posicao[p[1]] = i
		i = i+1

	tabela[r] = {}
	for a in abbrs:
		 tabela[r][a] = {}
		 tabela[r][a]['rodada'] = r
		 tabela[r][a]['time'] = a
		 tabela[r][a]['pontos'] = pontos[a]
		 tabela[r][a]['vitorias'] = vitorias[a]
		 tabela[r][a]['empates'] = empates[a]
		 tabela[r][a]['derrotas'] = derrotas[a]
		 tabela[r][a]['golsPro'] = golsPro[a]
		 tabela[r][a]['golsContra'] = golsContra[a]
		 tabela[r][a]['golsSaldo'] = golsSaldo[a]
		 tabela[r][a]['jogos'] = jogosQty[a]
		 tabela[r][a]['posicao'] = posicao[a]

		 for j in jogos[r]:
		 	if a == j['time1']['abbr'] or a == j['time2']['abbr']:
		 		
		 		tabela[r][a]['jogo'] = {}
		 		me = ''
		 		opp = ''
		 		if a == j['time1']['abbr']:
		 			tabela[r][a]['jogo']['opp'] = j['time2']['abbr']
		 			me = 'time1'
		 			opp = 'time2'
		 		if a == j['time2']['abbr']:
		 			tabela[r][a]['jogo']['opp'] = j['time1']['abbr']
		 			me = 'time2'
		 			opp = 'time1'

		 		if j[me]['gols'] != -1:
		 			if j[me]['gols'] > j[opp]['gols']:
		 				tabela[r][a]['jogo']['pontos'] = 3
		 			elif j[me]['gols'] < j[opp]['gols']:
		 				tabela[r][a]['jogo']['pontos'] = 0
		 			else:
		 				tabela[r][a]['jogo']['pontos'] = 1
		 		else:
		 			tabela[r][a]['jogo']['pontos'] = -1


		 		


obj = {}
obj['tabela'] = tabela
obj['jogos'] = jogos

print json.dumps(obj,indent=4)