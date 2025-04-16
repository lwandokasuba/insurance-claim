import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
import { DatabaseService } from './services'
import { Result } from './types'

const prisma = new PrismaClient()
const services = new DatabaseService(prisma)
const app = express()

app.use(express.json())

app.post(services.claims.routes.add, async (req, res) => {
  try {
    const result: Result = { status: 'success' };
    result.data = await services.claims.addClaim(req.body)
    res.json(result)
  } catch (error: any) {
    const result: Result = { status: 'error' };
    result.message = error?.message || 'Failed to add claim';
    res.status(400).json(result)
  }
})

app.get(services.claims.routes.getAll, async (req, res) => {
  try {
    const result: Result = { status: 'success' };
    result.data = await services.claims.getClaims(req.body)
    res.json(result)
  } catch (error: any) {
    const result: Result = { status: 'error' };
    result.message = error?.message || 'Failed to get claims';
    res.status(400).json(result)
  }
})

app.get(services.claims.routes.get, async (req, res) => {
  try {
    const id = req.query.id || req.params.id
    const result: Result = { status: 'success' };
    result.data = await services.claims.getClaim({ id: Number(id) })
    res.json(result)
  } catch (error: any) {
    const result: Result = { status: 'error' };
    result.message = error?.message || 'Failed to get claim';
    res.status(400).json(result)
  }
})

app.put(services.claims.routes.update, async (req, res) => {
  try {
    const id = req.query.id || req.params.id
    const result: Result = { status: 'success' };
    result.data = await services.claims.updateClaim({ id: Number(id), ...req.body })
    res.json(result)
  } catch (error: any) {
    const result: Result = { status: 'error' };
    result.message = error?.message || 'Failed to update claim';
    res.status(400).json(result)
  }
})

app.delete(services.claims.routes.delete, async (req, res) => {
  try {
    const result: Result = { status: 'success' };
    result.data = await services.claims.deleteClaim(req.body)
    res.json(result)
  } catch (error: any) {
    const result: Result = { status: 'error' };
    result.message = error?.message || 'Failed to delete claim';
    res.status(400).json(result)
  }
})

app.post(services.users.routes.add, async (req, res) => {
  try {
    const result: Result = { status: 'success' };
    result.data = await services.users.addUser(req.body)
    res.json(result)
  } catch (error: any) {
    const result: Result = { status: 'error' };
    result.message = error?.message || 'Failed to add user';
    res.status(400).json(result)
  }
})

app.get(services.users.routes.getAll, async (req, res) => {
  try {
    const result: Result = { status: 'success' };
    result.data = await services.users.getUsers()
    res.json(result)
  } catch (error: any) {
    const result: Result = { status: 'error' };
    result.message = error?.message || 'Failed to get users';
    res.status(400).json(result)
  }
})

app.get(services.users.routes.get, async (req, res) => {
  try {
    const id = req.query.id || req.params.id
    const result: Result = { status: 'success' };
    result.data = await services.users.getUser({ id: Number(id) })
    res.json(result)
  } catch (error: any) {
    const result: Result = { status: 'error' };
    result.message = error?.message || 'Failed to get user';
    res.status(400).json(result)
  }
})

app.put(services.users.routes.update, async (req, res) => {
  try {
    const result: Result = { status: 'success' };
    result.data = await services.users.updateUser(req.body)
    res.json(result)
  } catch (error: any) {
    const result: Result = { status: 'error' };
    result.message = error?.message || 'Failed to update user';
    res.status(400).json(result)
  }
})

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: https://github.com/prisma/prisma-examples/blob/latest/orm/express/README.md#using-the-rest-api`),
)
