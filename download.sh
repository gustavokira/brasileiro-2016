#!/bin/bash

URL=https://esporte.uol.com.br/futebol/campeonatos/brasileirao/jogos/
wget -qO- $URL | python parser.py > brasileiro-2016.json
