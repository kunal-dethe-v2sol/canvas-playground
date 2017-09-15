export let textList = [
    {
        uuid: 1,
        type: 'text',
        html: '<h1>Header 1</h1>'
    },
    {
        uuid: 2,
        type: 'text',
        html: '<h2>Header 2</h2>'
    },
    {
        uuid: 3,
        type: 'text',
        html: '<h3>Header 3</h3>'
    },
    {
        uuid: 4,
        type: 'text',
        html: '<h4>Header 4</h4>'
    },
    {
        uuid: 5,
        type: 'text',
        html: '<h5>Header 5</h5>'
    },
    {
        uuid: 6,
        type: 'text',
        html: '<h6>Header 6</h6>'
    },
    {
        uuid: 100,
        type: 'text',
        html: '<h1>Header 1</h1><h2>and 2 together</h2>'
    },
    {
        uuid: 101,
        type: 'text',
        html: '<div>Some text in a div</div>'
    }
];

export let formatTextStyle = function (text) {
    return {
        'display': text.style.display,
        'font-size': text.style.fontsize,
        'margin-top': text.style.margintop,
        'margin-bottom': text.style.marginbottom,
        'margin-left': text.style.marginleft,
        'margin-right': text.style.marginright,
        'font-weight': text.style.fontweight
    }
}

export let displayText = function (text) {
    return text.html;
}
