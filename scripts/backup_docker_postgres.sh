#!/bin/bash

# Configura estas variables
CONTAINER_NAME="lunatv-postgres"
BACKUP_DIR_CONTAINER="/home"  # Ajusta según la ubicación de tu base de datos en el contenedor
BACKUP_DIR_LOCAL="/home/admin/backups/"
USER=""
DATABASE=""

# Crear el directorio de backups si no existe (en el contenedor)
docker exec -it "$CONTAINER_NAME" mkdir -p "$BACKUP_DIR_CONTAINER"

# Generar el nombre del archivo de respaldo
BACKUP_FILE="backup_postgres17_$(date +%Y_%m_%d_%H%M%S).sql"

# Ejecutar pg_dump dentro del contenedor y guardar el archivo en el volumen
docker exec -it "$CONTAINER_NAME" pg_dump -U "$USER" -d "$DATABASE" -f "$BACKUP_DIR_CONTAINER/$BACKUP_FILE"

# Copiar el archivo del contenedor a tu máquina local
docker cp "$CONTAINER_NAME:$BACKUP_DIR_CONTAINER/$BACKUP_FILE" "$BACKUP_DIR_LOCAL"
