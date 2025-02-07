import { reactive } from "vue";
const components = reactive({});
export function useDeepComponent() {
    function registerComponent({ id, methods, overwrite = false, }) {
        if (components[id] && !overwrite) {
            console.warn(`⚠️ Component with ID "${id}" is already registered. Use "overwrite: true" if you want to replace it.`);
            return;
        }
        components[id] = methods;
    }
    function unregisterComponent(id) {
        if (components[id]) {
            delete components[id];
        }
        else {
            console.warn(`⚠️ Attempted to unregister non-existent component ID: "${id}"`);
        }
    }
    function getComponent(id) {
        return components[id] || null;
    }
    async function callComponentMethod({ id, method, args = [], }) {
        const component = getComponent(id);
        if (component && typeof component[method] === "function") {
            const result = component[method](...args);
            return result instanceof Promise ? await result : result;
        }
        console.warn(`⚠️ Component "${id}" not found or method "${method}" does not exist.`);
        return null;
    }
    return {
        registerComponent,
        unregisterComponent,
        getComponent,
        callComponentMethod,
    };
}
