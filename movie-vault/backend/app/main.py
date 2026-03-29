from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import engine
from app.db.base import Base
from app.routes import auth as auth_router, movies as movies_router, profile as profile_router

# Creates the database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Movie Vault API")

# Configure CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5173/",
    "http://127.0.0.1:5173/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, # Important for HTTP-only cookies
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router, prefix="/api/auth", tags=["auth"])
app.include_router(movies_router.router, prefix="/api/movies", tags=["movies"])
app.include_router(profile_router.router, prefix="/api/profile", tags=["profile"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Movie Vault API"}
