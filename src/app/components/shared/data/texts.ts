import {formatElementStyle} from './templates';

declare var $: any;

export let textList = [
    {
        uuid: 1,
        type: 'text',
        text: 'Header 1',
        style: {
            'display': 'block',
            'font-family': 'sans-serif',
            'font-size': '2em',
            'margin-top': '0.67em',
            'margin-bottom': '0.67em',
            'margin-left': '0',
            'margin-right': '0',
            'font-weight': 'bold',
            'width': '150px',
        }
    },
    {
        uuid: 2,
        type: 'text',
        text: 'Header 2',
        style: {
            'display': 'block',
            'font-family': 'sans-serif',
            'font-size': '1.5em',
            'margin-top': '0.83em',
            'margin-bottom': '0.83em',
            'margin-left': '0',
            'margin-right': '0',
            'font-weight': 'bold',
            'width': '150px',
        }
    },
    {
        uuid: 3,
        type: 'text',
        text: 'Header 3',
        style: {
            'display': 'block',
            'font-family': 'sans-serif',
            'font-size': '1.17em',
            'margin-top': '1em',
            'margin-bottom': '1em',
            'margin-left': '0',
            'margin-right': '0',
            'font-weight': 'bold',
            'width': '150px',
        }
    },
    {
        uuid: 4,
        type: 'text',
        text: 'Header 4',
        style: {
            'display': 'block',
            'font-family': 'sans-serif',
            'font-size': '1em',
            'margin-top': '1.33em',
            'margin-bottom': '1.33em',
            'margin-left': '0',
            'margin-right': '0',
            'font-weight': 'bold',
            'width': '150px',
        }
    },
    {
        uuid: 5,
        type: 'text',
        text: 'Header 5',
        style: {
            'display': 'block',
            'font-family': 'sans-serif',
            'font-size': '.83em',
            'margin-top': '1.67em',
            'margin-bottom': '1.67em',
            'margin-left': '0',
            'margin-right': '0',
            'font-weight': 'bold',
            'width': '150px',
        }
    },
    {
        uuid: 6,
        type: 'text',
        text: 'Header 6',
        style: {
            'display': 'block',
            'font-family': 'sans-serif',
            'font-size': '.67em',
            'margin-top': '2.33em',
            'margin-bottom': '2.33em',
            'margin-left': '0',
            'margin-right': '0',
            'font-weight': 'bold',
            'width': '150px',
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
        value: "8px"
    },
    {
        uuid: 2,
        label: "16",
        value: "16px"
    },
    {
        uuid: 3,
        label: "32",
        value: "32px"
    },
    {
        uuid: 4,
        label: "64",
        value: "64px"
    }
];

//console.log('textList', textList);

export let getText = function (text, forPage = false) {
    //console.log('in getText', text);
    var element = $.extend(true, {}, text);
    var style = formatElementStyle(element);
    if(forPage) {
        return '<div class="single_element text_element" data-type="text" data-guid="'+element.guid+'" (click)="context.manageElement($event)" style="'+style+'">'+element.text+'</div>';
    } else {
        return '<div class="display_element" style="'+style+'">'+element.text+'</div>';
    }
}
