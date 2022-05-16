import './Billing.scss';
import pdf from '../../assets/img/pdf.svg';
import {useContext} from "react";
import {ProfileContext} from "../../context/Profile/ProfileContext";
import { jsPDF } from "jspdf";

export const Billing = () => {

  const profileContext = useContext(ProfileContext);
  const bills = profileContext.bills;

  /*
  Transform Timestamp to Readable Date
   */
  const dateToHuman = (d) => {
    const date = new Date(d);
    return `
      ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}
      ${date.getHours()}:${date.getMinutes()} 
    `;
  }

  /*
    Very Simple Pdf Generator
   */
  const downloadPdf = (bill) => {
    const {firstName, lastName, fullName} = profileContext;
    const fileTitle = fullName || firstName + lastName;
    fullName.replaceAll(/ /g, '-').toLowerCase();

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [210, 297]
    });

    doc.text(`Bill for ${firstName}`, 10, 10);
    doc.text(`Amount ${bill.amount}`, 10, 20);
    doc.text(`Date ${dateToHuman(bill.date)}`, 10, 30);
    doc.save(`${fileTitle}-${bill.id}`);
  }

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
        {bills.map(bill => {
          return (
            <tr>
              <td>{bill.id}</td>
              <td>{dateToHuman(bill.date)}</td>
              <td>${bill.amount}</td>
              <td onClick={() => downloadPdf(bill)}>
                <button>
                  <img src={pdf} alt="PDF Icon"/>
                </button>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
      </div>
    </section>
  )
}

