const pdfkit = require("pdfkit");
const nodemailer = require("nodemailer");
const axios = require("axios");
function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return day + "/" + month + "/" + year;
}
function formatCurrency(amount) {
  return amount.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
}
// const logoPath = "./logo.png";
const link =
  "https://media.discordapp.net/attachments/1121758461127045232/1125187019526643722/IMG_3578-transformed_3-fotor-bg-remover-202307035749.png?width=670&height=551";

async function fetchImage(src) {
  const image = await axios.get(src, {
    responseType: "arraybuffer",
  });
  return image.data;
}

async function generateInvoicePDF(data) {
  const doc = new pdfkit();

  const logo = await fetchImage(link);
  doc
    .image(logo, 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("WeGo Inc.", 110, 57)
    .fontSize(10)
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("BSD City, Tangerang, 9899 ", 200, 80, { align: "right" })
    .moveDown();

  doc.fillColor("#444444").fontSize(20).text("Invoice", 50, 160);

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, 200)
    .font("Helvetica-Bold")
    .text(data.noTransaction, 150, 200)
    .font("Helvetica")
    .text("Invoice Date:", 50, 200 + 15)
    .text(formatDate(new Date(data.Cart.weddingDate)), 150, 200 + 15)
    .text("Balance Due:", 50, 200 + 30)
    .text(formatCurrency(data.Cart.totalPrice), 150, 200 + 30)
    .font("Helvetica-Bold")
    .text(`${data.Cart.bride} & ${data.Cart.groom}`, 300, 200)
    .font("Helvetica")
    .text(data.Cart.address, 300, 200 + 15)
    .text(`Invoice Status: PAID`, 300, 200 + 30)
    .moveDown()
    .fontSize(10)
    .text("Service", 70, 300)
    .text("Price", 350, 300)
    .text(`${data.Cart.Photography.name}   (Photography)`, 70, 315)
    .text(`${data.Cart.Cathering.name}   (Cathering)`, 70, 330)
    .text(`${data.Cart.Venue.name}   (Venue)`, 70, 345)
    .text(formatCurrency(data.Cart.Photography.price), 350, 315)
    .text(formatCurrency(data.Cart.Cathering.price), 350, 330)
    .text(formatCurrency(data.Cart.Venue.price), 350, 345)
    .text(`Grand Total :`, 270, 380)
    .text(formatCurrency(data.Cart.totalPrice), 350, 380)
    .fontSize(10)
    .text("Thank you for choosing our product.", 200, 700);

  return new Promise((resolve, reject) => {
    const buffers = [];
    doc.on("data", (buffer) => buffers.push(buffer));
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    });
    doc.end();
  });
}

async function sendInvoiceEmail(email, pdfBuffer) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kobonagara@gmail.com",
      pass: "czwzkvtwwbftzgjo",
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Invoice",
    text: "Please find attached the invoice for your order.",
    attachments: [
      {
        filename: "invoice.pdf",
        content: pdfBuffer,
      },
    ],
  };

  return transporter.sendMail(mailOptions);
}

module.exports = {
  generateInvoicePDF,
  sendInvoiceEmail,
};
