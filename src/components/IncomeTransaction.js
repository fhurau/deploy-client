import React from 'react'
import { Container } from 'react-bootstrap'
import succes from "../components/Dummy/succes.png"
import cancel from "../components/Dummy/cancel.png"

const IncomeTransaction = () => {
  return (
    <div className='margintop'>
        <Container>
        <table class="table table-bordered">
            <thead className='table-secondary'>
                <tr>
                <th scope="col">No</th>
                <th scope="col">Name</th>
                <th scope="col">Adress</th>
                <th scope="col">Product Order</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>Sugeng No Pants</td>
                <td>Cileungsi</td>
                <td>Paket Geprek</td>
                <td>Waiting To approve</td>
                <td className='d-flex justify-content-center'>
                    <button className='cancle me-3'>Cancle</button>
                    <button className='aprove'>Approve</button>
                </td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Haris</td>
                <td>Serang</td>
                <td>Paket Geprek</td>
                <td>Succes</td>
                <td className='d-flex justify-content-center'><img src={succes} alt="" /></td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td>Aziz Union</td>
                <td>Bekasi</td>
                <td>Paket Geprek</td>
                <td>Cancle</td>
                <td className='d-flex justify-content-center'><img src={cancel} alt="" /></td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td>Lee Tanjung Balai</td>
                <td>Tanjung Balai</td>
                <td>Paket Geprek</td>
                <td>On The Way</td>
                <td className='d-flex justify-content-center'><img src={succes} alt="" /></td>
                </tr>
            </tbody>
        </table>
        </Container>
    </div>
  )
}

export default IncomeTransaction