#!/bin/bash
set -e

# SSH için gerekli dizini oluştur
mkdir -p /run/sshd

# SSH şifresini ayarla (hata olsa bile devam et)
echo "${SSH_PASSWD:-root:Docker!}" | chpasswd || true

# SSH daemon'u başlat
service ssh start || echo "SSH başlatılamadı, devam ediliyor..."

# Node.js uygulamasını başlat
cd /code
exec node index.js