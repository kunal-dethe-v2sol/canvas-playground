export let textList = [
    {
        uuid: 1,
        type: 'text',
        text: 'Header 1',
        style: {
            'display': 'block',
            'font-size': '2em',
            'margin-top': '0.67em',
            'margin-bottom': '0.67em',
            'margin-left': '0',
            'margin-right': '0',
            'font-weight': 'bold',
        }
    },
    {
        uuid: 2,
        type: 'text',
        text: 'Header 2',
        style: {
            'display': 'block',
            'font-size': '1.5em',
            'margin-top': '0.83em',
            'margin-bottom': '0.83em',
            'margin-left': '0',
            'margin-right': '0',
            'font-weight': 'bold',
        }
    },
    {
        uuid: 3,
        type: 'text',
        text: 'Header 3',
        style: {
            'display': 'block',
            'font-size': '1.17em',
            'margin-top': '1em',
            'margin-bottom': '1em',
            'margin-left': '0',
            'margin-right': '0',
            'font-weight': 'bold',
        }
    },
    {
        uuid: 4,
        type: 'text',
        text: 'Header 4',
        style: {
            'display': 'block',
            'font-size': '1em',
            'margin-top': '1.33em',
            'margin-bottom': '1.33em',
            'margin-left': '0',
            'margin-right': '0',
            'font-weight': 'bold',
        }
    },
    {
        uuid: 5,
        type: 'text',
        text: 'Header 5',
        style: {
            'display': 'block',
            'font-size': '.83em',
            'margin-top': '1.67em',
            'margin-bottom': '1.67em',
            'margin-left': '0',
            'margin-right': '0',
            'font-weight': 'bold',
        }
    },
    {
        uuid: 6,
        type: 'text',
        text: 'Header 6',
        style: {
            'display': 'block',
            'font-size': '.67em',
            'margin-top': '2.33em',
            'margin-bottom': '2.33em',
            'margin-left': '0',
            'margin-right': '0',
            'font-weight': 'bold',
        }
    }
];

export let fontFamilyList = [
    {
        uuid: 1,
        label: "Arial",
        value: "sans-serif"
    },
    {
        uuid: 2,
        label: "Times New Roman",
        value: "serif"
    }
];

export let fontSizeList = [
    {
        uuid: 1,
        label: "8",
        value: "8"
    },
    {
        uuid: 2,
        label: "16",
        value: "16"
    },
    {
        uuid: 3,
        label: "32",
        value: "32"
    },
    {
        uuid: 4,
        label: "64",
        value: "64"
    }
];

//console.log('textList', textList);

export let formatTextStyle = function (text) {
    var styleString = JSON.stringify(text.style, null)
            .replace(/"/g, '')
            .replace(/,/g, ';')
            .replace(/\{/g, '')
            .replace(/\}/g, ';')
            .replace(/\s/g, '');
    //console.log('styleString', styleString);
    return styleString;
}

export let getText = function (text, forPage = false) {
    //console.log('in getText', text);
    var style = formatTextStyle(text);
    if(forPage) {
        return '<div class="single_element text_element" data-type="text" data-guid="'+text.guid+'" (click)="context.manageElement($event)" style="'+style+'">'+text.text+'</div>';
    } else {
        return '<div class="single_element text_element" style="'+style+'">'+text.text+'</div>';
    }
}
