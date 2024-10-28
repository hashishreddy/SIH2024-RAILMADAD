import streamlit as st
import json
from assistant import react_agent

# Streamlit Title and Instructions
st.title("ReAct Agent Chat Interface")
st.write("Fill in the details below and press 'Submit'. Type 'quit' to exit.")

# Data for the dropdowns
type_subtype_mapping = {
    "Medical Assistance": ["Medical Assistance"],
    "Security": [
        "Eve-teasing/Misbehaviour",
        "Eve-teasing/Misbehaviour with lady passengers/Rape",
        "Theft of Passengers Belongings/Snatching",
        "Unauthorized person in Ladies/Disabled Coach/SLR/Reserve Coach Harassment/Extortion by Security Personnel/Railway personnel",
        "Nuisance by Hawkers/Beggar/Eunuch",
        "Luggage Left Behind/Unclaimed/Suspected Articles",
        "Passenger Missing/Not responding call",
        "Smoking/Drinking Alcohol/Narcotics",
        "Dacoity/Robbery/Murder/Riots",
        "Quarrelling/Hooliganism Passenger fallen down",
        "Nuisance by passenger",
        "Misbehaviour",
        "Others"
    ],
    "Divyangjan Facilities": [
        "Divyangjan coach unavailability",
        "Divyangjan toilet/washbasin",
        "Braille signage in coach",
        "Others"
    ],
    "Facilities for Women with Special needs": ["Baby Food"],
    "Electrical Equipment": [
        "Lights",
        "Air Conditioner",
        "Fans",
        "Charging Points",
        "Others"
    ],
    "Coach - Cleanliness": [
        "Toilet",
        "Washbasin",
        "Cockroach / Rodents",
        "Coach Interior",
        "Coach Exterior",
        "Others"
    ],
    "Punctuality": [
        "NTES APP",
        "Late Running",
        "Others"
    ],
    "Water Availability": [
        "Packaged Drinking Water / Rail Neer",
        "Toilet",
        "Washbasin",
        "Others"
    ],
    "Staff Behaviour": ["Staff Behaviour"],
    "Corruption / Bribery": ["Corruption / Bribery"],
    "Coach - Maintenance": [
        "Window/Seat Broken",
        "Window/Door locking problem",
        "Tap leaking/Tap not working",
        "Broken/Missing Toilet Fittings",
        "Jerks/Abnormal Sound",
        "Others"
    ],
    "Catering & Vending Service": [
        "Overcharging",
        "Service Quality & Hygiene",
        "Food Quality & Quantity",
        "E-Catering",
        "Food & Water Not Available",
        "Others"
    ],
    "Bed Roll": [
        "Dirty / Torn",
        "Overcharging",
        "Non Availability",
        "Others"
    ],
    "Miscellaneous": ["Miscellaneous"]
}

# Streamlit dropdowns for selecting type and subtype
selected_type = st.selectbox("Type", options=list(type_subtype_mapping.keys()))
selected_subtype = st.selectbox("Subtype", options=type_subtype_mapping[selected_type])

# Input fields for other attributes
phone_number = st.text_input("Phone Number")
train_number = st.text_input("Train Number")
pnr_number = st.text_input("PNR Number")
problem_description = st.text_area("Problem Description")
incident_date = st.date_input("Incident Date")
incident_time = st.time_input("Incident Time")

# Button to submit the form
if st.button("Submit"):
    # Create the JSON input object
    input_data = {
        "phone_number": phone_number,
        "train_number": train_number,
        "pnr_number": pnr_number,
        "problem_description": problem_description,
        "type": selected_type,
        "subtype": selected_subtype,
        "incident_date": incident_date.strftime("%Y-%m-%d"),
        "incident_time": incident_time.strftime("%H:%M")
    }

    # Convert input data to JSON string
    json_input = json.dumps(input_data)

    # Handling the JSON input to ReAct agent
    if json_input:
        # Send the JSON as input to the ReAct agent
        agent_response = react_agent.chat(f"Always give only json response, anything else in the output will result in punishment {json_input}")
        
        # Try parsing the response as JSON
        try:
            response_dict = json.loads(agent_response.response)
            st.subheader("Agent Response (JSON):")
            st.json(response_dict)
        except json.JSONDecodeError:
            st.error("Failed to parse the response as JSON.")
