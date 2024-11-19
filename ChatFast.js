// ==UserScript==
// @name         ChatFast
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Intercepts completion requests and inject {model: gpt-4o-mini} into the request
// @match        https://chatgpt.com/*
// @grant        none
// @author       d0gkiller87
// @license      MIT
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
  
    // Store the original fetch function
    const originalFetch = window.fetch;
  
    // Override the fetch function
    window.fetch = async (resource, config = {}) => {
      // Check if the config has a JSON body in a POST request
      if (
        resource.includes('/backend-api/conversation') &&
        config.method === 'POST' &&
        config.headers &&
        config.headers['Content-Type'] === 'application/json' &&
        config.body
      ) {
        try {
          // Parse the JSON body
          const body = JSON.parse(config.body);
  
          // Inject or modify the model field
          body.model = 'gpt-4o-mini';
  
          // Update the config body with the modified JSON
          config.body = JSON.stringify(body);
        } catch (error) {
          console.error('Failed to modify the request body:', error);
        }
      }
  
      // Call the original fetch with modified config
      return originalFetch(resource, config);
    };
  })();
  