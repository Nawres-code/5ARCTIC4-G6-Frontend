# Use an official Node.js runtime as a parent image
FROM node:14 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN npm run build --configuration=production

# Use an official Nginx image to serve the application
FROM nginx:alpine

# Copy the built Angular files from the correct directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
