'use client'

import { Claim, User } from '@/types'
import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

export default function Page() {
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState<Claim>()
  const [email, setEmail] = React.useState('')
  const [type, setType] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [incidentDate, setIncidentDate] = React.useState<Date>()
  const [incidentLocation, setIncidentLocation] = React.useState('')

  const handleSubmit = async () => {
    if (!email || !type || !description || !incidentDate) {
      alert('Please fill all required fields')
      return
    }
    setLoading(true)
    const user = await fetch(`/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password: "password" }),
    })
      .then((res) => res.json())
      .then((data) => data.data as User)
      .catch((error) => {
        console.error("Error creating user:", error)
        return null
      })
    if (user) {
      const claimData = {
        userId: user.id,
        user,
        type,
        description,
        incidentDate,
        incidentLocation,
      }

      const claim = await fetch(`/api/claims`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(claimData),
      })
        .then((res) => res.json())
        .then((data) => data as Claim)
        .catch((error) => {
          console.error("Error creating claim:", error)
          return null
        })

      if (claim) {
        setData(claim)
      }
      setLoading(false)
    }
  }
  return (
    <Container maxWidth="md" sx={{ padding: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h4" gutterBottom>
          Insurance Claim Form
        </Typography>
        {data && <Stack spacing={2}>
          <Typography variant="h6">
            Claim Created Successfully!
          </Typography>
          <Typography variant="body1">
            Check your email for further instructions.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setData(undefined)}
          >
            Create Another Claim
          </Button>
        </Stack>
        }
        {!data && <Stack spacing={2}>
          <Typography variant="h6">Claim Details</Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            required
            placeholder="Enter your email"
            autoComplete="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Type of Claim"
            variant="outlined"
            fullWidth
            required
            placeholder="Enter type of claim"
            autoComplete="claim-type"
            name="type"
            onChange={(e) => setType(e.target.value)}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            required
            placeholder="Enter claim description"
            autoComplete="claim-description"
            multiline
            rows={4}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Incident Date"
            variant="outlined"
            fullWidth
            required
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            autoComplete="incident-date"
            name="incidentDate"
            onChange={(e) => setIncidentDate(new Date(e.target.value))}
          />
          <TextField
            label="Incident Location"
            variant="outlined"
            fullWidth
            placeholder="Enter incident location"
            autoComplete="incident-location"
            name="incidentLocation"
            onChange={(e) => setIncidentLocation(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
            loading={loading}
            onClick={async () => await handleSubmit()}
          >
            Submit Claim
          </Button>
          <Typography variant="body2" color="textSecondary">
            By submitting this form, you agree to our terms and conditions.
          </Typography>
        </Stack>}
      </Stack>
    </Container>
  )
}
