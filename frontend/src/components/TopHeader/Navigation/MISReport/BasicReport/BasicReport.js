import React from 'react'

function BasicReport() {
    return (
        <>
         <h4 className="modalHeadTitle">Basic Report</h4>
            <div className="container misReportBox reports">
              <div className="row">

                       <div className=" col-sm-12 col-md-12 col-lg-12">
                             <div className="row">
                               <div className="col-md-1.33 firstBox" style={{cursor:'move'}} 
                                 onClick={() => alert(true)}
                               >
                                 <p className="reportBox">Product Configuration</p>
                               </div>

                                <div className="col-md-1.33"
                                 style={{cursor:'move'}} 
                                 onClick={() => alert(true)}
                                 >
                                 <p className="reportBox">Employee Information</p>
                               </div>
                                <div className="col-md-1.33"  style={{cursor:'move'}} 
                                 onClick={() => alert(true)}
                                 >
                                 <p className="reportBox">Customer Due Report</p>
                               </div>
                                <div className="col-md-1.33"  style={{cursor:'move'}} 
                                 onClick={() => alert(true)}
                                 >
                                 <p className="reportBox">Supplier Due Report</p>
                               </div>
                                <div className="col-md-1.33"  style={{cursor:'move'}} 
                                 onClick={() => alert(true)}
                                 >
                                 <p className="reportBox">Stock Report</p>
                               </div>
                                <div className="col-md-1.33"  style={{cursor:'move'}} 
                                 onClick={() => alert(true)}
                                 >
                                 <p className="reportBox">Expense and Income Report</p>
                               </div>
                                <div className="col-md-1.33"  style={{cursor:'move'}} 
                                 onClick={() => alert(true)}
                                 >
                                 <p className="reportBox">Upcoming Installment</p>
                               </div>
                                <div className="col-md-1.33"  style={{cursor:'move'}} 
                                 onClick={() => alert(true)}
                                 >
                                 <p className="reportBox">Installment Collection</p>
                               </div>
                                <div className="col-md-1.33"  style={{cursor:'move'}} 
                                 onClick={() => alert(true)}
                                 >
                                 <p className="reportBox">Dafaulting Customer List</p>
                               </div>
                               

                             </div>
                        </div>
                        </div>
                
            
            </div>
            
        </>
    )
}

export default BasicReport


 

                