import React from 'react'
import { useParams } from '../../../node_modules/react-router-dom/dist/index';
import { getRequest } from 'services/apiService';

function InvoiceDetail() {

    const params = useParams()

    const printVoucher = async () => {
        const print = await getRequest(`printer/print-invoice/${params.Id}`);
        if(print.status == 200){
            console.log("Success Print")
        }
    }

  return (
    <div>
        <button onClick={()=>{printVoucher()}}>Print</button>
    </div>
  )
}

export default InvoiceDetail