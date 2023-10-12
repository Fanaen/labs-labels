export function getSmallFontSize(): string {
    return (document.getElementById('smallFontSize') as HTMLInputElement).value;
}

export function changeSmallFontSize(fontSize: string) {
    for(const item of document.getElementsByClassName('item')) {
        (item as HTMLElement).style['font-size'] = fontSize;
    }
}

export function getLargeFontSize(): string {
    return (document.getElementById('largeFontSize') as HTMLInputElement).value;
}

export function changeLargeFontSize(fontSize: string) {
    for(const code of document.getElementsByClassName('code')) {
        (code as HTMLElement).style['font-size'] = fontSize;
    }
}

export function wireFontSizeFields() {
    document.getElementById('smallFontSize')?.addEventListener('change', () => {
        changeSmallFontSize(getSmallFontSize());
    });
    document.getElementById('largeFontSize')?.addEventListener('change', () => {
        changeLargeFontSize(getLargeFontSize());
    });
}

export function resetFontSize() {
    (document.getElementById('smallFontSize') as HTMLInputElement).value = '100%';
    (document.getElementById('largeFontSize') as HTMLInputElement).value = '100%';

    changeSmallFontSize(getSmallFontSize());
    changeLargeFontSize(getLargeFontSize());
}