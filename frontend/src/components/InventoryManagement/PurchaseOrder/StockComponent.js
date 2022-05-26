
import React,{useState} from 'react'
import { Modal, Form,  Nav} from "react-bootstrap";

function StockComponent({orderShow,StockList}) {

    const [searchStockText, setSearchStockText] = useState('')
     const [purchaseOrderShow, setPurchaseOrderShow] = React.useState(orderShow);

      const handleClear =()=>{
        setSearchStockText("")
    }
const searchDatas = StockList.filter(
                search => {
                return (
                    search.stockCode.toLowerCase().includes(searchStockText.toLowerCase())||
                    search.productName.toLowerCase().includes(searchStockText.toLowerCase())||
                    search.category.toLowerCase().includes(searchStockText.toLowerCase()) ||
                    search.company.toLowerCase().includes(searchStockText.toLowerCase()) 
                    
                );
                })
 var count=0;
   const customerData = searchDatas.map((data,index)=> {
     ++count;
       if(data){
             return(
            <tr style={{height:'5px',fontSize:'12px'}} key={index}>
                <td>{data.stockCode}</td>
                <td>{data.productName}</td>
                <td>{data.category}</td>
                <td>{data.company}</td>
                <td>{data.otv}</td>
                <td>{data.purchaseRate}</td>
                <td>{data.mrp}</td>
                <td>{data.totalPrice}</td>
                
            </tr>
       )
       }else{
            return <p style={{background:'red'}}>No data found</p>
       }
      
    });
    return (
        <>
             <Modal.Body>
            <Nav variant="tabs"  defaultActiveKey="/#">
                <Nav.Item>
                    <Nav.Link href="/#" onClick={()=> setPurchaseOrderShow(true) }>PurchaseOrder</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={()=> setPurchaseOrderShow(!purchaseOrderShow) }>Stock</Nav.Link>
                </Nav.Item>
            </Nav>
          <Form>
            <div className="container-fluid ">
              <div className="row">
                <div className="col-md-12 pt-3 ml-1 showBox1">
                  <form onSubmit={(e) => e.preventDefault}>
                    <div className="row">
                      <div className="col-8  form-group">
                        <input
                          className="searchBox form-control"
                          placeholder="Enter name or address"
                          onChange={(e)=> setSearchStockText(e.target.value)}
                          type="text"
                        />
                    
                      </div>
                      <div className="col-4">
                        <button className="findBtn" type="submit">
                          Find
                        </button>
                        <button className="clearBtn" type="reset" onClick={handleClear}>
                          Clear
                        </button>
                      </div>
                    </div>
                  </form>

                  <div className="tableContainer table-responsive">
                    <table className="table">
                      <thead
                        style={{ position: "sticky", top: 0 }}
                        className="thead-dark"
                      >
                        <tr style={{height:'5px',fontSize:'12px'}}>
                          <th className="header" scope="col">
                           Stock Code
                          </th>
                          <th className="header" scope="col">
                            Product Name
                          </th>
                          <th className="header" scope="col">
                            Category
                          </th>
                           <th className="header" scope="col">
                            Company
                          </th>
                           <th className="header" scope="col">
                            Otv
                          </th>
                           <th className="header" scope="col">
                            Pur.Rate
                          </th>
                           <th className="header" scope="col">
                            MRP
                          </th>
                           <th className="header" scope="col">
                            Total Price
                          </th>
                           
                          
                        </tr>
                      </thead>
                      <tbody>
                        {/* Show Company List */}
                      { customerData? customerData : 'No Data Founds!'} 
                        
                      </tbody>
                    </table>
                  </div>

                  
                <div className="printBtn pull-left">
                    <button className=" btn btn-danger" type="button">
                      Print
                    </button>
                    <span className="spanTitle" className="pull-right pt-2 pr-5 ">Total: {count>9? `${count} rows` : `${count} rows`} </span>
                  </div>
                </div>


    {/* Perform Operation using some button */}
 
              </div>
            </div>
          </Form>
        </Modal.Body>
            
        </>
    )
}

export default StockComponent
