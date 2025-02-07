'use client'


import React, { useState, useCallback } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link'

const useOpenAPIValidator = () => {
  const validateSchema = useCallback((schema) => {
    try {
      const errors = [];
      
      // Validate OpenAPI version
      if (!schema.openapi?.startsWith('3.0')) {
        errors.push({
          path: 'openapi',
          message: 'OpenAPI version must be 3.0.x'
        });
      }

      // Validate info object
      if (!schema.info) {
        errors.push({
          path: 'info',
          message: 'Missing required info object'
        });
      } else {
        if (!schema.info.title) {
          errors.push({
            path: 'info.title',
            message: 'Missing required title field'
          });
        }
        if (!schema.info.version) {
          errors.push({
            path: 'info.version',
            message: 'Missing required version field'
          });
        }
      }

      // Validate paths object
      if (!schema.paths) {
        errors.push({
          path: 'paths',
          message: 'Missing required paths object'
        });
      } else {
        // Validate path operations
        Object.entries(schema.paths).forEach(([path, pathItem]) => {
          if (typeof pathItem !== 'object') {
            errors.push({
              path: `paths.${path}`,
              message: 'Path item must be an object'
            });
            return;
          }

          // Check for valid HTTP methods
          const validMethods = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head'];
          Object.keys(pathItem).forEach(method => {
            if (!validMethods.includes(method)) {
              errors.push({
                path: `paths.${path}.${method}`,
                message: `Invalid HTTP method: ${method}`
              });
            }
          });
        });
      }

      // Validate components if they exist
      if (schema.components) {
        if (typeof schema.components !== 'object') {
          errors.push({
            path: 'components',
            message: 'Components must be an object'
          });
        } else {
          // Validate schemas in components
          if (schema.components.schemas) {
            Object.entries(schema.components.schemas).forEach(([name, schemaObj]) => {
              if (typeof schemaObj !== 'object') {
                errors.push({
                  path: `components.schemas.${name}`,
                  message: 'Schema must be an object'
                });
              }
            });
          }
        }
      }

      return {
        isValid: errors.length === 0,
        errors
      };
    } catch (error) {
      return {
        isValid: false,
        errors: [{
          path: 'root',
          message: `Schema validation failed: ${error.message}`
        }]
      };
    }
  }, []);

  return { validateSchema };
};

const Alert = ({ children, variant = 'error' }) => {
  const bgColor = variant === 'success' ? 'bg-green-50' : 'bg-red-50';
  const borderColor = variant === 'success' ? 'border-green-200' : 'border-red-200';
  const textColor = variant === 'success' ? 'text-green-800' : 'text-red-800';

  return (
    <div className={`flex items-center p-4 mb-4 border rounded-lg ${bgColor} ${borderColor}`}>
      {variant === 'success' ? (
        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
      ) : (
        <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
      )}
      <div className={`text-sm ${textColor}`}>{children}</div>
    </div>
  );
};

const Card = ({ children }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="px-6 py-4 border-b border-gray-200">
    {children}
  </div>
);

const CardContent = ({ children }) => (
  <div className="p-6">
    {children}
  </div>
);

const Button = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
  >
    {children}
  </button>
);

const OpenAPIValidator = () => {
  const [inputSchema, setInputSchema] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const { validateSchema } = useOpenAPIValidator();

  const handleValidate = useCallback(() => {
    try {
      const schema = JSON.parse(inputSchema);
      const result = validateSchema(schema);
      setValidationResult(result);
    } catch (error) {
      setValidationResult({
        isValid: false,
        errors: [{
          path: 'parse',
          message: 'Invalid JSON format'
        }]
      });
    }
  }, [inputSchema, validateSchema]);

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800">OpenAPI 3.0 Schema Validator</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <textarea
            className="w-full h-64 p-4 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={inputSchema}
            onChange={(e) => setInputSchema(e.target.value)}
            placeholder="Paste your OpenAPI schema here..."
          />
          
          <div className="flex justify-end">
            <Button onClick={handleValidate}>
              Validate Schema
            </Button>
          </div>

          {validationResult && (
            <div className="mt-4">
              {validationResult.isValid ? (
                <>
                  <Alert variant="success">
                    Schema is valid OpenAPI 3.0
                  </Alert>
                  <Link href={`/documentation`} >Go to API Documentation</Link>
                </>
              ) : (
                <div className="space-y-2">
                  {validationResult.errors.map((error, index) => (
                    <Alert key={index}>
                      <span className="font-medium">{error.path}:</span> {error.message}
                    </Alert>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenAPIValidator;