import streamlit as st
import pandas as pd

# option = st.sidebar.selectbox(
#     'Options',
#      ('Active Layers', 'Social Sensing', 'Community Survey')
# )

# '#', option

st.write("""
---

## Multi-Scale Climate and Flood Simulation
""")

st.checkbox("Sea Level Rise")
st.checkbox("Storm Surge")
st.checkbox("Citizen-Science Based Flood Depth Mapping")
st.checkbox("High-resolution Global Earth System Model")
st.checkbox("Coupled Hygrologic-Hydraulic Flood Simulation Model")


st.write("""
---

## Social Exposure
""")
if st.checkbox("Population Density"):
    st.slider("Assign Weights for Population Density")
if st.checkbox("Poverty"):
    st.slider("Assign Weights for Poverty")
if st.checkbox("Elderly"):
    st.slider("Assign Weights for Elderly")
if st.checkbox("Employment"):
    st.slider("Assign Weights for Employment")
if st.checkbox("Mobility and Human Dynamics"):
    st.slider("Assign Weights for Mobility and Human Dynamics")

st.write("""
---

## Infrastructure Exposure
""")
if st.checkbox("Critical Facilities"):
    st.slider("Assign Weights for Critical Facilities")
if st.checkbox("Development Patterns"):
    st.slider("Assign Weights for Development Patterns")

st.write("""
---

## Ecosystem Exposure
""")
if st.checkbox("Natural Areas and Open Space"):
    st.slider("Assign Weights for Natural Areas and Open Space")
if st.checkbox("Potential Pollution Sources"):
    st.slider("Assign Weights for Potential Pollution Sources")
if st.checkbox("Natural Protection"):
    st.slider("Assign Weights for Natural Protection")
if st.checkbox("Oil Spill"):
    st.slider("Assign Weights for Oil Spill")
if st.checkbox("Wetland Potential"):
    st.slider("Assign Weights for Wetland Potential")

st.write("""
---
""")

if st.checkbox("Social Media"):
    st.radio(
        "Select Social Media User Type",
        ('Single User', 'Group User')
    )


st.write("""
---
""")


st.button("Check Relevant Decision Problems")
st.button("Revise Your Selections and Weights")
st.button("Submit")


