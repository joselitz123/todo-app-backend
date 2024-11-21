export function catchError(originalMethod: any, context: ClassMethodDecoratorContext) {
    const methodName = String(context.name);

    function replacementMethod(this: any, ...args: any[]) {
        try {
            const result = originalMethod.call(this, ...args);
            return result;
        } catch (error: any) {
            console.error(new Error(`Encountered error in ${methodName}.` + error.stack));
        }
    }

    return replacementMethod;
}