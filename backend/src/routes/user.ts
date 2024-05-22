import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import {decode, sign, verify} from 'hono/jwt'
import { signupInput } from '@swatejreddy/medium-common'

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        SECRET_KEY: string
    }
}>();

userRouter.post('/signup', async(c) => {
    const body = await c.req.json();
    console.log(body)

    const success = signupInput.safeParse(body);

    if(!success){
      c.status(411);
      return c.json({
        message: "Inputs not correct!"
      })
    }
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
  
    try{
      const user = await prisma.user.create({
        data:{
          username: body.username,
          password: body.password,
          name: body.name,
        }
      })
      console.log("user:"+user);
      const jwt = await sign({
        id: user.id
      }, c.env.SECRET_KEY);
      
      return c.text(jwt);
    }catch(e){
      console.log(e);
      c.status(411);
      c.text("Invalid");
      return c.json({
        message: "error occured!"
      })
    }
})
  
userRouter.post('/signin', async(c) => {
    const body = await c.req.json();
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
  
    try{
      const user = await prisma.user.findFirst({
        where:{
          username: body.username,
          password: body.password
        }
      })
      if(!user){
        c.status(403);
        return c.text("Invalid credentials!");
      }
  
      const jwt = await sign({
        id: user.id
        //for unique jwt token everytime user logs in
        // sessionId: new Date().getTime()
      }, c.env.SECRET_KEY);
      
      return c.text(jwt);
    }catch(e){
      console.log(e);
      c.status(411);
      c.text("Invalid");
    }
})