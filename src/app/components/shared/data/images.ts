import {formatElementStyle} from './templates';

declare var $: any;

export let imageList = [
    {
        uuid: 1,
        type: 'image',
        src: './assets/data/1.jpg',
        style: {
            'height': '100px',
            'width': '100px',
        }
    },
    {
        uuid: 2,
        type: 'image',
        src: './assets/data/2.jpg',
        style: {
            'height': '100px',
            'width': '100px',
        }
    },
    {
        uuid: 3,
        type: 'image',
        src: './assets/data/3.jpg',
        style: {
            'height': '100px',
            'width': '100px',
        }
    },
    {
        uuid: 4,
        type: 'image',
        src: './assets/data/4.jpg',
        style: {
            'height': '100px',
            'width': '100px',
        }
    },
    {
        uuid: 5,
        type: 'image',
        src: './assets/data/5.jpg',
        style: {
            'height': '100px',
            'width': '100px',
        }
    },
    {
        uuid: 6,
        type: 'image',
        src: './assets/data/6.jpg',
        style: {
            'height': '100px',
            'width': '100px',
        }
    }
];

export let getImage = function (image, forPage = false) {
    var element = $.extend(true, {}, image);
    var style = formatElementStyle(element);
    if(forPage) {
        return '<img src="'+element.src+'" class="single_element image_element" data-type="image" data-guid="'+element.guid+'" (click)="context.manageElement($event)" style="'+style+'" />';
    } else {
        return '<img src="'+element.src+'" class="display_element" style="'+style+'" />';
    }
}