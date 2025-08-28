from crewai import Agent, Task, Crew
from langchain_groq import ChatGroq

llm=ChatGroq(temperature=0.7,
             model_name="gemma2-9b-it",

             api_key='')
