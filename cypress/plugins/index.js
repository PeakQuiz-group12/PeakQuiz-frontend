/* eslint-env node */

module.exports = (on, config) => {
    require('@cypress/code-coverage/task')(on, config);

    // Your existing plugin code...

    // Add or modify any configuration settings
    config.coverageFolder = 'cypress/E2E/files';

    return config;
};
