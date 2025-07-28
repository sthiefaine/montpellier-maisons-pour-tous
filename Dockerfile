# Use Node.js 22 (latest LTS) - same as Vercel
FROM node:22-alpine

# Install system dependencies for canvas
RUN apk add --no-cache \
    build-base \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    musl-dev \
    giflib-dev \
    pixman-dev \
    pangomm-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    pkgconfig

# Verify Node.js version
RUN node --version && npm --version

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies with npm (like Vercel)
RUN npm install

# Copy source code
COPY . .

# Ensure the PDF file is accessible
RUN ls -la public/MPT-Fiche-inscription-MPT.pdf || echo "PDF file not found"

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]