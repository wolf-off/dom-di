# DOM-DI Project

  Site of project:  [dom-di.org](http://www.dom-di.org)

  Target of DOM-DI is support your frontend by low coupling.
  It allow you to implement Interaction and Dependency Injection between your component
  There are two main dirrection of usage:
  1. In Web-components
  2. When you works with differents frameworks in one apllication (Angulars/React/Vue)

  Anyway It allow you works in [Micro Frontend](https://micro-frontends.org/) approach

## Install

All you need is in src folder

# Usage

## Initialize conversation

  There are two way to start conversation between your components:
  1. Add `dom-di-container` (`/src/Controls/Container.html`) to root of your document (or arround).
  2. Inherit one control from `diContainerMixin` (`/src/diContainerMixin.js`)
    Sure that all partisipants of conversation is childe (not dirrect) of the control

    `class MyControl extends diContainerMixin(HTMLElement) `
    `class MyControl extends diObjectMixinBabel(React.Component)`
    `class MyControl extends diObjectMixinBabel({})`

## Provide Control

  1. Inherit your control from `diContainerMixin` (`/src/diContainerMixin.js`)
  2. Add
```
      this.typeName = 'control-to-provide';
      this.dependencies = [];
      this.diReady = () => {
        return this;
      }
```

## Receive Control
  1. Inherit your control from `diContainerMixin` (`/src/diContainerMixin.js`)
  2. Add
```
      this.dependencies = ['control-to-provide'];
      this.diReady = (control) => {
        // add your code
      }
```

  If you have done well, diReady will be called with control, with you want to provide