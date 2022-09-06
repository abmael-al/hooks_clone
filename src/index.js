const React = (function() {
    const hooks = [];
    let index = 0;
    
    function useState(initialValue) {
        const _index = index;
        const state = hooks[index] || initialValue;
        const setState = (newValue) => {
            hooks[_index] = newValue;
        }

        index++;
    
        return [state, setState];
    }

    function useEffect(callback, depArray) {
        const oldDeps = hooks[index];
        let hasChanged = true;
        
        if(oldDeps) {
            hasChanged = depArray.some((dep, index) => !Object.is(dep, oldDeps[index])); 
        }

        if(hasChanged) {
            callback();
        }

        hooks[index] = depArray;
        index++;
    }

    function render(Component) {
        index = 0;

        const C = Component();
        C.render();
        return C;
    }

    return { 
        useState,
        useEffect,
        render
    };
})()

const { useState, useEffect, render } = React;

function Component() {
    const [count, setCount] = useState(1);
    const [text, setText] = useState('juice');

    useEffect(() => {
        console.log('Hello');
    });

    return {
        render: () => console.log({ count, text }),
        click: () => setCount(count + 1),
        type: (text) => setText(text),
    };
}

var App = render(Component);
App.click();
var App = render(Component);
App.type('music');
var App = render(Component);