const express = require('express');
const app = express();
const path = require('path')
const port = 3000;
const router = express.Router();

app.use(express.static('./'))
app.use('/', router);

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port:${port}`)
})