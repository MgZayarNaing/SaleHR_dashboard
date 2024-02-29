import React from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from '@mui/material';

class ComponentToPrint extends React.Component {
    render() {
      return (
        <div>
          <p>This is Testing</p>
          <p>Hello, this is a printable content!</p>
        </div>
      );
    }
  }

function Voucher() {

    const componentRef = React.useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

  return (
    <div>
      <ComponentToPrint ref={componentRef} />
      <Button variant="contained" color="primary" onClick={handlePrint}>
        Print
      </Button>
    </div>
  )
}

export default Voucher
