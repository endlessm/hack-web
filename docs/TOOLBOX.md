# Hack Toolbox

A toolbox is a complex form with several widgets that is attached to an APP to
be able to hack the APP.

The app should run in an IFRAME with the '#app' id and the toolbox is a
component that will be in the back and will modify the `document.window` object
in the APP iframe.

## Connecting to / synching with hackable-app changes

There's a reducer in the store to track the state of the iframed APP, that
reducer has the key 'hackableApp'.

There are two utility functions to sync the APP with this state in the store
that are located in `src/ui/toolbox/tools.jsx`:

 * proxyApp (param: string, callback: fn(object))
 * updateApp (param: string, newParams: { key: value }, callback: fn(key, value))

The "proxyApp" creates a proxy for the iframe and calls the callback function
everytime this object changes in the APP. It should be used to modify the hackableApp
reducer:

```
  useEffect(() => {
    const changeCallback = (params) => {
      dispatch(actions.hackableAppSet(params));
    };

    // Creates a proxy to track iframe globalParameters
    proxyApp('globalParameters', changeCallback);
  });
```

To sync in the other direction we can use the "updateApp" function, that will
update the object in the APP with the data received:

```
  useEffect(() => {
    const handleChange = () => {
      updateApp('globalParameters', store.getState().hackableApp);
    };
    return store.subscribe(handleChange);
  });
```

With the previous code, we are listening to every change in the hackableApp reducer
and we update the APP with that state.

All the toolbox widgets can listen to the "hackableApp" reducer and stay in sync with
the real app.

## How to create a toolbox

A toolbox is a custom component that will render the "store.hackableApp" and provide a
way to modify those values, so with the toolbox we can hack the app, modifying
variables or methods defined there.

There's a utility component to be able to create custom toolbox with widgets,
just defining a js object, that component is tye `DynToolbox` that's in
`src/ui/toolbox/dynamic.jsx`.

This component receives the parameter `toolbox` that's the toolbox definition.
Take a look to the `src/ui/toolbox/fizzics.jsx` file to see an example.

## Toolbox object panels

 * tabs: This is the first child that should be defined in the toolbox and it
   should be a list of "tabs" objects. Each tab has a name, an icon an a grid.
 * grid: A list of toolbox panels. The "xs" param is used to build the grid,
   where 12 is fullwidth.

### Simple panels:

  * select: A dropdown widget
    * title: The title of the panel
    * items: A list of objects with (key, value, image?)
    * param: The name of the property in the hackableApp state to modify

  * checkbox: A multiple checkbox panel (true / false)
    * title: The title of the panel
    * items: A list of objects with (label, key) where the key is the name of
      the property in the hackableApp state to modify

  * number: A number input picker
    * label: The label to show
    * param: The name of the property in the hackableApp state to modify
    * inputProps: props to modify the input (min, max, step)

  * code: A javascript code editor
    * code: A function to generate the code to show. It receives the current
      hackableApp state and should return a string with the code that will be placed
      in the editor. This function is called everytime the hackableApp state changes.
    * compile: A function to build the code. This function will be called when
      the code in the editor changes and can trigger a hackableApp state update with
      the return value.

      return null: Will do nothing
      return object: Will update the hackableApp state with the object, for each key
      in the object it will trigger a store update with the corresponding
      value.

### Container panels:

  * tabs: A horizontal tab panel with the same content for each tab
    * items: A list of objects with (label, icon), the label and icon will be
      shown in the tab.
    * panel: a function to build the panel for each tab. This function receives
      the `item` defined in the items param for each panel and should return a
      list of toolbox panels.

  * panel: A grid container with a title. This is useful to group several
    widgets.
    * title: The title to show
    * grid: A list of toolbox panels.

## How to create a new toolbox panels:

You can define a new toolbox panel and place it in `src/ui/toolbox/panels`,
then you should modify the `grid.jsx` and add your new panel to the list of
`PANELS`.

Then you can use it in your toolbox json.
