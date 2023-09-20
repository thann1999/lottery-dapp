
FROM node:16.17-alpine

ARG VITE_REACT_APP_BASE_NAME
ARG VITE_REACT_APP_BASE_API_URL

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV TZ=Asia/Ho_Chi_Minh
RUN npm run build
RUN npm install -g serve
CMD serve -s dist
EXPOSE 3000
