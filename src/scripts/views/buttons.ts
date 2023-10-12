import { resetFontSize } from "./font-size";
import { emptyContainer } from "./printable-label";

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
        emptyContainer();
        
        togglePrintButtons(false);

        if (buttonEvents.onEraseAll) buttonEvents.onEraseAll();
    });
    document.getElementById('reset-font-size-button')?.addEventListener('click', () => {
        resetFontSize();
    });
}

