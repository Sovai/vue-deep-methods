# vue-deep-methods

**Vue 3 Composable for Deep Component Method Calls**

`vue-deep-methods` allows calling methods on **deeply nested components** without **prop drilling or event chaining**. It provides a **clean and scalable** solution for Vue 3 applications.

---

## 📦 Installation

### **Using npm**

```sh
npm install vue-deep-methods
```

### **Using yarn**

```sh
yarn add vue-deep-methods
```

---

## Usage

### **1️. Register a Component**

Each component must register itself with a unique `id` and provide the methods that can be called later.

```vue
<script setup lang="ts">
import { useDeepComponent } from "vue-deep-methods";
import { onUnmounted } from "vue";

const { registerComponent, unregisterComponent } = useDeepComponent();

const componentId = "component-unique-id";

// Register component
registerComponent({
  id: componentId,
  methods: {
    myFunction: () => console.log("My function"),
    myOtherFunction,
  },
});

const myOtherFunction = (params: any) => {
  console.log("Another function", params);
};

// Unregister when component unmounts
onUnmounted(() => {
  unregisterComponent(componentId);
});
</script>
```

---

### **2️. Calling Methods from Parent**

Use `callComponentMethod()` to call any method from a registered component.

```ts
import { useDeepComponent } from "vue-deep-methods";

const { callComponentMethod } = useDeepComponent();

callComponentMethod({
  id: "component-unique-id", // the id we registered earlier
  method: "myOtherFunction",
  args: ["some-params"],
});
```

---

### **3️. Debugging: Get Registered Component Methods**

Use `getComponent()` to check the available methods for a registered component.

```ts
const component = getComponent("component-unique-id");
console.log(component); // Logs available methods
```

---

## API Reference

### **registerComponent({ id, methods, overwrite })**

Registers a component with a unique `id` and its methods.

| Parameter   | Type                       | Description                                 |
| ----------- | -------------------------- | ------------------------------------------- |
| `id`        | `string`                   | Unique component ID                         |
| `methods`   | `Record<string, Function>` | Object of methods exposed by the component  |
| `overwrite` | `boolean` (optional)       | If `true`, overwrites an existing component |

#### Example

```ts
registerComponent({
  id: "other-unique-id",
  methods: {
    rerender: () => console.log("Chart updated"),
  },
  overwrite: true,
});
```

---

### **unregisterComponent(id)**

Removes a registered component.

#### Example

```ts
unregisterComponent("other-unique-id");
```

---

### **callComponentMethod({ id, method, args })**

Calls a registered method on a component.

#### Example

```ts
callComponentMethod({
  id: "other-unique-id",
  method: "rerender",
});
```

---

### **getComponent(id)**

Retrieves the methods object of a registered component.

#### Example

```ts
const component = getComponent("other-unique-id");
console.log(component);
```

---

## Advanced Usage

### **Calling Multiple Methods at Once**

```ts
const component = getComponent("component-unique-id");
if (component) {
  component.myFunction();
  component.myOtherFunction("some-data");
}
```

### **Overwriting an Existing Component**

```ts
registerComponent({
  id: "component-unique-id");,
  methods: {
    myFunction: () => console.log("Hello!"),
  },
  overwrite: true,
});
```

---

## Best Practices

- Use **unique `id` values** for each component.
- Always **unregister components** inside `onUnmounted()`.
- Use `getComponent(id)` to debug available methods.
- Use `overwrite: true` when replacing an existing component.

## Contribute & Support

Want to contribute? PRs are welcome! 😊

- GitHub: [GitHub Repo](https://github.com/Sovai/vue-deep-methods)
- NPM: [NPM Package](https://www.npmjs.com/package/vue-deep-methods)

---
