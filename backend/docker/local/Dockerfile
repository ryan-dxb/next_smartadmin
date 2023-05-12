# Set the base image to Node.js
ARG NODE_VERSION=16-alpine3.12

FROM node:${NODE_VERSION}

LABEL name="smart-app"
LABEL license="MIT"
LABEL description="Smart APP"

ENV NODE_ENV=development

ARG APP_HOME=/app

WORKDIR ${APP_HOME}

# Run docker as non-root user (user = smartuser and group = smartuser)
RUN addgroup --system smartuser \
    && adduser --system --ingroup smartuser smartuser

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . ${APP_HOME}

# Change ownership of the app directory to the non-root user
COPY --chown=smartuser:smartuser . ${APP_HOME}

# Run docker as non-root user (user = smartuser and group = smartuser) -R for recursive
RUN chown -R smartuser:smartuser ${APP_HOME}

# Switch to non-root user
USER smartuser

EXPOSE 5000

CMD ["npm", "run", "dev"]





