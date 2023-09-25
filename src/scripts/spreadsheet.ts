import { PrintableLabel } from "./view";

interface Header {
    key: string;
    column: number;
}

export class SpreadsheetProcessor {
    private headers: Header[] = [];
    private mainHeader: number = -1;

    constructor(headers: string[]) {
        for (let index = 0; index < headers.length; index++) {
            const newHeader = headers[index].trim();

            if (newHeader.length > 0) {
                if (this.mainHeader == -1) {
                    this.mainHeader = index;
                } else {
                    this.headers.push({
                        key: newHeader,
                        column: index
                    });
                }
            }
        }
    }

    public processSpreadsheetRow(row: string[]) {
        const newLabel = new PrintableLabel();
    
        for (const header of this.headers) {
            const column = header.column;
            const value = column < row.length ? row[column] : '';

            newLabel.addRow(header.key, value);
        }

        const mainRow = this.mainHeader < row.length ? row[this.mainHeader] : '';
        newLabel.addMainRow(mainRow);
    }
}