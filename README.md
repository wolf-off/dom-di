# DOM-DI Project

  Site of project:  [dom-di.org](http://dom-di.org)

  Target of DOM-DI is support your frontend by low coupling.
  It allow you to implement Interaction and Dependency Injection between your component
  There are two main dirrection of usage:
  1. In Web-components
  2. When you works with differents frameworks in one application (Angulars/React/Vue)

  Anyway It allows you work in [Micro Frontend](https://micro-frontends.org/) approach

## Install

All you need is in src folder

# Usage

## Initialize conversation

  There are two way to start conversation between your components:
  1. Add `dom-di-container` (`/src/Controls/Container.html`) to root of your document (or arround).
  2. Or inherit one control from `diContainerMixin` (`/src/diContainerMixin.js`)
    Sure that all partisipants of conversation is child (not dirrect) of the control

    `class MyControl extends diContainerMixin(HTMLElement) `
    `class MyControl extends diObjectMixinBabel(React.Component)`
    `class MyControl extends diObjectMixinBabel({})`

    If your control is some framework's control, realize `dispatchEvent` method to send events to DOM

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