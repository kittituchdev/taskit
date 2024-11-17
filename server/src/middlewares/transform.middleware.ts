import { Request, Response, NextFunction } from 'express';
import { camelCase } from 'lodash';


// Middleware to transform all API responses to camelCase
export function transformToCamelCase(req: Request, res: Response, next: NextFunction) {
    const originalSend = res.json;

    res.json = function (data: any) {
        if (data && typeof data === 'object') {
            // Transform response data to camelCase
            const camelCasedData = toCamelCase(data);
            return originalSend.call(this, camelCasedData);
        }

        // For non-object data, send as-is
        return originalSend.call(this, data);
    };

    next();
}




// Recursive function to transform object keys to camelCase
function toCamelCase(obj: any): any {
    if (Array.isArray(obj)) {
        const result: any[] = [];
        for (let i = 0; i < obj.length; i++) {
            result.push(toCamelCase(obj[i])); // Recursively apply toCamelCase on each element
        }
        return result;
    } else if (obj !== null && obj.constructor === Object) {
        const newObj: any = {};
        for (const [key, value] of Object.entries(obj)) {
            newObj[camelCase(key)] = toCamelCase(value); // Recursively process values
        }
        return newObj;
    }
    return obj; // Return primitive values as-is
}

