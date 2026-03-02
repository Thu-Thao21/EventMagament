from fastapi import FastAPI

app = FastAPI(title="E-commerce API")

@app.get("/")
def root():
    return {"message": "FastAPI Backend is running!"}
