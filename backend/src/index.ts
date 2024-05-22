import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'
// import { PassThrough } from 'stream';

const app = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    SECRET_KEY: string,
  }
}>()

app.use('*', cors({
  origin: 'http://localhost:5173',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}))
app.options('*', (c) => {
  return c.text('', 204)
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);



export default app
