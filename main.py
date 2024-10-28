from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from assistant import react_agent
import json

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ComplaintInput(BaseModel):
    phone_number: str
    train_number: str
    pnr_number: str
    problem_description: str
    type: str
    subtype: str
    incident_date: str
    incident_time: str
    priority: str = None
    department_assigned: str = None

@app.post("/classify_complaint/")
async def classify_complaint(complaint: ComplaintInput):
    try:
        user_input = complaint.dict()
        user_input_str = json.dumps(user_input)
        agent_response = react_agent.chat(
            f"Always give only JSON response, anything else in the output will result in punishment {user_input_str}"
        )

        json_string = agent_response.response

        # Parse the JSON string response from the agent
        try:
            response_dict = json.loads(json_string)

            priority = response_dict.get("priority", "Unknown")
            department = response_dict.get("department_assigned", "Unknown")

            # Return success status with the full response JSON
            return {
                "status": "success",
                "message": f"Allocated Department: {department}, Priority: {priority}",
                "full_response": response_dict
            }
        except json.JSONDecodeError:
            raise HTTPException(
                status_code=500, detail="Failed to parse agent response as JSON"
            )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
