export type LevenshteinDistanceResult = {
    distance: number;
    matrix: number[][];
    steps: {
        type: string; //"match" | "substitution" | "deletion" | "insertion"
        oldChar: string;
        newChar: string;
        i: number;
    }[];
};

export function levenshteinDistance(
    str1: string,
    str2: string
): LevenshteinDistanceResult {
    const matrix: number[][] = Array(str1.length).fill(
        Array(str2.length).fill(0)
    );

    // Initialize the matrix
    for (let i = 0; i <= str1.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= str2.length; j++) {
        matrix[0][j] = j;
    }

    // Fill in the matrix
    for (let i = 1; i <= str1.length; i++) {
        for (let j = 1; j <= str2.length; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1, // Deletion
                matrix[i][j - 1] + 1, // Insertion
                matrix[i - 1][j - 1] + cost // Substitution
            );
        }
    }

    // generate steps to get from str1 to str2
    const steps: {
        type: string;
        oldChar: string;
        newChar: string;
        i: number;
    }[] = [];
    let i = str1.length;
    let j = str2.length;
    while (i > 0 || j > 0) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        if (i > 0 && j > 0 && matrix[i][j] === matrix[i - 1][j - 1] + cost) {
            if (cost === 0) {
                steps.push({
                    type: "match",
                    oldChar: str1[i - 1],
                    newChar: str2[j - 1],
                    i,
                });
            } else {
                steps.push({
                    type: "substitution",
                    oldChar: str1[i - 1],
                    newChar: str2[j - 1],
                    i,
                });
            }
            i--;
            j--;
        } else if (i > 0 && matrix[i][j] === matrix[i - 1][j] + 1) {
            steps.push({
                type: "deletion",
                oldChar: str1[i - 1],
                newChar: "",
                i,
            });
            i--;
        } else if (j > 0 && matrix[i][j] === matrix[i][j - 1] + 1) {
            steps.push({
                type: "insertion",
                oldChar: "",
                newChar: str2[j - 1],
                i,
            });
            j--;
        }

        console.groupEnd();
    }

    // The bottom-right cell of the matrix contains the Levenshtein distance
    // from str1 to str2. we also return the matrix and steps to get from str1 to str2
    return {
        distance: matrix[str1.length][str2.length],
        matrix,
        steps: steps.reverse(),
    };
}
