export default async (req, res) => {
  const productAmount = Math.floor(Math.random() * 100);

  if (req.method === 'POST') {
    const { amount, id } = req.body;
    console.log(productAmount, amount);
    if (productAmount >= amount) {
      res.status(200).json({ 
        measage: '',
        confirmed: true, 
      });
    } else {
      res.status(200).json({ 
        measage: 'The quantity of the product you specified exceeds the allowable value', 
        confirmed: false,
      })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};


