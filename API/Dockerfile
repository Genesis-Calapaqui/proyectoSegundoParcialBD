FROM node:17-alpine

WORKDIR /app

# Copiar primero solo los archivos de dependencias
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]