// parseAndDispatchFile.js

import { addAddress } from "../../Utils/Redux/dataSlice";

export const parseAndDispatchFile = (fileData, fileName, dispatch) => {
    try {
        // fileData is now ALREADY a JavaScript array/object from the API response.
        // No need for JSON.parse() here anymore.
        const json = fileData;

        // Ensure 'json' is an array before calling forEach
        if (!Array.isArray(json)) {
            console.error(`Expected JSON array for ${fileName}, but received:`, json);
            return [];
        }

        const uniquePairs = new Set();
        json.forEach((item) => {
            const src = item?._source?.layers?.ip?.["ip.src"];
            const dst = item?._source?.layers?.ip?.["ip.dst"];
            if (src && dst) {
                const pair = JSON.stringify([src, dst].sort());
                if (!uniquePairs.has(pair)) {
                    uniquePairs.add(pair);
                    dispatch(addAddress({ src, dst }));
                }
            }
        });
        return json;
    } catch (error) {
        // This catch block would now primarily catch errors in the forEach loop or Redux dispatch,
        // as parsing errors should be handled by the serverless function.
        console.error("Error processing JSON data:", error);
        return [];
    }
};