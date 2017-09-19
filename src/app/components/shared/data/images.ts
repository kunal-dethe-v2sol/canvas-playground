export let imageList = [
    {
        uuid: 1,
        type: 'image',
        src: './assets/data/1.jpg',
    },
    {
        uuid: 2,
        type: 'image',
        src: './assets/data/2.jpg',
    },
    {
        uuid: 3,
        type: 'image',
        src: './assets/data/3.jpg',
    },
    {
        uuid: 4,
        type: 'image',
        src: './assets/data/4.jpg',
    },
    {
        uuid: 5,
        type: 'image',
        src: './assets/data/5.jpg',
    },
    {
        uuid: 6,
        type: 'image',
        src: './assets/data/6.jpg',
    }
];

export let getImage = function (image) {
    return '<img src="'+image.src+'" height="150" width="150" [ngStyle]="context.imageStyle">';
}