
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
