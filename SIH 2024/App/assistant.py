from typing import Dict, Optional
from datetime import datetime
from llama_index.core.tools import FunctionTool
from llama_index.llms.groq import Groq
import json

llm = Groq(model="llama3-70b-8192", api_key="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")

from typing import Dict, Optional
from datetime import datetime

def combined_complaint_classifier(complaint: dict) -> dict:
    """
    You are an intelligent complaint classification system designed to work for Rail Madad, the IRCTC's complaint grievance platform. Your primary task is to:

    1. Determine the priority of a complaint based on the details provided. The priorities are categorized as follows:
        - Emergency: Applicable for health-related or security emergencies.
        - High: Issues that could significantly impact passenger safety, comfort, or delay train operations.
        - Medium: Problems affecting comfort, convenience, or cleanliness, but not life-threatening or severely disruptive.
        - Low: Minor issues or problems that are not urgent and have minimal impact on overall passenger experience.

    2. Assign the correct department responsible for resolving the issue. The departments available are:
        - Traffic
        - Civil Engineering
        - Mechanical
        - Electrical
        - Signal and Telecommunications
        - Accounts and Finance
        - Medical
        - Security
        - Legal
        - Housekeeping
        - Catering/Food Department

    The decision for assigning priority and department depends on the type and subtype of the complaint. If the type or subtype is ambiguous, the complaint description should be analyzed for further clarification.

    Priority Rules:

    - Emergency: For life-threatening security issues (e.g., "Eve-teasing," "Dacoity," "Robbery," etc.) or critical health emergencies (e.g., "Medical Assistance"). These cases are assigned to the Security or Medical departments, depending on the issue.
    - High: For serious operational or safety issues (e.g., "Train Delays," "Air Conditioner Failure in Extreme Conditions," or safety risks related to electrical equipment). Issues of misconduct or corruption (e.g., "Corruption/Bribery") also fall under this category. These may be assigned to departments like Traffic, Electrical, or Accounts and Finance.
    - Medium: For issues impacting comfort or cleanliness (e.g., "AC Malfunction," "Coach Cleanliness," "Food Quality," or "Facilities"). These are assigned to relevant departments such as Electrical, Housekeeping, or Catering.
    - Low: For minor issues or feedback that don't require urgent attention (e.g., minor delays, cleanliness complaints about cockroaches, rodents, etc.). These are assigned to departments like Housekeeping or relevant operational ones.

    Example Input: 
    
    {
        "phone_number": "9123456789",
        "train_number": "12874",
        "pnr_number": "PNR654321",
        "problem_description": "AC in coach not functioning properly.",
        "type": "Facilities",
        "subtype": "AC Malfunction",
        "incident_date": "2023-03-10",
        "incident_time": "16:30"
    }

    Example Output:

    {
        "phone_number": "9123456789",
        "train_number": "12874",
        "pnr_number": "PNR654321",
        "problem_description": "AC in coach not functioning properly.",
        "type": "Facilities",
        "subtype": "AC Malfunction",
        "incident_date": "2023-03-10",
        "incident_time": "16:30",
        "priority": "Medium",
        "department_assigned": "Electrical"
    }

    This function returns a modified JSON containing the original complaint information with added "priority" and "department_assigned" fields based on the classification logic.
    """
    priority = ""
    department_assigned = ""

    # Prepare modified complaint with original details and classified fields.
    mod_complaint = {
        "phone_number": complaint["phone_number"],
        "train_number": complaint["train_number"],
        "pnr_number": complaint["pnr_number"],
        "problem_description": complaint["problem_description"],
        "type": complaint["type"],
        "subtype": complaint["subtype"],
        "incident_date": complaint["incident_date"],
        "incident_time": complaint["incident_time"],
        "priority": priority,
        "department_assigned": department_assigned
    }

    return mod_complaint


complaint_classifier_tool = FunctionTool.from_defaults(fn=combined_complaint_classifier)

from llama_index.core.agent import ReActAgent, FunctionCallingAgentWorker

react_agent = ReActAgent.from_tools(tools=[complaint_classifier_tool],llm=llm, verbose=True)