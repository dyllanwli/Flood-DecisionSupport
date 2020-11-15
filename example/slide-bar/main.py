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
    st.slider("Select Population Density")
if st.checkbox("Poverty"):
    st.slider("Select Poverty")
if st.checkbox("Elderly"):
    st.slider("Select Elderly")
if st.checkbox("Employment"):
    st.slider("Select Employment")
if st.checkbox("Mobility and Human Dynamics"):
    st.slider("Select Mobility and Human Dynamics")

st.write("""
---

## Infrastructure Exposure
""")
if st.checkbox("Critical Facilities"):
    st.slider("Select Critical Facilities")
if st.checkbox("Development Patterns"):
    st.slider("Select Development Patterns")

st.write("""
---

## Ecosystem Exposure
""")
if st.checkbox("Natural Areas and Open Space"):
    st.slider("Select Natural Areas and Open Space")
if st.checkbox("Potential Pollution Sources"):
    st.slider("Select Potential Pollution Sources")
if st.checkbox("Natural Protection"):
    st.slider("Select Natural Protection")
if st.checkbox("Oil Spill"):
    st.slider("Select Oil Spill")
if st.checkbox("Wetland Potential"):
    st.slider("Select Wetland Potential")

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


