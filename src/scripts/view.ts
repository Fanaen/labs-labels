
import { Notyf } from 'notyf';

export const toastr = new Notyf({
    position: {
        x: 'left',
        y: 'top'
    },
    types: [
        {
            type: 'warning',
            background: 'orange',
        },
    ]
});

const container = document.getElementById('display')!;

/**
 * When there is labels to print, add a button to get easier access to print menu.
 */
export function togglePrintButtons(thereAreLabels: boolean) {
    const whenEmpty = document.getElementById('when-empty');
    if (whenEmpty) whenEmpty.className = thereAreLabels ? 'hidden' : '';

    const whenNotEmpty = document.getElementById('when-not-empty');
    if (whenNotEmpty) whenNotEmpty.className = thereAreLabels ? '' : 'hidden';
}

export interface ButtonsEvents {
    onEraseAll?: () => void;
}

export function wireButtons(buttonEvents: ButtonsEvents) {
    document.getElementById('erase-button')?.addEventListener('click', () => {
        container.innerHTML = '';
        
        togglePrintButtons(false);

        if (buttonEvents.onEraseAll) buttonEvents.onEraseAll();
    });
}

export class PrintableLabel {
    private k = 0;
    private itemContent: HTMLDivElement; 

    constructor() {
        var item = document.createElement('div');
        item.className = 'item';
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
        numDiv.innerText = value;
        this.itemContent.append(numDiv);
    }
}