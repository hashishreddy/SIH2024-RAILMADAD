from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from assistant import react_agent
import json

app = FastAPI()

class ComplaintInput(BaseModel):
    phone_number: str
    train_number: str
    pnr_number: str
    problem_description: str
    type: str
    subtype: str
    incident_date: str
    incident_time: str

@app.post("/classify_complaint/")
async def classify_complaint(complaint: ComplaintInput):
    try:
        user_input = complaint.dict()
        user_input_str = json.dumps(user_input)
        agent_response = react_agent.chat(f"Always give only json response, anything else in the output will result in punishment {user_input_str}")
        
        json_string = agent_response.response

        try:
            response_dict = json.loads(json_string)
            return {"status": "success", "data": response_dict}
        except json.JSONDecodeError:
            raise HTTPException(status_code=500, detail="Failed to parse agent response as JSON")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
