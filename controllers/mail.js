const { sendEmail } = require("./mailer");
exports.send = async (req, res) => {
  try {

    const { order_number, to, productarr, c_name, c_email, c_phone, c_address, payment_method, shipping_method, expected_delivery } = req.body;

    const subject = "New Order Notification";

    const order_total = productarr.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const order_date = new Date().toLocaleDateString();

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>New Order Notification</title>
<style>
  body {
    font-family: 'Segoe UI', Arial, sans-serif;
    background-color: #f5f7fa;
    margin: 0;
    padding: 0;
  }
  .container {
    max-width: 700px;
    margin: auto;
    background: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 18px rgba(0,0,0,0.08);
  }
  .header {
    background: linear-gradient(135deg, #2c3e50, #34495e);
    color: white;
    padding: 25px;
    text-align: center;
  }
  .header h1 {
    margin: 0;
    font-size: 22px;
  }
  .content {
    padding: 25px;
    color: #333;
  }
  .section-title {
    font-size: 16px;
    font-weight: bold;
    margin-top: 25px;
    margin-bottom: 10px;
    color: #2c3e50;
    border-bottom: 2px solid #eee;
    padding-bottom: 5px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 5px;
  }
  th, td {
    padding: 10px;
    font-size: 14px;
    border-bottom: 1px solid #eee;
    text-align: left;
  }
  th {
    background: #f4f6f8;
  }
  .total-row td {
    font-weight: bold;
    background: #fafafa;
  }
  .footer {
    background: #f4f6f8;
    padding: 15px;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
</style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>New Order Received</h1>
      <p>Order Date: ${order_date}</p>
      <p>Order Number: ${order_number}</p>
    </div>

    <!-- Content -->
    <div class="content">

      <!-- Customer Info -->
      <div class="section-title">Customer Information</div>
      <table>
        <tr>
          <th>Name</th>
          <td>${c_name}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>${c_email}</td>
        </tr>
        <tr>
          <th>Phone</th>
          <td>${c_phone}</td>
        </tr>
        <tr>
          <th>Shipping Address</th>
          <td>${c_address}</td>
        </tr>
      </table>

      <!-- Order Items -->
      <div class="section-title">Ordered Items</div>
      <table>
        <tr>
          <th>Product</th>
          <th>Qty</th>
          <th>Price</th>
        </tr>
        ${productarr.map(item => `
        <tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>${item.price}</td>
        </tr>
        `).join('')}
        <tr class="total-row">
          <td colspan="2">Total</td>
          <td>${order_total.toFixed(2)}</td>
        </tr>
      </table>

      <!-- Payment & Shipping -->
      <div class="section-title">Payment & Shipping</div>
      <table>
        <tr>
          <th>Payment Method</th>
          <td>${payment_method}</td>
        </tr>
        <tr>
          <th>Shipping Method</th>
          <td>${shipping_method}</td>
        </tr>
        <tr>
          <th>Expected Delivery</th>
          <td>${expected_delivery}</td>
        </tr>
      </table>

    </div>

    <!-- Footer -->
    <div class="footer">
      This is an automated message for seller order processing.<br>
      Please fulfill the order as soon as possible.
    </div>
  </div>
</body>
</html>
`;

    const response = await sendEmail(to, subject, html);

    res.status(200).json("Email sent successfully");
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
exports.usermail = async (req, res) => {
  console.log(req.body);
  try {

    const { order_number, to, productarr, c_name, c_phone, c_address, payment_method, shipping_method, expected_delivery } = req.body;
    const order_total = productarr.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const order_date = new Date().toLocaleDateString();
    const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Order Confirmation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f6f6f6;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 650px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
    }
    .header {
      background: #0f62fe;
      color: #fff;
      padding: 20px;
    }
    .header h2 {
      margin: 0;
    }
    .content {
      padding: 20px;
      color: #333;
    }
    .content h3 {
      margin-top: 20px;
      margin-bottom: 10px;
      font-size: 16px;
      border-bottom: 1px solid #eee;
      padding-bottom: 6px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      font-size: 14px;
    }
    th {
      background: #f1f1f1;
      text-align: left;
    }
    .footer {
      background: #f1f1f1;
      text-align: center;
      padding: 15px;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Order Confirmation</h2>
      <p>Order #${order_number} | ${order_date}</p>
    </div>
    <div class="content">
      <p>Hi <strong>${c_name}</strong>,</p>
      <p>Thank you for your order! Here are the details:</p>

      <h3>Customer Information</h3>
      <p>
        <strong>Email:</strong> ${to}<br>
        <strong>Phone:</strong> ${c_phone}<br>
        <strong>Address:</strong> ${c_address}
      </p>

      <h3>Order Items</h3>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${productarr.map(item => `
            <tr>
              <td>${item.name}</td>
              <td>${item.quantity}</td>
              <td>PKR ${item.price.toFixed(2)}</td>
              <td>PKR ${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h3>Order Summary</h3>
      <p>
        <strong>Payment Method:</strong> ${payment_method}<br>
        <strong>Shipping Method:</strong> ${shipping_method}<br>
        <strong>Expected Delivery:</strong> ${expected_delivery}<br>
        <strong>Order Total:</strong> PKR ${order_total.toFixed(2)}
      </p>

      <p>W'll notify you once your order has been shipped.</p>
      <p>Thank you for shopping with us!</p>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} Your Store. All rights reserved.
    </div>
  </div>
</body>
</html>
`
    await sendEmail(to, "Order Confirmation", html);
    res.status(200).json("Email sent successfully");
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}