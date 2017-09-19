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

console.log('textList', textList);

export let formatTextStyle = function (text) {
    console.log('in formatTextStyle');
    console.log('text', text);
    console.log('text.style', text.style);
    console.log('Object.keys(text.style)', Object.keys(text.style));
    var style = Object.keys(text.style).map(key => text.style[key]);
   
    for(var i in text.style) {
         console.log(i + "=" + text.style[i]);
    } 
   
    console.log('style 0', style);
//    console.log('JSON.stringify(text.style)', JSON.stringify(text.style));
//    console.log('typeof JSON.stringify(text.style)', typeof JSON.stringify(text.style));
//    console.log('JSON.stringify(text.style)', JSON.stringify(text.style).replace(/-/g, '-').replace(/,/g, ';'));
    var styleString = JSON.stringify(text.style, null)
            .replace(/"/g, '')
            .replace(/,/g, ';')
            .replace(/\{/g, '')
            .replace(/\}/g, ';')
            .replace(/\s/g, '');
            
    var styleString = JSON.stringify(text.style,function(key, value){
            return (typeof value === 'function' ) ? value.toString() : value;
        }); 
//    console.log('styleString', styleString);
    return styleString;
}

export let displayText = function (text) {
    console.log('in displayText');
    //var style = formatTextStyle(text);
    //console.log('style', style);
    //return '<div style="'+style+'">'+text.text+'</div>';
    return '<div style="">'+text.text+'</div>';
}
