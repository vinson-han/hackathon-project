require('dotenv').config();
const express = require("express");
const collection = require('./mongo')
const cors = require('cors')
const bcrypt = require('bcrypt')
const axios = require('axios')
const OpenAI = require('openAi')


const app = express()
const openai = new OpenAI({
    apiKey: process.env.VITE_OPENAI_API_KEY 
})


//middleware functions to parse JSON and URL-encoded data in requests and enable cors



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/', express.static('dist'))


app.post('/api/openAi', async (req,res) => {

   

    if(!req.body){
        return res.status(400).json("No Body")
    }
    

    let prompt = req.body.question

    console.log(prompt)
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'assistant', content: prompt }],
            model: 'gpt-3.5-turbo',
            max_tokens: 150
          });
          
          const message = chatCompletion.choices[0].message.content
          console.log(message)
          
          return res.status(200).json(message);

        }catch(error){
            console.log(error)
            return res.status(400).json({message: "Some Error"})
        }
             
    })

//route defined to handle get requests to discover enpoint
app.get('/discover', cors(), (req, res) => {
       
    res.send('testing')

})


//route defiend to handle post requests to the login endpoint 
//checks database if email already exists and returns exist if it does and notexist if it doesn't

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // find the user's email and return notexist if can't be found
        const user = await collection.findOne({ email: email });

        if (!user) {
            return res.json('notexist'); 
        }

        // using bcrypt compare password to hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            res.json({ status: 'exist', name: user.name }); 
        } else {
            res.json('notexist'); 
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('error');
    }
});



//route defiend to handle post requests to the signup endpoint 
//stores email, password, and name in database
//checks database if email already exists and if not it inserts that data to create the user


app.post('/signup', async (req, res) => {
    const { email, password, name } = req.body;

    try {
        // Check if the email already exists in the database
        const existingUser = await collection.findOne({ email: email });

        if (existingUser) {
            return res.json('exist'); // Email already exists
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object with hashed password
        const newUser = new collection({
            email: email,
            password: hashedPassword,
            name: name
        });

        // Save the new user to the database
        await newUser.save();

        res.json('notexist'); // User successfully created
    } catch (error) {
        console.error(error);
        res.status(500).json('error');
    }
});


//start server 
app.listen(process.env.PORT || 8000, () => {
    
    console.log(process.env.PORT)
    console.log('Port Connected')
})




