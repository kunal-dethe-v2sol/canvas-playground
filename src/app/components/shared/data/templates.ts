export let templateList = [
    {
        uuid: '1',
        img: '',
        title: 'Presentation',
        size: '1024 x 768 px',
        width: '1024',
        height: '768',
    },
    {
        uuid: '2',
        img: '',
        title: 'Logo',
        size: '400 x 400 px',
        width: '400',
        height: '400',
    }
];

export let formatElementStyle = function (text) {
    var styleString = JSON.stringify(text.style, null)
            .replace(/"/g, '')
            .replace(/,/g, ';')
            .replace(/#/g, ',')
            .replace(/\{/g, '')
            .replace(/\}/g, ';')
            .replace(/\s/g, '');
    //console.log('styleString', styleString);
    return styleString;
}