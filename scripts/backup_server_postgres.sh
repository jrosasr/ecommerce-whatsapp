#!/bin/bash

# Configura estas variables
BACKUP_DIR_LOCAL="/home/jrosasr/backups/"
USER=""
DATABASE=""

# Generar el nombre del archivo de respaldo
BACKUP_FILE="backup_postgres17_$(date +%Y_%m_%d_%H%M%S).sql"

# Ejecutar pg_dump directamente en el servidor y guardar el archivo
pg_dump -U "$USER" -d "$DATABASE" -f "$BACKUP_DIR_LOCAL/$BACKUP_FILE"