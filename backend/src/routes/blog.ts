import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import {decode, sign, verify} from 'hono/jwt'

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        SECRET_KEY: string
    }
    Variables:{
        userId: string
    }
}>();

blogRouter.use("*", async(c, next) => {
    const authHeader = c.req.header("Authorization") || "";
    const user = await verify(authHeader, c.env.SECRET_KEY);
    if(user){
        c.set("userId", user.id);
        await next();
    }
    else{
        c.status(403);
        return c.json({
            message: "You are not logged in"
        });
    }
})

blogRouter.post("/create", async (c) => {
    const body = await c.req.json();
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blog = await prisma.blog.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: Number(authorId)
        }
    })
    return c.json({
        id: blog.id
    })
})

blogRouter.put("/update", async(c) => {
    const body = await c.req.json();
    const authorId = c.get("userId");
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blog = await prisma.blog.update({
        where:{
            id: body.id,
            authorId: Number(authorId)
        },
        data:{
            title: body.title,
            content: body.content,
        }
    })

    return c.json({
        id: blog.id
    })
});

blogRouter.get("/bulk", async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blogs = await prisma.blog.findMany({
        include:{
            author:{
                select:{
                    name: true
                }
            }
        }
    });

    return c.json({
        blogs
    })
});

blogRouter.get("/:id", async(c) => {
    const id = c.req.param('id');
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
        const blog = await prisma.blog.findFirst({
            where:{
                id: Number(id)
            }
        })
        if(blog){
            return c.json({
                blog
            })
        }
        else{
            c.status(401);
            return c.json({
                message: "Blog not found!"
            })
        }
        
    }catch(e){
        c.status(411);
        return c.json({
            message: "Error while fetching the blog post"
        });
    }
});
