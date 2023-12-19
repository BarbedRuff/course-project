import json
import pickle

from fastapi import FastAPI, Request, UploadFile
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pandas import DataFrame

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def read(request: Request):
    return templates.TemplateResponse(
        "index.html", {"request": request, "id": "1"}
    )


@app.post("/", response_class=RedirectResponse, status_code=303)
async def send(file: UploadFile):
    json_file = json.loads(file.file.read())
    loaded_model = pickle.load(open("../model.pkl", 'rb'))

    # f_names = loaded_model.get_booster().feature_names
    # print(f_names)  - ФИЧИ МОДЕЛИ
    # weights = [[json_file[i] for i in json_file]] ЗАПАСНОЕ РАБОЧЕЕ

    weights = DataFrame(json_file, index=[0])
    pred = loaded_model.predict(weights)[0]  # 1 если болен, иначе 0

    return 'bad' if pred else 'good'


@app.get("/bad", response_class=HTMLResponse)
async def bad(request: Request):
    return templates.TemplateResponse(
        "bad.html", {"request": request, "id": "1"}
    )


@app.get("/good", response_class=HTMLResponse)
async def good(request: Request):
    return templates.TemplateResponse(
        "good.html", {"request": request, "id": "1"}
    )
