import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';

function useHandlePrint() {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        contentRef: componentRef, 
    }); 
    return {handlePrint, componentRef};
}

export default useHandlePrint
