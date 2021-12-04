const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 5000;
const router = express.Router();

app.use(express.static('./'));
app.use('/', router);

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on port:${PORT}`)
})