import streamlit as st

import json
from assistant import react_agent

st.title("ReAct Agent Chat Interface")

st.write("Enter your input in the box below and press 'Submit'. Type 'quit' to exit.")

user_input = st.text_input("You:", "")

if user_input:
    if user_input.lower() == "quit":
        st.write("You have exited the chat.")
    else:
        agent_response = react_agent.chat("Always give only json response, anything else in the output will result in punishment" + user_input)
        
        json_string = agent_response.response

        try:
            response_dict = json.loads(json_string)
            st.subheader("Agent Response (JSON):")
            st.json(response_dict)  
        except json.JSONDecodeError:
            st.error("Failed to parse the response as JSON.")

