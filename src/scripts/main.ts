import { parse } from 'papaparse';
import { toastr, togglePrintButtons, wireButtons, wireFontSizeFields } from './views';
import { SpreadsheetProcessor } from './spreadsheet';
import { NotyfNotification } from 'notyf';

function waitBetweenLabels(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 30));
}

export async function processSpreadsheet(source: string): Promise<number> {
    const { data: fileRows, errors } = parse<string[]>(source, {
        skipEmptyLines: true
    });

    let addedLabels = 0;
    let shouldProcessRows = true;

    if (errors && errors.length > 0) {
        shouldProcessRows = false;
        for (const error of errors) {
            console.error(error);
        }
    }

    if (shouldProcessRows && fileRows && fileRows.length > 1) {
        const processor = new SpreadsheetProcessor(fileRows[0]);

        for (let labelIndex = 1; labelIndex < fileRows.length; labelIndex++) {
            processor.processSpreadsheetRow(fileRows[labelIndex]);
        
            addedLabels += 1;

            if (addedLabels == 1) {
                togglePrintButtons(true);
            }

            await waitBetweenLabels();
        }
    }

    return addedLabels;
}

const processedSpreadsheets = new Map<string, number>();
let lastError: NotyfNotification | null = null;

/**
 * One of the way to add news printable labels to the sheet is to copy all 
 * the content of a properly formated spreadsheet right into this tool.
 */
addEventListener('paste', async evt => {
    try {
        const spreadsheetContent = evt.clipboardData?.getData('text');
        if (spreadsheetContent) {
            if (processedSpreadsheets.has(spreadsheetContent)) {
                toastr.open({
                    message: `Skipped ${processedSpreadsheets.get(spreadsheetContent)} labels`,
                    type: 'warning',
                });
            } else {
                const addedLabels = await processSpreadsheet(spreadsheetContent);

                // Display a feedback.
                if (lastError) {
                    toastr.dismiss(lastError);
                    lastError = null;
                }

                if (addedLabels > 0) {
                    processedSpreadsheets.set(spreadsheetContent, addedLabels);
                    toastr.success(`Added ${addedLabels} labels`);
                } else {
                    lastError = toastr.error({
                        message: 'Sorry, nothing to add. Did you copy the spreadsheet last?',
                        duration: 10000,
                        dismissible: true,
                    });
                }
            }
        }
    } catch (exception) {
        console.error()
        lastError = toastr.error({
            message: 'Something went wrong. Please contact the developper to get help.',
            duration: 10000,
            dismissible: true,
        });
    }
});

wireButtons({
    onEraseAll: () => processedSpreadsheets.clear(),
});
wireFontSizeFields();