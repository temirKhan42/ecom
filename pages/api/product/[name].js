export default function handler(request, response) {
  if (request.method === 'GET') {
    response.status(200).json({
      id: 1,
      title: 'Fall limited edition sneakers',
      cost: 125.00,
      price: 250.00,
      discount: 50,
      discountDate: new Date(2023, 8, 1),
    });
  } else {
    response.status(405).json({ message: 'Method not allowed' });
  }
}