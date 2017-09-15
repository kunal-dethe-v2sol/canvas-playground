export let textList = [
    {
        uuid: 100,
        element: '<h1>Header 1</h1>',
        text: 'Header 1',
        type: 'header',
        style: {
            display: 'block',
            fontsize: '2em',
            margintop: '0.67em',
            marginbottom: '0.67em',
            marginleft: '0',
            marginright: '0',
            fontweight: 'bold',
        }
    },
    {
        uuid: 1,
        text: 'Header 1',
        type: 'header',
        element: 'h1',
        style: {
            display: 'block',
            fontsize: '2em',
            margintop: '0.67em',
            marginbottom: '0.67em',
            marginleft: '0',
            marginright: '0',
            fontweight: 'bold',
        }
    },
    {
        uuid: 2,
        text: 'Header 2',
        type: 'header',
        element: 'h2',
        style: {
            display: 'block',
            fontsize: '1.5em',
            margintop: '0.83em',
            marginbottom: '0.83em',
            marginleft: '0',
            marginright: '0',
            fontweight: 'bold',
        }
    },
    {
        uuid: 3,
        text: 'Header 3',
        type: 'header',
        element: 'h3',
        style: {
            display: 'block',
            fontsize: '1.17em',
            margintop: '1em',
            marginbottom: '1em',
            marginleft: '0',
            marginright: '0',
            fontweight: 'bold',
        }
    },
    {
        uuid: 4,
        text: 'Header 4',
        type: 'header',
        element: 'h4',
        style: {
            display: 'block',
            fontsize: '1em',
            margintop: '1.33em',
            marginbottom: '1.33em',
            marginleft: '0',
            marginright: '0',
            fontweight: 'bold',
        }
    },
    {
        uuid: 5,
        text: 'Header 5',
        type: 'header',
        element: 'h5',
        style: {
            display: 'block',
            fontsize: '.83em',
            margintop: '1.67em',
            marginbottom: '1.67em',
            marginleft: '0',
            marginright: '0',
            fontweight: 'bold',
        }
    },
    {
        uuid: 6,
        text: 'Header 6',
        type: 'header',
        element: 'h6',
        style: {
            display: 'block',
            fontsize: '.67em',
            margintop: '2.33em',
            marginbottom: '2.33em',
            marginleft: '0',
            marginright: '0',
            fontweight: 'bold',
        }
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