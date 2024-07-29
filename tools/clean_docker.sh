#!/bin/bash

echo "Parando todos os contêineres em execução..."

# Para todos os contêineres em execução
docker stop $(docker ps -q)

echo "Desabilitando políticas de reinício para todos os contêineres..."

# Desabilita as políticas de reinício para garantir que os contêineres não reiniciem
docker update --restart=no $(docker ps -a -q)

echo "Removendo todos os contêineres..."

# Remove todos os contêineres, incluindo os parados
docker rm $(docker ps -a -q)

echo "Removendo todos os contêineres parados, imagens não utilizadas, volumes e redes..."

# Remove todos os contêineres, imagens, volumes e redes não utilizados
docker system prune -a --volumes -f

echo "Todos os contêineres foram removidos com sucesso."
