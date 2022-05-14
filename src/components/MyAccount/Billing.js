import './Billing.scss';
import pdf from '../../assets/img/pdf.svg';

export const Billing = () => {
  return (
    <section className="billing">
      <div className="pt-12">
      <table>
        <thead>
          <tr>
            <th>REFERENCE ID</th>
            <th>DATE</th>
            <th>AMOUNT</th>
            <th>INVOICE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>4571222f6rthswfg9981fr55</td>
            <td>7/12/2020</td>
            <td>$28</td>
            <td><img src={pdf}/></td>
          </tr>
        </tbody>
      </table>
      </div>
    </section>
  )
}