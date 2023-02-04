import express, { Request, Response } from 'express';
import cors from 'cors';
import { Videos } from './models/video';
import { TVideosDB } from './types';
import { db } from './database/knex';
import { title } from 'process';
import { duracaoEmSegundos } from 'process';
import { dataDoUpload } from 'process';


const app = express()
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003!")
})

app.get('/ping', (req: Request, res: Response) => {
    res.status(200).send('Pong')
});

app.get("/videos", async (req: Request, res: Response) => {
    try {
        const q = req.query.q

        let VideosDB

        if (q) {
            const result: TVideosDB[] = await db("videos").where("id", "LIKE", `%${q}%`)
            VideosDB = result
        } else {
            const result: TVideosDB[] = await db("videos")
            VideosDB = result
        }
// Feito para que as infrormações que cheguem no postman, não sejam as do Banco, sejam essas.

const videos: Videos[] = VideosDB.map((videosDB)=>
            new Videos(
                videosDB.id,
                videosDB.title,
                videosDB.duracaoEmSegundos,
                videosDB.dataDoUpload     
            )
        )

        res.status(200).send(videos)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get("/videos/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [ videosDB ]: TVideosDB[] | undefined[] = await db("videos").where({ id })

        if (!videosDB) {
            res.status(404)
            throw new Error("'id' não encontrado")
        }

        const newVideos = new Videos (
            id,
            title,
            duracaoEmSegundos,
            dataDoUpload
        )
        const newVideosDB: TVideosDB ={
            id: newVideos.getId(),
            title: newVideos.getTitle(),
            duracaoEmSegundos: newVideos.getDuracaoEmSegundos(),
            dataDoUpload: newVideos.getDataDoUpload()
        } 
        await db("videos").insert(newVideosDB)
        res.status(200).send(newVideos)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.put("/videos/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const value = req.body.value

        if (typeof value !== "number") {
            res.status(400)
            throw new Error("'value' deve ser number")
        }

        const [ videosDB ]: TVideosDB[] | undefined[] = await db("videos").where({ id })

        if (!videosDB) {
            res.status(404)
            throw new Error("'id' não encontrado")
        }

        videosDB.id += value

        const newVideos = new Videos (
            id,
            title,
            duracaoEmSegundos,
            dataDoUpload
        )
        const newVideosDB: TVideosDB ={
            id: newVideos.getId(),
            title: newVideos.getTitle(),
            duracaoEmSegundos: newVideos.getDuracaoEmSegundos(),
            dataDoUpload: newVideos.getDataDoUpload()
        };

        await db("videos").insert(newVideosDB)
        res.status(200).send(newVideos)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})