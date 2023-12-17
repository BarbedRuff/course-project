from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "id": "1"})


@app.get("/bad", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse("bad.html", {"request": request, "id": "1"})


@app.get("/good", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse("good.html", {"request": request, "id": "1"})
