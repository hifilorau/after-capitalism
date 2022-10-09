import axios from 'axios'


export default async (req, res) => {
  const { email, name } = req.body

  if (!email || !email.length) {
    return res.status(400).json({ error: 'Email is required' })
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY
  const API_SERVER = process.env.MAILCHIMP_API_SERVER
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
  
  const url = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`
  console.log('NAME', name)
  const data = {
    email_address: email,
    merge_fields: {'FNAME': name},
    // FNAME: name,
    // last_name: name,
    status: 'subscribed'
  }

  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `api_key ${API_KEY}`
    }
  }

  try {
    const response = await axios.post(url, data, options)
    if (response.status >= 400) {
      return res.status(400).json(data)
    }
    return res.status(201).json({ message: 'success' })
  } catch (error) {
    console.log('!!!error', error.response.data)
    return res.status(500).json({ error: error.response.data })
  }
}