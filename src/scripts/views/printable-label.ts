import { getLargeFontSize, getSmallFontSize } from './font-size';

export const container = document.getElementById('display')!;

export function emptyContainer() { 
    container.innerHTML = ''; 
}

export class PrintableLabel {
    private k = 0;
    private itemContent: HTMLDivElement;

    constructor() {
        var item = document.createElement('div');
        item.className = 'item';
        item.style['font-size'] = getSmallFontSize();

        this.itemContent = document.createElement('div');
        this.itemContent.className = 'item-content';

        item.append(this.itemContent);
        container.append(item);
    }

    public addRow(key: string, value: string) {
        const keyDiv = document.createElement('div');
        keyDiv.className = this.k % 2 == 0 ? 'key' : 'key odd';
        keyDiv.innerText = key;

        const valueDiv = document.createElement('div');
        valueDiv.className = this.k % 2 == 0 ? 'value' : 'value odd';
        valueDiv.innerText = value;

        this.itemContent.append(keyDiv);
        this.itemContent.append(valueDiv);

        this.k++;
    }

    public addMainRow(value: string) {
        const numDiv = document.createElement('div');
        numDiv.className = 'num';

        const span = document.createElement('span');
        span.className = 'code';
        span.style['font-size'] = getLargeFontSize();
        span.innerText = value;
        numDiv.append(span);

        this.itemContent.append(numDiv);
    }
}
